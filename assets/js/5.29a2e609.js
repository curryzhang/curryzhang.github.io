(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{188:function(t,e,a){"use strict";a.r(e);var n=a(0),r=Object(n.a)({},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[t._m(0),t._v(" "),a("p",[t._v("MSDN定义:Lambda 表达式是一种可用于创建委托或表达式目录树类型的匿名函数。")]),t._v(" "),t._m(1),t._v(" "),a("p",[t._v("1.lambda表达式是匿名函数，只不过长得不太像而已，可以看成是进化版。\n2.lambda表达式是用来创建委托或者目录树的匿名函数")]),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),a("p",[t._v("其实Lambda表达式就是匿名方法。\n其中使用Lambda表达式来创建委托实例，我们却没有指出创建的委托类型，其中编译器会帮助我们去推断委托类型，从而简化我们创建委托类型所需要的代码，从而更加简洁。\n所以Lambda表达式可以总结为——它是在匿名方法的基础上，再进一步地简化了创建委托实例所需要的代码。\n匿名方法可以简明的忽略参数，但Lambda表达式不具备这一特性。")]),t._v(" "),t._m(5),t._m(6),t._v(" "),t._m(7),a("p",[t._v("Lambda结合Action和Func的使用")]),t._v(" "),t._m(8),t._m(9),t._v(" "),a("p",[t._v("主要的是在Linq表达式的使用，以及对扩展方法上的运用等\n例如：")]),t._v(" "),t._m(10),a("p",[t._v("总结")]),t._v(" "),t._m(11),t._v(" "),a("p",[t._v("2.lambda作为表达式，可以被C#编译器转换为委托，也可以被编译器转换为表达式树，匿名方法只能转换为委托。\n两者的共通点是都能被编译器转换成为委托，lambda表达式能完成几乎所有匿名方法能完成的事。")]),t._v(" "),t._m(12),t._v(" "),a("p",[t._v("Linq查询操作符")]),t._v(" "),t._m(13),a("p",[t._v("1.聚合")]),t._v(" "),t._m(14),a("p",[t._v("2.链接")]),t._v(" "),t._m(15),a("p",[t._v("3.转换")]),t._v(" "),t._m(16),a("p",[t._v("4.元素操作符")]),t._v(" "),t._m(17),a("p",[t._v("5.相等操作")]),t._v(" "),t._m(18),a("p",[t._v("6.生成")]),t._v(" "),t._m(19),a("p",[t._v("7.分组")]),t._v(" "),t._m(20),a("p",[t._v("8.连接")]),t._v(" "),t._m(21),a("p",[t._v("9.分部")]),t._v(" "),t._m(22),a("p",[t._v("10.投影")]),t._v(" "),t._m(23),a("p",[t._v("11.数量")]),t._v(" "),t._m(24),a("p",[t._v("12.过滤")]),t._v(" "),t._m(25),a("p",[t._v("13.基于集的操作符")]),t._v(" "),t._m(26),a("p",[t._v("14.排序")]),t._v(" "),t._m(27),a("p",[t._v("有部分内容是摘抄的"),a("a",{attrs:{href:"https://pan.baidu.com/s/1pKTdPGn",target:"_blank",rel:"noopener noreferrer"}},[t._v("深入浅出C#"),a("OutboundLink")],1),t._v(",附上PDF下载。")])])},[function(){var t=this.$createElement,e=this._self._c||t;return e("h1",{attrs:{id:"c-重温-lambda表达式"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#c-重温-lambda表达式","aria-hidden":"true"}},[this._v("#")]),this._v(" C#重温-Lambda表达式")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#介绍","aria-hidden":"true"}},[this._v("#")]),this._v(" 介绍")])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"使用场景："}},[e("a",{staticClass:"header-anchor",attrs:{href:"#使用场景：","aria-hidden":"true"}},[this._v("#")]),this._v(" 使用场景：")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("可以在需要委托值的任何地方（也就是在可以使用匿名方法的任何地方）使用这些表达式。\n"),e("img",{attrs:{src:"http://upload-images.jianshu.io/upload_images/1708638-f986a97987ae2940.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"Lambda表达式的演化.png"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"我的理解："}},[e("a",{staticClass:"header-anchor",attrs:{href:"#我的理解：","aria-hidden":"true"}},[this._v("#")]),this._v(" 我的理解：")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("Button btn=new Button();\nBtn.Text=“click me”;\nBtn.Click+=delegate{console.WriteLine(“LogPlain”);};//忽略了我们经常使用的参数delegate(object sender,EventArgs e){…}\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"lambda表达式使用演示"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#lambda表达式使用演示","aria-hidden":"true"}},[this._v("#")]),this._v(" Lambda表达式使用演示")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v('static void Main(string[] args)\n{\n    // Lambda表达式的演变过程\n    // 下面是C# 1中创建委托实例的代码\n    Func<string, int> delegatetest1 = new Func<string, int>(Callbackmethod);          \n    //                                  ↓\n    // C# 2中用匿名方法来创建委托实例，此时就不需要额外定义回调方法Callbackmethod\n    Func<string, int> delegatetest2 = delegate(string text)\n    {\n         return text.Length;\n    };\n    //                                  ↓\n    // C# 3中使用Lambda表达式来创建委托实例\n    Func<string, int> delegatetest3 = (string text) => text.Length;\n    //                                 ↓\n    // 如果Lambda表达式只需一个参数，并且那个参数可以隐式指定类型时，\n    // 此时可以把圆括号也省略,简化为：\n   Func<string, int> delegatetest = text => text.Length;\n\n    // 调用委托\n    Console.WriteLine("使用Lambda表达式返回字符串的长度为： " + delegatetest("learning hard"));\n    Console.Read();\n}\n\n/// <summary>\n/// 回调方法\n/// 如果使用了Lambda表达式和匿名函数，此方法就不需要额外定义\n/// </summary>\n/// <param name="text"></param>\n/// <returns></returns>\nprivate static int Callbackmethod(string text)\n{\n    return text.Length;\n}\n')])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v('Action<string> action = (str) => Console.WriteLine("Task={0}, str={1}, Thread={2}", Task.CurrentId, str, Thread.CurrentThread.ManagedThreadId);\n\nFunc<int, int> negate =(n) =>{\n     Console.WriteLine("Task={0}, n={1}, Thread={2}", Task.CurrentId, n, Thread.CurrentThread.ManagedThreadId);\n     return -n;\n};\n\nTask<int>.Factory.StartNew(() => negate(6))\n                 .ContinueWith(f => action("x"))\n                 .Wait();\n')])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h4",{attrs:{id:"lambda表达式的使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#lambda表达式的使用","aria-hidden":"true"}},[this._v("#")]),this._v(" Lambda表达式的使用")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("List list=new List();\nlist.Add(2);\nlist.Add(3);\nlist.Where(x=>x%2==0);\nwhere方法其实就是一个扩展方法\n public static IEnumerable<TSource> Where<TSource>(this IEnumerable<TSource> source, Func<TSource, bool> predicate);\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ol",[e("li",[this._v("匿名函数不等于匿名方法，匿名函数包含了匿名方法和lambda表达式这两种概念。\n匿名函数：{匿名方法，lambda表达式}")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",{attrs:{id:"延伸"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#延伸","aria-hidden":"true"}},[this._v("#")]),this._v(" 延伸")])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v('string[] words = { "zero","one", "two", "three", "four" };\nint[] numbers = { 0, 1, 2, 3, 4 };\n')])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("numbers.Sum();\nnumbers.Average();\nnumbers.Count();\nnumbers.LongCount(x => x % 2 == 0);\nwords.Min();\nwords.Max();\nnumbers.Aggregate((a, b) => (a + b));\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("numbers.Concat(new[] { 2, 3, 4, 5, 6 });\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("words.Cast<string>()  //遍历时遇到转换失败的地方，会抛出异常\nwords.OfType<string>()\nnumbers.ToArray();\nnumbers.ToList();\nwords.ToDictionary(w => w.Substring(0, 2));\nnumbers.Concat(new[] { 2, 3, 4, 5, 6 });\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v('words.ElementAt(2);\nwords.ElementAtOrDefault(10);\nwords.First();\nwords.First(w => w.Length == 3);\nwords.First(w => w.Length == 10); //异常：没有匹配的元素\nwords.FirstOrDefault (w => w.Length == 10); //null\nwords.Last(); //"four“\nwords.Single(); //异常：不止一个元素\nwords.SingleOrDefault(); //异常：不止一个元素\nwords.Single(word => word.Length == 5); //“three“   返回唯一元素\nwords.Single(word => word.Length == 10); //异常：没有匹配的元素\nwords.SingleOrDefault(w => w.Length == 10); //null   返回唯一元素\n')])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("words.SequenceEqual(new[]{“ZERO”,“ONE”,“TWO”,“THREE”,“FOUR”},StringComparer.OrdinalIgnoreCase);\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("numbers.DefaultIfEmpty(); //0, 1, 2, 3, 4\nEnumerable.Range(0, 100);\nEnumerable.Repeat(25, 2);//生成包含重复值的序列\nEnumerable.Empty<int>();//生成任意类型的空序列\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("words.GroupBy(word => word.Length);\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v('words.Join(allStrings, name => name[0], color => allStrings[0],(name, color) => name + " - " + color);\nwords.GroupJoin\n')])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v('words.Take(2); //"zero", "one"\nwords.Skip(2); //"two","three", "four"\nwords.TakeWhile(word => word.Length <= 4); //"zero", "one", "two"\nwords.SkipWhile(word => word.Length <= 4); //"three","four“\n')])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("words.Select(word => word.Length);// 4, 3, 3, 5, 4\nwords.Select((word, index) => index.ToString() + \": \" + word); //\"0: zero\", \"1: one\", \"2: two\",\"3: three\", \"4: four\"\nwords.SelectMany(word => word.ToCharArray());//'z', 'e', 'r', 'o', 'o', 'n', 'e', 't', 'w', 'o', 't','h', 'r', 'e', 'e', 'f', 'o', 'u', 'r'\n")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v('words.All(word => word.Length > 3); //false（"one"和"two"的确包含3个字母）\nwords.All(word => word.Length > 2); //true\nwords.Any(); //true（序列不为空）\nwords.Any(word => word.Length == 6); //false（没有6个字母的单词）\nwords.Any(word => word.Length == 5); //true（"three"满足这个条件）\nwords.Contains("FOUR"); //false\nwords.Contains("FOUR",StringComparer.OrdinalIgnoreCase); //true\n')])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v(' words.Where(word => word.Length > 3); //"zero", "three", "four“\n')])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v('"abbc".Distinct(); //"a", "b", "c"\n"abbc".Intersect("cd"); //"c"\n"abbc".Union("cd");//"a", "b", "c", "d"\n"abbc".Except("cd"); //"a", "b"\n"cd".Except("abc"); //"d“\n')])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("words.OrderBy(word => word);\nwords.Reverse();\nwords.OrderByDescending(word => word.Length);\n")])])])}],!1,null,null,null);r.options.__file="Lambda表达式.md";e.default=r.exports}}]);