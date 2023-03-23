import{_ as a,W as l,X as d,Y as e,Z as n,a0 as s,a1 as t,C as r}from"./framework-474f8844.js";const c={},v=t(`<h3 id="前端" tabindex="-1"><a class="header-anchor" href="#前端" aria-hidden="true">#</a> 前端</h3><p>Vue安装Signalr：npm install @microsoft/signalr</p><blockquote><p>安装后报错，一直解决不了，怀疑是版本太高，下载后安装了5.0.3版本的，错误消失。</p></blockquote><p>新建signalr.js</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import * as signalR from &#39;@microsoft/signalr&#39;

const connection = new signalR.HubConnectionBuilder()//服务器地址
    .withUrl(&#39;http://localhost:5038/chathub&#39;, {})
    .withAutomaticReconnect()
    .build()

export default {
    install: function (Vue) {
        Vue.prototype.signalr = connection
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>main.js中引入</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>import signalr from &#39;./utils/signalr&#39;
Vue.use(signalr)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>调用的页面</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>created() {
  this.signalr.off(&#39;ReceiveMsg&#39;);
  this.signalr.on(&#39;ReceiveMsg&#39;, res =&gt; {
    console.log(res);
  })
},
mounted() {
  this.signalr.start().then(() =&gt; {
    console.log(&#39;连接&#39;);
  })
},
 methods: {
    sendMsg() {
        this.signalr.invoke(&quot;SendMessage&quot;, this.form.msg , &quot;C77DE392-E003-428D-9FC1-FFEF6AE6BCF8&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="后端" tabindex="-1"><a class="header-anchor" href="#后端" aria-hidden="true">#</a> 后端</h3>`,10),u={href:"http://xn--Signalr-348l.net",target:"_blank",rel:"noopener noreferrer"},o={href:"http://xn--ASP-p18dohk08k.NET",target:"_blank",rel:"noopener noreferrer"},m=t(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>builder.Services.AddSignalR();

app.MapHub&lt;ForumHub&gt;(&quot;/chathub&quot;);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建ChatHub类，集成Hub</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class ChatHub : Hub
{
    public static List&lt;User&gt; users = new List&lt;User&gt;();
    protected readonly ILogger&lt;ChatHub&gt; _logger;
    public ChatHub(ILogger&lt;ChatHub&gt; logger)
    {
        _logger = logger;
    }

    public async Task SendMessage(string msg, string connectId)
    {
        await Clients.Client(connectId).SendAsync(&quot;ReceiveMsg&quot;, &quot;curry：&quot; + msg + Environment.NewLine);
    }

    /// &lt;summary&gt;
    /// 重写连接事件
    /// &lt;/summary&gt;
    /// &lt;returns&gt;&lt;/returns&gt;
    public override Task OnConnectedAsync()
    {
        return base.OnConnectedAsync();
    }

    /// &lt;summary&gt;
    /// 重写断开连接事件
    /// &lt;/summary&gt;
    /// &lt;returns&gt;&lt;/returns&gt;
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await base.OnDisconnectedAsync(exception);
    }

    public async Task UpdateData(object data)
    {
        string connectionId = string.Empty;
        //给所有人发消息
        await Clients.All.SendAsync(&quot;客户端接收方法&quot;, data);
        //分组（users）发消息
        await Clients.Group(&quot;users&quot;).SendAsync(&quot;客户端接收方法&quot;, data);
        //给调用方法的人发送消息
        await Clients.Caller.SendAsync(&quot;客户端接收方法&quot;, data);
        //给除了调用方以外的人发消息
        await Clients.Others.SendAsync(&quot;客户端接收方法&quot;, data);
        //给指定connectionId的人发送消息
        await Clients.User(connectionId).SendAsync(&quot;客户端接收方法&quot;, data);
        await Clients.Client(connectionId).SendAsync(&quot;客户端接收方法&quot;, data);
        //给多个指定connectionId的人发送消息
        string connectionId1 = string.Empty;
        string connectionId2 = string.Empty;
        await Clients.Clients(connectionId, connectionId1, connectionId2).SendAsync(&quot;客户端接收方法&quot;, data);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="加权" tabindex="-1"><a class="header-anchor" href="#加权" aria-hidden="true">#</a> 加权</h2><p>使用jwt授权时，ChatHub增加特性[Authorize]的同时，在Program.cs中对JWT增加OnMessageReceived事件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>options.Events = new JwtBearerEvents
{
    OnMessageReceived = (context) =&gt;
    {
        if (!context.HttpContext.Request.Path.HasValue)
        {
            return Task.CompletedTask;
        }
        //重点在于这里；判断是Signalr的路径
        var accessToken = context.HttpContext.Request.Query[&quot;access_token&quot;];
        var path = context.HttpContext.Request.Path;
        if (!(string.IsNullOrWhiteSpace(accessToken)) &amp;&amp; path.StartsWithSegments(&quot;/chathub&quot;))
        {
            context.Token = accessToken;
            return Task.CompletedTask;
        }
        return Task.CompletedTask;
    },

    OnChallenge = context =&gt;
    {
        context.HandleResponse();
        context.Response.Clear();
        context.Response.ContentType = &quot;application/json&quot;;
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        var res = &quot;{\\&quot;code\\&quot;:401,\\&quot;message\\&quot;:\\&quot;授权未通过\\&quot;}&quot;;
        context.Response.WriteAsync(res);
        return Task.CompletedTask;
    }
};
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同时前端需要修改url，加上Token</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>const connection = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect()
    .withUrl(&quot;http://localhost:5038/chathub&quot;, { accessTokenFactory: () =&gt; token })
    .build()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),b={href:"https://docs.microsoft.com/zh-cn/aspnet/core/signalr/authn-and-authz?view=aspnetcore-6.0",target:"_blank",rel:"noopener noreferrer"},g={href:"https://docs.microsoft.com/zh-cn/aspnet/core/signalr/configuration?view=aspnetcore-6.0&tabs=javascript",target:"_blank",rel:"noopener noreferrer"};function p(h,x){const i=r("ExternalLinkIcon");return l(),d("div",null,[v,e("p",null,[e("a",u,[n("Signalr在.net"),s(i)]),n(" core中已经包含在Microsoft.AspNetCore.App，"),e("a",o,[n("是一个ASP.NET"),s(i)]),n(" Core中间件。")]),m,e("p",null,[n("参考："),e("a",b,[n("https://docs.microsoft.com/zh-cn/aspnet/core/signalr/authn-and-authz?view=aspnetcore-6.0"),s(i)]),n(" 参考："),e("a",g,[n("https://docs.microsoft.com/zh-cn/aspnet/core/signalr/configuration?view=aspnetcore-6.0&tabs=javascript"),s(i)])])])}const C=a(c,[["render",p],["__file","signalr.html.vue"]]);export{C as default};
