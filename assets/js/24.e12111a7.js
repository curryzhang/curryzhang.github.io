(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{231:function(e,t,n){"use strict";n.r(t);var a=n(2),s=Object(a.a)({},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"webapi-1-—cors跨域"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#webapi-1-—cors跨域","aria-hidden":"true"}},[e._v("#")]),e._v(" WebApi(1)—CORS跨域")]),e._v(" "),n("p",[e._v("添加nuget包：microsoft.aspnet.webapi.cors\n在WebApiConfig.cs文件中配置跨越")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('using System.Web.Http.Cors;\n\nnamespace MiLan.FinanceAPI\n{\n    public static class WebApiConfig\n    {\n        public static void Register(HttpConfiguration config)\n        {\n            //跨域配置\n            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));\n\n            // Web API 路由\n            config.MapHttpAttributeRoutes();\n\n            config.Routes.MapHttpRoute(\n                name: "DefaultApi",\n                routeTemplate: "api/{controller}/{id}",\n                defaults: new { id = RouteParameter.Optional }\n            );\n        }\n    }\n}\n')])])]),n("p",[e._v("这部分代码会导致这个接口称为一个公告接口，任何人都可以访问，这个时候我们需要配置一下")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('config.EnableCors(new EnableCorsAttribute("*", "*", "*"));\n')])])]),n("p",[e._v("在Web.config文件中添加配置文件信息")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('<appSettings><add key="cors:milanHeaders" value="*"/>\n  <add key="cors:milanMethods" value="*"/>\n  <add key="cors:milanOrigins" value="http://localhost:8081"/>\n</appSettings>\n')])])]),n("p",[e._v("用逗号隔开来允许多个域名请求")]),e._v(" "),n("p",[e._v("在WebApiConfig.cs文件中配置跨越")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('//跨域配置\n//config.EnableCors(new EnableCorsAttribute("*", "*", "*"));\nvar headers = ConfigurationManager.AppSettings["cors:milanHeaders"];\nvar orgins = ConfigurationManager.AppSettings["cors:milanOrigins"];\nvar methods = ConfigurationManager.AppSettings["cors:milanMethods"];\nvar supportCors = new EnableCorsAttribute(orgins, headers, methods)\n{\n    SupportsCredentials = true\n};\nconfig.EnableCors(supportCors);\n')])])]),n("p",[e._v("如果只想对某一个api进行跨域，可以直接在API的类上面使用特性标注即可。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('[EnableCors(origins: "http://localhost:8081/", headers: "*", methods: "GET,POST,PUT,DELETE")]\npublic class BalanceSheetController : ApiController\n{\n    [HttpPost]\n    public BasicResponse GetBalanceSheet()\n    {\n        return AutofacExt.GetFromFac<BalanceSheetManageApp>().GetAllBalanceSheet();\n    }\n}\n')])])]),n("p",[e._v("这部分参考了"),n("a",{attrs:{href:"http://www.cnblogs.com/landeanfen/p/5177176.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("懒得安分"),n("OutboundLink")],1),e._v("的文章，感谢！")])])},[],!1,null,null,null);t.default=s.exports}}]);