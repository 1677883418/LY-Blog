---
title: Spark原理与实践
date: 2022-7-30
tags:
- 字节青训营
- Spark
- 计算框架
categories:
- BigData
---
## Spark介绍
### 大数据处理技术栈
![](https://img.lystu.cn/imgBed/2022/7/30/woksxtp6df1659151125720.png)
### 开源大数据处理引擎
![](https://img.lystu.cn/imgBed/2022/7/30/tsldka740l1659157003398.png)
### Spark 生态&特点
- 统一引擎，支持多种分布式场景
- 多语言支持
- 可读写丰富数据源
- 丰富灵活的APIV算子
- 支持K8S/YARN/Mesos资源调度
## SparkCore原理解析
### SparkCore
- RDD(Resilient Distributed Dataset)：弹性分布式数据集，是一个容错的、并行的数据结构
- RDD算子：对任何函数进行某一项操作都可以认为是一个算子，RDD算子是RDD的成员函数
- Transform(转换)算子: 根据已有RDD创建新的RDD
- Action(动作)算子: 将在数据集上运行计算后的数值返回到驱动程序，从而触发真正的计算
- DAG(Directed Acyclic Graph): 有向无环图，Spark中的RDD通过一系列的转换算子操作和行动算子操作形成了一个DAG
- DAGScheduler：将作业的DAG划分成不同的Stage，每个Stage都是TaskSet任务集合，并以TaskSet为单位提交给TaskScheduler。
- TaskScheduler：通过TaskSetManager管理Task，并通过集群中的资源管理器（Standalone模式下是Master，Yarn模式下是ResourceManager）把Task发给集群中Worker的Executor
- Shuffle：Spark中数据重分发的一种机制。
![](https://img.lystu.cn/imgBed/2022/7/30/8gh1z47wte1659158273186.png)
## SparkSQL原理解析
