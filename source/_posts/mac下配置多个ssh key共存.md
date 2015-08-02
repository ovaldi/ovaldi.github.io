title: mac下配置多个ssh key
date: 2015-08-02
---
###第一种方式：将私钥添加到ssh-agent的session中
    ssh-add path/to/your/ssh-key
这种方式的缺点就是，每次重启之后，得重新再来一次。
当然，你可以将命令写到.bash_profile文件中，这样当你打开终端，就相当于自动执行了配置的命令。

###第二种方式：将私钥配置到ssh config文件中
以github为例，格式如下:

    host github.com
    hostname github.com
    user user@github.com
    IdentityFile ~/.ssh/id_rsa_github

