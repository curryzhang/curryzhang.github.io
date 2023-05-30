import{_ as s,W as t,X as l,Y as r,Z as e,$ as i,a0 as a,a1 as d,C as c}from"./framework-a4c02b8f.js";const v={},u=e("h2",{id:"前景",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前景","aria-hidden":"true"},"#"),i(" 前景")],-1),o=e("p",null,"开发中，我们会存在短时间一条数据多次请求的情况，之前我也写过一篇限流的用法，也基本可以实现。今天介绍利用Filter过滤器+Redis来实现的方式",-1),m=d(`<h2 id="编码实现" tabindex="-1"><a class="header-anchor" href="#编码实现" aria-hidden="true">#</a> 编码实现</h2><p>首先定义类PreventDuplicateRequestsActionFilter，</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>using Forum.Cache;//这是我实现缓存的引用
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;

public class PreventDuplicateRequestsActionFilter : IAsyncActionFilter
{
    public string[] FactorNames { get; set; }
    public int? Seconds { get; set; }
    
    public PreventDuplicateRequestsActionFilter()
    { }

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        // 定义一个 string? 类型数组 factorValues，并初始化为 null
        var factorValues = new string?[FactorNames.Length];
        // 判断请求参数是否来自于请求体
        var isFromBody = context.ActionDescriptor.Parameters.Any(r =&gt; r.BindingInfo?.BindingSource == BindingSource.Body);
        // 如果请求参数来自于请求体
        if (isFromBody)
        {
            // 从请求参数中获取值，并根据 FactorNames 的值来构造 factorValues 数组
            var parameterValue = context.ActionArguments.FirstOrDefault().Value;
            factorValues = FactorNames.Select(name =&gt; parameterValue?.GetType().GetProperty(name)?.GetValue(parameterValue)?.ToString()).ToArray();
        }
        // 如果请求参数不来自于请求体
        else
        {
            // 从控制器方法参数中获取值，并根据 FactorNames 的值来构造 factorValues 数组
            for (var index = 0; index &lt; FactorNames.Length; index++)
            {
                if (context.ActionArguments.TryGetValue(FactorNames[index], out var factorValue))
                {
                    factorValues[index] = factorValue?.ToString();
                }
            }
        }
        // 如果 factorValues 中所有元素都为 null 或空字符串，则直接调用下一个中间件
        if (factorValues.All(string.IsNullOrEmpty))
        {
            await next();
            return;
        }
        // 构造幂等性key，并从缓存中获取对应的值
        var idempotentKey = $&quot;{context.HttpContext.Request.Path.Value}:{string.Join(&quot;-&quot;, factorValues)}&quot;;
        var idempotentValue = CacheFactory.Cache.GetCache&lt;string&gt;(idempotentKey);
        // 如果幂等性key对应的值不为 null，则返回一个自定义的 JsonResult 对象
        if (idempotentValue != null)
        {
            context.Result = new JsonResult(new { code = StatusCodes.Status200OK, msg = &quot;正在调用接口，请勿重复调用！&quot;, data = &quot;&quot; });
        }
        else
        {
            // 如果幂等性key对应的值为 null，则将幂等性key和当前时间作为缓存值存入缓存，并调用下一个中间件
            CacheFactory.Cache.SetCache&lt;string&gt;(idempotentKey, DateTimeOffset.UtcNow.ToString(), DateTime.Now.AddSeconds(Convert.ToDouble(Seconds)));
            await next();
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在program中添加<code>builder.Services.AddScoped&lt;PreventDuplicateRequestsActionFilter&gt;();</code></p><p>接下来新建自定义属性：PreventDuplicateRequestsAttribute</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>using Microsoft.AspNetCore.Mvc.Filters;

// 声明特性，并指定标记位置为方法
[AttributeUsage(AttributeTargets.Method)]
public class PreventDuplicateRequestsAttribute : Attribute, IFilterFactory
{
    private readonly int _expiredSeconds;//用于记录缓存的过期时间
    private readonly string[] _factorNames;//用于记录幂等性校验的因素名

    public PreventDuplicateRequestsAttribute(int expiredMinutes, params string[] factorNames)
    {
        _expiredSeconds = expiredMinutes;
        _factorNames = factorNames;
    }

    public IFilterMetadata CreateInstance(IServiceProvider serviceProvider)
    {
        // 通过依赖注入获取 PreventDuplicateRequestsActionFilter 过滤器实例
        var filter = serviceProvider.GetService&lt;PreventDuplicateRequestsActionFilter&gt;();
        filter.FactorNames = _factorNames;
        filter.Seconds = _expiredSeconds;
        return filter;
    }

    // 实现 IFilterFactory 接口中的 IsReusable 方法，指示过滤器实例是否可重用
    public bool IsReusable =&gt; false;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面就可以在使用的地方加上</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[HttpGet(&quot;{id:int}&quot;)]
[PreventDuplicateRequests(5, &quot;id&quot;)]
public ApiResponse&lt;FeaturedPost&gt; Get(int id)
{
    var item = DefaultService.Get(id);
    return item == null ? ApiResponse.NotFound() : new ApiResponse&lt;FeaturedPost&gt;(item);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的列子是将相同id请求的接口限制在5秒内只能传送一次</p>`,9),b={href:"https://www.cnblogs.com/netry/p/aspnetcore-prevent-duplicate-requests-filter-redis.html",target:"_blank",rel:"noopener noreferrer"};function p(g,f){const n=c("ExternalLinkIcon");return t(),l("div",null,[u,o,r(" more "),m,e("p",null,[i("参考文件:"),e("a",b,[i("ASP.NET Core使用filter和redis实现接口防重"),a(n)])])])}const h=s(v,[["render",p],["__file","接口防重.html.vue"]]);export{h as default};
