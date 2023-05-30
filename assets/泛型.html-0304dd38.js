import{_ as l,W as d,X as t,Z as n,$ as e,a0 as s,a1 as a,C as r}from"./framework-a4c02b8f.js";const c={},v=n("h3",{id:"泛型定义",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#泛型定义","aria-hidden":"true"},"#"),e(" 泛型定义")],-1),u={href:"http://xn--3dsp36ahp5a.NET",target:"_blank",rel:"noopener noreferrer"},o=a(`<p><strong>泛型的好处：</strong></p><ul><li>类型的安全性</li><li>代码的可重用性</li><li>提升效率（避免了不必要的装箱拆箱）。</li></ul><p>下面我分别来说明这三点。</p><ol><li>泛型会约束变量的类型。比如ArryList可以添加任意类型的值，而<code>List&lt;int&gt;</code>只能添加int类型的值</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ArrayList list = new ArrayList();
list.Add(&quot;hello&quot;);
list.Add(1111);

 List&lt;int&gt; list = new List&lt;int&gt;();
list.Add(11);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>定义了一个泛型类Generic来提高代码可重用性，在指定的时候是泛指类型，在使用的时候就需要特定类型。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static void Main(string[] args)
{
  Generic&lt;string&gt; gs1 = new Generic&lt;string&gt;();
  gs1.Name = &quot;hello world&quot;;
  Console.WriteLine(gs1.Name);

  Generic&lt;int&gt; gs2 = new Generic&lt;int&gt;();
  gs2.Name = 111;
  Console.WriteLine(gs2.Name);

  Generic&lt;Task&gt; gsTask = new Generic&lt;Task&gt;();
  gsTask.Name = Task.Run(() =&gt; {
    Console.WriteLine(&quot;这是一个Task&quot;);
  });
}

public class Generic&lt;T&gt;
{
  public T Name=default(T);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>泛型会固定类型，在使用的时候就知道是什么类型了，避免了不必要的类型转换。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>object a = 18;
int b = (int)a;
//泛型
int c = GetValue&lt;int&gt;(19);
string b = GetValue&lt;string&gt;(&quot;hello&quot;);
 public static T GetValue&lt;T&gt;(T a)
{
  return a;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="泛型约束" tabindex="-1"><a class="header-anchor" href="#泛型约束" aria-hidden="true">#</a> 泛型约束</h3><p>话不多说，先看代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static void Main(string[] args)
{
    Generic&lt;Fanxing&gt; g = newGeneric&lt;Fanxing&gt;();
    Fanxing fx = new Fanxing();
    fx.Name = &quot;Jack&quot;;
    g.Name = fx;
    Console.WriteLine(g.Name.Name);
    
    Generic&lt;Base&gt; gsBase = newGeneric&lt;Base&gt;();
    Base b = new Base();
    b.Name = &quot;Curry&quot;;
    gsBase.Name = b;
    Console.WriteLine(gsBase.Name.Name);
    
    Console.ReadKey();
}

public class Generic&lt;T&gt; where T :Base
{
    public T Name=default(T);
}
public class Base
{
    public string Name { get; set; }
}
public class Fanxing:Base
{
    public new string Name { get; set; }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>泛型默认会有一个约束，当我们不显示的声明时，这个约束不存在。但当我们显示的声明的时候，这个约束就会执行。</p><p>从代码中可以看出where T : Base就是这个特别的约束。这个约束限制了泛型的类型，要求我们Generic类的指定类型T必须是Base或者继承Base类的类型。</p><table><thead><tr><th>约束</th><th>说明</th></tr></thead><tbody><tr><td>T：struct</td><td>类型参数必须是值类型。可以指定除 Nullable 以外的任何值类型。</td></tr><tr><td>T：class</td><td>类型参数必须是引用类型，包括任何类、接口、委托或数组类型。</td></tr><tr><td>T：new()</td><td>类型参数必须具有无参数的公共构造函数。当与其他约束一起使用时，new() 约束必须最后指定。</td></tr><tr><td>T：&lt;基类名&gt;</td><td>类型参数必须是指定的基类或派生自指定的基类。</td></tr><tr><td>T：&lt;接口名称&gt;</td><td>类型参数必须是指定的接口或实现指定的接口。可以指定多个接口约束。约束接口也可以是泛型的。</td></tr><tr><td>T：U</td><td>为 T 提供的类型参数必须是为 U 提供的参数或派生自为 U 提供的参数。这称为裸类型约束。</td></tr></tbody></table><h3 id="泛型函数" tabindex="-1"><a class="header-anchor" href="#泛型函数" aria-hidden="true">#</a> 泛型函数</h3><p>泛型不仅能作用在类上，也可单独用在方法上，它可以根据方法参数的类型自动适应各种参数，这样的方法叫泛型方法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>static void Main(string[] args)
{
    Person p = new Person();
    p.GetInfo&lt;int&gt;(11);
    p.GetInfo&lt;string&gt;(&quot;11&quot;);
    Console.ReadKey();
}

public class Person
{
    public void GetInfo&lt;T&gt;(T obj)
    {
        if (obj.GetType()== typeof(int))
        {
            Console.WriteLine(&quot;这是一个int类型:&quot;+ obj.GetType());
        }else if (obj.GetType() == typeof(string))
        {
            Console.WriteLine(&quot;这是一个string类型&quot;);
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="泛型委托action和func" tabindex="-1"><a class="header-anchor" href="#泛型委托action和func" aria-hidden="true">#</a> 泛型委托Action和Func</h3><ol><li>Action是无返回值的泛型委托,Action至少0个参数，至多16个参数，无返回值。</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Action&lt;string, int&gt; action = (a, b) =&gt; Console.WriteLine(a+b); 
action(&quot;hello&quot;, 18);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>Func是有返回值的泛型委托，Func至少0个参数，至多16个参数，根据返回值泛型返回。必须有返回值，不可void</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Func&lt;int, int, int&gt; add= (x, y) =&gt; x + y;
int result = add(1, 2);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,23),b={href:"https://www.cnblogs.com/kiba/p/9321530.html",target:"_blank",rel:"noopener noreferrer"};function m(g,p){const i=r("ExternalLinkIcon");return d(),t("div",null,[v,n("p",null,[e("泛型就是泛指的类型。"),n("a",u,[e("这是在.NET"),s(i)]),e(" Framework 2.0出现的语法。")]),o,n("p",null,[e("参考："),n("a",b,[e("C#语法——泛型的多种应用"),s(i)])])])}const x=l(c,[["render",m],["__file","泛型.html.vue"]]);export{x as default};
