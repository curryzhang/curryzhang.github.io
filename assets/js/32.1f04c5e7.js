(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{204:function(e,t,i){"use strict";i.r(t);var s=i(0),n=Object(s.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"content"},[i("h1",{attrs:{id:"_6、c-使用redis"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#_6、c-使用redis","aria-hidden":"true"}},[e._v("#")]),e._v(" 6、C#使用Redis")]),e._v(" "),i("p",[e._v("Redis官网提供了很多开源的C#客户端，如下图：\n"),i("img",{attrs:{src:"https://upload-images.jianshu.io/upload_images/1708638-486465ff9b70c438.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"image.png"}}),e._v("\n这边我们采用ServiceStack.Redis来举例说明")]),e._v(" "),i("p",[e._v("安装nuget包ServiceStack.Redis")]),e._v(" "),i("div",{staticClass:"language- extra-class"},[i("pre",{pre:!0,attrs:{class:"language-text"}},[i("code",[e._v('static RedisClient redisClient = new RedisClient("127.0.0.1", 6379);//redis服务IP和端口\n//如果设置了密码\n//static RedisClient redisClient = new RedisClient("127.0.0.1", 6379, "***");\n\nstatic void Main(string[] args)\n{\n    Console.WriteLine(redisClient.Get<string>("name"));\n    Console.ReadKey();\n}\n')])])])])}],!1,null,null,null);t.default=n.exports}}]);