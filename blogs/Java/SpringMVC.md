---
title: SpringMVC
date: 2021-7-1 
tags:
- SpringMVC
categories:
- Java
---

::: tip
Spring家族中,用于替换**Servlet**的现代化web框架
:::

# SpringMVC

ssm:mybatis+Spring+SpringMVC MVC三层架构

## MVC三层架构

模型(dao,Service,Model)    视图(JSP)    控制层(Controller)

### 模型层(Model)

主要包含数据层和服务层

* 数据层(Dao)
    * 提供了模型
* 服务层(行为Service)
    * 提供了模型数据查询和模型数据的状态更新等

**职责分析**：

1. 业务逻辑
2. 保存数据状态

### 视图层(View)

主要包含View层

**职责分析**:

1. 显示页面

### 控制层(Controller)

包含Controller层

**职责分析**:

1. 取得表单数据
2. 调用业务逻辑
3. 转向指定页面

### 执行流程

接受用户请求    >>>    委托给模型进行处理    >>>    返回的模型数据返回给视图层    >>>    视图层进行展示

## 第一个SpringMVC程序

### 项目流程

* 新建maven项目,添加web框架支持
* 导入SpringMVC依赖
* 配置web.xml,注册DispatcherServlet

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <!--注册DispatcherServlet-->
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!--关联一个SpringMVC的配置文件:[servlet-name]-servlet.xml-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
        <!--启动级别-->
        <load-on-startup>1</load-on-startup>
    </servlet>

    <!--    /   匹配所有的请求(不包括.jsp)-->
    <!--    /*   匹配所有的请求(包括.jsp)-->
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

#### 新建SpringMVC配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

</beans>
```

#### 在Spring配置文件中添加内置bean

* 添加 处理映射器

```xml
  <bean class="org.springframework.web.servlet.handler.BeanNameUrlHandlerMapping"/>
```

* 添加 处理器适配器

```xml
  <bean class="org.springframework.web.servlet.mvc.SimpleControllerHandlerAdapter"/>
```

* 添加 视图解析器

```xml
  <!--视图解析器:DispatcherServlet给的ModelAndView-->
      <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
          <!--前缀-->
          <property name="prefix" value="/WEB-INF/jsp/"/>
          <!--后缀-->
          <property name="suffix" value=".jsp"/>
      </bean>
```


* 编写操作业务Controller,要么实现Controller接口,要么增加注解;需要返回一个ModelAndView,装数据,封视图

**导入正确的包:import org.springframework.web.servlet.mvc.Controller;**

```
package com.nepenthe.controller;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.Controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author goodsir
 * 实现Controller接口
 */
public class HelloController implements Controller {
    @Override
    public ModelAndView handleRequest(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws Exception {
//      ModelAndView 模型和视图
        ModelAndView mv = new ModelAndView();
//      封装对象.放在ModelAndView中,Model
        mv.addObject("msg","HelloSpringMVC");
//      封装要跳转的视图,放在ModelAndView中
//        拼接后为/WEB-INF/jsp/hello.jsp
        mv.setViewName("hello");
        return mv;
    }
}

```

* 将类交给SpringIOC容器,注册bean.

```xml
<!--Handler-->
<bean id="/hello" class="com.nepenthe.controller.HelloController"/>
```

* 写要跳转的jsp页面

```
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    ${msg}
</body>
</html>
```

### 错误排查

#### 404未找到[首页404]:

**项目结构内，添加web模块即可**

![image-20210820143245328](https://github.com/1677883418/TyporaBed/raw/master/img/202109111628665.png)
``
#### 404错误[不生成target文件夹]

删除图中部分

![image-20210911164653782](https://github.com/1677883418/TyporaBed/raw/master/img/202109111646078.png)

404错误[目标控制器404]

**检查前缀和后缀**

#### 500内部错误

新建lib文件夹，将依赖手动导入。

![image-20210820143443955](https://github.com/1677883418/TyporaBed/raw/master/img/202108210226250.png)

## SpringMVC执行原理

![image-20210820150509883](https://github.com/1677883418/TyporaBed/raw/master/img/202108210226991.png)

### 执行流程

1. DispatchServlet表示前置控制器,是整个SpringMVC的控制中心.用户发出请求,DispatcherServlet接受请求并拦截请求。
    * 假设请求url为:http://localhost:8080/SpringMVC/hello
        * http://localhsot:8080    服务器域名
        * springMVC 部署在服务器上的web站点
        * hello 控制器
        * 如上url表示为:请求位于服务器localhost:8080上的SpringMVC站点的hello控制器。
2. HandlerMapping为处理器映射,DispatcherServlet调用HandlerMapping,HanderMapping根据url查找Handler
3. HandlerExecution表示具体的Handler,其主要作用是根据url查找控制器,如上url被查找控制器:hello.
4. HandlerExecution被解析后的信息传递给DispatcherServlet,如解析控制器映射等。
5. HandlerAdapter表示处理器适配器,其按照特定的规则去执行Handler。
6. Handler让具体的Controller执行。
7. Controller将具体的执行信息返回给HandlerAdapter,如ModelAndView.
8. HandlerAdapter将视图逻辑名或模型传递给DispatcherServlet.
9. DispatchServlet调用视图解析器(ViewResolver)来解析HandlerAdapter传递的逻辑视图名。
10. 视图解析器将解析的逻辑视图名传给DispatchServlet。

## SpringMVC注解开发

### 开发流程

配置Web.xml[同上]

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc-servlet.xml</param-value>
        </init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

新建SpringMVC配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd http://www.springframework.org/schema/mvc https://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <context:component-scan base-package="com.nepenthe.controller"/>
    <mvc:default-servlet-handler/>
    <mvc:annotation-driven/>

    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>


</beans>
```

编写Controller类

```java
package com.nepenthe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ControllerTest2 {
    @RequestMapping("t2")
    public String test1(Model model){
        model.addAttribute("msg","ControllerTest2");

        return "test";
    }
}
```

### SpringMVC注解

#### 组件注解

没有区别，只是为了区分功能

```
@Component		//组件
@Service		//Service
@Controller		//Controller
@Respository	//dao
```

## Restful 风格

### 功能

* 资源:互联网所有的事务都可以被抽象为资源
* 资源操作:使用POST,DELETE,PUT,GET,使用不同方法对资源进行操作。
* 分别对应 添加,删除,修改,查询。

传统方式操作资源:通过不同的参数来实现不同的效果！方法单一，post和get

* http://127.0.0.1/item/queryItem.action?id=1    查询,GET
* http://127.0.0.1/item/saveItem.action   新增,POST
* http://127.0.0.1/item/updateItem.action    更新,POST
* http://127.0.0.1/item/deleteItem.action?id=1    删除,GET或POST

使用RESTful操作资源:可以通过不同的**请求方式**来实现不同的效果!如下:请求地址一样,但是功能可以不同!

* http://127.0.0.1/item/1    查询,GET
* http://127.0.0.1/item       新增,POST
* http://127.0.0.1/item       更新,PUT
* http://127.0.0.1/item/1   删除,DELETE

### 学习测试

1. 新建一个类 RestFulController[原有方式]

```java
package com.nepenthe.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RestFulController {
    //原来的:http://localhost:8080/add?a=1&b=2
    //RestFul:http://localhost:8080/a/b
    @RequestMapping("/add")
    public String test1(int a, int b, Model model) {
        int res = a + b;
        model.addAttribute("msg", "结果为"+res);
        return "test";
    }
}
```

2. 在Spring MVC中可以使用@PathVariable 注解,让方法参数的值对应绑定到一个URI模板变量上。

## 重定向与转发

### **无视图解析器**——ServletApi实现

```java
@RequestMapping("/m1/t1")
public String test1(Model model) {
    model.addAttribute("msg", "ModelTest1");
    return "/test.jsp";
}

@RequestMapping("/rsm/t3")
public String test2() {
    return "forward:/index.jsp";
}

@RequestMapping("/rsm/t3")
public String test3() {
    return "redirect:/index.jsp";
}
```

### 有视图解析器——SpringMVC

```java
@Controller
public class ModelTest1 {
    @RequestMapping("/m1/t1")
    public String test1(Model model) {
        model.addAttribute("msg", "ModelTest1");
        return "/test.jsp";
    }

    @RequestMapping("/rsm/t2")
    public String test2() {
        return "forward:/test";
    }

    @RequestMapping("/rsm/t3")
    public String test3() {
        return "redirect:../../index";
    }
```

## 数据处理

### 传递参数

#### 单字段

```java
package com.nepenthe.controller;

import com.nepenthe.pojo.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author goodsir
 */
@Controller
@RequestMapping("/user")
public class UserController {

    //Localhost:8080/user/t1?username=xxx
    @GetMapping("/t1")
    public String test1(@RequestParam("username") String name, Model model) {
        //1.接受前端参数
        System.out.println("接收到前端的参数为" + name);
        //2.将返回的结果传递给前端,Model
        model.addAttribute("msg", name);
        //3.视图跳转
        return "test";
    }
}
```

#### 传递对象

```java
package com.nepenthe.controller;

import com.nepenthe.pojo.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author goodsir
 */
@Controller
@RequestMapping("/user")
public class UserController {
    /**
     * 前端接收对象: id   name    age
     */
    @GetMapping("t2")
    public String test2(User user) {
        System.out.println(user);
        return "test";
    }
}
```

url传入参数

![image-20210826021538533](https://github.com/1677883418/TyporaBed/raw/master/img/202109111628562.png)

输出结果

![image-20210826021512514](https://github.com/1677883418/TyporaBed/raw/master/img/202109111628174.png)

如果使用对象的花,前端传递的参数名和对象名必须一致，否则就是null.

### 数据显示到前端

#### 通过Model

```java
/**
 * 前端接收对象: id   name    age
 */
@GetMapping("t2")
public String test2(User user, Model model) {
    model.addAttribute("msg", user);
    System.out.println(user);
    return "test";
}
```

#### 通过ModelAndView

```java
@GetMapping("t2")
public ModelAndView test2(User user) {
    ModelAndView mv = new ModelAndView();
    mv.addObject("msg", user);
    mv.setViewName("test");
    return mv;
}
```

#### 通过ModelMap

```java
LinkedHashMap
    
ModelMap:继承了LinkHashMap,所以拥有LinkedHashMap的全部功能
    
Model:精简版(大部分情况,我们都直接使用model)
```

**和model用法基本一致 **

### 乱码问题

#### 通过Servlet原生filter(拦截器)拦截

创建filter包,EncodingFilter类

```java
package com.nepenthe.filter;

import javax.servlet.*;
import java.io.IOException;

public class EncodingFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        servletRequest.setCharacterEncoding("utf-8");
        servletResponse.setCharacterEncoding("utf-8");


        filterChain.doFilter(servletRequest,servletResponse);
    }

    @Override
    public void destroy() {

    }
}
```

配置web.xml

```xml

<filter>
    <filter-name>encoding</filter-name>
    <filter-class>com.nepenthe.filter.EncodingFilter</filter-class>
</filter>
<filter-mapping>
<filter-name>encoding</filter-name>
<!--/	过滤web资源(不包括jsp)-->
<!--/	过滤web资源(包括jsp)-->
<url-pattern>/*</url-pattern>
</filter-mapping>
```

#### 通过SpringMVC提供的拦截器

配置web.xml

```xml
<!--配置SpringMVC的乱码过滤-->
<filter>
    <filter-name>encoding</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>utf-8</param-value>
    </init-param>
</filter>
<filter-mapping>
<filter-name>encoding</filter-name>
<url-pattern>/</url-pattern>
</filter-mapping>
```

#### 注意

![image-20210826231443190](https://github.com/1677883418/TyporaBed/raw/master/img/202109111628953.png)

`<url-pattern>/<url-pattern>`**不过滤**jsp文件

`<url-pattern>/*<url-pattern>`**过滤**jsp文件

## JSON

### jackson

* Jackson是目前比较好的json解析工具
* 当然工具不止一个,比如还有阿里巴巴的fastjson等等。
* 这里使用Jackson,使用它需要导入jar包

```xml

<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.11.3</version>
</dependency>
```

* 配置SpringMVC需要的配置

web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring-servlet.xml</param-value>
        </init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>


    <!--配置SpringMVC的乱码过滤-->
    <filter>
        <filter-name>encoding</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>encoding</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
</web-app>
```

Controller控制层[UserController]

```java
package com.nepenthe.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nepenthe.pojo.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author goodsir
 */
@Controller
public class UserController {
    /**
     * @return ResponseBody 使用该注解,不走视图解析器,会直接返回一个字符串
     */
    @RequestMapping(value = "/j1")
    @ResponseBody
    public String json1() throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        User user = new User("goodsir", 18, "男");
        mapper.writeValueAsString(user);
        return user.toString();
    }
}
```

### FastJson

* FastJson是阿里开发的一款专门用于Java开发的包
* 可以方便的实现json对象与JavaBean对象的转换,实现JavaBean与json字符串的转换,实现json对象与json字符串的转换
* 实现json的转换方法很多，最后的实现结果都是一样的。

导入依赖

```xml

<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.62</version>
</dependency>
```

使用[**格式化时间戳**]

```java
@RequestMapping("/j4")
public String json4() {
    Date date = new Date();
    return JSON.toJSONStringWithDateFormat(date, "yyyy-MM-dd HH:mm:ss");
}
```

[**格式化json**]

```java
public String json4() {
    ArrayList<User> users = new ArrayList<>();

    ObjectMapper mapper = new ObjectMapper();
    User user1 = new User("用户1号", 18, "男");
    User user2 = new User("用户2号", 18, "男");
    User user3 = new User("用户3号", 18, "男");
    User user4 = new User("用户4号", 18, "男");
    User user5 = new User("用户5号", 18, "男");

    users.add(user1);
    users.add(user2);
    users.add(user3);
    users.add(user4);
    return JSON.toJSONString(users);
}
```

### Json乱码问题

#### 注解属性实现

`@RequestMapping(value = "/j1" ,produces = "application/json;charset=utf-8")`注解添加参数，设置返回值类型，编码格式为utf-8

```java
package com.nepenthe.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nepenthe.pojo.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author goodsir
 */
@Controller
public class UserController {
    /**
     * @return ResponseBody 使用该注解,不走视图解析器,会直接返回一个字符串
     */
    @RequestMapping(value = "/j1" ,produces = "application/json;charset=utf-8")
    @ResponseBody
    public String json1() throws JsonProcessingException {

        ObjectMapper mapper = new ObjectMapper();
        User user = new User("人名", 18, "男");
        return mapper.writeValueAsString(user);
    }
}
```

#### Spring配置实现

spring.xml

```xml
<!-- JSON乱码问题配置-->
<mvc:annotation-driven>
    <mvc:message-converters>
        <bean class="org.springframework.http.converter.StringHttpMessageConverter">
            <constructor-arg value="UTF-8"/>
        </bean>
        <bean class="org.springframework.http.converter.json.MappingJackson2HttpMessageConverter">
            <property name="objectMapper">
                <bean class="org.springframework.http.converter.json.Jackson2ObjectMapperFactoryBean">
                    <property name="failOnEmptyBeans" value="false"/>
                </bean>
            </property>
        </bean>
    </mvc:message-converters>
</mvc:annotation-driven>
```

## 时间戳

### Timestamp方式实现格式化输出

```java
@RequestMapping(value = "/j3")
public String json3() throws JsonProcessingException {
    Date date = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    //ObjectMapper,时间解析后的默认格式为:Timestamp，时间戳
    return new ObjectMapper().writeValueAsString(sdf.format(date));
}
```

### ObjectMapper格式化输出

```java
@RequestMapping(value = "/j3")
public String json3() throws JsonProcessingException {
    ObjectMapper mapper = new ObjectMapper();
    //不使用时间戳的方法
    mapper.configure(SerializationFeature.WRITE_DATE_KEYS_AS_TIMESTAMPS, false);
    //自定义日期的格式
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    mapper.setDateFormat(sdf);
    Date date = new Date();
    //ObjectMapper,时间解析后的默认格式为:Timestamp，时间戳
    return mapper.writeValueAsString(date);
}
```

#### 提取工具类

jsonUtils

```java
package com.nepenthe.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import java.text.SimpleDateFormat;

/**
 * @author goodsir
 */
public class jsonUtils {

    public static String getJson(Object object, String dateFormat) {
        ObjectMapper mapper = new ObjectMapper();

        //不使用时间戳的方法
        mapper.configure(SerializationFeature.WRITE_DATE_KEYS_AS_TIMESTAMPS, false);
        //自定义日期的格式
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        mapper.setDateFormat(sdf);
        try {
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

}
```

工具类的调用

```java
@RequestMapping(value = "/j3")
public String json3() throws JsonProcessingException {
    Date date = new Date();
    return jsonUtils.getJson(date,"yyyy-MM-dd HH:mm:ss");

}
```

## 整合SSM

### 开发流程

* 需求分析
* 设计数据库
* 业务
* 前端界面

### 第一个SSM程序

#### 需求分析

* 预约,存储图书

#### 设计数据库

```mariadb
create database `ssmbuild`;
use ssmbuild;
drop table if exists `books`;
create table `books`
(
    `bookID`   int(10) not null auto_increment comment '书id',
    `bookName` varchar(100) not null comment '书名',
    `bookCounts` int(11) not null comment '数量',
    `detail` varchar(200) not null comment '描述',
    key `bookID` (`bookID`)
)   engine=innodb default charset =utf8;

insert into `books` (`bookID`,`bookName`,`bookCounts`,`detail`)values
(1,'Java',1,'从入门到放弃'),
(2,'MySQL',10,'从删库到跑路'),
(3,'Linux',1,'从进门到进牢');
```

#### 业务

##### 基本环境搭建

* 新建Maven项目:ssmBook 添加web支持
* 导入相关pom依赖

```xml
    <!--依赖:junit,数据库驱动,连接池,servlet,jsp,mybatis,mybatis-spring-->
<dependencies>
    <!--Junit-->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.1</version>
    </dependency>
    <!--数据库驱动-->
    <dependency>
        <groupId>org.mariadb.jdbc</groupId>
        <artifactId>mariadb-java-client</artifactId>
        <version>2.7.3</version>
    </dependency>
    <!--数据库连接池-->
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>druid</artifactId>
        <version>1.2.6</version>
    </dependency>
    <!--Servlet,Jsp-->
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>servlet-api</artifactId>
        <version>2.5</version>
    </dependency>
    <dependency>
        <groupId>javax.servlet.jsp</groupId>
        <artifactId>jsp-api</artifactId>
        <version>2.2</version>
    </dependency>
    <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>jstl</artifactId>
        <version>1.2</version>
    </dependency>

    <!--Mybatis-->
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis</artifactId>
        <version>3.5.5</version>
    </dependency>
    <dependency>
        <groupId>org.mybatis</groupId>
        <artifactId>mybatis-spring</artifactId>
        <version>2.0.5</version>
    </dependency>
    <!--Spring-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-webmvc</artifactId>
        <version>5.3.1</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-jdbc</artifactId>
        <version>5.2.6.RELEASE</version>
    </dependency>
</dependencies>
```

* 静态资源导出问题

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

* 创建基础包目录

    * controller[控制层]
    * dao[数据持久层]
    * pojo[对象模型层]
    * service[服务层]

  ![image-20210829145902939](https://github.com/1677883418/TyporaBed/raw/master/img/202109111629228.png)

* 创建resources文件

    * 项目结构

  ![image-20210911151519593](https://github.com/1677883418/TyporaBed/raw/master/img/202109111629480.png)

    * **Spring核心配置文件**  applicationContext.xml

```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <beans xmlns="http://www.springframework.org/schema/beans"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
      <import resource="spring-dao.xml"/>
      <import resource="spring-service.xml"/>
      <import resource="spring-mvc.xml"/>
  
  </beans>
```

##### Mybatis层编写

* **数据库配置文件** database.properties

```properties

jdbc.driver=org.mariadb.jdbc.Driver jdbc.url=jdbc:mariadb://localhost:3306/ssmbuild jdbc.username=root
jdbc.password=xxxxx

```

* IDEA关联数据库
* **Mybatis核心配置文件** mybatis-config.xml

```xml

<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--配置数据源:交给Spring去做-->
    <typeAliases>
        <package name="com.nepenthe.pojo"/>
    </typeAliases>

    <mappers>
        <mapper class="com.nepenthe.dao.BookMapper"/>
    </mappers>

</configuration>
```

* 编写数据库对应的**实体类** com.nepenthe.pojo.Books

```java
package com.nepenthe.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author goodsir
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Books {
    private int bookID;
    private String bookName;
    private int bookCounts;
    private String detail;

}
```

* 编写Dao层的Mapper接口

```java
package com.nepenthe.dao;

import com.nepenthe.pojo.Books;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author goodsir
 */
public interface BookMapper {
    /**
     * @param books
     * @return 增加一本书
     */
    int addBook(Books books);

    /**
     * @param id    书籍序号
     * @return 删除一本书
     */
    int deleteBookById(@Param("bookID") int id);

    /**
     * @param books 书籍类
     * @return 更新一本书
     */
    int updateBook(Books books);

    /**
     * @param id    书籍序号
     * @return 查询一本书
     */
    Books queryBookById(@Param("bookID") int id);

    /**
     * @return 查询全部
     */
    List<Books> queryAllBook();

    /**
     *
     * @param bookName 书籍名称
     * @return 通过名字查询书籍
     */
    Books queryBookByName(@Param("bookName") String bookName);
}
```

* 编写接口对应的Mapper.xml文件。需要导入Mybatis的包

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.nepenthe.dao.BookMapper">
    <!--插入书籍-->
    <insert id="addBook" parameterType="com.nepenthe.pojo.Books">
        insert into ssmbuild.books (bookID, bookName, bookCounts, detail)
        values (#{bookID}, #{bookName}, #{bookCounts}, #{detail});
    </insert>
    <!--删除书籍-->
    <delete id="deleteBookById" parameterType="int">
        delete
        from ssmbuild.books
        where bookID = #{bookID};
    </delete>
    <!--修改书籍-->
    <update id="updateBook" parameterType="com.nepenthe.pojo.Books">
        update books
        set bookName = #{bookName},
        bookCounts=#{bookCounts},
        detail=#{detail}
        where bookID = #{bookID};
    </update>
    <!--根据Id查询书籍-->
    <select id="queryBookById" resultType="com.nepenthe.pojo.Books">
        select *
        from books
        where bookID = #{bookID}
    </select>
    <!--查询所有书籍-->
    <select id="queryAllBook" resultType="com.nepenthe.pojo.Books">
        select *
        from books
    </select>
    <!--根据名字查询书籍-->
    <select id="queryBookByName" resultType="com.nepenthe.pojo.Books">
        select *
        from ssmbuild.books
        where bookName = #{bookName}
    </select>
</mapper>
```

* 编写Service层的接口和实现类

    * 接口

```java
  package com.nepenthe.service;
  
  import com.nepenthe.pojo.Books;
  import org.apache.ibatis.annotations.Param;
  
  import java.util.List;
  
  /**
   * @author goodsir
   */
  public interface BookService {
      /**
       * @param books
       * @return 增加一本书
       */
      int addBook(Books books);
  
      /**
       * @param id
       * @return 删除一本书
       */
      int deleteBook(@Param("bookID") int id);
  
      /**
       * @param books
       * @return 更新一本书
       */
      int updateBook(Books books);
  
      /**
       * @param id
       * @return 查询一本书
       */
      Books queryBookById(@Param("BookID") int id);
  
      /**
       * @return 查询全部
       */
      List<Books> quertAllBook();
  
      /**
       * @param bookName
       * @return 通过名字查询书籍
       */
      Books queryBookByName(String bookName);
  
  }
```

    * 实现类

```java
  package com.nepenthe.service;
  
  import com.nepenthe.dao.BookMapper;
  import com.nepenthe.pojo.Books;
  
  import java.util.List;
  
  public class BookServiceImpl implements BookService {
  
      /**
       * service调dao层:组合dao层
       */
      private BookMapper bookMapper;
  
      public void setBookMapper(BookMapper bookMapper) {
          this.bookMapper = bookMapper;
      }
  
      @Override
      public int addBook(Books books) {
          return bookMapper.addBook(books);
      }
  
      @Override
      public int deleteBook(int id) {
          return bookMapper.deleteBookById(id);
      }
  
      @Override
      public int updateBook(Books books) {
          return bookMapper.updateBook(books);
      }
  
      @Override
      public Books queryBookById(int id) {
          return bookMapper.queryBookById(id);
      }
  
      @Override
      public List<Books> quertAllBook() {
          return bookMapper.queryAllBook();
      }
  
      @Override
      public Books queryBookByName(String bookName) {
          return bookMapper.queryBookByName(bookName);
      }
  }
```

  底层需求操作层编写完毕

##### Spring层

* 配置**Spring整合Mybatis**,数据源使用**druid连接池**


* 编写**Spring整合Mybatis**相关**配置文件**spring-dao.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <!--1.关联数据库配置文件-->
    <context:property-placeholder location="classpath:database.properties"/>

    <!--2.连接池
    dbcp:半自动操作  不能自动连接
    c3p0：自动化操作(自动加载配置文件  并且设置到对象里面)
    druid:
    hikari:
    -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${jdbc.driver}"/>
        <property name="url" value="${jdbc.url}"/>
        <property name="username" value="${jdbc.username}"/>
        <property name="password" value="${jdbc.password}"/>
    </bean>
    <!--3.sqlSessionFactory-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <property name="dataSource" ref="dataSource"/>
        <!--绑定Mybatis的配置文件-->
        <property name="configLocation" value="classpath:mybatis-config.xml"/>
    </bean>


    <!--配置dao接口扫描包,动态实现了Dao接口可以注入到Spring容器中!-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <!--注入sqlSessionFactory-->
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
        <!--要扫描的dao包-->
        <property name="basePackage" value="com.nepenthe.dao"/>
    </bean>
</beans>  
```

* **Spring整合Service层** spring-service.xml

```xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:context="http://www.springframework.org/schema/context"
xsi:
schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
<!--1.扫描service下的包-->
<context:component-scan base-package="com.nepenthe.service"/>
<!--2.将我们的所有业务类,注入到Spring,可以通过配置,或者注解实现-->
<bean id="bookServiceImpl" class="com.nepenthe.service.BookServiceImpl">
<property name="bookMapper" ref="bookMapper"/>
</bean>

    <!--3.声明式事务配置-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!--注入数据源-->
        <property name="dataSource" ref="dataSource"/>
    </bean>
    <!--aop事务支持-->

</beans>
```

##### SpringMVC层

* 配置web.xml

```xml

<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
version="4.0">
<!--DispatcherServlet-->
<servlet>
<servlet-name>springmvc</servlet-name>
<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
<init-param>
<param-name>contextConfigLocation</param-name>
<param-value>classpath:applicationContext.xml</param-value>
</init-param>
<load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
<servlet-name>springmvc</servlet-name>
<url-pattern>/</url-pattern>
</servlet-mapping>
<!--乱码过滤-->
<filter>
<filter-name>encodingFilter</filter-name>
<filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
<init-param>
<param-name>encoding</param-name>
<param-value>utf-8</param-value>
</init-param>
</filter>
<filter-mapping>
<filter-name>encodingFilter</filter-name>
<url-pattern>/*</url-pattern>
</filter-mapping>
<session-config>
<session-timeout>15</session-timeout>
</session-config>
</web-app> 
```

* **SpringMVC配置文件**spring-mvc.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">


    <!--1.注解驱动-->
    <mvc:annotation-driven/>
    <!--2.静态资源过滤-->
    <mvc:default-servlet-handler/>
    <!--3.扫描包:controller-->
    <context:component-scan base-package="com.nepenthe.controller"/>
    <!--4.视图解析器-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver" id="internalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/jsp/"/>
        <property name="suffix" value=".jsp"/>
    </bean>
</beans>
```

* Spring配置整合文件,applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <import resource="spring-dao.xml"/>
    <import resource="spring-service.xml"/>
    <import resource="spring-mvc.xml"/>

</beans>
```

##### Controller和视图层编写

* BookController层编写，方法一:查询全部书籍

```java
package com.nepenthe.controller;

/**
 * @author goodsir
 */
@Controller
@RequestMapping("/book")
public class BookController {
    /**
     * controller 调 service层
     */
    @Autowired
    @Qualifier("bookServiceImpl")
    private BookService bookService;

    /**
     * 查询全部的书籍,并且返回到一个书籍展示页面
     */
    @RequestMapping("/allBook")
    public String list(Model model) {
        List<Books> books = bookService.quertAllBook();
        model.addAttribute("books", books);
        return "allBook";
    }
}
```

* 编写首页index.jsp

```jsp
<%--
  Created by IntelliJ IDEA.
  User: goodsir
  Date: 2021/8/29
  Time: 下午2:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>首页</title>
    <style>
        a {
            text-decoration: none;
            color: black;
            font-size: 18px;
        }

        h3 {
            width: 180px;
            height: 38px;
            margin: 100px auto;
            text-align: center;
            line-height: 38px;
            background: mediumpurple;
            border-radius:5px ;
        }
    </style>
</head>
<body>

<h3>
    <a href="${pageContext.request.contextPath}/book/allBook">进入书籍页面</a>
</h3>

</body>
</html>
```

* 书籍列表页面 allBook.jsp

```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: goodsir
  Date: 2021/8/30
  Time: 下午12:16
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title>书籍展示</title>
    <%--BootStrap 美化界面--%>
    <link href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container">

    <div class="row clearfix">
        <div class="col-md-12 column">
            <div class="page-header"></div>
            <h1>
                <small>书籍列表 ——————显示所有书籍</small>

            </h1>
        </div>
    </div>

    <div class="row">
        <div class="col-md-4 column">
            <%--toAddBook--%>
            <a class="btn btn-primary" href="${pageContext.request.contextPath}/book/toAddBook">新增书籍</a>
            <a class="btn btn-primary" href="${pageContext.request.contextPath}/book/allBook">显示所有书籍</a>
        </div>
        <div class="col-md-4"></div>
        <div class="col-md-4 column">
            <%--查询书籍--%>
            <form action="${pageContext.request.contextPath}/book/queryBook" method="post"
                  style="float: right"
                  class="form-inline">
                <span style="color: red;font-weight: bold">${error}</span>
                <input type="text" name="bookName" class="form-control" placeholder="请输入要查询的书籍名称">
                <input type="submit" value="查询" class="btn btn-primary ">
            </form>
        </div>
    </div>

</div>

<div class="row clearfix">
    <div class="col-md-12 column">
        <table class="table table-hover table-striped">
            <thead>
            <tr>
                <th>书籍编号</th>
                <th>书籍名称</th>
                <th>书籍数量</th>
                <th>书籍详情</th>
                <th>操作</th>
            </tr>
            </thead>
            <%--书籍从数据库中查询出来,从books中遍历出来--%>
            <tbody>
            <c:forEach var="book" items="${books}">
                <tr>
                    <td>${book.bookID}</td>
                    <td>${book.bookName}</td>
                    <td>${book.bookCounts}</td>
                    <td>${book.detail}</td>
                    <td>
                        <a href="${pageContext.request.contextPath}/book/toUpdate?id=${book.bookID}"
                           class="btn btn-primary">修改</a>
                        &nbsp;|&nbsp;
                        <a href="${pageContext.request.contextPath}/book/deleteBook/${book.bookID}"
                           class="btn btn-default">删除</a>
                    </td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>
```

* BookController类编写,方法二:添加书籍

```java
/**
 * @return 跳转到增加书籍页面
 */
@RequestMapping("/toAddBook")
public String toAddPage() {
    return "addBook";
}

/**
 * @return 添加书籍的请求
 */
@RequestMapping("addBook")
public String addBook(Books books) {
    System.out.println("books = " + books);
    bookService.addBook(books);
    //重定向到我们的@RequestMapping("/allbook")请求;
    return "redirect:/book/allBook";
}
```

* **添加书籍**页面:addBook.jsp

```jsp
<%--
  Created by IntelliJ IDEA.
  User: goodsir
  Date: 2021/8/31
  Time: 下午2:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <%--BootStrap 美化界面--%>
    <link href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>


<div class="container">

    <div class="row clearfix">
        <div class="col-md-12 column">
            <div class="page-header"></div>
            <h1>
                <small>新增书籍</small>
            </h1>
        </div>
    </div>

    <form action="${pageContext.request.contextPath}/book/addBook" method="post">
        <div class="form-group">
            <label for="bkName">书籍名称:</label>
            <input type="text" name="bookName" class="form-control" id="bkName" required>
        </div>

        <div class="form-group">
            <label for="bkCounts">书籍数量:</label>
            <input type="text" name="bookCounts" class="form-control" id="bkCounts" required>
        </div>

        <div class="form-group">
            <label for="bkDetail">书籍描述:</label>
            <input type="text" name="detail" class="form-control" id="bkDetail" required>
        </div>
        <div>
            <button type="submit" class="btn btn-primary">提交</button>
        </div>
    </form>

</div>

</body>
</html>
```

* **BookController**层,方法三:修改书籍

```java
/**
 * @return 跳转到修改页面
 */
@RequestMapping("/toUpdate")
public String toupdatePage(int id, Model model) {
    Books books = bookService.queryBookById(id);
    model.addAttribute("QBooks", books);
    return "updateBook";
}

/**
 * @param books
 * @return 修改书籍
 */
@RequestMapping("/updateBook")
public String updateBook(Books books) {
    System.out.println("books = " + books);
    bookService.updateBook(books);
    return "redirect:/book/allBook";
}
```

* **修改书籍**页面：updateBook.jsp

```jsp
<%--
  Created by IntelliJ IDEA.
  User: goodsir
  Date: 2021/8/31
  Time: 下午3:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>修改书籍信息</title>
    <%--BootStrap 美化界面--%>
    <link href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">

</head>
<body>

<div class="container">

    <div class="row clearfix">
        <div class="col-md-12 column">
            <div class="page-header"></div>
            <h1>
                <small>修改书籍</small>
            </h1>
        </div>
    </div>


    <form action="${pageContext.request.contextPath}/book/updateBook" method="post">

        <%--出现的问题,提交了sql请求,但是修改失败,考虑方向:1.事务提交 2.SQL执行失败,修改不成功--%>
        <%--前端传递隐藏域--%>
        <input type="hidden" name="bookID" value="${QBooks.bookID}">
        <div class="form-group">
            <label for="bkName">书籍名称:</label>
            <input type="text" name="bookName" class="form-control" id=
                    "bkName" value="${QBooks.bookName}" required>
        </div>

        <div class="form-group">
            <label for="bkCounts">书籍数量:</label>
            <input type="text" name="bookCounts" class="form-control" id="bkCounts" value="${QBooks.bookCounts}"
                   required>
        </div>

        <div class="form-group">
            <label for="bkDetail">书籍描述:</label>
            <input type="text" name="detail" class="form-control" id="bkDetail" value="${QBooks.detail}" required>
        </div>
        <div>
            <button type="submit" class="btn btn-primary">修改</button>
        </div>
    </form>
</div>

</body>
</html>
```

* **BookController**层,方法四:删除书籍

```java
/**
 * @param id
 * @return
 */
@RequestMapping("/deleteBook/{bookID}")
public String deleteBook(@PathVariable("bookID") int id) {
    bookService.deleteBook(id);
    return "redirect:/book/allBook";
}
```

配置Tomcat,运行即可

##### 项目结构图

![image-20210911161720806](https://github.com/1677883418/TyporaBed/raw/master/img/202109111629038.png)

项目预览

![image-20210911170517703](https://github.com/1677883418/TyporaBed/raw/master/img/202109111705340.png)

![image-20210911170541520](https://github.com/1677883418/TyporaBed/raw/master/img/202109111705341.png)

![image-20210911170617888](https://github.com/1677883418/TyporaBed/raw/master/img/202109111706121.png)

#### 小结

恭喜！正式步入:footprints: 了后端开发的大门:door:

热爱可抵岁月漫长:yum:

## Ajax

## SSM整合swagger

### 导入maven依赖

```xml
<!-- springfox的核心jar包 -->
<!-- https://mvnrepository.com/artifact/io.springfox/springfox-swagger-ui -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>
        <!--springfox-ui的jar包(里面包含了swagger的界面静态文件) -->
<dependency>
<groupId>io.springfox</groupId>
<artifactId>springfox-swagger-ui</artifactId>
<version>2.9.2</version>
</dependency>
        <!--springfox依赖的jar包；如果你的项目中已经集成了无需重复 -->
<dependency>
<groupId>com.fasterxml.jackson.core</groupId>
<artifactId>jackson-databind</artifactId>
<version>2.9.0</version>
</dependency>
```

### 创建SwaggerConfig配置类[config包]

```java
package com.nepenthe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * Swagger2文档构建配置类
 * 通过@EnableSwagger2注解来启用Swagger2
 *
 * @author goodsir
 */
@Configuration
@EnableSwagger2
@EnableWebMvc
@ComponentScan(basePackages = "com.nepenthe.controller")
public class SwaggerConfig {

    //接口文档构建配置
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                //通过select()函数返回一个ApiSelectorBuilder实例,用来控制哪些接口暴露给Swagger来展现
                .select()
                //所有的接口
//                .apis(RequestHandlerSelectors.any())
                //指定扫描的路径
                .apis(RequestHandlerSelectors.basePackage("com.nepenthe.controller"))
                .build()
                .apiInfo(apiInfo());
    }

    //接口文档信息
    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("teamWork API接口服务列表")
                .description("")
                .termsOfServiceUrl("")
                .version("1.0")
                .build();
    }
}
```

### 配置spring-mvc.xml

```xml
    <!--整合 Swagger -->
<!--注册SwaggerConfig配置bean-->
<bean class="com.nepenthe.config.SwaggerConfig"/>
        <!-- 静态资源 -->
        <!--    <mvc:resources mapping="/static/**" location="/static/"/>-->
        <!--配置swagger页面-->
<mvc:resources mapping="swagger-ui.html" location="classpath:/META-INF/resources/"/>
<mvc:resources mapping="/webjars/**" location="classpath:/META-INF/resources/webjars/"/>
```

### Controller层添加注解 **（[ swagger常用注解](https://segmentfault.com/a/1190000010465989)）**

```java
/**
 * @author goodsir
 */
@RestController
@RequestMapping(value = "/Student")
@Api(tags = "学生相关接口")
public class StudentController {
    /**
     * controller 调 service层
     */
    @Autowired
    @Qualifier("studentServiceImpl")
    private StudentService studentService;

    /**
     * 查询全部的学生,并且返回到一个学生展示页面
     */
    @GetMapping("/allStudent")
    @ApiOperation(value = "查询全部用户信息", httpMethod = "GET", notes = "查询全表学生")
    @ResponseBody
    public String list(Model model, HttpServletResponse res) {
        res.setContentType("application/json; charset=UTF-8");
        List<Students> students = studentService.queryAllStudent();
        return JSONUtil.toJsonStr(students);
    }
```

### 测试

api文档地址为ip:端口/项目名/swagger-ui.html

![image-20211003024645564](https://github.com/1677883418/TyporaBed/raw/master/img/202110030246466.png)

如图测试成功

### 常见问题

* 500内部错误
    * 在项目结构--工件的lib目录内,重新手动导入所有lib包。
* 404错误
    * 链接错误，仔细检查链接是否正确
* 弹窗提示"Unable to infer base url. This is common when using dynamic servlet registration or when the API is behind an API
  Gateway. The base url is the root of where all the swagger resources are served. For e.g. if the api is available
  at http://example.org/api/v2/api-docs then the base url is http://example.org/api/. Please enter the location
  manually: "
    * 报错翻译如下：
        * ![image-20211003025303177](https://github.com/1677883418/TyporaBed/raw/master/img/202110030253245.png)
    * 检查是否在maven中导入了springboot依赖,如果使用的是springboot,请确保在启动类中上方使用@EnableSwagger2注解而不是在SwaggerConfig配置类上方(),
    * 如果确定使用的是SSM框架且没有导入SpringBoot依赖,检查注解是否正确
        * ![image-20211003025647564](https://github.com/1677883418/TyporaBed/raw/master/img/202110030256943.png)

