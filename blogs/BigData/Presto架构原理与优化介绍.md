---
title: Presto架构原理与优化介绍
date: 2022-8-1
tags:
- 字节青训营
- 查询引擎
- Presto
categories:
- BigData
---
## 概述
### OLAP
**OLAP** **(OnLine Analytical Processing)** 对业务数据执行多维分析，并提供复杂计算，趋势分析和复杂数据建模的能力。是许多商务智能（BI）应用程序背后的技术。现如今OLAP已经发展为基于数据库通过SQL对外提供分析能力
### 常见的OLAP引擎
- 预计算引擎：Kylin,Druid
- 批式处理引擎：Hie,Spark
- 流式处理引擎：Flink
- 交互式处理引擎：Presto,Clickhouse,Doris
### Presto设计思想
Presto最初是由Facebook研发的构建于Hadoop/HDFS系统之上的PB级交互式分析引擎
特点：
- 多租户任务的管理与调度
- 多数据源联邦查询
- 支持内存化计算
- Pipeline式数据处理
## Presto基础原理与概念
- 服务
	- Coordinator
		- 解析SQL语句
		- 生成执行计划
		- 分发执行任务给Worker节点
	- Worker
		- 执行Task处理数据
		- 与其他Worker交互传输数据
- 数据源
	- Connector
		- 个Connector代表一种数据源。可以认为Connector是由Presto提供的适配多数据源的统一接口。
	- Catalog
		- 管理元信息与实际数据的映射关系
- Query
	- Query
		- 基于SQL parser后获得的执行计划
	- Stage
		- 根据是否需要shuffle将Query拆分成不同的subplan,每一个subplan便是一个stage
	- Fragment
		- 基本等价于Stage,属于在不同阶段的称呼，在本门课程可以认为两者等价
	- Task
		- 单个Norker节点上的最小资源管理单元：在一个节点上，一个Stage只有一个Task,一个Query可能有多个Task
	- Pipeline
		- Stage按照LocalExchange切分为若干Operator集合，每个Operator集合定义一个Pipeline
	- Driver
		- Pipeline的可执行实体，Pipeline和Driver的关系可类比程序和进程，是最小的执行单元，通过火山迭代模型执行每一个Operator。
	- Split
		- 输入数据描述（数据实体是Page),数量上和Driver一一对应，不仅代表实际数据源split,也代表了不同stage间传输的数据。
	- Operator
		- 最小的物理算子。
- 数据传输
	- Exchange
		- 表示不同Stage间的数据传输,大多数意义下等价于Shuffle
	- LocalExchange
		- Stage内的rehash操作，常用于提高并行处理数据的能力(Task在Presto中只是最小的容器，而不是最小的执行单元)
		- LocalExchange的默认数值是16。
- Presto架构图
![](https://img.lystu.cn/imgBed/2022/8/2/c8vsfrs6o71659412164773.png)
## 重要机制
1. Presto用户多租户隔离的手段是什么？ 
    1. Presto 通过Resource Group对不同的用户创建不同Group从而实现不同租户，不同场景的资源管理
2. Presto Resource Group的优缺点
优点：支持通配符的形式，对不同租户，不同提交场景下的用户进行限制
缺点：资源的管理和判断是以当前用户正在运行的SQL资源使用量为基准，对于低频大SQL场景不太适用
3.  Presto是从哪几个方面实现了多租户的任务调度
    1. Stage调度策略
    2. Task的节点选择策略
    3. Split调度策略
4. Presto Stage调度的方式有哪些？
    
    1.  AllAtOnceExecutionPolicy
    2.  PhasedExecutionPolicy
5.  Presto 进行 Task 调度时，有哪些调度方式？
    
    1.  _HARD_AFFINITY：_ 计算、存储 Local 模式，保障计算与存储在同一个节点，减少数据传输
    2.  _SOFT_AFFINITY：_ 基于某些特定算法，如一致性HASH函数，常用于缓存场景，保证相似的 Task 调度到同一个 Worker
    3.  _NO_PREFERENCE：_ 随机选取，常用于普通的纯计算 Task
6.  Presto是如何实现Back pressure mechanism的
    1.  控制split生成流程
    2.    针对每个Task定时检查, 如果 OutputBuffers 使用率低于 0.5 (下游消费较快, 需要提高生产速度), Split 并发度+1
    3.  控制Operator执行速度
    4.    "sink.max-buffer-size" 写入buffer的大小控制
    5.    "exchange.max-buffer-size" 读取buffer的大小控制
    6.    Buffer 达到最大值时Operator会进入阻塞状态

7.  Presto多数据源支持的优点与缺点
- 优点
	- 支持多数据源的联邦查询
- 缺点：
	- 针对不同数据源，还存在许多问题需要解决
	- 谓词下推
    - 每个数据源都需要单独的一套catalog管理
    - 如何针对数据源进行分片操作

