import{v as p,u as d,_ as v}from"./app-b90de3d4.js";import{c,r as n,y as f,h as m,o as y,j as a}from"./framework-a4c02b8f.js";const g=e=>d({},{showCompileOutput:!1,clearConsole:!1,ssr:!1},JSON.parse(decodeURIComponent(e)));var R=c({name:"VuePlayground",props:{title:{type:String,default:""},files:{type:String,required:!0},settings:{type:String,default:"{}"}},setup(e){const o=n(!0),t=f(),s=n(),l=m(()=>g(e.settings)),r=async()=>{const{ReplStore:u,Repl:i}=await v(()=>import("./vue-repl-a816217d.js"),["assets/vue-repl-a816217d.js","assets/app-b90de3d4.js","assets/framework-a4c02b8f.js"]);t.value=i,s.value=new u({serializedState:decodeURIComponent(e.files)}),l.value.vueVersion&&await s.value.setVueVersion(l.value.vueVersion)};return y(async()=>{await r(),o.value=!1}),()=>[a("div",{class:"vue-playground-wrapper"},[e.title?a("div",{class:"header"},decodeURIComponent(e.title)):null,a("div",{class:"repl-container"},[o.value?a(p,{class:"preview-loading",height:192}):null,t.value?a(t.value,{store:s.value,autoResize:!0,...l.value,layout:"horizontal"}):null])])]}});export{R as default};
