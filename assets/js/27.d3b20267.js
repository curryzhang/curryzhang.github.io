(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{232:function(t,a,e){"use strict";e.r(a);var i=e(2),s=Object(i.a)({},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"webapi-2-—帮助文档"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#webapi-2-—帮助文档","aria-hidden":"true"}},[t._v("#")]),t._v(" WebApi(2)—帮助文档")]),t._v(" "),e("p",[t._v("微软自带的Microsoft Help Page帮助文档这边就不做介绍了，这边要介绍的是Swagger")]),t._v(" "),e("ol",[e("li",[e("p",[t._v("在Nuget添加Swashbuckle组件。\n"),e("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/1708638-1470e05a23150f9f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:""}})])]),t._v(" "),e("li",[e("p",[t._v("修改配置文件生成位置，指定输出xml\n"),e("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/1708638-d16808f5132f8614.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:""}})])]),t._v(" "),e("li",[e("p",[t._v("修改配置文件\n修改SwaggerConfig.cs文件，将c.IncludeXmlComments(GetXmlCommentsPath());代码注释去掉。并在下方实现方法GetXmlCommentsPath()")])])]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v('private static string GetXmlCommentsPath()\n{\n  return Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"App_Data\\Api.xml");\n}\n')])])]),e("p",[t._v("至此，大功告成。\n"),e("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/1708638-254d977546e70167.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:""}}),t._v("\n当然，接口的测试的话用Postman或者fiddler更方便些。")])])},[],!1,null,null,null);a.default=s.exports}}]);