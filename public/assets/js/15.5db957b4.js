(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{580:function(v,_,l){"use strict";l.r(_);var e=l(5),i=Object(e.a)({},(function(){var v=this,_=v.$createElement,l=v._self._c||_;return l("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[l("h2",{attrs:{id:"概述"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[v._v("#")]),v._v(" 概述")]),v._v(" "),l("h3",{attrs:{id:"olap"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#olap"}},[v._v("#")]),v._v(" OLAP")]),v._v(" "),l("p",[l("strong",[v._v("OLAP")]),v._v(" "),l("strong",[v._v("(OnLine Analytical Processing)")]),v._v(" 对业务数据执行多维分析，并提供复杂计算，趋势分析和复杂数据建模的能力。是许多商务智能（BI）应用程序背后的技术。现如今OLAP已经发展为基于数据库通过SQL对外提供分析能力")]),v._v(" "),l("h3",{attrs:{id:"常见的olap引擎"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#常见的olap引擎"}},[v._v("#")]),v._v(" 常见的OLAP引擎")]),v._v(" "),l("ul",[l("li",[v._v("预计算引擎：Kylin,Druid")]),v._v(" "),l("li",[v._v("批式处理引擎：Hie,Spark")]),v._v(" "),l("li",[v._v("流式处理引擎：Flink")]),v._v(" "),l("li",[v._v("交互式处理引擎：Presto,Clickhouse,Doris")])]),v._v(" "),l("h3",{attrs:{id:"presto设计思想"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#presto设计思想"}},[v._v("#")]),v._v(" Presto设计思想")]),v._v(" "),l("p",[v._v("Presto最初是由Facebook研发的构建于Hadoop/HDFS系统之上的PB级交互式分析引擎\n特点：")]),v._v(" "),l("ul",[l("li",[v._v("多租户任务的管理与调度")]),v._v(" "),l("li",[v._v("多数据源联邦查询")]),v._v(" "),l("li",[v._v("支持内存化计算")]),v._v(" "),l("li",[v._v("Pipeline式数据处理")])]),v._v(" "),l("h2",{attrs:{id:"presto基础原理与概念"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#presto基础原理与概念"}},[v._v("#")]),v._v(" Presto基础原理与概念")]),v._v(" "),l("ul",[l("li",[v._v("服务\n"),l("ul",[l("li",[v._v("Coordinator\n"),l("ul",[l("li",[v._v("解析SQL语句")]),v._v(" "),l("li",[v._v("生成执行计划")]),v._v(" "),l("li",[v._v("分发执行任务给Worker节点")])])]),v._v(" "),l("li",[v._v("Worker\n"),l("ul",[l("li",[v._v("执行Task处理数据")]),v._v(" "),l("li",[v._v("与其他Worker交互传输数据")])])])])]),v._v(" "),l("li",[v._v("数据源\n"),l("ul",[l("li",[v._v("Connector\n"),l("ul",[l("li",[v._v("个Connector代表一种数据源。可以认为Connector是由Presto提供的适配多数据源的统一接口。")])])]),v._v(" "),l("li",[v._v("Catalog\n"),l("ul",[l("li",[v._v("管理元信息与实际数据的映射关系")])])])])]),v._v(" "),l("li",[v._v("Query\n"),l("ul",[l("li",[v._v("Query\n"),l("ul",[l("li",[v._v("基于SQL parser后获得的执行计划")])])]),v._v(" "),l("li",[v._v("Stage\n"),l("ul",[l("li",[v._v("根据是否需要shuffle将Query拆分成不同的subplan,每一个subplan便是一个stage")])])]),v._v(" "),l("li",[v._v("Fragment\n"),l("ul",[l("li",[v._v("基本等价于Stage,属于在不同阶段的称呼，在本门课程可以认为两者等价")])])]),v._v(" "),l("li",[v._v("Task\n"),l("ul",[l("li",[v._v("单个Norker节点上的最小资源管理单元：在一个节点上，一个Stage只有一个Task,一个Query可能有多个Task")])])]),v._v(" "),l("li",[v._v("Pipeline\n"),l("ul",[l("li",[v._v("Stage按照LocalExchange切分为若干Operator集合，每个Operator集合定义一个Pipeline")])])]),v._v(" "),l("li",[v._v("Driver\n"),l("ul",[l("li",[v._v("Pipeline的可执行实体，Pipeline和Driver的关系可类比程序和进程，是最小的执行单元，通过火山迭代模型执行每一个Operator。")])])]),v._v(" "),l("li",[v._v("Split\n"),l("ul",[l("li",[v._v("输入数据描述（数据实体是Page),数量上和Driver一一对应，不仅代表实际数据源split,也代表了不同stage间传输的数据。")])])]),v._v(" "),l("li",[v._v("Operator\n"),l("ul",[l("li",[v._v("最小的物理算子。")])])])])]),v._v(" "),l("li",[v._v("数据传输\n"),l("ul",[l("li",[v._v("Exchange\n"),l("ul",[l("li",[v._v("表示不同Stage间的数据传输,大多数意义下等价于Shuffle")])])]),v._v(" "),l("li",[v._v("LocalExchange\n"),l("ul",[l("li",[v._v("Stage内的rehash操作，常用于提高并行处理数据的能力(Task在Presto中只是最小的容器，而不是最小的执行单元)")]),v._v(" "),l("li",[v._v("LocalExchange的默认数值是16。")])])])])]),v._v(" "),l("li",[v._v("Presto架构图\n"),l("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/8/2/c8vsfrs6o71659412164773.png",alt:""}})])]),v._v(" "),l("h2",{attrs:{id:"重要机制"}},[l("a",{staticClass:"header-anchor",attrs:{href:"#重要机制"}},[v._v("#")]),v._v(" 重要机制")]),v._v(" "),l("ol",[l("li",[l("p",[v._v("Presto用户多租户隔离的手段是什么？")]),v._v(" "),l("ol",[l("li",[v._v("Presto 通过Resource Group对不同的用户创建不同Group从而实现不同租户，不同场景的资源管理")])])]),v._v(" "),l("li",[l("p",[v._v("Presto Resource Group的优缺点\n优点：支持通配符的形式，对不同租户，不同提交场景下的用户进行限制\n缺点：资源的管理和判断是以当前用户正在运行的SQL资源使用量为基准，对于低频大SQL场景不太适用")])]),v._v(" "),l("li",[l("p",[v._v("Presto是从哪几个方面实现了多租户的任务调度")]),v._v(" "),l("ol",[l("li",[v._v("Stage调度策略")]),v._v(" "),l("li",[v._v("Task的节点选择策略")]),v._v(" "),l("li",[v._v("Split调度策略")])])]),v._v(" "),l("li",[l("p",[v._v("Presto Stage调度的方式有哪些？")]),v._v(" "),l("ol",[l("li",[v._v("AllAtOnceExecutionPolicy")]),v._v(" "),l("li",[v._v("PhasedExecutionPolicy")])])]),v._v(" "),l("li",[l("p",[v._v("Presto 进行 Task 调度时，有哪些调度方式？")]),v._v(" "),l("ol",[l("li",[l("em",[v._v("HARD_AFFINITY：")]),v._v(" 计算、存储 Local 模式，保障计算与存储在同一个节点，减少数据传输")]),v._v(" "),l("li",[l("em",[v._v("SOFT_AFFINITY：")]),v._v(" 基于某些特定算法，如一致性HASH函数，常用于缓存场景，保证相似的 Task 调度到同一个 Worker")]),v._v(" "),l("li",[l("em",[v._v("NO_PREFERENCE：")]),v._v(" 随机选取，常用于普通的纯计算 Task")])])]),v._v(" "),l("li",[l("p",[v._v("Presto是如何实现Back pressure mechanism的")]),v._v(" "),l("ol",[l("li",[v._v("控制split生成流程")]),v._v(" "),l("li",[v._v("针对每个Task定时检查, 如果 OutputBuffers 使用率低于 0.5 (下游消费较快, 需要提高生产速度), Split 并发度+1")]),v._v(" "),l("li",[v._v("控制Operator执行速度")]),v._v(" "),l("li",[v._v('"sink.max-buffer-size" 写入buffer的大小控制')]),v._v(" "),l("li",[v._v('"exchange.max-buffer-size" 读取buffer的大小控制')]),v._v(" "),l("li",[v._v("Buffer 达到最大值时Operator会进入阻塞状态")])])]),v._v(" "),l("li",[l("p",[v._v("Presto多数据源支持的优点与缺点")])])]),v._v(" "),l("ul",[l("li",[v._v("优点\n"),l("ul",[l("li",[v._v("支持多数据源的联邦查询")])])]),v._v(" "),l("li",[v._v("缺点：\n"),l("ul",[l("li",[v._v("针对不同数据源，还存在许多问题需要解决")]),v._v(" "),l("li",[v._v("谓词下推")]),v._v(" "),l("li",[v._v("每个数据源都需要单独的一套catalog管理")]),v._v(" "),l("li",[v._v("如何针对数据源进行分片操作")])])])])])}),[],!1,null,null,null);_.default=i.exports}}]);