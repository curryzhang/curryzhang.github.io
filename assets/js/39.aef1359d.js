(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{200:function(t,n,e){"use strict";e.r(n);var r=e(0),a=Object(r.a)({},function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"content"},[t._m(0),t._v(" "),t._m(1),t._v(" "),e("ol",[e("li",[t._v("后端Markdig")]),t._v(" "),e("li",[t._v("使用tui-editor，参考"),e("a",{attrs:{href:"https://panjiachen.github.io/vue-element-admin-site/zh/feature/component/markdown-editor.html#props",target:"_blank",rel:"noopener noreferrer"}},[t._v("vue-element-admin"),e("OutboundLink")],1)]),t._v(" "),e("li",[t._v("使用showdown，可以使用js或者yarn add showdown")])]),t._v(" "),t._m(2),t._v(" "),t._m(3),e("p",[t._v("但是这边不支持table，解决方案"),e("a",{attrs:{href:"https://github.com/showdownjs/table-extension",target:"_blank",rel:"noopener noreferrer"}},[t._v("安装showdown-table"),e("OutboundLink")],1)])])},[function(){var t=this.$createElement,n=this._self._c||t;return n("h1",{attrs:{id:"让你的网站支持markdown"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#让你的网站支持markdown","aria-hidden":"true"}},[this._v("#")]),this._v(" 让你的网站支持MarkDown")])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[n("strong",[this._v("使用方法")])])},function(){var t=this.$createElement,n=this._self._c||t;return n("p",[n("strong",[this._v("具体使用")]),this._v("：")])},function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[this._v('<textarea v-model="content"></textarea>\n<div v-html="html"/>\n\nimport showdown from \'showdown\'\nexport default {\n    data() {\n        return {\n            content:"",\n            html:\'\',\n        }\n    },\n    components: {\n        showdown\n    },\n    methods:{\n        converntHtml(){\n            var converter =newshowdown.Converter();\n            this.html=converter.makeHtml(this.content);  \n        }\n    }\n}\n<\/script>\n')])])])}],!1,null,null,null);n.default=a.exports}}]);