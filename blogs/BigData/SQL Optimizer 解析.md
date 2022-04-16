---
title: SQL Optimizer 解析
date: 2022-7-24
tags:
- SQL
- Optimizer
- 字节青训营
categories:
- BigData
---
## 大数据体系
![](https://s2.loli.net/2022/07/24/JcxTGydQn8DqWFK.png)

### SQL查询优化器重要性
#### SQL重要性
-   有 MySQL、Oracle 之类使用 SQL 作为交互语言的数据库
-   有 JDBC、ODBC 之类和各种数据库交互的标准接口
-   有大量数据科学家和数据分析师等不太会编程语言但又要使用数据的人
-   多个大数据计算引擎都支持 SQL 作为更高抽象层次的计算入口 
	- MapReduce -> Hive SQL
	- Spark -> Spark SQL
	- [[Flink]] -> Flink SQL
#### SQL查询优化意义
- SQL是一种声明式语言，用户只描述做什么，没有告诉数据库怎么做
- 目标：找到一个正确且执行代价最小的物理执行计划
- 查询优化器是数据库的大脑，最复杂的模块，很多相关问题都是NP的
- 一般SQL越复杂，Join的表越多，数据量越大，查询优化的意义就越大因为不同执行方式的性能差别可能有成百上干倍(**不同算法时空复杂度差距很大**)
***综上所述,SQL查询优化器是SQL的入口,SQL又是大数据的基础，因此应该首先学习SQL Optimizer***
### SQL处理流程
![](https://s2.loli.net/2022/07/24/OQwK9ogx8XkDr2W.png)
#### Parser
- String --> AST(abstract syntax tree)
	- 词法分析:拆分字符串，得到关键词、数值常量、字符串常量、运算符号等token
	- 语法分析：将token组成AST node,最终得到一个AST
- 和编译原理课程里的“前端”知识相关
- 实现:递归下降(ClickHouse),Flex和Bison(PostgreSQl),JavaCC([[Flink]]),Antlr(Presto,Spark)
![](https://s2.loli.net/2022/07/24/HQv5OgPfZLM2skd.png)
#### AST构成
- SelectStmt:根节点,拆分成不同的子节点
	- SelectList:包含要选择的列的信息
	- FromClause:包含选择的表和数据库的信息
	- WhereClause:Where信息过滤条件
		- BetweenPredicate:查询条件包含`Between`时执行操作
		- Inpredicate:查询条件包含`In`时执行操作
		- LikePredicate:查询条件包含`Like`时执行操作
	- GroupClause:基于那些列要做聚合的操作
	- OrderClause:包含`Order`子句时排序的规则
#### Analyzer
- ***检查并绑定***Database,Table,Column等元信息
- ***SQL的合法性检查*** (如min/max/avg的输入是否是数值,数据库，表和列名是否存在，列的数据类型是否正确)
- 将 AST 转换成逻辑计划树（在某些系统中这个工作由一个 Converter 完成）
执行流程:AST(抽象语法树) --> Analyzer --> Logical Plan逻辑执行计划
#### Logical Plan
- 理解:**逻辑地**描述一个 SQL 如何一步步地执行查询和计算，最终得到执行结果的一个***分步骤地计划***。树中每个节点是是一个算子，定义了对数据集合的计算操作（过滤，排序，聚合，连接），边代表了数据的流向，从孩子节点流向父节点。之所以称它为逻辑的，是因为算子定义的是逻辑的计算操作，没有指定实际的算法，比如对于逻辑的排序算子，逻辑计划树里**没有指定**使用快排还是堆排。
- 数据结构:左深树
- 逻辑地描述SQL对应的分步骤计算操作
- 计算操作:算子(operator)
![](https://s2.loli.net/2022/07/24/ztuxYQh9WO5iF7s.png)
#### Physical Plan(物理执行计划)
- 优化器的输出是一个分布式的物理执行计划。
- 分布式物理执行计划的目标是在单机 Plan 的基础上最小化数据移动和最大化本地 Scan，生成 PlanFragment 树。
- 一个 PlanFragment 封装了在一台机器上对数据集的操作逻辑。每个 PlanFragment 可以在每个 executor 节点生成 1 个或多个执行实例，不同执行实例处理不同的数据集，通过并发来提升查询性能。
- Plan 分布式化的方法是增加 shuffle 算子，执行计划树会以 shuffle 算子为边界拆分为PlanFragment。
![](https://s2.loli.net/2022/07/24/91BzOWbH2TojQLg.png)
- Plan Fragment:执行计划子树
	- 目标：最小化网络数据传输
	- 利用上数据的物理分布(数据亲和性)
	- 增加Shuffle算子
#### Executor
- 单机并行:cache,pipeline,SIMD
- 多机并行:一个fragment对应多个实例
### 小结
- One SQL rules big data all
结果
- SQL需要依次经过Parser,Analyzer,Optimizer和Executor的处理
- 查询优化器是数据库的大脑，在大数据场景下对查询性能至关重要
- 查询优化器需要感知数据分布，充分利用数据的亲和性
- 查询优化器按照最小化网络数据传输的目标把逻辑计划拆分成多个物理计划片段
## 常见的查询优化器
### 查询优化器分类
- 按照遍历树的顺序
	- Top-down Optimizer
		- 从目标输出开始，由上往下遍历计划树，找到完整的最优执行计划
		- Volcano/Cascade,SQLServer
	- Bottom-up Optimizer
		- 从零开始，由下往上遍历计划树，找到完整的执行计划
		- 例子:System R,PostgreSQL,IBM DB2
- 按照优化的方法
	- RBO(Rule-based Optimizer)
		- 根据关系代数等价语义,重写查询
		- 基于启发式规则
		- 会访问表的元信息(catalog),不会涉及具体的表数据(data)
	- CBO(Cost-based Optimizer)
		- 使用一个模型估算执行计划的代价,选择而代价最小的执行计划
### RBO
#### 概述
![](https://s2.loli.net/2022/07/24/B9fYPJShw6KW3kx.webp)
- 基于关系代数等价规则对逻辑计划进行变换
- 实现上:
	- Pattern：定义了特定结构的 Operator 子树（结构）
	- Rule：定义了如何将其匹配的节点替换（Substitute)为新形态，从而生成新的、等价的Operator 树（**原地替换**）
	- 优化器搜索过程被抽象为不断匹配 Pattern 然后应用 Rule 转换，直到没有可以匹配的 rule
- 局限性:
	- 无法解决多表连接问题
	- 无法确定和选择最优的分布式 Join/Aggregate 执行方式
#### 关系代数
- 运算符
	- Select(σ):选择
	- project(Π):投影
	- union(∪):并
	- join(⋈):自然连接
	- ...
- 等价变换:结合律、交换律、传递性
![](https://s2.loli.net/2022/07/24/dPosXJ6c5hryfj3.png)
#### 优化
例子:
```SQL
SELECT pv.siteld,user.name
FROM pv JOIN user
ON pv.siteld = user.siteld AND pv.userld = user.id
WHERE user.siteld > 123;
```
##### 优化原则
- Read data less and faster(I/O)
- Transfer data less and faster (Network)
- Process data less and faster(CPU Memory)
##### 列裁剪
![](https://s2.loli.net/2022/07/24/VML8KcWbplrtASa.png)
- Project:算子计算出需要哪些列，将列信息传递给FILTER
- FILTER:自身有需要的列，加上Project传递的列构成了新的集合
- JOIN:合并列形成新集合
- SCAN:所有算子的列的集合
##### 谓词下推
![](https://s2.loli.net/2022/07/24/M7rKFobdLJ564tg.png)
- 谓词:用来描述或判定客体性质、特征或者客体之间关系的词项.**在SQL中，谓词就是返回boolean值即true和false的函数，或是隐式转换为bool的函数。**
	- 关键字:LKIE、BETWEEN、IS NULL、IS NOT NULL、IN、EXISTS
- 基本思想:**将过滤表达式尽可能移动至靠近数据源的位置，以使真正执行时能直接跳过无关的数据。**
- 目的:通过将一些过滤条件尽可能的在最底层执行可以减少每一层交互的数据量，从而提升性能。
##### 传递闭包
- 理解:根据表达式的等价关系和一些过滤条件 --> 推导出一些新的过滤条件
##### Runtime Filter(运行时拦截)
基本原理:通过在join的probe端提前过滤掉那些不会命中join的输入数据来大幅减少join中的数据传输和计算，从而减少整体的执行时间。
#### RBO小结
- 主流RBO实现一般都有几百条基于经验归纳得到的优化规则
- 优点：实现简单，优化速度快
- 缺点：不保证得到最优的执行计划(**基于经验,可能有错误**)
	- 单表扫描:索引扫描(随机I/O)vs全表扫描(顺序I/O)
		- 如果数据分布非常不均衡，**索引扫描可能不如全表扫描**
	- Join的实现:Hash Join vs SortMerge Join(无法选择较好的实现)
	- 两表Hash Join:用小表构建哈希表(无法识别小表)
	- 多表Join:
		- 哪种连接顺序是最优的?
		- 是否要对每种组合都探索?
			- N个表连接,仅仅是left-deep-tree 就有差不多N!种连接顺序
			- e.g. N=10 --> 总共有3,628,800个连接顺序
### CBO
![](https://s2.loli.net/2022/07/24/gXQkZcP8mjrqAiU.png)
#### 概念
- 使用一个模型估算执行计划的代价，选择代价最小的执行计划
	- 分而治之，执行计划的代价等于所有算子的执行代价之和
	- 通过 RBO 得到（所有）可能的等价执行计划（**非原地替换**）
-   算子代价包含 CPU，cache misses，memory，disk I/O，network I/O 等代价
    -   和算子的统计信息有关，比如输入、输出结果的行数，每行大小等
    -   叶子算子 scan：通过统计原始表数据得到
        -   中间算子：根据一定的推导规则，从下层算子的统计信息推导得到
        -   和具体的算子类型，以及算子的物理实现有关（e.g. hash join vs. sort join）
-   使用动态规划枚举所有执行计划，选出执行代价最小的执行计划
#### 统计信息
- 基表统计信息
    - 表或者分区级别：行数、行平均大小、表在磁盘中占用了多少字节等
    - 列级别：min、max、num nulls、num、not nulls、num、distinct value(NDV)、histogram 等
- 推导统计信息
    - **选择率（selectivity）** ：对于某一个过滤条件，查询会从表中返回多大比例的数据
    - **基数（cardinality）** ：基本含义是表的 unique 行数，在查询计划中常指算子需要处理的行数
##### 统计信息收集方式
- 在DDL里指定需要收集的统计信息，数据库会在数据写入时收集或者更新统计信息
	- 缺点:实时导入,影响实时导入的速率
- 手动执行explain analyze statement,触发数据库收集或者更新统计信息
	- 缺点:信息更新不及时(数据插入但是并未手动触发)
- 动态采样
	- 根据部分信息估算表的整个行数信息

***实际生产中都会用到，各有优缺点***
##### 统计信息推导规则
- Filter Selectivity
![](https://s2.loli.net/2022/07/24/oHeAhO7ncNqdvWU.png)
假设列和列之间是独立的，列的值是均匀分布
##### 执行计划枚举
通常使用**贪心算法**或者**动态规划**选出最优解
#### 小结
- CBO使用代价模型和统计信息估算执行计划的代价
- CBO使用贪心或者动态规划算法寻找最优执行计划
- 在大数据场景下CBO对查询性能非常重要
## 社区开源实践
### 概览
![](https://s2.loli.net/2022/07/24/GvuSEDfO4C8B7rb.png)
### Apache Calcite
- One size fits all:统一的SQL查询引擎
- 模块化，插件化，稳定可靠
- 支持异构数据模型
	- 关系型
	- 半结构化
	- 流式
	- 地理空间数据
- 内置RBO和CBO
#### Calcite RBO
- HepPlanner
	- 优化规则(Rule)
		- Pattern:匹配表达式子树
		- 等价变换：得到新的表达式
	- 内置有100+优化规则
	- 四种匹配规则
		- ARBITRARY/DEPTH_FIRST:深度优先
		- TOP_DOWN:拓扑顺序
		- BOTTOM_UP:与TOP DOWN相反
	- 遍历所有的rule,直到没有rule可以被触发
	- 优化速度快，实现简单，但是不保证最优
#### Calcite CBO
- VolcanoPlanner
	- 基于Volcano/Cascade框架
	- 成本最优假设
	- Memo: 存储候选执行计划
		-Group: 等价计划集合
	- Top-down 动态规划搜索
### 小结
- 主流的查询优化器都包含RBO和CBO
- Apache Calcite是大数据领域很流行的查询优化器
- Apache Calcite RBO定义了许多优化规则，使用pattern匹配子树，执行等价变换
- Apache Calcite CBO基于Volcano/Cascade框架
- Volcano/Cascade的精髓：Memo、动态规划、剪枝

