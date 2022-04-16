---
title: html标签
date: 2022-9-20
tags:
- Web
categories:
- Html
mindmap-plugin: basic
publish: false
---

# html
* 基础标签
	* [&lt;!DOCTYPE&gt;](https://www.runoob.com/tags/tag-doctype.html)
		* 定义文档类型
	- [&lt;html&gt;](https://www.runoob.com/tags/tag-html.html)
		- 定义一个HTML文档
	- [&lt;head&gt;](https://www.runoob.com/tags/tag-head.html)
		- 定义页面头部内容,元数据meta等**必须包含title标签**
		- [&lt;meta&gt;](https://www.runoob.com/tags/tag-meta.html)
			- 描述文档元数据
				- charset:设置页面编码
				- content:定义与 http-equiv 或 name 属性相关的元信息。
				- http-equiv:把 content 属性关联到 HTTP 头部.
				- name:把 content 属性关联到一个名称。
				- scheme:**HTML5不支持** 定义用于翻译 content 属性值的格式。
		- [&lt;title&gt;](https://www.runoob.com/tags/tag-title.html)
			- 定义页面标题  **浏览器标签页**
	- [&lt;body&gt;](https://www.runoob.com/tags/tag-body.html)
		- 定义页面主体部分
		- [&lt;h1~h6&gt;](https://www.runoob.com/tags/tag-hn.html)
			- 定义HTML页面标题
		- [&lt;p&gt;](https://www.runoob.com/tags/tag-p.html)
			- 段落标签
			- align
				- **HTML5不支持。 HTML 4.01已废弃**, 不赞成使用。 规定段落中文本的对齐方式。
		- [&lt;br&gt;](https://www.runoob.com/tags/tag-br.html)
			- 换行符,输入空行，而不是分割段落
		- [&lt;hr&gt;](https://www.runoob.com/tags/tag-hr.html)
			- 定义水平线
			- align
				- **HTML5 不支持。HTML 4.01 已废弃。** 规定元素的对齐方式
			- noshade
				- HTML5 不支持。HTML 4.01 已废弃。 规定元素的颜色呈现为纯色。
			- size
				- 规定元素高度
			- width
				- 规定元素宽度 
		* [&lt;!----&gt;](https://www.runoob.com/tags/tag-comment.html)
			* 注释
* 格式标签 
	* [&lt;strong&gt;](https://www.runoob.com/tags/tag-strong.html)
		* 定义粗体
	* [&lt;s&gt;](https://www.runoob.com/tags/tag-s.html)
		* 删除线
	* [&lt;u&gt;](https://www.runoob.com/tags/tag-u.html)
		* 下划线
* 表单
	* [&lt;form&gt;](https://www.runoob.com/tags/tag-form.html)
		* 定义一个 HTML 表单，用于用户输入。
	* [&lt;input&gt;](https://www.runoob.com/tags/tag-input.html)
		* 定义一个输入控件
* 列表
	* [&lt;ul&gt;](https://www.runoob.com/tags/tag-ul.html)
		* 定义一个无序列表
	* [&lt;ol&gt;](https://www.runoob.com/tags/tag-ol.html)
		* 定义一个有序列表
	* [&lt;li&gt;](https://www.runoob.com/tags/tag-li.html)
		* 定义一个列表项
	* [&lt;dl&gt;](https://www.runoob.com/tags/tag-dl.html)
		* 定义一个定义列表
	* [&lt;dt&gt;](https://www.runoob.com/tags/tag-dt.html)
		* 定义一个定义定义列表中的项目
	* [&lt;dd&gt;](https://www.runoob.com/tags/tag-dd.html)
		* 定义定义列表中项目的描述
	* [&lt;menu&gt;](https://www.runoob.com/tags/tag-menu.html)
		* 定义菜单列表
* 表格
	* [&lt;table&gt;](https://www.runoob.com/tags/tag-table.html)
		* 定义一个表格
	* [&lt;caption&gt;](https://www.runoob.com/tags/tag-caption.html)
		* 定义表格标题
	* [&lt;th&gt;](https://www.runoob.com/tags/tag-th.html)
		* 定义表格中的表头单元格
	* [&lt;tr&gt;](https://www.runoob.com/tags/tag-tr.html)
		* 定义表格中的行
	* [&lt;td&gt;](https://www.runoob.com/tags/tag-td.html)
		* 定义表格中的单元
	* [&lt;thead&gt;](https://www.runoob.com/tags/tag-thead.html)
		* 定义表格中的表头内容
	* [&lt;tbody&gt;](https://www.runoob.com/tags/tag-tbody.html)
		* 定义表格中的主体内容
	* [&lt;tfoot&gt;](https://www.runoob.com/tags/tag-tfoot.html)
		* 定义表格中的表注内容(脚注)
	* [&lt;col&gt;](https://www.runoob.com/tags/tag-col.html)
		* 定义表格中一个或多个列的属性值
	* [&lt;colgroup&gt;](https://www.runoob.com/tags/tag-colgroup.html)
		* 定义表格中供格式化的列组