(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{228:function(n,t,e){"use strict";e.r(t);var i=e(2),a=Object(i.a)({},function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("h1",{attrs:{id:"_1、c-键值对"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_1、c-键值对","aria-hidden":"true"}},[n._v("#")]),n._v(" 1、C#键值对")]),n._v(" "),e("p",[n._v("最经典的Dictionary<TKey, TValue>")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('Dictionary<int, string> dic = new Dictionary<int, string>();\n            \nRandom rd = new Random();\nfor (int i = 0; i < 20; i++)\n{\n    int num = rd.Next(1, 20);\n    if (!dic.ContainsKey(num))//键不允许重复\n        dic.Add(num, "james"+num);\n}\n//利用KeyValuePair输出\nforeach (KeyValuePair<int, string> kv in dic)\n{\n    Console.WriteLine(kv.Key + ":" + kv.Value);\n}\n')])])]),e("p",[n._v("Dictionary是继承了IEnumerable，Enumerable可以转成list或者数据，但同时还有两种用法：ToDictionary和ToLookup，接下来看代码")]),n._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('//先造一些数据\npublic static List<student> GetList()\n{\n    return new List<student>()\n    {\n        new student(){StuNo="0001",Grand=1,Sex="男"},\n        new student(){StuNo="0002",Grand=10,Sex="男"},\n        new student(){StuNo="0003",Grand=3,Sex="女"},\n    };\n}\npublic class student\n{\n    public string StuNo { get; set; } //学号\n    public int Grand { get; set; } //年级\n    public string Sex { get; set; }   //性别\n}\n\n//然后我们\nList<student> stulist = GetList();\nvar dic1 = stulist.ToDictionary(m => m.Grand);//依据年级转成字典\nforeach (KeyValuePair<int, student> item in dic1)\n{\n    Console.WriteLine(item.Key + ":" + item.Value.StuNo+"-"+item.Value.Sex);\n}\n')])])])])},[],!1,null,null,null);t.default=a.exports}}]);