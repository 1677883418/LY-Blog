---
title: OpenStack部署
date: 2022-5-17
tags:
 - OpenStack
 - VMware
 - Linux
 - devStack
categories:
 - Linux
---

:::tip
难装的一批,吐了
:::
# OpenStack部署
## 部署配置
服务器:ubuntu20.04-live-server

远控软件: mobaXterm
## 部署注意点
* 截止*2022-5-17*时，devstack官方推荐版本仍然是ubuntu的上一个LTS版本20.04    **头铁当然可以用22.04版本尝试，不过会遇到比如python版本过新导致无法使用devstack默认的管理方式等各种各样的迷惑问题**
* 如果能够接受命令行黑框框以及复制难的问题，那远控软件可以不要、
* 运行过程中会从apt源、github、python源等官方源获取文件,众所周知，国内访问极其容易超时或者直接访问不到，所以需要换源/反代
	* apt: 首先`sudo vim /etc/apt/sources.list`,然后修改里面类似`http://cn.ubuntu.com/ubuntu`之类的字样为`http://mirrors.aliyun.com/ubuntu`,然后即可换源成功
	* git:首先通过[查询github IP 点我](http://ping.chinaz.com/github.com)获取到不超时的ip地址，然后执行`sudo vim /etc/hosts`打开并编辑host文件，另起一行写`xxx.xxx.xxx.xxx  github.com`其中`xxx.xxx.xxx.xxx`就是刚刚查询到的不超时的IP地址
	* python/pip:采用换源方法，在devstack目录下执行`pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/`修改pip源为阿里源

## 部署过程
首先安装pip3
```bash
sudo apt install python3-pip
```
本文大部分内容参阅官方文档，[官方文档点我](https://docs.openstack.org/devstack/latest/)
首先添加新用户
`sudo useradd -s /bin/bash -d /opt/stack -m stack`
添加新用户后要更改权限
```bash
sudo vim /etc/sudoers
#添加下面这行在root行下
stack ALL=(ALL) NOPASSWD: ALL
```
保存后退出，使用`sudo -u stack -i`命令登入`stack`用户
获取官方devstack脚本
```bash
#如果git提示time out或者别的，请参阅 部署注意点 的github换源教程
$ git clone https://opendev.org/openstack/devstack
$ cd devstack
```
目前应该处于devstack目录下，使用`sudo vim local.conf`创建local.conf文件并配置默认密码
```bash
[[local|localrc]]
# use TryStack git mirror
GIT_BASE=http://git.trystack.cn
NOVNC_REPO=http://git.trystack.cn/kanaka/noVNC.git
SPICE_REPO=http://git.trystack.cn/git/spice/spice-html5.git

# Define images to be automatically downloaded during the DevStack built process.
#DOWNLOAD_DEFAULT_IMAGES=False
#IMAGE_URLS="http://download.cirros-cloud.net/0.3.4/cirros-0.3.4-x86_64-disk.img"

# Misc
ADMIN_PASSWORD=admin
DATABASE_PASSWORD=$ADMIN_PASSWORD
RABBIT_PASSWORD=$ADMIN_PASSWORD
SERVICE_PASSWORD=$ADMIN_PASSWORD
SERVICE_TOKEN=$ADMIN_PASSWORD

# Target Path
#DEST=/opt/stack
```
运行安装脚本
`FORCE=yes ./stack.sh`
然后就可以开始漫长的等待了，总时长大概需要2小时左右，安装过程中可能提示`python.org`和`time out`之类的字样，那就说明连接超时了，请参阅部署注意点中的*pip换源*