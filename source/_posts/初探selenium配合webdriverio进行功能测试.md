title: 初探selenium配合webdriverio进行功能测试
date: 2015-10-25 19:20:28
tags:
---
#### 1. 全局安装[webdriverio](https://github.com/webdriverio/webdriverio)

    npm install -g webdriverio
安装完成后，本地就有了wdio命令。

#### 2. 初始化配置文件

    wdio config
根据命令提示，一步步输入你的配置信息，最终，会在当前路径生成一个wdio.config.js文件。

#### 3. 下载你将要测试的浏览器的驱动包，比如[ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/home)
chromedriver

#### 4. 下载[Selenium独立服务包](http://docs.seleniumhq.org/download/)
selenium-server-standalone-2.47.0.jar

#### 5. 启动Selenium服务

    sudo java -jar selenium-server-standalone-2.47.0.jar -Dwebdriver.chrome.driver=/path/to/chromedriver

#### 6. 运行你的测试脚本
在这里，我编写以下脚本来尝试抓取天猫官网的标题

    var webdriverio = require('webdriverio');
    var options = {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    };

    webdriverio
        .remote(options)
        .init()
        .url('https://www.tmall.com/')
        .title(function(err, res) {
            console.log('Title was: ' + res.value);
        })
        .end();

另存为test.js，执行命令

    node test.js

你将看到控制台输出

    Title was: 天猫tmall.com--上天猫，就够了
