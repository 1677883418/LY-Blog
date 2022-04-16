---
title: JavaWeb
date: 2021-5-20
tags:
- Web
- Servlet
- JSP
categories:
- Java
---

:::tip
Java Web相关

主要指Servlet,JSP技术
:::
# JavaWeb

## 基础概念

* web开发：网页
  * 静态web
    * html，css
    * 提供给所有人看的数据始终不会发生变化
  * 动态web
    * 技术栈:Servlet/Jsp,ASP,PHP

在Java中，动态Web资源开发的技术统称为JavaWeb；

## Web服务器

### 技术讲解

* ASP
  * 微软：国内最早流行的就是ASP
  * 在HTML中嵌入了VB的脚本，ASP+COM；
  * 维护成本高，使用c#
* PHP
  * PHP开发速度快，功能很强大，跨平台，代码很简单
  * 无法承载大访问量的情况(局限性)
* JSP/Servlet:
  * Sun公司主推的B/S架构(浏览器--->服务端)
  * 基于Java语言的(所有的大公司，或者一些开源的组件，都是用java写的)
  * 可以承载三高问题带来的影响(高并发，高可用，高性能)
  * 语法像ASP,ASP--->JSP,加强市场强度;

### web服务器

#### IIS

微软的:使用ASP，适用于Windows

#### Tomcat

#### Apache

#### Nginx

## Http

### http请求

* 服务器---响应---客户端

* HTTP协议包括：

  * 请求协议(四部分):
    * 请求行: 请求方式	URI	协议版本号
    * 消息报头
    * 空白行：用来分离消息报头和请求体
    * 请求体
    
  * 响应协议(四部分)
    * 状态行：协议版本号	状态码	状态描述信息
    * 响应报头：
    * 空白行分离响应报头和响应体
    * 响应体

    #### Get和Post请求区别

  * ==使用场景:==
    
    * 只有当使用表单from，并且将from标签的method属性设置为method=“post”才是post请求方式，其余剩下所有的请求方式都是基于GET方式
    * 有敏感数据，必须使用POST
    * 传送数据不是普通字符串，必须使用POST
    * 传送的数据非常多，使用POST
    * 这个请求是为了修改服务器端资源，使用POST
      * GET请求多数情况下是从服务器读取资源，这个读取的资源在短时间之内是不会发生变化的，所以GET请求最终的结果浏览器缓存起来了.
      * POST请求是为了修改服务器端的资源，而每一次修改结果都是不同的，最终结果没有必要被浏览器缓存。
  * GET请求提交数据长度有限制，POST没有提交数据限制
  * ==GET请求结果会被浏览器缓存收纳，而POST请求最终结果不会被缓存==

  #### 缓存

  * 浏览器将资源缓存之后，缓存的资源适合某个特定的路径绑定在一起的，只要浏览器再发送这个相同的请求路径，这个时候会去缓存中获取资源，不在访问服务器，以这种方式降低服务器的压力，提高用户的体验

  * 有的时候不希望走缓存，希望每一次都访问服务器，可以在请求路径后添加时间戳:http://xxxxx?timetamp=123123
  * JS获取毫秒:new Data().getTime()

* GET：

  * 格式：请求在请求行晚上提交数据，格式:url?name=value&name=value....
    * 类型：字符串
  * 提交数据会显示在浏览器的地址栏上

* POST：

  * 格式：请求在请求体中提交数据
    * 类型：任意数据，包括视频【文件只能通过post请求上传】

### 响应状态码

200：请求响应成功

3**：请求重定向

* 301:
* 

4xx：找不到资源 (404)

	* 404:资源不存在

5xx:服务器代码错误 500 502:网关错误



==常见面试题：==

当你的浏览器中地址栏输入地址并回车的一瞬间到页面能够展示回来，经历了什么？



## Maven

Maven的核心思想：约定大于配置

* 有约束，不要去违反。

#### 构建一个普通的Maven项目

* 构建一个普通的Maven项目，删掉里面的src目录，在项目中创建Moudel，空的项目即为Maven主工程(父工程)

* 关于Maven父子工程的理解:

  * 父工程Pom.xml文件

  * ```xml
        <modules>
            <module>servlet-01</module>
        </modules>
    ```

    

  * 子项目pom.xml

    ```xml
        <parent>
            <artifactId>javaWeb</artifactId>
            <groupId>org.example</groupId>
            <version>1.0-SNAPSHOT</version>
        </parent>
    ```

    父项目的java子项目可以直接使用

    ```java
    son extends father
    ```

    #### Maven环境优化

    1. 修改web.xml为最新
    2. 将Maven的结构搭建完整

## Servlet

### Servlet规范

#### Servlet接口实现类

1. Servlet接口来自于Servlet规范下的一个接口，这个接口存在Http服务器，提供jar包
2. Tomcat服务器下lib文件有一个servlet-api.jar存放Servlet接口
3. Servlet规范中人物，HTtp服务器能调用的[动态资源文件]必须是一个Servlet接口实现类

* 例子：

  ```java
  class student{
      //不是动态资源文件，Tomcat无权调用
  }
  class Teacher implements Servlet{
      //合法动态资源文件，Tomcat有权调用
      
      Servlet obj = new Teacher();
      obj.doGet()
  }
  ```
  
  

#### 接口实现类开发步骤

* 创建一个Java类继承与HttpServlet父类，使之成为一个Servlet接口实现类

* 重写HttpServlet父类两个方法。doGet或者doPost

  * 浏览器----get--->oneServlet.doGet()
  * 浏览器---post--->oneServlet.doPost()

* 将Servlet接口实现类信息【注册】到Tomcat服务器

  * 【网站】---->【web】---->【WEB-INF】--->web.xml

  * 
    
    ```java
        <servlet>
            <!--声明一个变量存储Servlet接口实现类路径-->
            <servlet-name>HelloServlet</servlet-name>
            <!--声明Servlet接口实现类路径-->
            <servlet-class>com.example.Servlet.HelloServlet</servlet-class>
        </servlet>
                <!--作用-->
                Tomcat String HelloServlet ="com.example.Servlet.HelloServlet"
                <!--为了降低用户访问Servlet接口实现类难度，需要设置简短请求别名-->
        <servlet-mapping>
            <servlet-name>HelloServlet</servlet-name>
        	<!--设置url别名，别名在书写时必须以“/”为开头-->
                <url-pattern>/hello</url-pattern>
        </servlet-mapping>
    ```
    
    

#### Servlet接口

* init
* getServletConfig
* getServletInfo
* destory 
* service()

#### Servlet对象生命周期

* 网站中所有的Servlet接口实现类的实例对象，只能由Http服务器负责创建。开发人员不能手动创建Servlet接口实现类的实例对象。

  * 在默认的情况下，Http服务器接收到对于当前Servlet接口实现第一次请求时自动创建这个Servlet接口实现类的实例对象

  * 在手动配置的情况下，要求Http服务器在启动时自动创建某个Servlet接口实现类的实例对象

    * 

      ```java
          <servlet>
              <!--声明一个变量存储Servlet接口实现类路径-->
              <servlet-name>HelloServlet</servlet-name>
              <!--声明Servlet接口实现类路径-->
              <servlet-class>com.example.Servlet.HelloServlet</servlet-class>
      	<!--填写大于0的整数-->
      	<load-on-startup>30<load-on-startup>
      	</servlet>
      ```
      
      

* 在Http服务器运行期间，一个Servlet接口实现类只能被创建出一个实例对象

  * 在Http服务器关闭时，自动将网站中所有的Servlet对象进行销毁

#### 总结

* 第一次访问时创建,Servlet程序调用：
  * 执行Servlet构造器方法
  * 执行init初始化方法
* 每次访问都会调用:
  * 执行service方法
* 在web工程停止的时候调用:
  * 执行destory销毁方法

#### 注意：

* init方法执行的时候，Servlet对象已经被创建好了。
* destroy方法执行的时候，Servlet对象还没有被销毁，即将被销毁。



Servelet对象是单例，但是不符合单例模式，只能成为为单例。单例的构造方法是私有化的，Tomcat服务器是支持多线程的。

所以Servlet对象在单实例多线程的环境下运行的。那么Servlet对象若有实例变量，并且实例变量涉及到修改操作，那么这个Servlet对象一定会存在线程安全问题，不建议在Servlet对象中使用实例变量，尽量使用局部变量。

### Servlet程序

#### 第一个Servlet程序

```java
public class HelloServlet extends HttpServlet {
    /**
     * 由于get/post只是请求实现的不同的方式，可以互相调用，业务逻辑都一样
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        ServletOutputStream outputStream = resp.getOutputStream();
        //响应流
        PrintWriter writer = resp.getWriter();
       
        writer.println("hello, Servlet!");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }
}
```

#### 编写Servlet的映射

* web.xml文件配置:
   *  webxml配置文件：

```xml
          <servlet>
              <servlet-name>HelloServlet</servlet-name>
              <servlet-class>com.example.Servlet.HelloServlet</servlet-class>
          </servlet>
      
      <servlet-mapping>
          <servlet-name>HelloServlet</servlet-name> 
          <url-pattern>/hello</url-pattern>
      </servlet-mapping>
```

### ServletContext

定义：web容器在启动的时候，他会为每个web程序都创建一个对应的ServletContext对象，它代表了当前的web应用;

#### 1.共享数据

* 在一个Servlet中保存的数据，可以在另外一个Servlet中拿到；

```java
public class HelloServlet extends HttpServlet {
    /**
     * 由于get/post只是请求实现的不同的方式，可以互相调用，业务逻辑都一样
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //初始化参数
        this.getInitParameter();
        //Servlet配置
        this.getServletConfig();
        // Servlet上下文
        ServletContext context = this.getServletContext();
        //数据
        String username = "GoodSir";
        //将一个数据保存在了ServletContext中，名字为：Username，值：Username
        context.setAttribute("username",username);
    }
}
```

#### 2.配置初始化参数

```xml
<!--        配置一些web应用初始化参数-->
    <context-param>
        <param-name>url</param-name>
        <param-value>jdbc:mysql//localhost:3306/jdbc</param-value>
    </context-param>
```

* 使用初始化参数

```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ServletContext context = this.getServletContext();
    String url = context.getInitParameter("url");
    resp.getWriter().print(url);
}
```

#### 3.请求转发

```java
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        ServletContext context = this.getServletContext();
        RequestDispatcher requestDispatcher = context.getRequestDispatcher("/hello");
        requestDispatcher.forward(req,resp);
//        请求转发至/hello
        context.getRequestDispatcher("/hello").forward(req,resp);
    }
```

#### 4.获取资源文件

```java
@Override
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    InputStream is = this.getServletContext().getResourceAsStream("target/classes/db.properties");
    Properties prop = new Properties();
    prop.load(is);
    prop.getProperty("username");
}
```

### HttpServletRequest

定义:代表客户端的请求，用户通过Http协议访问服务器，Http请求中的所有信息会被封装到HttpServletRequest，通过这个HttpServletRequest方法，获得客户端的所有信息；

#### 应用场景

1. 获取[[前端]]传递参数
2. 

### HttpServletResponse

* 定义：web服务器接收到客户端的http请求，针对这个请求，分别创建一个代表请求的HttpServletRequest对象，代表相应的一个HTTPServletResponse;
  * 获取客户端请求参数：HTTPServletrequest
  * 给客户端响应数据：HTTPServletResponse

#### 发送验证码图片

```java
public class HelloServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //浏览器3秒自动刷新一次；
        resp.setHeader("refresh", "3");
        //在内存中创建一个图片
        BufferedImage image = new BufferedImage(80, 20, BufferedImage.TYPE_INT_RGB);
        //得到图片(设置画笔)
        Graphics2D g = (Graphics2D) image.getGraphics();
        //设置图片的背景颜色
        g.setColor(Color.white);
        g.fillRect(0, 0, 80, 20);
        g.setColor(Color.blue);
        g.setFont(new Font(null,Font.BOLD,20));
        g.drawString(makeNum(),0,20);

        //告诉浏览器，这个请求用图片的方式打开
        resp.setContentType("image/jpg");
        //网站存在缓存，不让浏览器缓存
        resp.setDateHeader("expires",-1);
        resp.setHeader("Cache-control","no-cache");
        resp.setHeader("Pragma", "no-cache");

        //把图片写给浏览器
        ImageIO.write(image,"jpg", resp.getOutputStream());
    }

    public String makeNum() {
        Random random = new Random();
        String num = random.nextInt(99999999) + "";
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < 7-num.length(); i++) {
            sb.append("0");
        }
        String s = sb.toString() + num;
        return num;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
    }
}
```

#### 请求重定向

![image-20210609141124690](https://gitee.com/goodsir555/typora-Picture_bed/raw/master/img/202109112011157.png)

定义：一个web资源收到客户端请求后，他会通知客户端去访问另外一个web资源

区别:

* 相同点:都会跳转

* 不同点:
  *  ==请求转发==:url不会发生变化。
  * ==重定向==:url地址栏会发生变化。

常见场景：

* 用户登录-- >

### Web欢迎页面的设置

* 欢迎页面的设置

  * 目的：为了访问更方便，提高用户体验

  * 作用：设置访问页面之后，直接在地址栏上访问webapp即可，自动定位到欢迎页面

  * 类型：==任意一种web资源即可==，不是必须为html文件，Servlet也可以。

  * 配置位置:

    * 全局配置:CATALINA_HOME/conf/web.xml
    * 局部配置:CATALINA_HOME/webapps/WEB-INF/web.xml

  * 需求:在Webapp目录下创建index.html文件，并作为整个webapp的欢迎界面

    * 练习：
    * web.xml

    ```xml
    <welcome-file-list>    
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>
    ```

    

### 设计模式

* 目的：为了代码优雅

* 设计模式的分类：

  * 创建型：解决对象的创建问题
  * 行为型：该模式与方法、行为、[[算法]]有关的设计模式
  * 结构类：更多类，更多的对象组合成更大的结构解决某个特定的问题

* 有名的设计模式：

  * Gof95(1995年，四人组提出的23种设计模式)

    * 单例模式

    * 工厂模式

    * 适配器模式

    * 迭代模式

    * 策略模式

    * 装饰器模式

      ...

  * JavaEE设计模式

  ......

## Cookie、Session
* 定义：用户打开了一个浏览器---->点击了很多超链接---->访问多个web资源---->关闭浏览器，这个过程可以称为会话
* 会话状态:
  * 有状态会话：
    * 判断方法:
      * 服务端给客户端发放证明(cookie)
      *  服务器登记客户端来过(seesion)
* 区别:
  * Cookie是吧用户的数据写给用户的浏览器，浏览器保存(可以保存多个)
  * Session把用户的数据写到用户独占Session中，服务器段保存(保存重要的信息,减少服务器资源的浪费)
  * Session对象由服务器创建
* 使用场景:
  * 保存用户登录的信息;
  * 购物车信息;
  * 在整个网站中经常会使用的数据,保存在Session中;

### Cookie(客户端技术)

* 运行流程:
  * 从请求中拿到cookie信息
  * 服务器响应给客户端cookie
* 代码流程:

```java
//Cookie    服务端从客户端获取(返回数组，说明可以获取多个)
Cookie[] cookies = req.getCookies();
//获取Cookie中的key
cookie.getName();
//获取Cokkie中的值
cookie.getvalue();
//新建一个cookie
Cookie cookie = new Cookie("lastLoginTime", System.currentTimeMillis() + "");
//设置cookie有效期（1天）
cookie.setMaxAge(24*60*60)
//响应给客户端一个cookie
resp.addCookie(cookie);
```

* 细节:

  * 一个Cookie只能保存一个信息;
  * 一个web站点可以给浏览器发送多个Cookie
    * 300个Cookie浏览器上限
    * Cookie大小限制为4kb

* 删除Cookie：

  * 不设置有效期，关闭浏览器，自动失效。
  * 设置有效期为0.

* 编码解码：

  * 编码

    ```java
    URLEncoder.encode("value","utf-8")
    ```

    

  * 解码

    ```java
    URLDecoder.decode("value","utf-8");
    ```

    

### Session(服务端技术)

* 特点：
  * 服务器会给每一个用户(浏览器)创建一个Session对象;
  * 一个Session独占一个浏览器,只要浏览器没有关闭，这个Session就存在;
  * 用户登录之后，整个网站都可访问
* 应用场景:
  * 保存用户的信息
  * 保存购物车信息

* 代码实现:

  ```java
  public class MySession extends HttpServlet {
      @Override
      protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
          //解决乱码问题
          req.setCharacterEncoding("utf-8");
          resp.setCharacterEncoding("utf-8");
          resp.setContentType("text/html;charset=utf-8");
  
          //得到Session
          HttpSession session = req.getSession();
  
          Person person = (Person) session.getAttribute("name");
  
          //给Session中存东西
           System.out.println(person.toString());
  
           session.removeAttribute("name");
           //手动注销Session
          session.invalidate();
          //获取session的ID
          String sessionId = session.getId();
  
          //判断session是不是新创建
          if (session.isNew()) {
              resp.getWriter().write("Session创建成功,SessionID为:" + sessionId);
          } else {
              resp.getWriter().write("Session已存在,ID为:"+sessionId);
          }
      }
  
      @Override
      protected void doPost(HttpServletRequest req, sHttpServletResponse resp) throws ServletException, IOException {
          doGet(req, resp);
      }
  }
  ```

  会话自动过期 

  ```xml
  <!--设置会话默认失效时间-->
  <session-config>
      <!--15分钟默认的失效时间,分钟为单位-->
      <session-timeout>15</session-timeout>
  </session-config>
  ```

## JSP

### 定义

  Java Server Pages：Java服务器端页面,也和Servlet一样，用于动态web技术

### 特点

  * 写JSP像在写HTML

### 区别

  * HTML只给用户提供静态的数据
  * JSP页面中可以嵌入JAVA代码，为用户提供动态数据； 

### 原理

源码无报错--->	 JSP转换为Java类	--->客户端正常访问

 ```java
 //初始化
 public void _jspInit(){
     
 }
 //销毁
 public void _jspDestroy(){
     
 }
 //JSPService
 public void _jspService(.HttpServletRequest request,HttpServletResponse response)
 ```

### 运行流程

1. 判断请求
2. 内置一些对象

```java
final javax.servlet.jsp.PageContext pageContext;	//页面上下文
javax.servlet.http.HttpSession session = null;		//Session
final javax.servlet.ServletContext application'		//applicationContext
final javax.servlet.ServletConfig config;			//config
javax.servlet.jsp.JspWriter ou = null;				//out
final java.lang.Object page =this;					//page:当前
HTtpServletRequest request							//请求
HttpServletResponse	response						//响应
```

3.输出页面前增加的代码

```java
response.setcontentType("text/htm1");			//设置响应的页面类型
pagecontext =_jspxFactory.getpagecontext(this, request, response,
										nu1l, true, 8192, true);
_jspx_page_context = pagecontext;
application = pagecontext.getservletcontext(;
config = pageContext.getservletconfig();
session = pagecontext.getsessionO;
out = pageContext.getout();
_jspx_out = out;
```

### 基础语法

```jsp
<%-- JSP表达式
<%= 变量或者表达式 %>
 --%>
<%= new java.util.Date() %>
```



```jsp
<%-- JSP脚本片段 --%>
<%
  int sum =0;
  for (int i = 0; i <=100 ; i++) {
    sum+=i;
  }
  out.println("<h1>Sum="+sum+"</h1>");
%>
```

 脚本片段再实现

```
<%
    for (int i = 0; i < 5; i++) {


%>
<h1>hello world!<%=i%>></h1>
<%
    }
%>
```

JSP声明

```jsp
<%!
    static {
        System.out.println("Loading Servlet");
    }
    private int globalVar = 0;

    public void goodsir(){
        System.out.println("进入了方法goodsir");
    }
%>
```

JSP声明:会被编译到JSP生成Java的类中,其他的会被生成到_jspService方法中

```jsp
<%%>
<%=%>
<%!%>

<%----%>
```

### 9大内置对象

* PageContext 存东西
* Request 存东西
* Response
* Session 存东西
* Application [ServletContext] 存东西
* config [ServletConfig]
* out
* page  ==不用了解==
* exception

```java
pageContext.setAttribute("", "");   //一个页面生效
request.setAttribute("", "");       //保存的数据只在一次请求中游戏哦啊，请求转发会携带这个数据
session.setAttribute("","");        //保存的数据只在一次会话中有效，从打开浏览器到关闭浏览器
application.setAttribute("","");    //保存的数据只在服务器中游戏哦啊，从打开浏览器到关闭浏览器
```

request:产生数据，用户看完就没用了。如:新闻

session:客户端向服务器发送请求，产生的数据，用户用完一会儿还有用，如:购物车

application:客户端向服务器发送请求，产生的数据，一个用户用完了，其他用户还可能使用，如:聊天数据;

### JSP标签、JSTL标签？EL表达式

#### maven依赖

```xml
<!--        JSTL表达式依赖-->
        <dependency>
            <groupId>javax.servlet.jsp.jstl</groupId>
            <artifactId>jstl-api</artifactId>
            <version>1.2</version>
        </dependency>
<!--        standard标签库-->
        <dependency>
            <groupId>taglibs</groupId>
            <artifactId>standard</artifactId>
            <version>1.1.2</version>
        </dependency>
```

#### EL表达式:	${ }

* 获取数据
* 执行运算
* 获取web开发的常用对象

```jsp
<jsp:forward page="500.jsp">
    <jsp:param name="name" value="nepenthe"/>
    <jsp:param name="age" value="18"/>
</jsp:forward>
```

#### JSTL表达式

JSTL标签库的使用就是为了弥补HTML标签的不足;它自定义许多标签,可以供我们使用,标签的功能和Java代码一样

* 核心标签(掌握部分)

* 格式化标签

* SQL标签

* XML标签

##### JSTL标签库使用步骤

* 引入对应的taglib
* 使用其中的方法
*  **在TOmcat中也需要引入jstl的包,否则会报错:JSTL解析错误**
  * c:if

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%--引入JSTL核心标签库，我们才能使用JSTL标签 core --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>


<h4>if测试</h4>
<hr>
<form action="coreif.jsp" method="get">
    <%--
    El表达式获取表单中的数据
    ${param.参数名}
    --%>
    <input type="text" name="username" value="${param.username}">
    <input type="submit" value="登录">
</form>


<%--判断如果提交的用户名是管理员，则登录成功--%>
<c:if test="${param.username=='admin'}" var="isAdmin">
    <c:out value="管理员,欢迎您！"/>
</c:if>
<%--自闭合标签--%>
<c:out value="${isAdmin}"/>

</body>
</html>
```

* c:foreach

```jsp
<body>

<%
    ArrayList<String> people = new ArrayList<>();
    people.add("张三");
    people.add("李四");
    people.add("王五");
    people.add("赵六");
    request.setAttribute("list", people);
%>
<%--
var,每次遍历出來的变量
items,要遍历的对象
begin   哪里开始
end     到哪里
step    步长
--%>
<c:forEach var="people" items="${list}">
    <c:out value="${people}"/><br>
</c:forEach>

<hr>

<c:forEach begin="1" end="3" step="2" var="people" items="${list}">
    <c:out value="${people}"/><br>
</c:forEach>

</body>
```

c:choose

```jsp
<body>
<%--定义一个变量score,值为85--%>
<c:set var="score" value="85"/>

<c:choose>
    <c:when test="${score>=90}">
        优秀
    </c:when>
    <c:when test="${score>=75}">
        良好
    </c:when>
    <c:when test="${score<=60}">
        较差
    </c:when>
</c:choose>

</body>
```

## JavaBean

实体类

JavaBean有特定的写法:

* 必须要有一个无参构造
* 属性必须私有化
* 必须有对应的get/post方法;

一般用来和数据库的字段做映射  ORM;

ORM:对象关系映射

* 表--->类
* 字段--->属性
* 行记录--->对象



| id   | name | age  | address |
| ---- | ---- | ---- | ------- |
| 1    | 张三 | 18   | 西安    |
| 2    | 李四 | 20   | 杭州    |
| 3    | 王五 | 35   | 北京    |

```java
class People{
    private int id;
	private String name;
    private int age;
    private String address;
}
```

## MVC三层架构

定义:Model view Controller	模型、视图、控制器

### 早年架构

![image-20210617113534786](https://gitee.com/goodsir555/typora-Picture_bed/raw/master/img/202109112011067.png)

用户直接访问控制层，控制层就可以直接操作数据库;

```java
servlet-->Crud-->数据库
弊端：程序十分臃肿，不利于维护		
Servlet的代码中:处理请求、响应、处理JDBC。处理业务代码、处理逻辑代码
```

### 三层架构 ![image-20210617143009910](https://gitee.com/goodsir555/typora-Picture_bed/raw/master/img/202109112011470.png)

Model

* 业务处理:业务逻辑   (Service)
* 数据持久层:CRUD    (Dao)

View

* 展示数据
* 提供链接发起Servlet请求  (a,form,img......)

Controller(Servlet)

* 接收用户的请求:   (req:请求参数、Session信息)
* 交给业务层处理对应的代码
* 控制视图的跳转

```java
登录---->接收用户的登录请求---->处理用户的请求(获取用户登录的参数,username,password)--->交给业务层处理登录业务(判断用户名密码是否正确:事务)---->Dao层查询用户名和密码是否正确---->连接数据库
```

## Filter

定义:过滤器,用来过滤网站的数据;

* 处理中文乱码
* 登录验证 

![image-20210617144858856](https://gitee.com/goodsir555/typora-Picture_bed/raw/master/img/202109112011724.png)

Filter开发步骤：

* 导包
* 编写过滤器
  * **导入正确的包**

```xml
    <filter>
        <filter-name>CharacterEncodingFilter</filter-name>
        <filter-class>com.nepenthe.filter.CharacterEncodingFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>CharacterEncodingFilter</filter-name>
<!--    只要是/Servlet的任何请求，都会经过这个过滤器    -->
        <url-pattern>/servlet/*</url-pattern>
    </filter-mapping>
```

## 监听器

实现一个监听器的接口;(有N种)

```java
public class TestPanel {
    public static void main(String[] args) {
        //新建一个窗体
        Frame frame = new Frame("端午节快乐");
        //面板
        Panel panel = new Panel(null);
        //设置窗体的布局
        frame.setLayout(null);


        frame.setBounds(300,300,300,300);
        //设置背景颜色
        frame.setBackground(new Color(0,0,255));

        frame.add(panel);

        frame.setVisible(true);

        //监听事件，监听关闭事件
        frame.addWindowFocusListener(new WindowAdapter() {
            @Override
            public void windowClosing(WindowEvent e) {
                super.windowClosing(e);
            }
        });
    }
}
```

## 过滤器、监听器常见应用

用户登录之后才能进入主页，用户注销后就不能进入主页了 

