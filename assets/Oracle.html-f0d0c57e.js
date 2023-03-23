import{_ as e,W as i,X as d,a1 as n}from"./framework-a4c02b8f.js";const l={},a=n(`<h2 id="创建序列" tabindex="-1"><a class="header-anchor" href="#创建序列" aria-hidden="true">#</a> 创建序列</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create sequence SEQ_TEST
minvalue 0
maxvalue 999999999
start with 1
increment by 1
cache 10;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建存储过程-清空序列" tabindex="-1"><a class="header-anchor" href="#创建存储过程-清空序列" aria-hidden="true">#</a> 创建存储过程，清空序列</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create or replace procedure SEQ_RESET(v_seqname varchar2) as n number(20);
tsql varchar2(100);
begin
execute immediate &#39;select &#39;||v_seqname||&#39;.nextval from dual&#39; into n;
n:=-(n);
tsql:=&#39;alter sequence &#39;||v_seqname||&#39; increment by &#39;|| n;
execute immediate tsql;
execute immediate &#39;select &#39;||v_seqname||&#39;.nextval from dual&#39; into n;
tsql:=&#39;alter sequence &#39;||v_seqname||&#39; increment by 1&#39;;
execute immediate tsql;
end SEQ_RESET;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="创建job定时执行存储过程" tabindex="-1"><a class="header-anchor" href="#创建job定时执行存储过程" aria-hidden="true">#</a> 创建JOB定时执行存储过程</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>DECLARE JOB NUMBER;
BEGIN
    SYS.DBMS_JOB.SUBMIT ( 
        JOB =&gt; JOB, 
        WHAT =&gt; &#39;SEQ_TEST_RESET(&#39;&#39;SEQ_TEST&#39;&#39;);&#39;, 
        NEXT_DATE =&gt; TO_DATE(&#39;2022-09-09 00:00:00&#39;, &#39;yyyy-mm-dd hh24:mi:ss&#39;), 
        INTERVAL =&gt; &#39;TRUNC(SYSDATE+1)&#39;
    );
    COMMIT;
END;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="oracle创建job" tabindex="-1"><a class="header-anchor" href="#oracle创建job" aria-hidden="true">#</a> Oracle创建Job</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>DECLARE JOB NUMBER;
BEGIN
    SYS.DBMS_JOB.SUBMIT ( 
        JOB =&gt; JOB, 
        WHAT =&gt; &#39;WMS.SP_WMS_INV_BAK;&#39;, 
        NEXT_DATE =&gt; SYSDATE, 
        INTERVAL =&gt; &#39;TRUNC(SYSDATE+1)&#39;
    );
    COMMIT;
END;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询job，正常oracle都会存在两个表</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT * FROM dba_jobs;
SELECT * FROM user_jobs;
SELECT * FROM dba_jobs_running
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除job</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>BEGIN
  DBMS_JOB.REMOVE(4);  
  COMMIT;
END;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行job</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>BEGIN
    DBMS_JOB.RUN(4);
END;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改Job</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>BEGIN
   DBMS_JOB.NEXT_DATE(4,SYSDATE); 
   COMMIT;
END;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>停止运行job</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>BEGIN
    DBMS_JOB.BROKEN (4, TRUE, NEXT_DATE) ; 
COMMIT ;
END ;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>表dba_jobs各字段解释</strong></p><table><thead><tr><th>字段（列）</th><th>数据类型</th><th>字段描述</th></tr></thead><tbody><tr><td>JOB</td><td>NUMBER</td><td>任务的唯一标示号</td></tr><tr><td>LOG_USER</td><td>VARCHAR2(30)</td><td>提交任务的用户</td></tr><tr><td>PRIV_USER</td><td>VARCHAR2(30)</td><td>赋予任务权限的用户</td></tr><tr><td>SCHEMA_USER</td><td>VARCHAR2(30)</td><td>对任务作语法分析的用户模式</td></tr><tr><td>LAST_DATE</td><td>DATE</td><td>最后一次成功运行任务的时间</td></tr><tr><td>LAST_SEC</td><td>VARCHAR2(8)</td><td>如HH24:MM:SS格式的last_date日期的小时，分钟和秒</td></tr><tr><td>THIS_DATE</td><td>DATE</td><td>正在运行任务的开始时间，如果没有运行任务则为null</td></tr><tr><td>THIS_SEC</td><td>VARCHAR2(8)</td><td>如HH24:MM:SS格式的this_date日期的小时，分钟和秒</td></tr><tr><td>NEXT_DATE</td><td>DATE</td><td>下一次定时运行任务的时间</td></tr><tr><td>NEXT_SEC</td><td>VARCHAR2(8)</td><td>如HH24:MM:SS格式的next_date日期的小时，分钟和秒</td></tr><tr><td>TOTAL_TIME</td><td>NUMBER</td><td>该任务运行所需要的总时间，单位为秒</td></tr><tr><td>BROKEN</td><td>VARCHAR2(1)</td><td>标志参数，Y标示任务中断，以后不会运行</td></tr><tr><td>INTERVAL</td><td>VARCHAR2(200)</td><td>用于计算下一运行时间的表达式</td></tr><tr><td>FAILURES</td><td>NUMBER</td><td>任务运行连续没有成功的次数</td></tr><tr><td>WHAT</td><td>VARCHAR2(2000)</td><td>执行任务的PL/SQL块</td></tr><tr><td>CURRENT_SESSION_LABEL</td><td>RAW MLSLABEL</td><td>该任务的信任Oracle会话符</td></tr><tr><td>CLEARANCE_HI</td><td>RAW MLSLABEL</td><td>该任务可信任的Oracle最大间隙</td></tr><tr><td>CLEARANCE_LO</td><td>RAW MLSLABEL</td><td>该任务可信任的Oracle最小间隙</td></tr><tr><td>NLS_ENV</td><td>VARCHAR2(2000)</td><td>任务运行的NLS会话设置</td></tr><tr><td>MISC_ENV</td><td>RAW(32)</td><td>任务运行的其他一些会话参数</td></tr></tbody></table><h2 id="导出awr分析数据库" tabindex="-1"><a class="header-anchor" href="#导出awr分析数据库" aria-hidden="true">#</a> 导出AWR分析数据库</h2><ol><li>输入sqlplus</li><li>输入用户名、密码</li><li>@?/rdbms/admin/awrrpt.sql</li><li>输入report_type值：html或者text二选一</li><li>输入num_days的值：这里输入的是返回几天的快照，这里输入5天，表示返回5天的记录</li><li>输入snapid的起始值和结束值</li><li>输入报告名</li><li>日志默认保存在【C:\\Users\\用户名】下面</li></ol><h2 id="表创建更新" tabindex="-1"><a class="header-anchor" href="#表创建更新" aria-hidden="true">#</a> 表创建更新</h2><p>创建表: ORDER_BAS</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CREATE TABLE ORDER_BAS (
    GUID VARCHAR2(50) NOT NULL,
    CREATE_BY VARCHAR2(20) NOT NULL,
    CREATE_TIME TIMESTAMP(0) NOT NULL,	
    ACTIVE_FLAG	VARCHAR2(1) NOT NULL,
    SKU	VARCHAR2(20) NOT NULL,
    SKU_CODE	VARCHAR2(20) NOT NULL,
    SKU_QTY NUMBER(18) NOT NULL,
    PRIMARY KEY(GUID)
);
-- 添加注释
comment on table ORDER_BAS is &#39;订单表&#39;;
comment on column ORDER_BAS.SKU	is &#39;商品名称&#39;;
comment on column ORDER_BAS.SKU_CODE is &#39;商品编码&#39;;
comment on column ORDER_BAS.SKU_QTY	is &#39;商品数量&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加字段</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>--alter table  表名  add (字段  字段类型)  [ default  &#39;输入默认值&#39;]  [null/not null]  ;

ALTER TABLE MY_WORKFLOW ADD 
(
    STATE VARCHAR2(2) DEFAULT &#39;0&#39; NOT NULL,
    NAME VARCHAR2(100)  NOT NULL,
    AGE NUMBER DEFAULT 0 NOT NULL
);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改字段类型</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alter table 表名  modiy (字段  字段类型  [default &#39;输入默认值&#39; ] [null/not null]  ,字段  字段类型  [default &#39;输入默认值&#39; ] [null/not null] ); 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改多个字段用逗号隔开</p><p>删除字段</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>alter table  表名  drop (字段);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="crud" tabindex="-1"><a class="header-anchor" href="#crud" aria-hidden="true">#</a> CRUD</h2><p>批量插入数据</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>INSERT ALL 
INTO TB_LOCATION ( GUID, ACTIVE_FLAG, CUSTOMER_ID, CREATE_BY, CREATE_TIME, LOC_ID, LOC_DESC ) VALUES ( sys_guid(), &#39;Y&#39;, &#39;1000&#39;, &#39;10001&#39;, SYSDATE, &#39;3000&#39;, &#39;国内仓&#39; )
INTO TB_LOCATION ( GUID, ACTIVE_FLAG, CUSTOMER_ID, CREATE_BY, CREATE_TIME, LOC_ID, LOC_DESC ) VALUES ( sys_guid(), &#39;Y&#39;, &#39;1000&#39;, &#39;10001&#39;, SYSDATE, &#39;3001&#39;, &#39;国内成品仓&#39; )
SELECT 1 FROM dual;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分页查询</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT * 
FROM
(
	SELECT ROWNUM AS rowno,t.* 
	FROM TB t 
	WHERE CREATE_TIME BETWEEN TO_DATE( &#39;20220501&#39;, &#39;yyyymmdd&#39; ) 
				AND TO_DATE( &#39;20220531&#39;, &#39;yyyymmdd&#39; ) 
				AND ROWNUM &lt;= 20 
) t1 
WHERE t1.rowno &gt;= 10

--直接复用
public static string ConCatSql(string sql, int rows, int page)
{
    StringBuilder Sql = new StringBuilder();
    Sql.Append(@&quot;SELECT * FROM (SELECT A.*, ROWNUM RN from(&quot;);
    Sql.Append(sql);
    Sql.Append(@&quot;) A WHERE ROWNUM &lt;= &quot; + (rows * page) + &quot;) WHERE RN&gt;&quot; + ((page - 1) &lt; 0 ? 0 : (page - 1) * rows));
    return Sql.ToString();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="各种系统表" tabindex="-1"><a class="header-anchor" href="#各种系统表" aria-hidden="true">#</a> 各种系统表</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select * from all_tab_comments -- 查询所有用户的表,视图等

select * from user_tab_comments -- 查询本用户的表,视图等

select * from all_col_comments  --查询所有用户的表的列名和注释.

select * from user_col_comments -- 查询本用户的表的列名和注释

select * from all_tab_columns --查询所有用户的表的列名等信息(详细但是没有备注).

select * from user_tab_columns --查询本用户的表的列名等信息(详细但是没有备注).

select table_name from all_tables --查询所有用户的表

select table_name from dbs_tables --包括系统表
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="时间" tabindex="-1"><a class="header-anchor" href="#时间" aria-hidden="true">#</a> 时间</h2><p>oracle只有DATE和TIMESTAMP两种</p><ol><li>DATE格式：YYYY/MM/DD HH24:MI:SS</li><li>TIMESTAMP是时间戳形式，使用CAST函数将DATE转成TIMESTAMP</li></ol><p>获取系统时间：SYSDATE，SYSTIMESTAMP</p><p>字符串转成日期</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>TO_DATE(&#39;2022-07-11 18:00:00&#39;,&#39;yyyy-mm-dd hh24:mi:ss&#39;)
TO_TIMESTAMP(&#39;2020-07-30 20:30:30.123400&#39;,&#39;yyyy-mm-dd hh24:mi:ss.ff&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>时间转成字符串：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>to_char(CREATE_TIME,&#39;yyyy-mm-dd hh24:mi:ss&#39;)
to_char(UPDATE_TIME,&#39;yyyy-mm-dd hh24:mi:ss.ff&#39;) --ff：6位毫秒值、ff3：3位毫秒值
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="时间加减" tabindex="-1"><a class="header-anchor" href="#时间加减" aria-hidden="true">#</a> 时间加减</h3><p>针对天以内的直接加减</p><ul><li>加一天：SYSDATE+1</li><li>加一分钟：SYSDATE+(1/24/60)</li></ul><p>月份以上的用ADD_MONTHS</p><ul><li>加一个月：ADD_MONTHS(SYSDATE, 1)</li><li>加一年：ADD_MONTHS(SYSDATE, 12)</li></ul><p>INTERVAL函数</p><ul><li>加一秒：SYSDATE + INTERVAL &#39;1&#39; SECOND</li><li>加一分：SYSDATE + INTERVAL &#39;1&#39; MINUTE</li><li>加一小时：SYSDATE + INTERVAL &#39;1&#39; HOUR</li><li>加一天：SYSDATE + INTERVAL &#39;1&#39; DAY</li><li>加一个月：SYSDATE + INTERVAL &#39;1&#39; MONTH</li><li>加一年：SYSDATE + INTERVAL &#39;1&#39; YEAR</li><li>减一年：SYSDATE + INTERVAL &#39;-1&#39; YEAR</li></ul><p>截取时间：TRUNC(时间或数字,精度)</p><ul><li>获取月初第一天：TRUNC(SYSDATE,&#39;MM&#39;)</li></ul><p>查询条件加日期时间</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CREATE_TIME &gt;= TO_DATE(TO_CHAR(SYSDATE,&#39;YYYY-MM-DD&#39;),&#39;YYYY-MM-DD&#39;) 
AND CREATE_TIME &lt; TO_DATE(TO_CHAR(SYSDATE+1,&#39;YYYY-MM-DD&#39;),&#39;YYYY-MM-DD&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>时间格式化</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>TO_CHAR(SYSDATE,&#39;yyyy-MM-dd hh:mm:ss&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>截断时间和数字TRUNC，截取字符串SUBSTR</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT TRUNC(SYSDATE, &#39;yy&#39;) FROM TB --2022-01-01
SELECT TRUNC(SYSDATE, &#39;mm&#39;) FROM TB --2022-06-01
SELECT TRUNC(SYSDATE, &#39;dd&#39;) FROM TB --2022-06-10
SELECT TRUNC(SYSDATE, &#39;d&#39;) FROM TB --2022-06-05 获取当前星期的第一天（从星期日计算）
SELECT TRUNC(SYSDATE, &#39;hh&#39;) FROM TB --2022-06-10 13:00:00
SELECT TRUNC(SYSDATE, &#39;mi&#39;) FROM TB --2022-06-10 13:22:00（TRUNC没有到秒的）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="跨库查询" tabindex="-1"><a class="header-anchor" href="#跨库查询" aria-hidden="true">#</a> 跨库查询</h2><p>首先创建DBLink</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>create public database link tblink
connect to 用户名 identified by 密码
using &#39;(DESCRIPTION =(ADDRESS_LIST =(ADDRESS = (PROTOCOL = TCP)(HOST = 数据库地址)(PORT = 端口号)))(CONNECT_DATA =(SERVICE_NAME = 服务器名)))&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>类型有public和private，tblink表示这个DBLink的名称，随便自己起</p><p>删除DBLink</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>drop database link tblink;
--public类型的要增加说明
drop public database link tblink;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看创建的所有的DBLink</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select * from dba_db_links;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查询关联的数据库</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select * from TB_LOCATION@dblink
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>附上创建和删除dabase link的权限</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>--给WMS附上创建database link的权限
grant create  database link to wms ; 
--给WMS附上创建public database link的权限
grant create public database link to wms ;
--附上删除权限
grant drop public database link to wms; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他操作" tabindex="-1"><a class="header-anchor" href="#其他操作" aria-hidden="true">#</a> 其他操作</h2><p>链接字符串CONCAT</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT CONCAT(CONCAT(&#39;A&#39;, &#39;B&#39;),&#39;C&#39;) FROM TB;--CONCAT函数只能链接两个字符
SELECT CONCAT(&#39;let&#39;&#39;s&#39;, &#39; go&#39;) FROM TB;--带引号的字符
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>链接多个字符串||</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT &#39;hello&#39;||&#39;:&#39;||&#39;world&#39; FROM TB where ROWNUM&lt;=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将首字母设置为大写Initcap</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT Initcap(&#39;let&#39;&#39;s go&#39;) FROM TB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>判断null</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select NVL(NULL, 1) from TB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>判断表是否存在</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT COUNT(*) FROM ALL_TABLES WHERE OWNER = UPPER(&#39;用户名&#39;) AND TABLE_NAME = UPPER(&#39;表名&#39;)
--或者
SELECT count(*)  FROM user_tables WHERE table_name = upper(&#39;表名&#39;)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,85),s=[a];function t(r,v){return i(),d("div",null,s)}const u=e(l,[["render",t],["__file","Oracle.html.vue"]]);export{u as default};
