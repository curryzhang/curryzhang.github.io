(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{180:function(e,s,a){"use strict";a.r(s);var t=a(0),n=Object(t.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,s=e.$createElement,a=e._self._c||s;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"msmq"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#msmq","aria-hidden":"true"}},[e._v("#")]),e._v(" MSMQ")]),e._v(" "),a("p",[e._v("首先是将windows的MQ功能开启。\n"),a("img",{attrs:{src:"http://upload-images.jianshu.io/upload_images/1708638-7e79382c64b25c81.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:""}})]),e._v(" "),a("p",[e._v("新建两个windows应用程序，用来测试消息传输\n"),a("img",{attrs:{src:"http://upload-images.jianshu.io/upload_images/1708638-5e21b7dc2fa34724.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:""}})]),e._v(" "),a("p",[e._v("发送消息的代码")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('MessageQueue mq;\nprivate void Form1_Load(object sender, EventArgs e)\n{\n    //新建消息循环队列或连接到已有的消息队列\n    string path = ".\\\\private$\\\\killf";\n    if (MessageQueue.Exists(path))\n    {\n        mq = new MessageQueue(path);\n    }\n    else\n    {\n        mq = MessageQueue.Create(path);\n    }\n    mq.Formatter = new XmlMessageFormatter(new Type[] { typeof(string) });\n}\n\nprivate void button1_Click(object sender, EventArgs e)\n{\n    mq.Send(textBox1.Text);\n}\n')])])]),a("p",[e._v("用于接收的代码")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('MessageQueue mq;\nprivate void Form1_Load(object sender, EventArgs e)\n{\n    //新建消息循环队列或连接到已有的消息队列\n    string path = ".\\\\private$\\\\killf";\n    if (MessageQueue.Exists(path))\n    {\n        mq = new MessageQueue(path);\n    }\n    else\n    {\n        mq = MessageQueue.Create(path);\n    }\n    mq.Formatter = new XmlMessageFormatter(new Type[] { typeof(string) });\n    mq.ReceiveCompleted += mq_ReceiveCompleted;\n    mq.BeginReceive();\n}\n\nvoid mq_ReceiveCompleted(object sender, ReceiveCompletedEventArgs e)\n{\n    //throw new NotImplementedException();\n    MessageQueue mq = (MessageQueue)sender;\n    System.Messaging.Message m = mq.EndReceive(e.AsyncResult);\n    //处理消息\n    string str = m.Body.ToString();\n    this.textBox1.Invoke(new Action<string>(ShowMsg), str);\n    //继续下一条消息\n    mq.BeginReceive();\n}\n\nprivate void ShowMsg(string msg)\n{\n    this.textBox1.Text = this.textBox1.Text + msg + Environment.NewLine;\n    return;\n}\n')])])]),a("p",[e._v("测试完成！\n"),a("img",{attrs:{src:"http://upload-images.jianshu.io/upload_images/1708638-59169ff901a84d4a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",alt:"OK.png"}})]),e._v(" "),a("p",[e._v("1、命名空间 using System.Messaging;\n2、默认存储路径 C:\\WINDOWS\\system32\\msmq\\storage\n3、创建消息队列：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('MessageQueue mq = MessageQueue.Create(@".\\Private$\\LeeMSMQ");\n')])])]),a("p",[e._v("4、删除队列：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('MessageQueue.Delete(@".\\Private$\\LeeMSMQ");\n')])])]),a("p",[e._v("5、发送消息：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('MessageQueue mq = new MessageQueue(@".\\Private$\\LeeMSMQ");\nmq.Send("sayhello1,hello msmq!", "sayhello1");\nmq.Send("sayhello2,hello msmq!", "sayhello2");\n')])])]),a("p",[e._v("6、接受并删除消息：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('MessageQueue mq = new MessageQueue(@".\\Private$\\LeeMSMQ")\nMessage msg = mq.Receive();//引用的队列中可用的第一条消息\n')])])]),a("p",[e._v("7、接受但不删除消息：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("Message msg = mq.Peek();\n")])])]),a("p",[e._v("8、删除所有消息：")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("Message msg = mq.Purge();\n")])])]),a("p",[e._v("9、返回本机所有私有队列的消息")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('//返回本机所有私有队列的消息\nforeach (MessageQueue mq in MessageQueue.GetPrivateQueuesByMachine("liyanping"))\n{\n    mq.Formatter = new XmlMessageFormatter(new string[] { "System.String" });\n    Message[] msg = mq.GetAllMessages();\n    foreach (Message m in msg)\n    {\n        Console.WriteLine("label:{0},body:{1}", m.Label, m.Body);\n    }\n}\n')])])]),a("p",[e._v("10、返回指定队列的消息")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('if (MessageQueue.Exists(@".\\Private$\\LeeMSMQ"))//判断私有消息是否存在\n{\n    using (MessageQueue mq = new MessageQueue(@".\\Private$\\LeeMSMQ"))\n    {\n        mq.Formatter = new XmlMessageFormatter(new string[] { "System.String" });//设置消息队列格式化器\n        Message msg = mq.Receive();//接收消息\n        Console.WriteLine("label:{0},body: {1}", msg.Label, msg.Body);//输出消息\n        MessageQueue.Delete(@".\\Private$\\LeeMSMQ");\n    }\n} \n')])])])])}],!1,null,null,null);s.default=n.exports}}]);