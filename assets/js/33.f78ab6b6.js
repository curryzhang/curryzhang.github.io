(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{203:function(e,s,a){"use strict";a.r(s);var t=a(0),r=Object(t.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"_7、redis作为win服务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7、redis作为win服务","aria-hidden":"true"}},[e._v("#")]),e._v(" 7、Redis作为Win服务")]),e._v(" "),a("p",[e._v("先添加系统变量，在系统属性-环境变量-系统变量中找到Path，添加放redis的路径，我这边是放在D:\\Redis")]),e._v(" "),a("p",[e._v("然后打开cmd，cd到redis目录下，注册redis服务")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("redis-server.exe --service-install redis.windows.conf --loglevel verbose\n")])])]),a("p",[e._v("开启服务")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("redis-server --service-start \n")])])]),a("p",[e._v("到这边已经完成了。")]),e._v(" "),a("p",[e._v("关闭服务")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("redis-server --service-stop \n")])])]),a("p",[e._v("卸载服务")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("redis-server --service-uninstall \n//或者\nsc delete Redis\n")])])]),a("p",[e._v("服务重命名")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("redis-server --service-name server-name \n")])])])])}],!1,null,null,null);s.default=r.exports}}]);