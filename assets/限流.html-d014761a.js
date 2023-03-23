import{_ as n,W as s,X as o,Y as e,Z as i,a0 as l,a1 as d,C as u}from"./framework-474f8844.js";const a="/images/2023-03-20-16-41-10.png",r={},c=e("h3",{id:"前言-对外接口要做限流-避免被暴力访问。-net7内置了限流中间件-之前的系统如何操作呢",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#前言-对外接口要做限流-避免被暴力访问。-net7内置了限流中间件-之前的系统如何操作呢","aria-hidden":"true"},"#"),i(" 前言：对外接口要做限流，避免被暴力访问。.Net7内置了限流中间件，之前的系统如何操作呢？")],-1),v=e("p",null,"使用开源框架：AspNetCoreRateLimit",-1),m={href:"https://github.com/stefanprodan/AspNetCoreRateLimit",target:"_blank",rel:"noopener noreferrer"},q=d(`<p>首先它有两种模式：</p><ol><li>根据IP地址限流</li><li>根据 ClientID 限流</li></ol><p>示例代码使用的是根据MemoryCache针对IP地址进行限流，具体步骤如下：</p><p>安装包：AspNetCoreRateLimit</p><p>注册服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>builder.Services.AddMemoryCache();
builder.Services.Configure&lt;IpRateLimitOptions&gt;(builder.Configuration.GetSection(&quot;IpRateLimiting&quot;));
builder.Services.Configure&lt;IpRateLimitPolicies&gt;(builder.Configuration.GetSection(&quot;IpRateLimitPolicies&quot;));
builder.Services.AddSingleton&lt;IIpPolicyStore, MemoryCacheIpPolicyStore&gt;();
builder.Services.AddSingleton&lt;IRateLimitCounterStore, MemoryCacheRateLimitCounterStore&gt;();
builder.Services.AddSingleton&lt;IRateLimitConfiguration, RateLimitConfiguration&gt;();
builder.Services.AddSingleton&lt;IProcessingStrategy, AsyncKeyLockProcessingStrategy&gt;();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加中间件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app.UseIpRateLimiting();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>UseRateLimit 放在 UseStaticFiles等后面，避免请求静态文件等也进行限流</p></blockquote><p>添加配置文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;IpRateLimiting&quot;: {
    &quot;EnableEndpointRateLimiting&quot;: true,
    &quot;StackBlockedRequests&quot;: false,
    &quot;RealIpHeader&quot;: &quot;X-Real-IP&quot;,
    &quot;ClientIdHeader&quot;: &quot;X-ClientId&quot;,
    &quot;HttpStatusCode&quot;: 429,
    //白名单
    &quot;IpWhitelist&quot;: [],
    &quot;EndpointWhitelist&quot;: [
      &quot;get:/api/license&quot;,
      &quot;*:/api/status&quot;
    ],
    &quot;ClientWhitelist&quot;: [
      &quot;dev-id-1&quot;,
      &quot;dev-id-2&quot;
    ],
    &quot;GeneralRules&quot;: [
      {
        &quot;Endpoint&quot;: &quot;*:/Api/Blog/Top&quot;,
        &quot;Period&quot;: &quot;1m&quot;,
        &quot;Limit&quot;: 5
      }
    ],
    &quot;QuotaExceededResponse&quot;: {
      &quot;Content&quot;: &quot;{{ \\&quot;message\\&quot;: \\&quot;先别急，你访问得太快了！\\&quot;, \\&quot;details\\&quot;: \\&quot;已经触发限流。限流规则: 每 {1} 只能访问 {0} 次。请 {2} 秒后再重试。\\&quot; }}&quot;,
      &quot;ContentType&quot;: &quot;application/json&quot;,
      &quot;StatusCode&quot;: 429
    }
  },
  &quot;IpRateLimitPolicies&quot;: {
    &quot;IpRules&quot;: [
      {
        &quot;Ip&quot;: &quot;192.168.1.1&quot;,
        &quot;Rules&quot;: [
          {
            &quot;Endpoint&quot;: &quot;*&quot;,
            &quot;Period&quot;: &quot;1s&quot;,
            &quot;Limit&quot;: 1
          }
        ]
      }
    ],
    &quot;ClientRules&quot;: []
  }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件解释</p><ol><li>EnableEndpointRateLimiting：设置为true，否则设置的限流是全局的，不能根据某个路径单独设置限流</li><li>StackBlockedRequests：设置为false，若设置为true，则一个接口被限流之后再重复请求还会计算到访问次数里面</li><li>Endpoint：设置格式为<strong>HTTP方法:路径</strong>，如： &quot;get:/Api/Blog/Top&quot;</li><li>QuotaExceededResponse：返回值设置</li><li>IpRateLimitPolicies：对单独的IP进行特定的设置</li></ol><p>运行测试，效果图：</p><figure><img src="`+a+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>若使用Redis，添加包AspNetCoreRateLimit.Redis，注册服务修改成：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>services.Configure&lt;IpRateLimitOptions&gt;(conf.GetSection(&quot;IpRateLimiting&quot;));
var redisOptions = ConfigurationOptions.Parse(SecretConfig.RedisConnectionString);
services.AddSingleton&lt;IConnectionMultiplexer&gt;(provider =&gt; ConnectionMultiplexer.Connect(redisOptions));
services.AddRedisRateLimiting();
services.AddSingleton&lt;IRateLimitConfiguration, RateLimitConfiguration&gt;();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17);function p(b,g){const t=u("ExternalLinkIcon");return s(),o("div",null,[c,v,e("p",null,[i("项目地址: "),e("a",m,[i("https://github.com/stefanprodan/AspNetCoreRateLimit"),l(t)])]),q])}const C=n(r,[["render",p],["__file","限流.html.vue"]]);export{C as default};
