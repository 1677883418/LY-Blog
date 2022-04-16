---
title: Mybatis
date: 2021-6-16 
tags:
 - Mybatis
categories:
 - Java
---

:::tip
目前常用的数据持久层框架
:::

# Mybatis程序

## 第一个Mybatis程序

### Mybatis核心配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
  <environments default="development">
    <environment id="development">
      <transactionManager type="JDBC"/>
      <dataSource type="POOLED">
        <property name="driver" value="${driver}"/>
        <property name="url" value="${url}"/>
        <property name="username" value="${username}"/>
        <property name="password" value="${password}"/>
      </dataSource>
    </environment>
  </environments>
  <mappers>
    <mapper resource="org/mybatis/example/BlogMapper.xml"/>
  </mappers>
</configuration>
```

### 编写Mybatis工具类

```java
//sqlsessionfactory-->sqlSession
public class MybatisUtils {
    private static SqlSessionFactory sqlSessionFactory;

    static {
        try {
            //1.获取sqlSessionFactory对象
            String resource = "mybatis-config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    //获取sqlSession实例
    //sqlSession完全包含了面向数据库执行sql命令所需的所有方法。
    public static SqlSession getsqlSession() {
        return sqlSessionFactory.openSession();

    }
}
```

### 配置文件资源过滤问题

pom.xml

```xml
    <build>
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>true</filtering>
            </resource>
        </resources>
    </build>
```

### 编写代码

* 实体类

```java
package com.nepenthe.pojo;
//实体类
public class User {
    private int id;
    private String name;
    private String pwd;

    public User() {
    }

    public User(int id, String name, String pwd) {
        this.id = id;
        this.name = name;
        this.pwd = pwd;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", pwd='" + pwd + '\'' +
                '}';
    }
}
```

* Dao接口

```java
public interface UserDao {
    List<User> getUserList();
}
```

* 接口实现类由原来的UserDaolmpl转换为一个Mapper配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<!--namespace=绑定一个对应的Dao/Mapper接口-->
<mapper namespace="com.nepenthe.dao.UserDao">

    <select id="getUserList" resultType="com.nepenthe.pojo.User">
        select * from mybatis.user
    </select>
    
</mapper>
```

## CRUD

### namespace(命名空间)

命名空间,namespace中的包名要和Dao/Mapper 接口的包名一致！

* id：就是对应的namespace中的方法名;
* resultType:Sql语句执行的返回值
* parameterType：参数类型！

### select（查）

选择、查询语句：

* 编写接口

```java
//根据ID查询用户
    User getUserById(int id);
```

* 编写对应的mapper中的sql语句

```xml
<select id="getUserById" parameterType="int" resultType="com.nepenthe.pojo.User">
    select *
    from user
    where id = #{id}
</select>
```

* 测试

```java
    public void getUserById() {
        SqlSession sqlSession = MybatisUtils.getSqlSession();

        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
//根据ID查询用户
        User user = mapper.getUserById(1);
        System.out.println(user);


        sqlSession.close();
    }
```

### Insert（增）

编写接口

```java
int addUser(User user);
```

编写对应mapper映射

```xml
<insert id="addUser" parameterType="com.nepenthe.pojo.User">
    insert into mybatis.user(id, name, pwd)
    VALUES (#{id}, #{name}, #{pwd})
</insert>
```

编写测试类

```java
public void addUer() {
    SqlSession sqlSession = MybatisUtils.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);

    mapper.addUser(new User(4, "zy", "123123"));
    //提交事务
    sqlSession.commit();
    sqlSession.close();
}
```

### Update（改）

编写接口

```java
int updateUser(User user);
```

编写对应mapper映射

```xml
<update id="updateUser" parameterType="com.nepenthe.pojo.User">
    update user
    set name = #{name},
        pwd=#{pwd}
    where id = #{id};
</update>
```

编写测试类

```java
@Test
public void updateUser() {
    SqlSession sqlSession = MybatisUtils.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    mapper.updateUser(new User(4, "zxy", "123123"));

    sqlSession.commit();
    sqlSession.close();
}
```

### Delete（删）

编写接口

```java
int deleteUser(int id);
```

编写对应mapper映射

```xml
<delete id="deleteUser" parameterType="int" >
    delete from user where id = #{id};
</delete>
```

编写测试类

```java
@Test
public void deleteUser() {
    SqlSession sqlSession = MybatisUtils.getSqlSession();
    UserMapper mapper = sqlSession.getMapper(UserMapper.class);
    mapper.deleteUser(4);

    sqlSession.commit();
    sqlSession.close();
}
```

### Map(==未完==)

假设,我们的实体类，或者数据库中的表、字段或者参数过多，我们应当考虑使用Map



### 模糊查询

1.Java代码执行的时候,传递通配符%	%

```java
List<User> userList = mapper.getUserLike("%李%");
```

2.在sql拼接中使用通配符

```sql
select * from mybatis.user where name like "%"#{value}"%"
```

## 配置解析

### 核心配置文件

* mybatis-config.xml
* Mybatis的配置文件包含了会深深影响MyBatis行为的设置和属性信息

```xml
configuration（配置）
properties（属性）
settings（设置）
typeAliases（类型别名）
typeHandlers（类型处理器）
objectFactory（对象工厂）
plugins（插件）
environments（环境配置）
environment（环境变量）
transactionManager（事务管理器）
dataSource（数据源）
databaseIdProvider（数据库厂商标识）
mappers（映射器）
```

### 环境变量(environments)

Mybatis可以配置成适应多种环境

**尽管可以配置多个环境，但每个sqlSessuibFactory实例只能选择一种环境**

学会使用配置多套运行环境

Mybatis默认的事务管理器是[[JDBC]],连接池:POOLED

 ```xml
<environments default="development">
  <environment id="development">
    <transactionManager type="JDBC">
      <property name="..." value="..."/>
    </transactionManager>
    <dataSource type="POOLED">
      <property name="driver" value="${driver}"/>
      <property name="url" value="${url}"/>
      <property name="username" value="${username}"/>
      <property name="password" value="${password}"/>
    </dataSource>
  </environment>
</environments>
 ```

#### 事务管理器(transactionManager)

面试考点==事务管理器两种分别为	[[JDBC]]与MANAGED==

#### 数据源(dataSource)

三种内建数据源类型	==UNPOOLED	POOLED	JNDI==

数据池:用完可回收

##### UNPOOLED(无连接池)

##### POOLED(有连接池)

##### JNDI(正常连接)

三种外接数据源类型	==dbcp	c3p0	druid==

### 属性(properties)

我们可以通过properties属性来实现引用配置文件

可外部配置且可动态替换的，既可以在典型的Java属性文件中配置，亦可通过properties元素的子元素来传递。[db.properties]

#### 编写一个配置文件

* db.properties

```properties
driver=org.mariadb.jdbc.Driver
url=jdbc:mariadb://localhost:3306/xxx
username=
passwd=
```

#### 引入一个配置文件

```xml
    <properties resource="db.properties">
        <property name="username" value="root"/>
    </properties>
```

* 可以直接引入外部文件
* 可以在其中增加一些属性配置
* ==当properties配置与外部文件冲突时，优先外部配置文件中的定义==

### 类型别名(typeAliases)

* 类型别名是为Java类型设置一个短的名字
* 存在的意义仅在于用来减少类完全限定名的冗余。

 ```xml
   <!--可以给实体类起别名--> 
    <typeAliases>
        <typeAlias type="com.nepenthe.pojo.User"    alias="User"/>
    </typeAliases>
 ```

也可以指定一个包名，Mybatis会在包名下面搜索需要的Java  Bean,比如:

扫描实体类的包,它的默认别名就为这个类的 类名,首字母小写

```xml
	<typeAliases>
        <typeAlias type="com.nepenthe.pojo.User"    alias="User"/>
        <package name="com.nepenthe.pojo"/>
    </typeAliases>
```

在实体类比较少的时候,使用第一种方式.

如果实体类十分多，建议使用第二种.

第一种可以DIY别名，第二种	**不行**	(可通过注解修改别名)

### 设置

**Mybatis中极为重要的调整设置,它们会改变Mybatis的运行时行为**

![image-20210720185658912](https://github.com/1677883418/TyporaBed/raw/master/img/202108210231157.png)

![image-20210720185636618](https://github.com/1677883418/TyporaBed/raw/master/img/202108210231158.png)

### 其他配置

- [typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)

- [objectFactory（对象工厂）](https://mybatis.org/mybatis-3/zh/configuration.html#objectFactory)
- [plugins（插件）](https://mybatis.org/mybatis-3/zh/configuration.html#plugins)
    * mybatis-generator-core
    * mybatis-plus
    * 通用mapper

### 映射器(mappers)

MapperRegistry:注册绑定我们的Mapper文件;

* 方法一:[==推荐使用==]

```xml
<!-- 使用相对于类路径的资源引用 -->
<mappers>
  <mapper resource="org/mybatis/builder/AuthorMapper.xml"/>
</mappers>
```

* 方法二:使用Class文件绑定注册

```xml
<!-- 使用映射器接口实现类的完全限定类名 -->
<mappers>
  <mapper class="org.mybatis.builder.AuthorMapper"/>
</mappers>
```

* 注意点:
    * 接口和Mapper配置文件必须同名
    * 接口和他的Mapper配置文件必须在同一个包下

* 方式三:扫描包进行注入绑定

```xml
<!-- 将包内的映射器接口实现全部注册为映射器 -->
<mappers>
  <package name="org.mybatis.builder"/>
</mappers>
```

* 注意点:
    * 接口和Mapper配置文件必须同名
    * 接口和他的Mapper配置文件必须在同一个包下

### 作用域和生命周期

![image-20210724115625357](https://github.com/1677883418/TyporaBed/raw/master/img/202108210231159.png)

生命周期和作用域是至关重要的,错误的使用会导致非常严重的并发问题。

**SqlSessionFactoryBuilder**:

* 一旦创建了sqlSessionFactory,就不再需要它了
* 局部变量

**SqlSessionFactory**:

* **约等于数据库连接池**
* SqlSessionFactory一旦被创建就应该在应用的运行期间一直存在,**没有任何理由丢弃它或重新创建另一个实例**.
* 因此SqlSessionFactory的最佳作用域是应用作用域。
* 最简单的就是使用单例模式或者静态单例模式。

**SqlSession**:

* 连接到连接池的一个请求
* SqlSession的实例不是线程安全的,因此是不能被共享的，因此它的最佳作用域是请求或方法作用域。
* 用完之后应该关闭,否则资源被占用。

![image-20210724121723764](https://github.com/1677883418/TyporaBed/raw/master/img/202108210231160.png)

这里面的每一个Mapper,就代表一个具体的业务

## 解决属性名和字段名不一致的问题

### 问题

数据库中的字段

![image-20210731114526062](https://github.com/1677883418/TyporaBed/raw/master/img/202108210231161.png)

新建一个项目，拷贝之前的，测试实体类字段不一致的情况

```java
public class User {
    private int id;
    private String name;
    private String password;
}
```

测试出现问题

![image-20210731144920023](https://github.com/1677883418/TyporaBed/raw/master/img/202108210231162.png)

```sql
        select *
        from mybatis.user
        where id = #{id}
# 类型处理器
        select id,name,password
        from mybatis.user
        where id = #{id}
```

解决方法:

* 起别名:

```xml
<!--select查询语句-->
<select id="getUserById" resultType="com.nepenthe.pojo.User">
    select id,name,pwd as password
    from mybatis.user
    where id = #{id}
</select>
```

*

### resultMap

结果集映射

```
id name pwd
id name password
```

```xml
<!--  结果集映射  -->
<resultMap id="UserMap" type="User">
    <!--    column数据库中的字段   property实体类中的属性    -->
    <result column="id" property="id"/>
    <result column="name" property="name"/>
    <result column="pwd" property="password"/>
</resultMap>
```

* `resultMap`元素是MyBatis中最重要最强大的元素
* ResultMap的设计思想是,对于简单的语句根本不需要配置显式的结果映射,而对于复杂一点的语句只需要描述它们的关系就行了。
* `ResultMap`最优秀的地方在于,虽然你已经对他相当了解了,但是根本就不需要显式地用到它们。
* 如果世界总是这么简单就好了

## 日志工厂

如果一个数据库操作出现了异常,我们需要排错。日志就是最好的助手

曾经:sout，debug

现在:日志工厂

![image-20210802123628071](https://github.com/1677883418/TyporaBed/raw/master/img/202108210231163.png)

* SLF4J
* LOG4J [掌握]
* LOG4J2
* JDK_LOGGING
* COMMONS_LOGGING
* STDOUT_LOGGING [掌握]
* NO_LOGGING

在mybatis中具体使用哪个日志实现,在设置中设定

**STDOUT_LOGGING 标准日志输出**

### Log4j

什么是Log4j

* Log4j是Apache的一个开源项目,通过使用Log4j,我们可以控制日志信息输出的目的地是控制台,文件,GUI组件

* 通过定义每一条日志信息的级别,我们能够更加细致地控制日志的生成过程。
* 通过一个配置文件来灵活地进行配置,而不需要修改应用的代码。

1. 先导入log4j的包

```xml
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

2. log4j.properties

```properties
#将等级为DEBUG的日志信息输出到console和file这两个目的地，console和file的定义在下面的代码
log4j.rootLogger=DEBUG,console,file

#控制台输出的相关设置
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.Target = System.out
log4j.appender.console.Threshold=DEBUG
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=【%c】-%m%n

#文件输出的相关设置
log4j.appender.file = org.apache.log4j.RollingFileAppender
log4j.appender.file.File=./log/kuang.log
log4j.appender.file.MaxFileSize=10mb
log4j.appender.file.Threshold=DEBUG
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=【%p】【%d{yy-MM-dd}】【%c】%m%n

#日志输出级别
log4j.logger.org.mybatis=DEBUG
log4j.logger.java.sql=DEBUG
log4j.logger.java.sql.Statement=DEBUG
log4j.logger.java.sql.ResultSet=DEBUG
log4j.logger.java.sql.PreparedStatement=DEBUG


```

3. 配置log4j为日志的实现

```xml
    <settings>
        <setting name="logImpl" value="STDOUT_LOGGING"/>
    </settings>
```

4. log4j的使用

    1. 在要使用log4j的类中,导入包import org.apache.log4j.Logger;
    2. 日志对象，参数为当前类的class

   ```java
       static Logger logger = Logger.getLogger(UserDaoTest.class);
   ```

    3. 日志级别

   ```java
   logger.info("1");
   logger.debug("1");
   logger.error("3");
   ```

   