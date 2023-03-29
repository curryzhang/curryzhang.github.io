import{_ as a,W as n,X as d,Y as i,Z as e,a1 as s}from"./framework-a4c02b8f.js";const l={},t=e("p",null,"一共有两种方式：",-1),r=e("ul",null,[e("li",null,"AOF（Append-only file）"),e("li",null,"RDB（Redis database file）")],-1),o=s(`<p>首先需要知道Redis的操作都是在内存中完成的，因为这样速度快。</p><h4 id="aof" tabindex="-1"><a class="header-anchor" href="#aof" aria-hidden="true">#</a> AOF</h4><p>然后你可以启用AOF，它会把每个操作都记录到系统文件里。所以如果Redis服务器重启了，它会根据AOF这个文件来重建整个数据集。</p><p>这个文件会很快就变得很大，但是Redis很聪明，它会使用里面最新版本的数据，并压缩文件到可控大小。</p><p>修改配置文件将appendonly的值改成yes</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>appendonly yes

# The name of the append only file (default: &quot;appendonly.aof&quot;)
appendfilename &quot;appendonly.aof&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="rdb" tabindex="-1"><a class="header-anchor" href="#rdb" aria-hidden="true">#</a> RDB</h4><p>RDB是Redis的默认模式，它有点像数据库的快照，创建一些时间点的数据，如果发生灾难，你可以从这些数据里进行恢复。</p><p>当达到一些条件的时候，例如数据集里面在某段时间内新添加了一定条目的数据，Redis就会把数据做个快照，并写入一个RDB文件。</p><p>最佳实践是两者都用，使用AOF因为其速度和可用性，使用RDB做灾难恢复。</p><p>修改配置文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>save 900 1
save 300 10
save 60 10000
save 5 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>里面的save 900 1 是指900秒过后，如果至少1个key改变了，那么就做一个快照。</p><p>新增一个5秒有1个key改变，就做一个快照。</p>`,14);function p(c,u){return n(),d("div",null,[t,r,i(" more "),o])}const m=a(l,[["render",p],["__file","持久化.html.vue"]]);export{m as default};
