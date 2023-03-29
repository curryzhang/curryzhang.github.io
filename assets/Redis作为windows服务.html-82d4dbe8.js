import{_ as e,W as s,X as d,a1 as i}from"./framework-a4c02b8f.js";const a={},r=i(`<h2 id="操作步骤" tabindex="-1"><a class="header-anchor" href="#操作步骤" aria-hidden="true">#</a> 操作步骤</h2><p>先添加系统变量，在系统属性-环境变量-系统变量中找到Path，添加放redis的路径，我这边是放在D:\\Redis</p><p>然后打开cmd，cd到redis目录下，注册redis服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-server.exe --service-install redis.windows.conf --loglevel verbose
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>开启服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-server --service-start 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>到这边已经完成了。</p><h2 id="其他操作动作" tabindex="-1"><a class="header-anchor" href="#其他操作动作" aria-hidden="true">#</a> 其他操作动作</h2><p>关闭服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-server --service-stop 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>卸载服务</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-server --service-uninstall 
//或者
sc delete Redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>服务重命名</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>redis-server --service-name server-name 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,14),n=[r];function t(l,c){return s(),d("div",null,n)}const u=e(a,[["render",t],["__file","Redis作为windows服务.html.vue"]]);export{u as default};
