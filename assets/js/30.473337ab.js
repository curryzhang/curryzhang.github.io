(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{174:function(e,s,a){"use strict";a.r(s);var t=a(0),r=Object(t.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"_4、redis安全"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、redis安全","aria-hidden":"true"}},[e._v("#")]),e._v(" 4、Redis安全")]),e._v(" "),a("p",[e._v("Redis设置密码")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('redis 127.0.0.1:6379> config set requirepass "zcd@jing"\nOK\n')])])]),a("p",[e._v("设置密码后，需要验证成功才能操作")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('redis 127.0.0.1:6379> auth "zcd@jing"\nOK\n')])])]),a("p",[e._v("Redis查看密码")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('redis 127.0.0.1:6379> config get requirepass\n1) "requirepass"\n2) "zcd@jing"\n')])])]),a("p",[e._v("查看服务是否运行")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("redis 127.0.0.1:6379> ping\nPONG\n")])])]),a("p",[e._v("关闭连接")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("redis 127.0.0.1:6379> quit\n")])])])])}],!1,null,null,null);r.options.__file="Redis安全.md";s.default=r.exports}}]);