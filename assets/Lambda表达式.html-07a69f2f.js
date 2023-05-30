import{_ as d,W as t,X as a,Z as n,$ as e,a0 as s,a1 as r,C as l}from"./framework-a4c02b8f.js";const u={},o=r(`<p>MSDN定义:Lambda 表达式是一种可用于创建委托或表达式目录树类型的匿名函数。</p><h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3><p>1.lambda表达式是匿名函数，只不过长得不太像而已，可以看成是进化版。 2.lambda表达式是用来创建委托或者目录树的匿名函数</p><h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景：</h3><p>可以在需要委托值的任何地方（也就是在可以使用匿名方法的任何地方）使用这些表达式。 <img src="http://upload-images.jianshu.io/upload_images/1708638-f986a97987ae2940.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240" alt="Lambda表达式的演化.png" loading="lazy"></p><h4 id="我的理解" tabindex="-1"><a class="header-anchor" href="#我的理解" aria-hidden="true">#</a> 我的理解：</h4><p>其实Lambda表达式就是匿名方法。 其中使用Lambda表达式来创建委托实例，我们却没有指出创建的委托类型，其中编译器会帮助我们去推断委托类型，从而简化我们创建委托类型所需要的代码，从而更加简洁。 所以Lambda表达式可以总结为——它是在匿名方法的基础上，再进一步地简化了创建委托实例所需要的代码。 匿名方法可以简明的忽略参数，但Lambda表达式不具备这一特性。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Button btn=new Button();
Btn.Text=“click me”;
Btn.Click+=delegate{console.WriteLine(“LogPlain”);};//忽略了我们经常使用的参数delegate(object sender,EventArgs e){…}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lambda表达式使用演示" tabindex="-1"><a class="header-anchor" href="#lambda表达式使用演示" aria-hidden="true">#</a> Lambda表达式使用演示</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static void Main(string[] args)
{
    // Lambda表达式的演变过程
    // 下面是C# 1中创建委托实例的代码
    Func&lt;string, int&gt; delegatetest1 = new Func&lt;string, int&gt;(Callbackmethod);          
    //                                  ↓
    // C# 2中用匿名方法来创建委托实例，此时就不需要额外定义回调方法Callbackmethod
    Func&lt;string, int&gt; delegatetest2 = delegate(string text)
    {
         return text.Length;
    };
    //                                  ↓
    // C# 3中使用Lambda表达式来创建委托实例
    Func&lt;string, int&gt; delegatetest3 = (string text) =&gt; text.Length;
    //                                 ↓
    // 如果Lambda表达式只需一个参数，并且那个参数可以隐式指定类型时，
    // 此时可以把圆括号也省略,简化为：
   Func&lt;string, int&gt; delegatetest = text =&gt; text.Length;

    // 调用委托
    Console.WriteLine(&quot;使用Lambda表达式返回字符串的长度为： &quot; + delegatetest(&quot;learning hard&quot;));
    Console.Read();
}

/// &lt;summary&gt;
/// 回调方法
/// 如果使用了Lambda表达式和匿名函数，此方法就不需要额外定义
/// &lt;/summary&gt;
/// &lt;param name=&quot;text&quot;&gt;&lt;/param&gt;
/// &lt;returns&gt;&lt;/returns&gt;
private static int Callbackmethod(string text)
{
    return text.Length;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lambda结合Action和Func的使用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Action&lt;string&gt; action = (str) =&gt; Console.WriteLine(&quot;Task={0}, str={1}, Thread={2}&quot;, Task.CurrentId, str, Thread.CurrentThread.ManagedThreadId);

Func&lt;int, int&gt; negate =(n) =&gt;{
     Console.WriteLine(&quot;Task={0}, n={1}, Thread={2}&quot;, Task.CurrentId, n, Thread.CurrentThread.ManagedThreadId);
     return -n;
};

Task&lt;int&gt;.Factory.StartNew(() =&gt; negate(6))
                 .ContinueWith(f =&gt; action(&quot;x&quot;))
                 .Wait();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="lambda表达式的使用" tabindex="-1"><a class="header-anchor" href="#lambda表达式的使用" aria-hidden="true">#</a> Lambda表达式的使用</h4><p>主要的是在Linq表达式的使用，以及对扩展方法上的运用等 例如：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>List list=new List();
list.Add(2);
list.Add(3);
list.Where(x=&gt;x%2==0);
where方法其实就是一个扩展方法
 public static IEnumerable&lt;TSource&gt; Where&lt;TSource&gt;(this IEnumerable&lt;TSource&gt; source, Func&lt;TSource, bool&gt; predicate);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3><ol><li><p>匿名函数不等于匿名方法，匿名函数包含了匿名方法和lambda表达式这两种概念。 <code>匿名函数：{匿名方法，lambda表达式}</code></p></li><li><p>lambda作为表达式，可以被C#编译器转换为委托，也可以被编译器转换为表达式树，匿名方法只能转换为委托。 两者的共通点是都能被编译器转换成为委托，lambda表达式能完成几乎所有匿名方法能完成的事。</p></li></ol><h3 id="延伸" tabindex="-1"><a class="header-anchor" href="#延伸" aria-hidden="true">#</a> 延伸</h3><p>Linq查询操作符</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>string[] words = { &quot;zero&quot;,&quot;one&quot;, &quot;two&quot;, &quot;three&quot;, &quot;four&quot; };
int[] numbers = { 0, 1, 2, 3, 4 };
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>1.聚合</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>numbers.Sum();
numbers.Average();
numbers.Count();
numbers.LongCount(x =&gt; x % 2 == 0);
words.Min();
words.Max();
numbers.Aggregate((a, b) =&gt; (a + b));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.链接</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>numbers.Concat(new[] { 2, 3, 4, 5, 6 });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.转换</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>words.Cast&lt;string&gt;()  //遍历时遇到转换失败的地方，会抛出异常
words.OfType&lt;string&gt;()
numbers.ToArray();
numbers.ToList();
words.ToDictionary(w =&gt; w.Substring(0, 2));
numbers.Concat(new[] { 2, 3, 4, 5, 6 });
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4.元素操作符</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>words.ElementAt(2);
words.ElementAtOrDefault(10);
words.First();
words.First(w =&gt; w.Length == 3);
words.First(w =&gt; w.Length == 10); //异常：没有匹配的元素
words.FirstOrDefault (w =&gt; w.Length == 10); //null
words.Last(); //&quot;four“
words.Single(); //异常：不止一个元素
words.SingleOrDefault(); //异常：不止一个元素
words.Single(word =&gt; word.Length == 5); //“three“   返回唯一元素
words.Single(word =&gt; word.Length == 10); //异常：没有匹配的元素
words.SingleOrDefault(w =&gt; w.Length == 10); //null   返回唯一元素
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5.相等操作</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>words.SequenceEqual(new[]{“ZERO”,“ONE”,“TWO”,“THREE”,“FOUR”},StringComparer.OrdinalIgnoreCase);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>6.生成</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>numbers.DefaultIfEmpty(); //0, 1, 2, 3, 4
Enumerable.Range(0, 100);
Enumerable.Repeat(25, 2);//生成包含重复值的序列
Enumerable.Empty&lt;int&gt;();//生成任意类型的空序列
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>7.分组</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>words.GroupBy(word =&gt; word.Length);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>8.连接</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>words.Join(allStrings, name =&gt; name[0], color =&gt; allStrings[0],(name, color) =&gt; name + &quot; - &quot; + color);
words.GroupJoin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>9.分部</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>words.Take(2); //&quot;zero&quot;, &quot;one&quot;
words.Skip(2); //&quot;two&quot;,&quot;three&quot;, &quot;four&quot;
words.TakeWhile(word =&gt; word.Length &lt;= 4); //&quot;zero&quot;, &quot;one&quot;, &quot;two&quot;
words.SkipWhile(word =&gt; word.Length &lt;= 4); //&quot;three&quot;,&quot;four“
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>10.投影</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>words.Select(word =&gt; word.Length);// 4, 3, 3, 5, 4
words.Select((word, index) =&gt; index.ToString() + &quot;: &quot; + word); //&quot;0: zero&quot;, &quot;1: one&quot;, &quot;2: two&quot;,&quot;3: three&quot;, &quot;4: four&quot;
words.SelectMany(word =&gt; word.ToCharArray());//&#39;z&#39;, &#39;e&#39;, &#39;r&#39;, &#39;o&#39;, &#39;o&#39;, &#39;n&#39;, &#39;e&#39;, &#39;t&#39;, &#39;w&#39;, &#39;o&#39;, &#39;t&#39;,&#39;h&#39;, &#39;r&#39;, &#39;e&#39;, &#39;e&#39;, &#39;f&#39;, &#39;o&#39;, &#39;u&#39;, &#39;r&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>11.数量</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>words.All(word =&gt; word.Length &gt; 3); //false（&quot;one&quot;和&quot;two&quot;的确包含3个字母）
words.All(word =&gt; word.Length &gt; 2); //true
words.Any(); //true（序列不为空）
words.Any(word =&gt; word.Length == 6); //false（没有6个字母的单词）
words.Any(word =&gt; word.Length == 5); //true（&quot;three&quot;满足这个条件）
words.Contains(&quot;FOUR&quot;); //false
words.Contains(&quot;FOUR&quot;,StringComparer.OrdinalIgnoreCase); //true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>12.过滤</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> words.Where(word =&gt; word.Length &gt; 3); //&quot;zero&quot;, &quot;three&quot;, &quot;four“
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>13.基于集的操作符</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&quot;abbc&quot;.Distinct(); //&quot;a&quot;, &quot;b&quot;, &quot;c&quot;
&quot;abbc&quot;.Intersect(&quot;cd&quot;); //&quot;c&quot;
&quot;abbc&quot;.Union(&quot;cd&quot;);//&quot;a&quot;, &quot;b&quot;, &quot;c&quot;, &quot;d&quot;
&quot;abbc&quot;.Except(&quot;cd&quot;); //&quot;a&quot;, &quot;b&quot;
&quot;cd&quot;.Except(&quot;abc&quot;); //&quot;d“
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>14.排序</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>words.OrderBy(word =&gt; word);
words.Reverse();
words.OrderByDescending(word =&gt; word.Length);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,48),v={href:"https://pan.baidu.com/s/1pKTdPGn",target:"_blank",rel:"noopener noreferrer"};function c(m,b){const i=l("ExternalLinkIcon");return t(),a("div",null,[o,n("p",null,[e("有部分内容是摘抄的"),n("a",v,[e("深入浅出C#"),s(i)]),e(",附上PDF下载。")])])}const h=d(u,[["render",c],["__file","Lambda表达式.html.vue"]]);export{h as default};
