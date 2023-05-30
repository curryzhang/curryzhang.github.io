import{_ as e,W as i,X as n,a1 as l}from"./framework-a4c02b8f.js";const s={},d=l(`<h3 id="注意点" tabindex="-1"><a class="header-anchor" href="#注意点" aria-hidden="true">#</a> 注意点：</h3><ol><li>必须在一个非嵌套的、非泛型的静态类中（所以必须是一个静态方法）</li><li>至少有一个参数</li><li>第一个参数必须附加this关键字作为前缀</li><li>第一个参数不能有其他任何修饰符（比如out、ref）</li><li>第一个参数的类型不能是指针类型</li></ol><h3 id="简单示例" tabindex="-1"><a class="header-anchor" href="#简单示例" aria-hidden="true">#</a> 简单示例</h3><p>扩展方法最大的用途就是为LINQ服务，Enumerable和Queryable都是在System.Linq命名空间中，Enumerable的大多数扩展的是<code>IEnumerable&lt;T&gt;</code>，Queryable的大多数扩展的是<code>IQueryable&lt;T&gt;</code>。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class Person
{
    public string Name { set; get; }
    public int Age { set; get; }
}

public static class Extension
{
    //Person的扩展方法，根据年龄判断是否是成年人
    public static bool IsChild(this Person oPerson)
    {
        if (oPerson.Age &gt;= 18)
            return false;
        else
            return true;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用案例" tabindex="-1"><a class="header-anchor" href="#使用案例" aria-hidden="true">#</a> 使用案例</h3><p>附上经典的linq中Distinct去重，我们无法按照具体需求或某个字段去重，这时候扩张方法就派上用场了</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public static class DistinctExtensions  
{  
   public static IEnumerable&lt;T&gt; Distinct&lt;T, V&gt;(this IEnumerable&lt;T&gt; source, Func&lt;T, V&gt; keySelector)  
   {  
        return source.Distinct(new CommonEqualityComparer&lt;T, V&gt;(keySelector));  
    }  
} 

public class CommonEqualityComparer&lt;T, V&gt; : IEqualityComparer&lt;T&gt;  
{  
    private Func&lt;T, V&gt; keySelector;  
  
    public CommonEqualityComparer(Func&lt;T, V&gt; keySelector)  
    {  
        this.keySelector = keySelector;  
    }  
  
    public bool Equals(T x, T y)  
    {  
        return EqualityComparer&lt;V&gt;.Default.Equals(keySelector(x), keySelector(y));  
    }  
  
    public int GetHashCode(T obj)  
    {  
        return EqualityComparer&lt;V&gt;.Default.GetHashCode(keySelector(obj));  
    }  
}  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Distinct去重使用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Product[] products =   
{  
    new Product { Name = &quot;Smallapple&quot;, Code = 9 },   
    new Product { Name = &quot;orange&quot;, Code = 4 },   
    new Product { Name = &quot;Bigapple&quot;, Code = 9 },  
    new Product { Name = &quot;lemon&quot;, Code = 12 }  
};  
  
var p1 = products.Distinct(p =&gt; p.Code); //按照code来去重 
foreach (Product pro in p1)  
    Console.WriteLine(pro.Name + &quot;,&quot; + pro.Code); 
Console.ReadKey();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),a=[d];function r(t,c){return i(),n("div",null,a)}const v=e(s,[["render",r],["__file","扩展方法.html.vue"]]);export{v as default};
