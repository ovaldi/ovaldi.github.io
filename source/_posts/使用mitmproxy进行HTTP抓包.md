title: 使用mitmproxy进行HTTP抓包
date: 2016-01-26 20:42:56
tags:
---
#### Note: 本文中的运行环境基于Mac操作系统
mitmproxy是一款使用python开发的HTTP代理工具，免费且功能强大，在这里简单介绍下如何安装及使用它。

0. 首先，到[mitmproxy官网](https://mitmproxy.org/)下载[编译好的二进制文件](https://mitmproxy.org/download/osx-mitmproxy-0.15.tgz)

0. 解压得到mitmproxy文件，在命令行中执行：

  ```sh
  $ ./mitmproxy -p 8181 
  ```
  以上命令开启了一个HTTP请求代理，设置的端口号是8181 (默认端口：8080)。

0. 接下来将 本机IP地址 & 端口 设置到需要做代理的设备或软件上，这里，假如在手机上设置并访问3g.163.com，你应该会在你的Terminal上看到如下画面：

  ![使用mitmproxy进行HTTP抓包](/img/2.png)

0. 使用方向键进行上下移动，选择需要查看的HTTP请求记录，并按Enter回车进入查看有细：

  ![使用mitmproxy进行HTTP抓包](/img/3.png)

0. 你可以按下Tab键进行切换并查看 Request/Response/Detail

0. 这里列举几个快捷键:

  > q     - 返回上一层
  > l     - 设置URL地址过滤（小写L）
  > Enter - 查看内容
  > Tab   - 切换看request/response/detail
  > C     - 清空（大写C）

0. mitmproxy十分强大，它的功能绝不仅于此，更多内容，可以查阅[官方文档](http://docs.mitmproxy.org)