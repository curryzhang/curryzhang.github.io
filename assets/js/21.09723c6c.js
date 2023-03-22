(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{178:function(e,n,a){"use strict";a.r(n);var t=a(0),o=Object(t.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"rabbitmq学习2-开发"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rabbitmq学习2-开发","aria-hidden":"true"}},[e._v("#")]),e._v(" RabbitMQ学习2--开发")]),e._v(" "),a("p",[e._v("发送方")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('// 连接配置\nprivate static readonly ConnectionFactory rabbitMqFactory = new ConnectionFactory()\n{\n    HostName = "localhost",\n    UserName = "guest",\n    Password = "zcd@jing",\n    Port = 5672\n};\n// 路由名称\nconst string TopExchangeName = "topic.justin.exchange";\n//队列名称\nconst string TopQueueName = "topic.justin.queue";\n\npublic static void TopicExchangeSendMsg()\n{\n    using (IConnection conn = rabbitMqFactory.CreateConnection())\n    {\n        using (IModel channel = conn.CreateModel())\n        {\n            channel.ExchangeDeclare(TopExchangeName, "topic", durable: false,autoDelete:false, arguments: null);\n            channel.QueueDeclare(TopQueueName, durable: false, autoDelete: false,exclusive:false, arguments: null);\n            channel.QueueBind(TopQueueName, TopExchangeName, routingKey: TopQueueName);\n            //var props = channel.CreateBasicProperties();\n            //props.Persistent = true;\n            string vadata = Console.ReadLine();\n            while (vadata != "exit")\n            {\n                var msgBody = Encoding.UTF8.GetBytes(vadata);\n                channel.BasicPublish(exchange: TopExchangeName, routingKey:TopQueueName,basicProperties: null, body: msgBody);\n                Console.WriteLine(string.Format("***发送时间:{0}，发送完成，输入exit退消息送", DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")));\n                vadata = Console.ReadLine();\n            }\n        }\n    }\n}\nstatic void Main(string[] args)\n{\n    TopicExchangeSendMsg();\n    Console.WriteLine("按任意值，退出程序");\n    Console.ReadKey();\n}\n')])])]),a("p",[e._v("接收方")]),e._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v('// 连接配置\nprivate static readonly ConnectionFactory rabbitMqFactory = new ConnectionFactory()\n{\n    HostName = "localhost",\n    UserName = "guest",\n    Password = "zcd@jing",\n    Port = 5672\n};\n// 路由名称\nconst string TopExchangeName = "topic.test.exchange";\n//队列名称\nconst string TopQueueName = "topic.test.queue";\n\npublic static void TopicAcceptExchange()\n{\n    using (IConnection conn = rabbitMqFactory.CreateConnection())\n    {\n        using (IModel channel = conn.CreateModel())\n        {\n            channel.ExchangeDeclare(TopExchangeName, "topic", durable: false,autoDelete:false, arguments: null);\n            channel.QueueDeclare(TopQueueName, durable: false, autoDelete: false,exclusive:false, arguments: null);\n            channel.BasicQos(prefetchSize: 0, prefetchCount: 1, global: false);\n            channel.QueueBind(TopQueueName, TopExchangeName, routingKey: TopQueueName);\n            var consumer = new EventingBasicConsumer(channel);\n            consumer.Received += (model, ea) =>\n            {\n                var msgBody = Encoding.UTF8.GetString(ea.Body);\n                Console.WriteLine(string.Format("***接收时间:{0}，消息内容：{1}",DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"), msgBody));\n                int dots = msgBody.Split(\'.\').Length - 1;\n                System.Threading.Thread.Sleep(dots * 1000);\n                Console.WriteLine(" [x] Done");\n                channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);\n            };\n            channel.BasicConsume(TopQueueName, noAck: false, consumer: consumer);\n        }\n    }\n}\n\nstatic void Main(string[] args)\n{\n    TopicAcceptExchange();\n    Console.WriteLine("按任意值，退出程序");\n    Console.ReadKey();\n}\n')])])])])}],!1,null,null,null);n.default=o.exports}}]);