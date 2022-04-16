---
title: JDBC
sidebar: 'auto'
date: 2021-5-10 
tags:
- JDBC
- MariaDB
categories:
- Java
- 数据库
---
# Jdbc基本概念：

Java数据库连接，Java语言操作数据库。

# 步骤：

    1.导入驱动jar包
    
    2.注册驱动
    
    3.获取数据库连接对象 Connection
    
    4.定义sql
    
    5.获取执行sql语句的对象 Statement
    
    6.执行sql,接受返回结果
    
    7.处理结果
    
    8.释放资源

# Jdbc快速入门：

* 获取数据库连接对象

```sql

Connect conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/test","数据库账号","数据库密码");



url参数说明:jdbc:数据库驱动名://数据库地址:端口号/数据库名称

```

* 获取执行sql的对象 Statement:

`Statement stmt = conn.createStatement();`

* 执行sql语句

```java

int count = stmt.executeUpdate(sql语句);

```

* 处理结果

```java

System.out.println(count);

```

* 释放资源

```java

stmt.close();       //关闭执行sql的对象

conn.close();       //断开连接 

```

# Jbdc中的对象:

## 1.DriverManager:驱动管理对象

* 注册给定的驱动程序:DriverManager

```java

    注册驱动static void registerDriver(Driver driver);

    注册给定的驱动DriverManager

```

* 代码实现

        Class.forName(com.mysql.jdbc.Driver)



## 2. Connection:数据库连接对象
### 代码实现：
    conn = DriverManager.getConnection(url, sqlname, password);

### 功能：

* 方法：static Connection getConnection(String url, String user,String password);

* 参数：

  * url:指定连接的路径

  * user:用户名

  * password:密码

### 管理事务：

     开启事务:setAutoCommit(boolean autoCommit):调用该方法设置参数为false,即开启事务
    
     提交事务:commit()
    
     回滚事务:rollback()

## 3. Statement:执行sql的对象
    stmt = conn.createStatement();
### ①执行sql：

    1.boolean execute(String sql):可以执行任意的sql
    
    2.int executeUpdate(String sql):执行DML(insert、update、delete)语句、DDL(create、alter、drop)语句
    
      返回值：影响的行数（通过影响行数判断DML是否执行成功；返回值>0则执行成功，反之则失败）;
    
    3.ResultSet executeQuery(String sql):执行DQL(select)语句

## 4. Resultset:结果集对象
* boolean next():游标向下移动一行
    * 且判断当前行是否是最后一行末尾(是否有数据)，如果是，则返回false，如果不是则返回true
* getXxx():获取数据   
    * Xxx:如：int getInt()    String  getString()
    * 参数:
            1.Int:代表列的编号*从1开始*  如：getString(1)
            2.String:代表列名称          如：getDouble("balance")
* 注意：
    * 使用步骤：
        1. 游标向下移动一行
        2. 判断是否有数据
        3. 获取数据

```java
            while (rs.next()) {
                int id = rs.getInt(1);                  //以列表编号--1--获取数据
                String name = rs.getString("name");     //以列表名称--"name"--获取数据
                String sex = rs.getString(3);           //以编号获取数据
                double balance = rs.getDouble(4);       //同上
                System.out.println("id\t"+"name\t"+"sex\t"+"balance\t");
                System.out.println(id + "\t" + name + "\t\t" + sex + "\t" + balance);
            }
            System.out.println("查询成功");

```
* 练习：
    * 定义一个方法，查询表的数据并将其封装为对象，然后装载集合，返回。
        1. 定义student类
        2. 定义方法 `Public List<student>   finAll()`
        3. 实现方法 `select * from student`;
## 5. PreparedStatement:执行sql的对象
1. SQL注入问题：拼接sql时，有一些sql的特殊关键字参与字符串的拼接。会造成安全性问题
   1. 输入用户随便，输入密码:a' or 'a' = 'a
   2. sql:select * from user where username = '" 任意用户名 "' and password = ' a' or 'a' = 'a ' 
   3. 预编译的SQL：参数使用？作为占位符
   4. 步骤：
      
       1. 导入驱动jar包
       
       2. 注册驱动

       3. 获取数据库连接对象 Connection

       4. 定义sql
            * 注意：sql的参数使用？作为占位符。如：select * from user where username = ？ and password = ?;
       5. 获取执行sql语句的对象 PreparedStatement   Connection.propareStatement(String sql)
       6. 给？赋值
          * 方法：setXxx(参数1，参数2)
            * 参数1：？的编号   从1开始
            * 参数2：？的值    
       7. 执行sql,接受返回结果，不需要传递sql语句

       8. 处理结果

       9.  释放资源
   5. 注意：后期都会使用PrepareStatement完成增删改查的所有操作
      1. 可以防止SQL注入
      2. 效率更高 
## 抽取jdbc工具类：JDBCUtils
* 目的：简化书写
* 分析：
    1. 注册驱动也抽取
    2. 抽取一个方法获取连接对象
    * 需求：不想传递参数(麻烦)，还得保证工具类的通用性。
    * 解决：配置文件
        * jdbc.properties
            * url=
            * user=
            * password=
    3. 抽取一个方法释放资源
* 代码实现：
```java
public class JDBCUtils {
    private static String url;
    public static String user;
    private static String password;
    private static String driver;

    /*
      文件的读取，只需要读取一次即可拿到配置值。使用静态代码块
     */
    static {
        //读取资源文件，获取值


        try {
            //1.创建Properties集合类
            Properties pro = new Properties();

            //获取src路径下的文件的方式————————>ClassLoader(类加载器)
            ClassLoader classLoader = JDBCUtils.class.getClassLoader();
            URL res = classLoader.getResource("jdbc.properties");
            String path = res.getPath();
            System.out.println(path);
            //2.加载文件
            pro.load(new FileReader(path));
            //3.获取数据，赋值
            url = pro.getProperty("url");
            user = pro.getProperty("user");
            password = pro.getProperty("password");
            driver = pro.getProperty("driver");

            Class.forName(driver);
        } catch (IOException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取连接
     *
     * @return 连接对象
     **/

    public static Connection getConnection(String url, String user, String password) throws SQLException {
        return DriverManager.getConnection(url, user, password);
    }

    /**
     * @param stmt
     * @param conn
     */
    public static void close(Statement stmt, Connection conn) {
        if (stmt != null) {
            try {
                stmt.close();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
            if (conn != null) {
                try {
                    conn.close();
                } catch (SQLException throwables) {
                    throwables.printStackTrace();
                }
            }
        }
    }
}
```
* 练习：
    * 需求：
        1. 通过键盘录入用户名和密码
        2. 判断用户是否登录成功
            * select * from user where username = ""and password = "";
            * 如果sql有查询结果，则查询成功否则查询失败。    
    * 步骤：
        1. 创建数据库 user
```sql
use jdbc;
create table user(
id int primary key auto_increment,
username varchar(32),
password varchar(32)
);
select * from user;
insert into user values(null,'zhangsan','123');
insert into user values(null,'lisi','123');
```
## JDBC控制事务
  1. 事务：一个包含多个步骤的业务操作。如果这个业务操作被事务管理，则这多个步骤要么同时成功，要么同时失败。
  2. 操作：
     1. 开启事务
     2. 提交事务
     3. 回滚事务
  3. 使用Connection对象来管理事务 
     * 开启事务:setAutoCommit(boolean autoCommit):调用该方法设置参数为false,即开启事务
       * 在执行sql之前开启事务
     * 提交事务:commit()
       * 当所有sql都执行完提交事务
     * 回滚事务:rollback()
       * 在catch中回滚事务
##  数据库连接池
1. 概念：一个容器(集合)，存放数据库链接的容器。
  * 当系统初始化好后，容器被创建，容器中会申请一些连接对象，当用户来访问数据库时，从容器中获取连接对象，用户访问完之后，会将连接对象归还给容器。
2. 好处：
   1. 节约资源
   2. 用户访问高效
3. 实现：
   1. 标准接口：DataSource javax.sql包下
      1. 方法：
         *  获取连接：getConnection()
         *  归还连接：如果连接对象Connection是从连接池中获取的，那么调用Connection.close()方法，则不会再关闭连接了。而是归还连接    
   2. 一般不去实现，有数据库厂商来实现
      1. C3P0：数据库连接池技术
      2. Druid：数据库连接池实现技术，由阿里巴巴提供的
4. C3P0：数据库连接池技术
   * 步骤：
      1. 导入jar包 c3p0-0.9.5.5.jar     mchange-commons-java-0.2.19.jar
      2. 定义配置文件：
         * 名称：C3P0.properties 或者 c3p0-config.xml
         * 路径：直接将文件放在src目录下即可。
      3. 创建核心对象：数据库连接对象 combopooledDataSource
      4. 获取连接：getConnection 
         * 导入数据库驱动jar包
5. Druid：阿里巴巴实现的数据库连接池实现技术
      1. 步骤：
         1.   导入jar包 druid-1.2.6.jar
         2.   定义配置文件：
              * properties形式
              * 可以叫任意名称，可以放在任意目录
         3. 加载配置文件：properties  
         4. 获取数据库连接池对象：通过工厂类来获取             DruidDataSourceFactory
         5. 获取连接：getconnection
      2. 定义工具类
         1. 定义一个类 JDBCUtils
         2. 提供静态代码块加载配置文件，初始化连接池对象 
         3. 提供方法
            1. 获取连接方法：获取数据库连接池获取连接
            2. 释放资源
            3. 获取连接池的方法
## Spring JDBC
* [[spring]]框架对JDBC的简单封装。提供了JDBCTemplate对象简化JDBC的开发
* 步骤：
  1. 导入jar包
  2. 创建jdbcTemplate对象。依赖于数据源DataSource
    * jdbcTemplate template = new  jdbcTempplate(ds);
  3. 调用jdbcTemplate方法来完成Crud的操作
    * update():执行DML语句。增删改语句
    * queryForMap():查询结果将结果集封装为map集合，将值作为value,将记录封装为一个map集合
        * 注意:查询结果集长度只能是1
    * queryForList():查询结果将结果集封装为List集合
      * 注意:将每一条记录封装为Map集合，再将Map集合装载到List集合中
    * query():查询结果，将结果封装为JavaBean对象
      * query参数：RowMapper
        * 一般使用BeanPropertyRowMapper实现类。可以完成数据到JavaBean的自动封装
        * new BeanPropertyRowMapper<类型>(类型.class)
    * queryForObject：查询结果,将结果封装为对象
      * 一般用于聚合函数的查询
  4. 练习:
     * 需求：
     1. 修改1号数据的balance为10000
     2. 添加一条记录
     3. 删除刚才添加的记录
     4. 查询id为1的记录，将其封装为Map集合
     5. 查询所有记录，将其封装为List
     6. 查询所有记录，将其封装为Emp对象的List集合
     7. 查询总记录数
