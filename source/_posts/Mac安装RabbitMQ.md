title: Mac安装RabbitMQ
date: 2015-08-17
---
### 在Mac下安装RabbitMQ极其简单，我们可以直接使用brew进行安装

```sh
brew install rabbitmq
```

安装完成之后，将如下代码添加到~/.bash_profile（my zsh用户则添加到~/.zshrc）

```sh
export PATH=$PATH:/usr/local/sbin
```

配置完成后，新开一个终端窗口，执行rabbitmq-server命令启动RabbitMQ服务

```sh
rabbitmq-server
```

接下来可以从 http://localhost:15672 访问RabbitMQ的Web管理界面，默认用户名密码都是guest。