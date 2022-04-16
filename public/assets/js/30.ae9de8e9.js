(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{592:function(t,s,a){"use strict";a.r(s);var n=a(5),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("p",[t._v("我手上共有两台AC 2100,第一次没有记录,这次记录下来～")]),t._v(" "),a("h2",{attrs:{id:"刷机准备"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#刷机准备"}},[t._v("#")]),t._v(" 刷机准备")]),t._v(" "),a("h3",{attrs:{id:"openwrt"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#openwrt"}},[t._v("#")]),t._v(" OpenWrt")]),t._v(" "),a("ul",[a("li",[t._v("此界面详细介绍了AC2100从获取SSH权限到刷机的全过程\n"),a("ul",[a("li",[a("a",{attrs:{href:"https://openwrt.org/toh/xiaomi/xiaomi_redmi_router_ac2100",target:"_blank",rel:"noopener noreferrer"}},[t._v("OepnWrt界面"),a("OutboundLink")],1),t._v(" "),a("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/10/12/bus0jiw45w1665541860150.png",alt:""}})])])])]),t._v(" "),a("h3",{attrs:{id:"breed"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#breed"}},[t._v("#")]),t._v(" Breed")]),t._v(" "),a("p",[t._v("类似于安卓的"),a("code",[t._v("recovery")]),t._v("模式,恢复出厂设置后自动进入,可以很方便的刷写各类固件")]),t._v(" "),a("ul",[a("li",[t._v("Breed官网\n"),a("ul",[a("li",[a("a",{attrs:{href:"https://breed.hackpascal.net/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Breed官网"),a("OutboundLink")],1)])])])]),t._v(" "),a("h3",{attrs:{id:"redmi-ac-2100-固件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redmi-ac-2100-固件"}},[t._v("#")]),t._v(" Redmi AC 2100 固件")]),t._v(" "),a("ul",[a("li",[t._v("Breed\n"),a("ul",[a("li",[a("a",{attrs:{href:"https://breed.hackpascal.net/breed-mt7621-xiaomi-r3g.bin",target:"_blank",rel:"noopener noreferrer"}},[t._v("breed官网下载地址"),a("OutboundLink")],1),t._v("(直接搜索mt7621,尾缀xiaomi-r3g的固件)")]),t._v(" "),a("li",[a("a",{attrs:{href:"https://wwu.lanzouj.com/i7h6d0dooidi",target:"_blank",rel:"noopener noreferrer"}},[t._v("蓝奏云地址"),a("OutboundLink")],1)])])]),t._v(" "),a("li",[t._v("Padavan\n"),a("ul",[a("li",[a("a",{attrs:{href:"https://opt.cn2qq.com/padavan/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Padavan（老毛子）网站"),a("OutboundLink")],1)])])]),t._v(" "),a("li",[t._v("OpenWrt\n"),a("ul",[a("li",[a("a",{attrs:{href:"https://downloads.openwrt.org/releases/22.03.0/targets/ramips/mt7621/openwrt-22.03.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-kernel1.bin",target:"_blank",rel:"noopener noreferrer"}},[t._v("kernel固件"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"%5Bhttps://downloads.openwrt.org/releases/22.03.0/targets/ramips/mt7621/openwrt-22.03.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin%5D(https://downloads.openwrt.org/releases/22.03.0/targets/ramips/mt7621/openwrt-22.03.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin)"}},[t._v("rootfs0")])])])])]),t._v(" "),a("h3",{attrs:{id:"小米官方固件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#小米官方固件"}},[t._v("#")]),t._v(" 小米官方固件")]),t._v(" "),a("p",[t._v("什么?你问我都刷了三方还要官方固件干嘛?当然是变砖以后救砖啊(bushi")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"http://miwifi.com/miwifi_download.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("小米路由器官方修复工具"),a("OutboundLink")],1)])]),t._v(" "),a("h2",{attrs:{id:"刷机过程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#刷机过程"}},[t._v("#")]),t._v(" 刷机过程")]),t._v(" "),a("h3",{attrs:{id:"开启ssh权限"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#开启ssh权限"}},[t._v("#")]),t._v(" 开启SSH权限")]),t._v(" "),a("p",[t._v("首先我们需要从浏览器打开路由器的后台管理界面,地址一般为"),a("code",[t._v("192.168.31.1")]),t._v("，登陆后url变为"),a("code",[t._v("http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/web/home#router")]),t._v("这样的格式")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/10/12/ta1lrpu7z81665542416680.png",alt:""}})]),t._v(" "),a("p",[t._v("按"),a("code",[t._v("f12")]),t._v("打开控制台，复制以下代码:")]),t._v(" "),a("div",{staticClass:"language-javaScript line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-javascript"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSTOK")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" match "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" location"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("href"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")]),a("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[t._v(";stok=(.*?)\\/")]),a("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[t._v("/")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("match"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" match"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("execute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("stok"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    command "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("encodeURIComponent")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("command"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" path "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("/cgi-bin/luci/;stok=")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("stok"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("/api/misystem/set_config_iotdev?bssid=SteelyWing&user_id=SteelyWing&ssid=-h%0A")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("command"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("%0A")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Request")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("location"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("origin "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" path"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("enableSSH")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    stok "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("getSTOK")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("stok"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("error")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'stok not found in URL'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('stok = "')]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("stok"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"')]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    password "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("prompt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Input new SSH password'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("password"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("error")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'You must input password'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("execute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("stok"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" \n"),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\nnvram set ssh_en=1\nnvram commit\nsed -i 's/channel=.*/channel=\\\\\"debug\\\\\"/g' /etc/init.d/dropbear\n/etc/init.d/dropbear start\n")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("response")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("text")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("text")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'New SSH password: '")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" password"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("execute")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("stok"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('echo -e "')]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("password"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("\\\\n")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("password"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('" | passwd root')]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("response")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" response"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("text")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("text")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("enableSSH")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br"),a("span",{staticClass:"line-number"},[t._v("27")]),a("br"),a("span",{staticClass:"line-number"},[t._v("28")]),a("br"),a("span",{staticClass:"line-number"},[t._v("29")]),a("br"),a("span",{staticClass:"line-number"},[t._v("30")]),a("br"),a("span",{staticClass:"line-number"},[t._v("31")]),a("br"),a("span",{staticClass:"line-number"},[t._v("32")]),a("br"),a("span",{staticClass:"line-number"},[t._v("33")]),a("br"),a("span",{staticClass:"line-number"},[t._v("34")]),a("br"),a("span",{staticClass:"line-number"},[t._v("35")]),a("br"),a("span",{staticClass:"line-number"},[t._v("36")]),a("br"),a("span",{staticClass:"line-number"},[t._v("37")]),a("br"),a("span",{staticClass:"line-number"},[t._v("38")]),a("br"),a("span",{staticClass:"line-number"},[t._v("39")]),a("br"),a("span",{staticClass:"line-number"},[t._v("40")]),a("br"),a("span",{staticClass:"line-number"},[t._v("41")]),a("br"),a("span",{staticClass:"line-number"},[t._v("42")]),a("br"),a("span",{staticClass:"line-number"},[t._v("43")]),a("br"),a("span",{staticClass:"line-number"},[t._v("44")]),a("br"),a("span",{staticClass:"line-number"},[t._v("45")]),a("br"),a("span",{staticClass:"line-number"},[t._v("46")]),a("br")])]),a("p",[a("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/10/12/ixrjtfqora1665542506694.png",alt:""}})]),t._v(" "),a("p",[t._v("回车执行代码后需要输入SSH密码,出现"),a("code",[t._v("undefined")]),t._v("即表明开启成功。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/10/12/tfp728dsf81665542990586.png",alt:""}})]),t._v(" "),a("h3",{attrs:{id:"刷写breed固件-可选"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#刷写breed固件-可选"}},[t._v("#")]),t._v(" 刷写Breed固件(可选)")]),t._v(" "),a("p",[a("strong",[t._v("首先这个并不是路由器系统")]),t._v(",刷入的话恢复出厂设置时,可以很方便刷写OpenWrt、Padavan固件\n首先通过SSH连接路由器,ip地址为"),a("code",[t._v("192.168.31.1")]),t._v("(如果是小米固件的话)\n连接需要确认指纹,首先输入"),a("code",[t._v("yes")]),t._v("\n然后输入密码,"),a("strong",[t._v("密码在输入的过程中不显示")]),t._v("\n然后就进入到路由器的系统中啦~\n"),a("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/10/12/c9uu0p1d6d1665543192540.png",alt:""}})]),t._v(" "),a("p",[t._v("通过"),a("code",[t._v("scp")]),t._v("指令将文件传入路由器")]),t._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("scp")]),t._v(" -O 文件所处的绝对路径 root@192.168.31  \n.1:/tmp\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("openssh 9.0之后的版本，scp命令默认使用SFTP协义来传输文件，路由器系统大部分不支持,因此"),a("strong",[t._v("使用“-O”参数使用得scp的变回传统传输行为")])]),t._v(" "),a("p",[a("code",[t._v("Window")]),t._v("下"),a("code",[t._v("scp")]),t._v("版本老不用添加,添加了反而会因为不识别参数报错,部分"),a("code",[t._v("linux")]),t._v("下版本较新需要添加\n如果提示"),a("code",[t._v("-O")]),t._v("参数不可用,去掉即可")]),t._v(" "),a("p",[a("code",[t._v("window")]),t._v("系统建议在固件所处目录下"),a("code",[t._v("shift+右键")]),t._v("打开终端，然后通过")]),t._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("scp")]),t._v(" -O ./breed-mt7621-xiaomi-r3g.bin root@192.168.31  \n.1:/tmp\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("将固件发送到路由器的tmp目录下,出现以下字样说明上传成功")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/10/12/uhi1qrs9te1665546719635.png",alt:""}}),t._v("\n通过"),a("code",[t._v("SSH")]),t._v("命令连接到路由器系统,执行以下命令")]),t._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("mtd -r "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),t._v(" /tmp/breed-mt7621-xiaomi-r3g.bin Bootloader\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("出现以下字样说明刷写成功\n"),a("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/10/12/f6r491y9s61665546996376.png",alt:""}})]),t._v(" "),a("p",[t._v("拔掉路由器电源，按住reset同时接上电源等双黄灯闪烁后松开, 浏览器输入 192.168.1.1 即可进入breed\n(如果以后路由器出现问题，路由器断电之后，使用取卡针插入路由器，再接电即可重置路由器进入 Breed，不用担心软砖的问题)\n点击"),a("code",[t._v("环境变量编辑")]),t._v(",翻到最下面点击添加,"),a("code",[t._v("字段")]),t._v("输入 "),a("code",[t._v("xiaomi.r3g.bootfw")]),t._v("  值输入"),a("code",[t._v("2")]),t._v(" ,点击 保存\n"),a("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/10/12/u9h3vy8ue51665548020135.png",alt:""}})]),t._v(" "),a("h3",{attrs:{id:"刷写路由器系统"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#刷写路由器系统"}},[t._v("#")]),t._v(" 刷写路由器系统")]),t._v(" "),a("p",[t._v("主要分为两大类,"),a("code",[t._v("OpenWrt")]),t._v("和"),a("code",[t._v("Padavan")]),t._v("两种,个人体验:")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("系统")]),t._v(" "),a("th",[t._v("OpenWrt")]),t._v(" "),a("th",[t._v("Padavan")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("可玩性")]),t._v(" "),a("td",[t._v("高,针对软路由有较好的解决方案")]),t._v(" "),a("td",[t._v("和OpenWrt相比,添加新功能比较麻烦")])]),t._v(" "),a("tr",[a("td",[t._v("系统占用")]),t._v(" "),a("td",[t._v("高,空载占用50%~70%左右(AC 2100运存128MB)")]),t._v(" "),a("td",[t._v("相对较低,空载占用约30%")])]),t._v(" "),a("tr",[a("td",[t._v("使用体验")]),t._v(" "),a("td",[t._v("页面响应速度较慢,有卡顿,不过有自己的包管理器,体验上更像完整的linux操作系统")]),t._v(" "),a("td",[t._v("插件相对OpenWrt少,但是内存占用较少，更像是一个纯粹的、相比原版功能更多的路由器系统")])])])]),t._v(" "),a("p",[t._v("总而言之,OpenWrt占用高,功能全,更像一个"),a("strong",[t._v("专门针对网络的操作系统")]),t._v(","),a("strong",[t._v("但是对于路由器来说运行较为吃力")]),t._v("(也可能是我插件加的太多)。而Padavan更纯粹,插件相对OpenWrt也只是略逊一筹。取舍全看个人，看中可定制性,就OpenWrt,注重稳定低占用,就Padavan。")]),t._v(" "),a("h4",{attrs:{id:"有breed"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#有breed"}},[t._v("#")]),t._v(" 有Breed")]),t._v(" "),a("p",[t._v("在此处选择固件,刷写OpenWrt则选择布局为"),a("code",[t._v("OpenWrt")]),t._v(",分别刷写"),a("code",[t._v("kernel1")]),t._v("和"),a("code",[t._v("rootfs0")]),t._v("的固件，文件后缀名为"),a("code",[t._v(".bin")]),t._v(" "),a("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/10/12/dj9yg1xwwt1665570259025.png",alt:""}}),t._v("\n刷写Padavan则选择闪存布局为"),a("code",[t._v("Padavan")]),t._v(",刷写后缀名为"),a("code",[t._v(".trx")]),t._v("的文件\n"),a("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/10/12/98iqqj5alj1665570064136.png",alt:""}}),t._v("\n固件刷写成功会出现"),a("code",[t._v("Wifi")]),t._v("信号,无密码,连接后进入网关管理界面(我这里是"),a("code",[t._v("192.168.2.1")]),t._v(",如果进不去的花自行查看网关地址),"),a("code",[t._v("Padavan")]),t._v("的默认账号密码均为"),a("code",[t._v("admin")]),t._v("，输入后即可进入系统~\n"),a("img",{attrs:{src:"https://img.lystu.cn/imgBed/2022/10/12/ym4yqjziab64df4b21e8bb17233bf064b90e48f3b.jpg",alt:""}})]),t._v(" "),a("h4",{attrs:{id:"无breed"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#无breed"}},[t._v("#")]),t._v(" 无Breed")]),t._v(" "),a("p",[t._v("我没有尝试过从命令行刷写"),a("code",[t._v("padavan")]),t._v("，网上也没有相关教程，因此这里只介绍刷写"),a("code",[t._v("OpenWrt")])]),t._v(" "),a("p",[t._v("刷写"),a("code",[t._v("OpenWrt")]),t._v("时,首先通过"),a("code",[t._v("scp")]),t._v("命令将固件传输至路由器")]),t._v(" "),a("p",[t._v("报错请自行删减"),a("code",[t._v("-O")]),t._v("参数(上面没加下面也不用加)")]),t._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("scp")]),t._v(" -O openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-kernel1.bin root@192.168.31.1:/tmp\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("scp")]),t._v(" -O openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin root@192.168.31.1:/tmp\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("通过"),a("code",[t._v("SSH")]),t._v("连接进入路由器系统")]),t._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ssh")]),t._v(" root@192.168.31.1\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("p",[t._v("依次执行以下命令")]),t._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("mtd "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),t._v(" openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-kernel1.bin kernel1\n\nmtd -r "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),t._v(" openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin rootfs0\n\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[t._v("或者你也可以直接从网络获取固件并刷写\n首先通过"),a("code",[t._v("SSH")]),t._v("进入路由器,依次执行以下命令")]),t._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" /tmp\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" http://openwrt.tetaneutral.net/releases/21.02.0/targets/ramips/mt7621/openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-kernel1.bin \n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" http://openwrt.tetaneutral.net/releases/21.02.0/targets/ramips/mt7621/openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin\n\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("p",[t._v("执行刷写操作即可")]),t._v(" "),a("div",{staticClass:"language-shell line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-shell"}},[a("code",[t._v("mtd "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),t._v(" openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-kernel1.bin kernel1\nmtd -r "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("write")]),t._v(" openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin rootfs0\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br")])]),a("p",[t._v("享受你的新系统吧~")]),t._v(" "),a("h2",{attrs:{id:"后记"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#后记"}},[t._v("#")]),t._v(" 后记")]),t._v(" "),a("p",[t._v("本文只用作抛砖引玉,介绍的是官方固件,实际上有很多优秀的第三方固件,都是从"),a("code",[t._v("OpenWrt")]),t._v("或者"),a("code",[t._v("Padavan")]),t._v("的源码编译而来,因此如果一直找不到心仪的固件,可以自己从源码编译固件,并分享给他人使用,开源共享~")])])}),[],!1,null,null,null);s.default=e.exports}}]);