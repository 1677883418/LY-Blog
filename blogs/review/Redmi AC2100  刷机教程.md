---
title: Redmi AC2100 刷机教程
date: 2022-10-12
tags:
- openWrt
- Padavan
categories:
- 复盘
---
我手上共有两台AC 2100,第一次没有记录,这次记录下来～
## 刷机准备
### OpenWrt
- 此界面详细介绍了AC2100从获取SSH权限到刷机的全过程
	* [OepnWrt界面](https://openwrt.org/toh/xiaomi/xiaomi_redmi_router_ac2100) 
![](https://img.lystu.cn/imgBed/2022/10/12/bus0jiw45w1665541860150.png)
### Breed
类似于安卓的`recovery`模式,恢复出厂设置后自动进入,可以很方便的刷写各类固件
- Breed官网
	- [Breed官网](https://breed.hackpascal.net/)
### Redmi AC 2100 固件
- Breed
	- [breed官网下载地址](https://breed.hackpascal.net/breed-mt7621-xiaomi-r3g.bin)(直接搜索mt7621,尾缀xiaomi-r3g的固件)
	- [蓝奏云地址](https://wwu.lanzouj.com/i7h6d0dooidi)
- Padavan
	- [Padavan（老毛子）网站](https://opt.cn2qq.com/padavan/)
- OpenWrt
	- [kernel固件](https://downloads.openwrt.org/releases/22.03.0/targets/ramips/mt7621/openwrt-22.03.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-kernel1.bin)
	- [rootfs0]([https://downloads.openwrt.org/releases/22.03.0/targets/ramips/mt7621/openwrt-22.03.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin](https://downloads.openwrt.org/releases/22.03.0/targets/ramips/mt7621/openwrt-22.03.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin))
### 小米官方固件
什么?你问我都刷了三方还要官方固件干嘛?当然是变砖以后救砖啊(bushi
- [小米路由器官方修复工具](http://miwifi.com/miwifi_download.html)
## 刷机过程
### 开启SSH权限
首先我们需要从浏览器打开路由器的后台管理界面,地址一般为`192.168.31.1`，登陆后url变为`http://192.168.31.1/cgi-bin/luci/;stok=<STOK>/web/home#router`这样的格式

![](https://img.lystu.cn/imgBed/2022/10/12/ta1lrpu7z81665542416680.png)

按`f12`打开控制台，复制以下代码:
```javaScript
function getSTOK() {
    let match = location.href.match(/;stok=(.*?)\//);
    if (!match) {
        return null;
    }
    return match[1];
}

function execute(stok, command) {
    command = encodeURIComponent(command);
    let path = `/cgi-bin/luci/;stok=${stok}/api/misystem/set_config_iotdev?bssid=SteelyWing&user_id=SteelyWing&ssid=-h%0A${command}%0A`;
    console.log(path);
    return fetch(new Request(location.origin + path));
}

function enableSSH() {
    stok = getSTOK();
    if (!stok) {
        console.error('stok not found in URL');
        return;
    }
    console.log(`stok = "${stok}"`);

    password = prompt('Input new SSH password');
    if (!password) {
        console.error('You must input password');
        return;
    }

    execute(stok, 
`
nvram set ssh_en=1
nvram commit
sed -i 's/channel=.*/channel=\\"debug\\"/g' /etc/init.d/dropbear
/etc/init.d/dropbear start
`
    )
        .then((response) => response.text())
        .then((text) => console.log(text));
    console.log('New SSH password: ' + password);
    execute(stok, `echo -e "${password}\\n${password}" | passwd root`)
        .then((response) => response.text())
        .then((text) => console.log(text));
}

enableSSH();
```

![](https://img.lystu.cn/imgBed/2022/10/12/ixrjtfqora1665542506694.png)

回车执行代码后需要输入SSH密码,出现`undefined`即表明开启成功。

![](https://img.lystu.cn/imgBed/2022/10/12/tfp728dsf81665542990586.png)
### 刷写Breed固件(可选)
**首先这个并不是路由器系统**,刷入的话恢复出厂设置时,可以很方便刷写OpenWrt、Padavan固件
首先通过SSH连接路由器,ip地址为`192.168.31.1`(如果是小米固件的话)
连接需要确认指纹,首先输入`yes`
然后输入密码,**密码在输入的过程中不显示**
然后就进入到路由器的系统中啦~
![](https://img.lystu.cn/imgBed/2022/10/12/c9uu0p1d6d1665543192540.png)

通过`scp`指令将文件传入路由器

```shell
scp -O 文件所处的绝对路径 root@192.168.31  
.1:/tmp
```

openssh 9.0之后的版本，scp命令默认使用SFTP协义来传输文件，路由器系统大部分不支持,因此**使用“-O”参数使用得scp的变回传统传输行为**

`Window`下`scp`版本老不用添加,添加了反而会因为不识别参数报错,部分`linux`下版本较新需要添加
如果提示`-O`参数不可用,去掉即可


`window`系统建议在固件所处目录下`shift+右键`打开终端，然后通过
```shell
scp -O ./breed-mt7621-xiaomi-r3g.bin root@192.168.31  
.1:/tmp
```
将固件发送到路由器的tmp目录下,出现以下字样说明上传成功

![](https://img.lystu.cn/imgBed/2022/10/12/uhi1qrs9te1665546719635.png)
通过`SSH`命令连接到路由器系统,执行以下命令
```shell
mtd -r write /tmp/breed-mt7621-xiaomi-r3g.bin Bootloader
```
出现以下字样说明刷写成功
![](https://img.lystu.cn/imgBed/2022/10/12/f6r491y9s61665546996376.png)

拔掉路由器电源，按住reset同时接上电源等双黄灯闪烁后松开, 浏览器输入 192.168.1.1 即可进入breed 
(如果以后路由器出现问题，路由器断电之后，使用取卡针插入路由器，再接电即可重置路由器进入 Breed，不用担心软砖的问题)
点击`环境变量编辑`,翻到最下面点击添加,`字段`输入 `xiaomi.r3g.bootfw`  值输入`2` ,点击 保存 
![](https://img.lystu.cn/imgBed/2022/10/12/u9h3vy8ue51665548020135.png)
### 刷写路由器系统
主要分为两大类,`OpenWrt`和`Padavan`两种,个人体验:
| 系统     | OpenWrt                                                                    | Padavan                                                                            |
| -------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 可玩性   | 高,针对软路由有较好的解决方案                                              | 和OpenWrt相比,添加新功能比较麻烦                                                                               |
| 系统占用 | 高,空载占用50%~70%左右(AC 2100运存128MB)                                                            | 相对较低,空载占用约30%                                                                          |
| 使用体验 | 页面响应速度较慢,有卡顿,不过有自己的包管理器,体验上更像完整的linux操作系统 | 插件相对OpenWrt少,但是内存占用较少，更像是一个纯粹的、相比原版功能更多的路由器系统 |

总而言之,OpenWrt占用高,功能全,更像一个**专门针对网络的操作系统**,**但是对于路由器来说运行较为吃力**(也可能是我插件加的太多)。而Padavan更纯粹,插件相对OpenWrt也只是略逊一筹。取舍全看个人，看中可定制性,就OpenWrt,注重稳定低占用,就Padavan。

#### 有Breed

在此处选择固件,刷写OpenWrt则选择布局为`OpenWrt`,分别刷写`kernel1`和`rootfs0`的固件，文件后缀名为`.bin`
![](https://img.lystu.cn/imgBed/2022/10/12/dj9yg1xwwt1665570259025.png)
刷写Padavan则选择闪存布局为`Padavan`,刷写后缀名为`.trx`的文件
![](https://img.lystu.cn/imgBed/2022/10/12/98iqqj5alj1665570064136.png)
固件刷写成功会出现`Wifi`信号,无密码,连接后进入网关管理界面(我这里是`192.168.2.1`,如果进不去的花自行查看网关地址),`Padavan`的默认账号密码均为`admin`，输入后即可进入系统~
![](https://img.lystu.cn/imgBed/2022/10/12/ym4yqjziab64df4b21e8bb17233bf064b90e48f3b.jpg)

#### 无Breed

我没有尝试过从命令行刷写`padavan`，网上也没有相关教程，因此这里只介绍刷写`OpenWrt`


刷写`OpenWrt`时,首先通过`scp`命令将固件传输至路由器

报错请自行删减`-O`参数(上面没加下面也不用加)
```shell
scp -O openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-kernel1.bin root@192.168.31.1:/tmp

scp -O openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin root@192.168.31.1:/tmp
```
通过`SSH`连接进入路由器系统
```shell
ssh root@192.168.31.1
```
依次执行以下命令
```shell
mtd write openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-kernel1.bin kernel1

mtd -r write openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin rootfs0

```

或者你也可以直接从网络获取固件并刷写
首先通过`SSH`进入路由器,依次执行以下命令
```shell
cd /tmp
wget http://openwrt.tetaneutral.net/releases/21.02.0/targets/ramips/mt7621/openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-kernel1.bin 
wget http://openwrt.tetaneutral.net/releases/21.02.0/targets/ramips/mt7621/openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin

```
执行刷写操作即可
```shell
mtd write openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-kernel1.bin kernel1
mtd -r write openwrt-21.02.0-ramips-mt7621-xiaomi_redmi-router-ac2100-squashfs-rootfs0.bin rootfs0
```
享受你的新系统吧~

## 后记
本文只用作抛砖引玉,介绍的是官方固件,实际上有很多优秀的第三方固件,都是从`OpenWrt`或者`Padavan`的源码编译而来,因此如果一直找不到心仪的固件,可以自己从源码编译固件,并分享给他人使用,开源共享~
