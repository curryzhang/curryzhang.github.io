(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{164:function(a,n,e){"use strict";e.r(n);var i=e(0),t=Object(i.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var a=this,n=a.$createElement,e=a._self._c||n;return e("div",{staticClass:"content"},[e("h1",{attrs:{id:"对象"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#对象","aria-hidden":"true"}},[a._v("#")]),a._v(" 对象")]),a._v(" "),e("p",[a._v("JavaScript的对象是一种无序的集合数据类型，它由若干键值对组成。")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("var xiaoming = {\n    name: '小明',\n    birth: 1990,\n    school: 'No.1 Middle School'\n};\n")])])]),e("p",[a._v("==注意，最后一个键值对不需要在末尾加,，如果加了，有的浏览器（如低版本的IE）将报错。==")]),a._v(" "),e("p",[a._v("获取属性的值：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("xiaoming.name; // '小明'\nxiaoming.birth; // 1990\nxiaoming['name']; // '小明'\nxiaoming['birth']; // 1990\n")])])]),e("p",[a._v("如果访问一个不存在的属性，返回undefined：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("xiaoming.age; // undefined\n")])])]),e("p",[a._v("由于JavaScript的对象是动态类型，你可以自由地给一个对象添加或删除属性：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("var xiaoming = {\n    name: '小明'\n};\n\nxiaoming.age; // undefined\nxiaoming.age = 18; // 新增一个age属性\nxiaoming.age; // 18\ndelete xiaoming.age; // 删除age属性\nxiaoming.age; // undefined\n\ndelete xiaoming.school; // 删除一个不存在的school属性也不会报错\n")])])]),e("p",[a._v("如果我们要检测xiaoming是否拥有某一属性，可以用in操作符：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("var xiaoming = {\n    name: '小明',\n    birth: 1990\n};\n'name' in xiaoming; // true\n'age' in xiaoming; // false\n")])])]),e("p",[a._v("不过要小心，如果in判断一个属性存在，这个属性不一定是xiaoming的，它可能是xiaoming继承得到的：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("'toString' in xiaoming; // true\n")])])]),e("p",[a._v("要判断一个属性是否是xiaoming自身拥有的，而不是继承得到的，可以用hasOwnProperty()方法：")]),a._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[a._v("var xiaoming = {\n    name: '小明'\n};\nxiaoming.hasOwnProperty('name'); // true\nxiaoming.hasOwnProperty('toString'); // false\n")])])])])}],!1,null,null,null);t.options.__file="对象.md";n.default=t.exports}}]);