import{_ as e,W as i,X as n,a1 as s}from"./framework-a4c02b8f.js";const r="/images/2023-02-16-10-01-11.png",l="/images/2023-02-16-10-07-38.png",a="/images/2023-02-16-10-09-16.png",d="/images/2023-02-16-10-09-58.png",t="/images/2023-02-16-10-11-37.png",v="/images/2023-02-16-10-13-34.png",c="/images/2023-02-16-10-14-09.png",u="/images/2023-02-16-10-14-41.png",m="/images/2023-02-16-10-15-05.png",o={},b=s(`<h2 id="grpc" tabindex="-1"><a class="header-anchor" href="#grpc" aria-hidden="true">#</a> GRPC</h2><p>gRPC 是一个由Google开源的，跨语言的，高性能的远程过程调用（RPC）框架。 gRPC使客户端和服务端应用程序可以透明地进行通信，并简化了连接系统的构建。它使用HTTP/2作为通信协议，使用 Protocol Buffers 作为序列化协议。</p><h4 id="grpc-的优势" tabindex="-1"><a class="header-anchor" href="#grpc-的优势" aria-hidden="true">#</a> gRPC 的优势</h4><p>gRPC 使用 HTTP/2 作为传输协议。 虽然与 HTTP 1.1 也能兼容，但 HTTP/2 具有许多高级功能：</p><ul><li>用于数据传输的二进制组帧协议 - 与 HTTP 1.1 不同，HTTP 1.1 是基于文本的。</li><li>对通过同一连接发送多个并行请求的多路复用支持 - HTTP 1.1 将处理限制为一次处理一个请求/响应消息。</li><li>双向全双工通信，用于同时发送客户端请求和服务器响应。</li><li>内置流式处理，支持对大型数据集进行异步流式处理的请求和响应。</li><li>减少网络使用率的标头压缩。</li></ul><p>gRPC 是轻量型且高性能的。 其处理速度可以比 JSON 序列化快 8 倍，消息小 60% 到 80%。 在WCF中，gRPC 的性能超过经过高度优化的 NetTCP 绑定的速度和效率。 与偏向于 Microsoft 堆栈的 NetTCP 不同，gRPC 是跨平台的。</p><h4 id="四种通信模式及其使用场景" tabindex="-1"><a class="header-anchor" href="#四种通信模式及其使用场景" aria-hidden="true">#</a> 四种通信模式及其使用场景</h4><table><thead><tr><th>服务类型</th><th>特点</th></tr></thead><tbody><tr><td>简单RPC</td><td>一般的rpc调用，传入一个请求对象，返回一个返回对象</td></tr><tr><td>服务端流式RPC</td><td>传入一个请求对象，服务端可以返回多个结果对象</td></tr><tr><td>客户端流式RPC</td><td>客户端传入多个请求对象，服务端返回一个结果对象</td></tr><tr><td>双向流式RPC</td><td>结合客户端流式RPC和服务端流式RPC，可以传入多个请求对象，返回多个结果对象</td></tr></tbody></table><h4 id="unary-prc" tabindex="-1"><a class="header-anchor" href="#unary-prc" aria-hidden="true">#</a> Unary PRC</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> rpc UnaryCall (ExampleRequest) returns (ExampleResponse);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>客户端发起一次请求，服务端响应一个数据，即标准RPC通信。 这种模式，一个每一次都是发起一个独立的tcp连接，走一次三次握手和四次挥手！</p><h4 id="server-streaming-rpc" tabindex="-1"><a class="header-anchor" href="#server-streaming-rpc" aria-hidden="true">#</a> Server streaming RPC</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rpc StreamingFromServer (ExampleRequest) returns (stream ExampleResponse);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>服务端流 RPC 下，客户端发出一个请求，但不会立即得到一个响应，而是在服务端与客户端之间建立一个单向的流，服务端可以随时向流中写入多个响应消息，最后主动关闭流，而客户端需要监听这个流，不断获取响应直到流关闭</p><p><strong>应用场景举例：</strong> 典型的例子是客户端向服务端发送一个股票代码，服务端就把该股票的实时数据源源不断的返回给客户端。</p><h4 id="client-streaming-rpc" tabindex="-1"><a class="header-anchor" href="#client-streaming-rpc" aria-hidden="true">#</a> Client streaming RPC</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rpc StreamingFromClient (stream ExampleRequest) returns (ExampleResponse);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>应用场景：</strong> 物联网终端向服务器报送数据。</p><h4 id="bi-directional-streaming-rpc" tabindex="-1"><a class="header-anchor" href="#bi-directional-streaming-rpc" aria-hidden="true">#</a> Bi-directional streaming RPC</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>rpc GetOrderNO(stream  OrderRequest) returns ( stream OrderReply);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>应用场景：</strong> 聊天应用。</p><h2 id="grpc示例" tabindex="-1"><a class="header-anchor" href="#grpc示例" aria-hidden="true">#</a> GRPC示例</h2><h4 id="新建grpc项目-grpcdemo-service" tabindex="-1"><a class="header-anchor" href="#新建grpc项目-grpcdemo-service" aria-hidden="true">#</a> 新建GRPC项目，GrpcDemo.Service</h4><figure><img src="`+r+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>创建完成后，看下项目中的代码</p><ol><li>配置文件appsettings.json多了Kestrel启用 HTTP/2 的配置，因为 gRPC 是基于HTTP/2来通信的</li></ol><figure><img src="'+l+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol start="2"><li>csproj中增加了包含Protobuf</li></ol><figure><img src="'+a+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>后面如果需要新增proto，需要手动添加，这边一次性改成通配符</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;Protobuf Include=&quot;Protos\\*.proto&quot; GrpcServices=&quot;Server&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>Program中将gRPC服务添加到了终结点路由中</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app.MapGrpcService&lt;GreeterService&gt;();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4"><li>查看PB协议文件greet.proto</li></ol><figure><img src="`+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol start="5"><li>服务类GreeterService，服务类集成的Greeter.GreeterBase</li></ol><figure><img src="'+t+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="创建grpc客户端" tabindex="-1"><a class="header-anchor" href="#创建grpc客户端" aria-hidden="true">#</a> 创建gRPC客户端</h4><p>添加包Google.Protobuf、Grpc.Net.Client、Grpc.Tools</p><p>项目文件中添加GrpcDemo.Service的proto文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;Protobuf Include=&quot;..\\GrpcDemo.Service\\Protos\\*.proto&quot; GrpcServices=&quot;Client&quot; 
Link=&quot;Protos\\%(RecursiveDir)%(Filename)%(Extension)&quot; /&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Program中调用服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>using Grpc.Core;
using Grpc.Net.Client;
using GrpcDemo.Service;

//创建grpc通道
var channel = GrpcChannel.ForAddress(&quot;http://localhost:5274&quot;);

//创建Greeter服务客户端
var greetClient = new Greeter.GreeterClient(channel);
HelloReply reply = greetClient.SayHello(new HelloRequest()
{
    Name = &quot;Curry&quot;
});
Console.WriteLine(reply.Message);
Console.ReadLine();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行程序，测试</p><figure><img src="`+v+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>Client发起了HTTP/2 POST请求，服务端返回了Hello Curry。</p><h2 id="新增proto文件" tabindex="-1"><a class="header-anchor" href="#新增proto文件" aria-hidden="true">#</a> 新增Proto文件</h2><p>新增PB协议文件</p><figure><img src="'+c+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>由于我们已经处理过项目文件，此处不需要过多处理，直接修改文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>syntax = &quot;proto3&quot;;
option csharp_namespace = &quot;GrpcDemo.Service&quot;;

//标识proto文件的命名空间
package order;

//定义服务
service Order {
  //发送
  rpc GetOrderInfo (OrderReq) returns (OrderResp);
}

message OrderReq{
	string OrderNo=1;
}

message OrderResp{
	string Result=1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成解决方案后，新增Service</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>using Grpc.Core;
using GrpcDemo.Service;

namespace GrpcDemo.Service.Services
{
    public class OrderService : Order.OrderBase
    {
        private readonly ILogger&lt;OrderService&gt; _logger;
        public OrderService(ILogger&lt;OrderService&gt; logger)
        {
            _logger = logger;
        }

        public override Task&lt;OrderResp&gt; GetOrderInfo(OrderReq request, ServerCallContext context)
        {
            Console.WriteLine($&quot;接收到参数了：{request.OrderNo}&quot;);
            return Task.FromResult(new OrderResp
            {
                Result = &quot;获取到的传入参数是： &quot; + request.OrderNo
            });
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>program中将服务增加到路由</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>app.MapGrpcService&lt;OrderService&gt;();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>客户端调用测试</p><figure><img src="`+u+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>调用完成，测试正常</p><figure><img src="'+m+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="服务流、客户流和双向流的使用" tabindex="-1"><a class="header-anchor" href="#服务流、客户流和双向流的使用" aria-hidden="true">#</a> 服务流、客户流和双向流的使用</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//定义服务
service Greeter {
  //一元
  rpc UnaryCall (ExampleRequest) returns (ExampleResponse);
  //服务流
  rpc StreamingFromServer (ExampleRequest) returns (stream ExampleResponse);
  //客户流
  rpc StreamingFromClient (stream ExampleRequest) returns (ExampleResponse);
  //双向流
  rpc GetOrderNO(stream  ExampleRequest) returns ( stream ExampleResponse);
}

message ExampleRequest {
    int32 pageIndex = 1;
    int32 pageSize = 2;
}

message ExampleResponse{
    string result=1;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体方法实现</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//服务流
public override async Task StreamingFromServer(ExampleRequest request, IServerStreamWriter&lt;ExampleResponse&gt; responseStream, ServerCallContext context)
{
    int i = 0;
    while (!context.CancellationToken.IsCancellationRequested)
    {
        i++;
        await responseStream.WriteAsync(new ExampleResponse()
        {
            Result = &quot;现在的数值是：&quot; + i
        });
        await Task.Delay(TimeSpan.FromSeconds(1), context.CancellationToken);
    }
}

//客户流
public override async Task&lt;ExampleResponse&gt; StreamingFromClient(IAsyncStreamReader&lt;ExampleRequest&gt; requestStream, ServerCallContext context)
{
    int result = 0;
    while (await requestStream.MoveNext())
    {
        result += requestStream.Current.PageSize * requestStream.Current.PageIndex;
    }
    return await Task.FromResult(new ExampleResponse() { Result = result.ToString() });
}

//双向流
public override async Task StreamingBothWays(IAsyncStreamReader&lt;ExampleRequest&gt; requestStream, IServerStreamWriter&lt;ExampleResponse&gt; responseStream, ServerCallContext context)
{
    while (!context.CancellationToken.IsCancellationRequested &amp;&amp; await requestStream.MoveNext())
    {
        int index = requestStream.Current.PageIndex;
        int size = requestStream.Current.PageSize;
        Console.WriteLine($&quot;传入参数，PageIndex：{index}，PageSize：{size}&quot;);
        if (!context.CancellationToken.IsCancellationRequested)
        {
            await responseStream.WriteAsync(new ExampleResponse()
            {
                Result = $&quot;index*size={index * size}&quot;
            });
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端调用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//服务流
async static Task StreamingFromServerTest()
{
    var channel = GrpcChannel.ForAddress(ServiceAddress);
    //创建Greeter服务客户端
    var greetClient = new Greeter.GreeterClient(channel);

    var result = greetClient.StreamingFromServer(new ExampleRequest()
    {
        PageIndex = 1,
        PageSize = 10
    });
    var cts = new CancellationTokenSource();

    var iter = result.ResponseStream; // 拿到响应流
    int num = 0;
    try
    {
        while (await iter.MoveNext(cts.Token)) // 迭代
        {
            num++;
            Console.WriteLine(iter.Current.Result);  // 将数据写入到文件流中
            if (num &gt;= 5)
            {
                cts.Cancel();//调用5次后自动取消
            }
        }
    }
    catch (RpcException ex) when (ex.StatusCode == StatusCode.Cancelled)
    {
        Console.WriteLine(&quot;Stream cancelled.&quot;);
    }

    //输出返回结果
    Console.WriteLine(&quot;OK&quot;);
}

//客户流
async static Task StreamingFromClientTest()
{
    //创建Grpc通道
    var channel = GrpcChannel.ForAddress(ServiceAddress);
    //创建Greeter客户端
    var client = new Greeter.GreeterClient(channel);
    //创建客户流对象
    var clientStream = client.StreamingFromClient();
    for (var i = 1; i &lt; 10; i++)
    {
        await clientStream.RequestStream.WriteAsync(new ExampleRequest() { PageIndex = i, PageSize = 10 });
    }
    await clientStream.RequestStream.CompleteAsync();
    var resut = await clientStream;
    Console.WriteLine($&quot;客户端流请求结果{resut.Result}&quot;);
}

//双向流
async static Task StreamingBothWaysTest()
{
    //创建Grpc通道
    var channel = GrpcChannel.ForAddress(ServiceAddress);
    //创建Greeter客户端
    var client = new Greeter.GreeterClient(channel);
    //创建双向流对象
    var GetOrderNO = client.StreamingBothWays();
    //CancellationTokenSource 管理是否关闭流
    //CancellationTokenSource.CancelAfter() 规定时间关闭流
    //CancellationTokenSource.Cancel() 立即关闭流
    var cts = new CancellationTokenSource();
    //响应事件
    var backTask = Task.Run(async () =&gt;
    {
        int current = 0;
        try
        {
            //从响应流获取数据(cts.Token: 是否关闭流)
            while (await GetOrderNO.ResponseStream.MoveNext(cts.Token))
            {
                current++;
                var back = GetOrderNO.ResponseStream.Current;
                Console.WriteLine($&quot;{back.Result},加载进度{((double)current / count) * 100}%&quot;);
                if (current &gt;= 5)
                {
                    cts.Cancel();
                }
            }
        }
        catch (RpcException ex) when (ex.StatusCode == StatusCode.Cancelled)
        {
            Console.WriteLine(&quot;Stream cancelled.&quot;);
        }
    });

    for (int i = 0; i &lt; count; i++)
    {
        await GetOrderNO.RequestStream.WriteAsync(new ExampleRequest()
        {
            PageIndex = i,
            PageSize = 10
        });
    }

    //等待发送完成
    await GetOrderNO.RequestStream.CompleteAsync();

    Console.WriteLine(&quot;等待加载...&quot;);

    //等待响应完成
    await backTask;

    Console.WriteLine(&quot;已全部加载完毕&quot;);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,65),p=[b];function g(x,h){return i(),n("div",null,p)}const S=e(o,[["render",g],["__file","gRPC使用.html.vue"]]);export{S as default};
