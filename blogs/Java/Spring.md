---
title: Spring
sidebar: 'auto'
date: 2021-6-23 
tags:
- Spring
categories:
- Java
---

:::tip
Java现代化基础框架
:::


# spring

## Spring拓展

* Spring Boot
    * 一个快速开发的脚手架
    * 基于SpringBoot可以快速的开发单个微服务。
    * 约定大于配置!
* Spring Cloud
    * Spring Cloud 是基于SpringBoot实现的。

大部分公司都在使用SpringBoot进行快速开发,学习SpringBoot的前提,需要完全掌握Spring以及SpringMVC

## Spring的开发步骤

1. 导入坐标
2. 创建Bean
3. 创建applicationContext.xml
4. 在配置文件中进行配置
5. 创建ApplicationContext对象getBean

IOC理论推导

1. UserDao接口
2. USerDaoImpl实现类
3. USerService业务接口
4. UserServiceImpl 业务实现类



在之前的业务中,用户的需求可能会影响我们原来的代码,我们需要根据用户的需求去修改源代码,如果程序代码量十分大,修改一次的成本代价昂贵



使用一个Set接口实现:

```java
    private UserDao userDao;
	
//利用set进行动态实现值的注入
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }


```

* 之前,程序主动创建对象,控制权在程序员手上
* 使用set注入后,程序不再具有主动性,变成了被动的接受对象



控制反转思想,从本质上解决了问题,我们程序员不用再去管理对象的创建了.系统的耦合性大大降低,可以更加专注的在业务的实现上，这是Ioc的原型

# 第一个Spring程序

项目结构：

![image-20210807163750790](https://github.com/1677883418/TyporaBed/raw/master/img/202108210230421.png)

实现步骤:

* 创建实体类 Hello:

```java
public class Hello {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String  toString() {
        return "Hello{" +
                "name='" + name + '\'' +
                '}';
    }
}
```

* 创建Spring配置文件 ApplicationContext.xml:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
<!--使用Spring创建对象,在Spring中称为Bean
Hello hello = new Hello();
id = 对象名
class=实体类文件位置
property name= 变量名
ref:引用Spring容器中创建好的对象
value:具体的值,基本数据类型
-->
    <bean id="hello" class="com.nepenthe.pojo.Hello">
        <property name="name" value="spring"/>
    </bean>

</beans>
```

实现类：

```java
    public static void main(String[] args) {
        //获取Spring的上下文对象
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("ApplicationContext.xml");
        Object hello = context.getBean("hello");
        System.out.println(hello.toString());
    }
```

## IOC创建对象的方式

1. 使用无参构造创建对象,默认
2. 假如我们要使用有参构造建造对象

```xml
<!--  下标赋值  -->
<bean id="hello" class="com.nepenthe.pojo.Hello">
    <constructor-arg index="0" value="zxy"/>
</bean>
```



```xml
<!--  通过类型创建（不建议使用）  -->
<bean id="hello" class="com.nepenthe.pojo.Hello">
<constructor-arg type="java.lang.String" value="zxy"/>
</constructor-arg>
</bean>
```



```xml
<!--  直接通过参数名创建  -->
<bean id="hello" class="com.nepenthe.pojo.Hello">
<constructor-arg name="name" value="zxy"/>
</bean>
```

总结:在配置文件加载的时候,容器中管理的对象就已经初始化了

# Spring配置

## 别名

```xml
<alias name="user" alias="user2"/>
```



```xml
<!--
id:bean的唯一标识符,相当于对象名
class:bean对象所对应的全限定名:包名+类型
name:也是别名,而且name可以同时取多个别名
-->
    <bean id="user" class="com.nepenthe.pojo.User" name="user3">
```

## import[合并xml配置文件]

* 应用场景:一般用于团队开发使用,他可以将多个配置文件,导入合并为一个。

当多人开发时,可以将不同的bean集合，利用import将所有人的beans.xml合并为一个总的

```xml
<import resource="ApplicationContext.xml"/>
<import resource="bean2.xml"/>
<import resource="bean1.xml"/>
```

## DI依赖注入



### 构造器注入

```xml
<!--  下标赋值  -->
<bean id="hello" class="com.nepenthe.pojo.Hello">
    <constructor-arg index="0" value="zxy"/>
</bean>
```



```xml
<!--  通过类型创建（不建议使用）  -->
<bean id="hello" class="com.nepenthe.pojo.Hello">
<constructor-arg type="java.lang.String" value="zxy"
</bean>
```



```xml
<!--  直接通过参数名创建  -->
<bean id="hello" class="com.nepenthe.pojo.Hello">
<constructor-arg name="name" value="zxy"/>
</bean>
```

### Set注入[重点]

* 依赖注入:Set注入
    * 依赖:Bean对象的创建依赖于容器
    * 注入:Bean对象中的所有属性,由容器来注入！



#### [环境搭建]

##### 复杂类型

```java
public class Address {
    private String address;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
```

##### 真实测试对象

```java
public class Student {

    private String name;
    private Address address;
    private String[] books;
    private List<String> hobbies;
    private Map<String,String> card;
    private Set<String> games;
    private Properties info;
}
```

#### ApplicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="address" class="com.nepenthe.pojo.Address">
        <property name="address" value="西安"/>
    </bean>
    <bean id="student" class="com.nepenthe.pojo.Student">
        <!--普通类型值注入,value-->
        <property name="name" value="GoodSir"/>
        <!--Bean注入,ref-->
        <property name="address" ref="address"/>
        <!--数组注入,ref-->
        <property name="books">
            <array>
                <value>红楼梦</value>
                <value>西游记</value>
                <value>水浒传</value>
                <value>三国演义</value>
            </array>
        </property>

        <!--List-->
        <property name="hobbies">
        <list>
            <value>听歌</value>
            <value>编程</value>
            <value>看电影</value>
        </list>
        </property>
        <!--Map-->
        <property name="card">
            <map>
                <entry key="身份证" value="111111111111"/>
                <entry key="银行卡" value="123123123123"/>
            </map>
        </property>

        <property name="games">
            <set>
                <value>Lol</value>
                <value>CSGO</value>
            </set>
        </property>
        <!--null-->
        <property name="wife">
            <null/>
        </property>
        <!--Properties-->
        <property name="info">
            <props>
                <prop key="学号">20199999</prop>
                <prop key="性别">男</prop>
            </props>
        </property>
    </bean>
</beans>
```

#### 测试类

```java
public class MyTest {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("ApplicationContext.xml");
        Student student = (Student) context.getBean("student");
        System.out.println(student.toString());
    }
}
```



### 拓展注入

可以使用p命名空间和c命名空间进行注入

* 导入命名空间[不能直接使用,需要导入xml约束]

```xml
   xmlns:p="http://www.springframework.org/schema/p"
   xmlns:c="http://www.springframework.org/schema/c"
```

* 使用命名空间

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:c="http://www.springframework.org/schema/c"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">


    <!--p命名空间注入,可以直接注入属性的值:property-->
    <bean id="user" class="com.nepenthe.pojo.User" p:name="GoodSir" p:age="18"/>

    <!--c命名空间注入,通过构造器注入:construct-args-->
    <bean id="user2" class="com.nepenthe.pojo.User"c:name="GoodSir" c:age="18"/>

</beans>
```

## bean的作用域

| Scope                                                        | Description                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [singleton](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-singleton) | (Default) Scopes a single bean definition to a single object instance for each Spring IoC container. |
| [prototype](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-prototype) | Scopes a single bean definition to any number of object instances. |
| [request](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-request) | Scopes a single bean definition to the lifecycle of a single HTTP request. That is, each HTTP request has its own instance of a bean created off the back of a single bean definition. Only valid in the context of a web-aware Spring `ApplicationContext`. |
| [session](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-session) | Scopes a single bean definition to the lifecycle of an HTTP `Session`. Only valid in the context of a web-aware Spring `ApplicationContext`. |
| [application](https://docs.spring.io/spring-framework/docs/current/reference/html/core.html#beans-factory-scopes-application) | Scopes a single bean definition to the lifecycle of a `ServletContext`. Only valid in the context of a web-aware Spring `ApplicationContext`. |
| [websocket](https://docs.spring.io/spring-framework/docs/current/reference/html/web.html#websocket-stomp-websocket-scope) | Scopes a single bean definition to the lifecycle of a `WebSocket`. Only valid in the context of a web-aware Spring `ApplicationContext`. |

1. 单例模式(Spring默认机制)

```xml
<bean id="user2" class="com.nepenthe.pojo.User" c:name="GoodSir" c:age="18" scope="singleton"/>
```

2. 原型模式:每次从容器中get的时候,都会产生一个新对象.

```xml
<bean id="user2" class="com.nepenthe.pojo.User" c:name="GoodSir" c:age="18" scope="prototype"/>
```

3. 其余的request,session,application,这些只能在Web开发中使用到。

## Bean的自动装配

* 自动装配是Spring满足bean依赖一种方式
* Spring会在上下文中自动寻找,并自动给bean装配属性



在spring中有三种装配的方式

1. 在xml中显示的配置
2. 在Java中显示配置
3. 隐式的自动装配bean[重要]

### 测试

[环境搭建]

一个人有两个宠物

### Byname自动装配

```xml
<!--byname:会自动在容器上下文中查找,和自己对象set方法后面的值对应的beanid-->
    <bean id="people" class="com.nepenthe.pojo.People" autowire="byName">
        <property name="name" value="GoodSir"/>
    </bean>
```

### ByType自动装配

```xml 
    <bean class="com.nepenthe.pojo.Cat"/>
    <bean class="com.nepenthe.pojo.Dog"/>
<!--
    byname:会自动在容器上下文中查找,和自己对象set方法后面的值对应的beanid
    byType:会自动在容器上下文中查找,和自己对象属性类型相同的bean!
-->
    <bean id="people" class="com.nepenthe.pojo.People" autowire="byType">
        <property name="name" value="GoodSir"/>
    </bean>
```

总结:

* byname的时候,需要保证所有bean的id唯一,并且这个bean需要和自动注入的属性的set方法的值一致
* bytype的时候,需要保证所有bean的class唯一,并且这个bean需要和自动注入的属性的类型一致

### 注解自动装配

jdk1.5支持的注解,spring2.5就支持了

要使用注解须知:

* 导入约束
* 配置注解的支持

``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        https://www.springframework.org/schema/context/spring-context.xsd">

        <context:annotation-config/>
        
</beans>
```



#### @Autowired

直接在属性上使用即可,也可以在Set方式上使用!

使用AutoWired 可以不用编写Set方法,前提是该自动装配的属性在IOC(Spring)容器中存在,且符合名字byname

**过程**:首先通过byType装配,若找不到则通过byName自动装配

**注意**:若byType与byName都无法找到,则使用`@Qualifier(value = "xxxxxx")指定一个bean对象实现装配`

```java
@Autowired
@Qualifier(value = "dog222")
private Dog dog;
```

科普：

```xml
@Nullable	字段标记了这个注解,说明这个字段可以为Null
```



```java
public People(@Nullable Cat cat, Dog dog, String name) {
    this.cat = cat;
    this.dog = dog;
    this.name = name;
}
```

演示:

```java
    //如果显示定义了Autowired的required属性为false,说明这个对象可以为null,否则不允许唯恐
    @Autowired(required = false)
    private Cat cat;
    @Autowired
    private Dog dog;
```

#### @Resource

javax注解,不常用

* 与**@Autowired**区别:
    * @Autowired:先byType,后byName
    * @Resource：先byName,后byType

## 使用注解开发

在Spring4之后,要使用注解开发，必须要保证aop包导入。

1. Bean

2. 属性如何注入

   ```java
   //<bean id="user" class="com.nepenthe.pojo.User"/>
   //@Component 组件
   @Component
   public class User {
   //<property name="name" value="GoodSir"/>
       @Value("GoodSir")
       public String name;
   }
   ```



3. 衍生的注解

   `@Component`有几个衍生注解,我们在web开发中,会按照mvc三层架构分层

    * dao[@Repository]
    * service[@Service]
    * controller[@Controller]

   这四个注解功能一样,都是代表将某个类注册到Spring中,装配Bean

4. 自动装配 配置

   ```java
   - @Autowired	自动装配通过类型,名字
   	如果Autowired不能唯一自动装配上属性,则需要通过@Qualifier(value = "xxxx")
   - @Nullable		字段标记了这个注解,可以为Null
   - @Resource		自动装配通过名字,类型
   ```



5. 作用域

   ```java
   @Component
   @Scope("prototype")
    public class User {
   
       @Value("GoodSir")
       public String name;
   }
   ```



6. 小结

   xml与注解:

    * **xml**：更加万能,适用于任何场合，维护简单方便
    * **注解**：不是自己的类不能使用，维护相对复杂！

   xml与注解实践;

    * xml用来管理Bean
    * 注解只负责完成属性的注入;

    * 我们在使用的过程中,只需要注意一个问题:必须让注解生效,就需要开启注解的支持



**注意**:使用注解需要导入context约束,增加注解的支持！



## 使用Java的方式配置Spring

完全不使用Spring的xml配置,全权交给Java来做

JavaConfig是spring的一个子项目,在spring 4之后,他成为了一个核心功能

```java
package com.nepenthe.config;

import com.nepenthe.pojo.User;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

//会被Spring容器托管,注册到容器中,因为他本事是一个@Component
//@Configuration代表这是一个配置类,就和我们之前看的Application.xml一样
@ Configuration
//整包装配
@ComponentScan("com.nepenthe.pojo")
//导入 [合并] 配置文件
@Import(Myconfig.class)
public class Myconfig {

    //注册一个Bean,就相当于我们之前写的一个bean标签
    //方法名字相当与bean标签中id属性
    //方法返回值,相当于bean标签中的class属性
    @Bean
    public User User() {
        //返回要注入到bean的对象
        return new User();
    }
}
```

测试类

```java
public class Test {
    public static void main(String[] args) {
        //如果完全使用了配置类方式去做,我们就只能通过AnnotationConfig 上下文来获取容器,通过配置类的class对象加载
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(Myconfig.class);
        User getUser = (User) context.getBean("getUser");
        System.out.println(getUser.getName());
    }
}
```

这种纯Java的配置方式,在SpringBoot中随处可见



## 代理模式

SpringAOP的底层	[SpringAOP和SpringMVC]



角色分析:

* 抽象角色:一般会使用接口或者抽象类来解决
* 真实角色:被代理的角色
* 代理角色:代理真实角色,代理真实角色后,我们一般会做一些附属操作
* 客户:访问代理对象的人





代理模式的好处:

* 可以使真实角色的操作更加纯粹,不去关注一些公共的业务
* 公共交给代理角色，实现了业务的分工
* 公共业务发生扩展的时候,方便集中管理



缺点:

* 一个真实角色就会产生一个代理角色;代码量增加,开发效率会变低。

代理模式的分类：



### 静态代理

* 真实角色

```java
package com.nepenthe.demo01;

/**
 * 租房
 */
public interface Rent {
    public void rent();
}
```

* 代理角色

```java
package com.nepenthe.demo01;

public class Proxy implements Rent{
    private Host host;

    public Proxy() {
    }

    public Proxy(Host host) {
        this.host = host;
    }

    @Override
    public void rent() {
    host.rent();
    }

    //看房
    public void seeHouse(){
        System.out.println("看房");
    }
    public void fare(){
        System.out.println("收中介费");
    }
}
```

* 客户

```java
package com.nepenthe.demo01;

public class Client {
    public static void main(String[] args) {
        Host host = new Host();
        //代理
        Proxy proxy = new Proxy(host);
        proxy.rent();
    }
}
```





### 动态代理

* 动态代理和静态代理角色一样
* 动态代理的代理类是动态生成的,不是直接写好的
* 动态代理分为两大类:基于接口的动态代理,基于类的动态代理
    * 基于接口---JDK 动态代理
    * 基于类--- cglib
    * java字节码实现: javassist



proxy: 代理,InvocationHandler: 调用处理程序



好处:

* 可以使真实角色的操作更加纯粹!不用去关注一些公共的业务
* 公共也就交给代理角色,实现了业务的分工
* 公共业务发生扩展的时候,方便集中管理
* 一个动态代理类代理的是一个接口,一般就是对应的一类业务
* 一个动态代理类可以代理多个类,只要是实现了同一个接口即可。



## AOP

### Spring实现Aop

[**重点**]使用Aop,需要导入一个依赖包

```xml  
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.4 </version>
</dependency>
```



方式一：使用spring的API接口

```xml
    <aop:config>
<!--切入点:express:表达式,execution(要执行的位置:* * * * *)-->
        <aop:pointcut id="pointcut" expression="execution(* com.nepenthe.service.UserServiceImpl.*(..))"/>

        <!--执行环绕增加-->
        <aop:advisor advice-ref="log" pointcut-ref="pointcut"/>
        <aop:advisor advice-ref="aferLog" pointcut-ref="pointcut"/>
    </aop:config>
```

方式二:自定义来实现AOP[**切面定义**]

```xml
<!--方式二:自定义类-->
<bean id="diy" class="com.nepenthe.diy.DiyPointCut"/>
<aop:config>
    <!--自定义切面,ref要引用的类-->
    <aop:aspect ref="diy">
        <!--切入点-->
        <aop:pointcut id="point" expression="execution(* com.nepenthe.service.UserServiceImpl.*(..))"/>
        <!--通知
            aop:before          代理前操作
                method          执行方法
                pointcut-ref    切入点
		-->
        <aop:before method="before" pointcut-ref="point"/>
        <aop:after method="after" pointcut-ref="point"/>
    </aop:aspect>
</aop:config>
```

方式三:使用注解开发

```xml
<!--方式三-->
    <bean id="pointCut" class="com.nepenthe.diy.PointCut"/>
<!--开启注解支持  JDK(默认)（expose-proxy="false"） cglib（expose-proxy="true"）-->
    <aop:aspectj-autoproxy expose-proxy="true"/>
```

# 整合Mybatis

步骤:

* 导入相关jar包
    * junit
    * mybatis
    * mysql
    * spring相关
    * aop织入
    * mybatis-spring

pom.xml

```xml
    <dependencies>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.1</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.5</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.3.1</version>
        </dependency>
        <!--Spring操作数据库的花,还需要一个spring-jdbc-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.1.9.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.aspectj</groupId>
            <artifactId>aspectjweaver</artifactId>
            <version>1.9.4</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.5</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>2.0.2</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.16</version>
        </dependency>
        <!-- https://mvnrepository.com/artifact/org.mariadb.jdbc/mariadb-java-client -->
        <dependency>
            <groupId>org.mariadb.jdbc</groupId>
            <artifactId>mariadb-java-client</artifactId>
            <version>2.7.3</version>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.25</version>
        </dependency>
    </dependencies>

```

* 编写配置文件
* 测试

## 回顾mybatis

1. 编写实体类
2. 编写核心配置文件
3. 编写接口
4. 编写Mapper.xml
5. 测试



## Mybatis-Spring

1. 编写数据源配置
2. sqlSessionFactory
3. sqlSessionTemplate
4. 给接口加实现类[]
5. 将自己写的实现类,注入到Spring中
6. 测试使用



实现步骤

* 编写数据源配置
* 注入sqlSessionFactory
* 注入sqlSessionTemplate

* [spring-dao.xml]

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd">

    <!--DataSource:使用Spring的数据源代替Mybatis的配置 c3p0    dbcp    druid
    这里使用spring提供的jdbc
    -->
    <bean id="dataSource" 
class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="org.mariadb.jdbc.Driver"/>
        <property name="url" value="jdbc:mariadb://localhost:3306/mybatis"/>
        <property name="username" value="root"/>
        <property name="password" value="Zxy020817@@.."/>
    </bean>
<!--注入sqlSessionFactory-->
    <bean id="sqlSessionFactory" 
          class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>

<!--绑定Mybatis配置文件-->
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
        <property name="mapperLocations" value="classpath:com/nepenthe/mapper/*.xml"/>
    </bean>


<!--SqlSessionTemplate:就是我们使用的SqlSession-->
    <bean id="sqlSession"
          class="org.mybatis.spring.SqlSessionTemplate">
<!--只能使用构造器注入sqlsessionFactory,因为没有Set方法-->
        <constructor-arg index="0" ref="sqlSessionFactory"/>
    </bean>

    <bean id="userMapper2" 		
          class="com.nepenthe.mapper.UserMapperImpl2">
        <property name="sqlSessionFactory" 
                  ref="sqlSessionFactory"/>
     </bean>
 </beans>
```

* 编写接口[UserMapper]

```java
package com.nepenthe.mapper;

import com.nepenthe.pojo.User;

import java.util.List;

public interface UserMapper {
    public List<User> selectUser();
}
```

* 编写实现类[UserMapperImpl]

    * 方法一:通过new注入sqlSessionFactory

  ```java
  package com.nepenthe.mapper;
  
  import com.nepenthe.pojo.User;
  import org.mybatis.spring.SqlSessionTemplate;
  
  import java.util.List;
  
  /**
   * Mybatis-plus 通用mapper
   */
  public class UserMapperImpl implements UserMapper {
  
      //我们的所有操作都是用SqlSession来执行,原来都是用sqlSessionTemplate;
  
      private SqlSessionTemplate sqlSession;
  
      public void setSqlSession(SqlSessionTemplate sqlSession) {
          this.sqlSession = sqlSession;
      }
  
      @Override
      public List<User> selectUser() {
          UserMapper mapper = sqlSession.getMapper(UserMapper.class);
          return mapper.selectUser();
      }
  }
  ```

  通过Bean注入sqlSessionFactory,sqlSessionTemplate

  ```xml
      <!--SqlSessionTemplate:就是我们使用的SqlSession-->
      <bean id="sqlSession" class="org.mybatis.spring.SqlSessionTemplate">
  <!--只能使用构造器注入sqlsessionFactory,因为没有Set方法-->
          <constructor-arg index="0" ref="sqlSessionFactory"/>
      </bean>
  
      <bean id="userMapper2" class="com.nepenthe.mapper.UserMapperImpl2">
          <property name="sqlSessionFactory" ref="sqlSessionFactory"/>
       </bean>
  ```

    * 方法二:通过继承`SqlSessionDaoSupport`类实现

  ```java
  package com.nepenthe.mapper;
  
  import com.nepenthe.pojo.User;
  import org.apache.ibatis.session.SqlSession;
  import org.mybatis.spring.support.SqlSessionDaoSupport;
  
  import java.util.List;
  
  public class UserMapperImpl2 extends SqlSessionDaoSupport implements UserMapper {
  
      @Override
      public List<User> selectUser() {
          return getSqlSession().getMapper(UserMapper.class).selectUser();
      }
  }
  ```

  通过Bean注入sqlSession

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns:aop="http://www.springframework.org/schema/aop"
         xsi:schemaLocation="http://www.springframework.org/schema/beans
          https://www.springframework.org/schema/beans/spring-beans.xsd
          http://www.springframework.org/schema/aop
          https://www.springframework.org/schema/aop/spring-aop.xsd">
  <!--导入其他xml配置-->
      <import resource="spring-dao.xml"/>
  <!--通过bean注入sqlSession-->
      <bean id="userMapper" class="com.nepenthe.mapper.UserMapperImpl">
          <property name="sqlSession" ref="sqlSession"/>
      </bean>
  </beans>
  ```





## 声明式事务

### 回顾事务

* 要么都成功,要么都失败
* 事务在项目开发中十分重要,涉及到数据的一致性问题
* 确保完整性和一致性



事务ACID原则:

* 原子性
* 一致性
* 隔离性
    * 多个业务可能操作同一资源,防止数据损坏。
* 持久性
    * 事务一旦提交,无论系统发生什么问题，结果都不会再被影响,被持久化的写到存储器中

### Spring中的事务管理

* 声明式事务:AOP
* 编程式事务: 需要在代码中,进行事务的管理

Spring配置文件中开启事务[ApplicationContext.xml]:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        https://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        https://www.springframework.org/schema/aop/spring-aop.xsd
        http://www.springframework.org/schema/tx
        https://www.springframework.org/schema/tx/spring-tx.xsd">

    <!--配置声明式事务-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <constructor-arg ref="dataSource"/>
    </bean>


<!--结合Aop实现事务的织入-->
<!--配置事务通知:-->
    <tx:advice id="txAdvice" transaction-manager="transactionManager">
<!--配置事务的传播特性:new   propagation-->
        <tx:attributes>
            <tx:method name="add" propagation="REQUIRED"/>
            <tx:method name="delete" propagation="REQUIRED"/>
            <tx:method name="update" propagation="REQUIRED"/>
            <tx:method name="query" read-only="true"/>
            <tx:method name="*"/>
        </tx:attributes>
    </tx:advice>

<!--配置事务切入-->
    <aop:config>
        <aop:pointcut id="txPointCut" expression="execution(* com.nepenthe.mapper.*.*(..))"/>
        <aop:advisor advice-ref="txAdvice" pointcut-ref="txPointCut"/>
    </aop:config>
</beans>
```

事务属性的区别:

![](https://github.com/1677883418/TyporaBed/raw/master/img/202108210229405.png)

   