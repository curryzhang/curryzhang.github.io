import{_ as i,W as s,X as d,Z as e,$ as o,a0 as t,a1 as n,C as a}from"./framework-a4c02b8f.js";const l={},c=e("h1",{id:"vuepress",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#vuepress","aria-hidden":"true"},"#"),o(" vuepress")],-1),p=e("p",null,"打开vuepress项目",-1),u={href:"https://github.com/curryzhang/curryzhang.github.io.git",target:"_blank",rel:"noopener noreferrer"},b=n(`<h1 id="gitbook" tabindex="-1"><a class="header-anchor" href="#gitbook" aria-hidden="true">#</a> GitBook</h1><ol><li>首先安装：npm install -g gitbook-cli</li><li>安装好之后创建文件夹，切换到文件夹下，执行命令：gitbook init</li><li>默认会创建readme和summary，用markdown编辑工具打开，这边我们选择typora,打开后修改summary,将内容替换如下</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 目录

* [前言](README.md)
* [第一章](Chapter1/README.md)
  * [第1节：衣](Chapter1/衣.md)
  * [第2节：食](Chapter1/食.md)
  * [第3节：住](Chapter1/住.md)
  * [第4节：行](Chapter1/行.md)
* [第二章](Chapter2/README.md)
* [第三章](Chapter3/README.md)
* [第四章](Chapter4/README.md)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),m={href:"http://SUMMARY.md",target:"_blank",rel:"noopener noreferrer"},h=e("li",null,"执行命令：gitbook serve预览书籍",-1),_=e("li",null,"执行命令：gitbook build构建书籍",-1),g=n(`<p>build 命令可以指定路径：</p><pre><code>gitbook build [书籍路径] [输出路径]
</code></pre><p>serve 命令也可以指定端口：</p><pre><code>gitbook serve --port 2333
</code></pre><p>你还可以生成 PDF 格式的电子书：</p><pre><code>gitbook pdf ./ ./mybook.pdf
</code></pre><p>生成 epub 格式的电子书：</p><pre><code>gitbook epub ./ ./mybook.epub
</code></pre><p>生成 mobi 格式的电子书：</p><pre><code>gitbook mobi ./ ./mybook.mobi
</code></pre><p>如果生成不了，你可能还需要安装一些工具，比如 ebook-convert。或者在 Typora 中安装 Pandoc 进行导出。</p><p>除此之外，别忘了还可以用 Git 做版本管理呀！在 mybook 目录下执行 git init 初始化仓库，执行 git remote add 添加远程仓库（你得先在远端建好）。接着就可以愉快地 commit，push，pull … 啦！</p>`,12),v={href:"https://blog.csdn.net/lu_embedded/article/details/81100704",target:"_blank",rel:"noopener noreferrer"},k={href:"https://gitee.com/Curry_Zhang/CoreNote",target:"_blank",rel:"noopener noreferrer"};function f(y,C){const r=a("ExternalLinkIcon");return s(),d("div",null,[c,p,e("p",null,[o("package.json文件中写明了编译文件的方式vuepress build docs config.js文件存放配置节点 blog文件夹存放所有的博客 yarn global add vuepress 安装vuepress 编译完成后取docs.vuepress\\dist文件下的所有文件上传到服务器"),e("a",u,[o("https://github.com/curryzhang/curryzhang.github.io.git"),t(r)])]),b,e("ol",null,[e("li",null,[o("执行命令：gitbook init，GitBook 会查找 "),e("a",m,[o("SUMMARY.md"),t(r)]),o(" 文件中描述的目录和文件，如果没有则会将其创建。")]),h,_]),g,e("p",null,[o("原文链接："),e("a",v,[o("https://blog.csdn.net/lu_embedded/article/details/81100704"),t(r)])]),e("p",null,[o("我的代码路径："),e("a",k,[o("https://gitee.com/Curry_Zhang/CoreNote"),t(r)])])])}const x=i(l,[["render",f],["__file","博客.html.vue"]]);export{x as default};
