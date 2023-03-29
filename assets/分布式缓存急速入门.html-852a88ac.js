import{_ as t,W as a,X as l,Z as i,$ as e,a0 as s,a1 as d,C as r}from"./framework-a4c02b8f.js";const c="/images/2023-03-29-15-38-50.png",o={},v=d(`<h2 id="安装、部署" tabindex="-1"><a class="header-anchor" href="#安装、部署" aria-hidden="true">#</a> 安装、部署</h2><p>首先在服务器安装redis，我使用的是免安装版本</p><p>cd到安装目录，执行命令（注意一定要指定配置文件）</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-server.exe redis.windows.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同时本地也安装redis，cd到安装目录，连接服务器redis</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-cli -h &lt;ip地址&gt; -p 6379
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这时候可能会报错，提示：No connection is available to service this operation: EVAL。远程主机强迫关闭了一个现有的连接</p><p>这时候修改服务器上启动的对应配置文件（redis.windows.conf）将protected-mode设置为no</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>bind 0.0.0.0
protected-mode no
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>bind地址，原来是127.0.0.1，改为 bind 0.0.0.0 这样的话其它的ip地址也可以连接过来了。</p><figure><img src="`+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',11),u={id:"asp-net-core中使用",tabindex:"-1"},m=i("a",{class:"header-anchor",href:"#asp-net-core中使用","aria-hidden":"true"},"#",-1),b={href:"http://asp.net",target:"_blank",rel:"noopener noreferrer"},p=d(`<p>首先安装nuget包：Microsoft.Extensions.Caching.Redis</p><p>然后往容器注入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>services.AddDistributedRedisCache(options =&gt;
{
    options.Configuration =&quot;{ip地址:端口号},abortconnect=false&quot;;
    options.InstanceName = &quot;RedisDemo&quot;;
});
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在控制器中的构造函数注入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>private readonly IDistributedCache _distributedCache;

public HomeController( IDistributedCache distributedCache)
{
    _distributedCache = distributedCache;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在方法中获取key，如果没有，就传入一个</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> public IActionResult Index()
{
    var name = _distributedCache.Get(&quot;name-key&quot;);
    if (name == null)
    {
        var obj = new Dictionary&lt;string, string&gt;
        {
            [&quot;firstName&quot;] = &quot;Curry&quot;,
            [&quot;lastName&quot;] = &quot;Zhang&quot;
        };
        var str = JsonConvert.SerializeObject(obj);
        byte[] encoded = Encoding.UTF8.GetBytes(str);
        
        //var options = new DistributedCacheEntryOptions();
        //设置30秒过期
        var options =new DistributedCacheEntryOptions().SetSlidingExpiration(TimSan.FromSeconds(30));
        
        _distributedCache.Set(&quot;name-key&quot;, encoded, options);
        return View(obj);
    }
    else
    {
        var str = Encoding.UTF8.GetString(name);
        var obj=JsonConvert.DeserializeObject&lt;Dictionary&lt;string,string&gt;&gt;(sr);
        return View(obj);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改下视图，展示出来</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@model Dictionary&lt;string, string&gt;
@{
    ViewData[&quot;Title&quot;] = &quot;Home Page&quot;;
}

&lt;div class=&quot;text-center&quot;&gt;
    &lt;h1 class=&quot;display-4&quot;&gt;Welcome&lt;/h1&gt;
    @foreach (var kv in Model)
    {
        &lt;h3&gt;
            @kv.Key:@kv.Value
        &lt;/h3&gt;
    }
&lt;/div&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),g={href:"https://www.cnblogs.com/cgzl/p/9178672.html#redis",target:"_blank",rel:"noopener noreferrer"},h={href:"https://www.bilibili.com/video/BV1kt41147mM",target:"_blank",rel:"noopener noreferrer"};function _(x,f){const n=r("ExternalLinkIcon");return a(),l("div",null,[v,i("h2",u,[m,e(),i("a",b,[e("asp.net"),s(n)]),e(" core中使用")]),p,i("blockquote",null,[i("p",null,[e("学习这部分知识主要受杨旭大佬的视频影响，感谢，附上杨旭老师的博客和B站链接："),i("a",g,[e("博客"),s(n)]),e("、"),i("a",h,[e("B站"),s(n)])])])])}const C=t(o,[["render",_],["__file","分布式缓存急速入门.html.vue"]]);export{C as default};
