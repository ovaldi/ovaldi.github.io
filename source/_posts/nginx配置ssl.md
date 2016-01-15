title: nginx配置ssl
date: 2015-05-03 15:59:06
tags: [nginx,ssl]
---

#### 1. 创建一个服务器私钥:

```sh
openssl genrsa -des3 -out test.key 1024
```

这时，会提示你输入一个口令。

#### 2. 直接使用上面生成的私钥，在启动nginx时会要求你输入设置的口令，我们可以去除这个口令

```sh
cp test.key test.key.tmp
openssl rsa -in test.key.tmp -out test.key
```

#### 3. 创建签名请求的证书（CSR)

```sh
openssl req -new -key test.key -out test.csr
```

这里会提示你输入上一步设置的口令，并让你依次填写证书相关的机构信息。

#### 4. 标记证书使用上面的私钥和CSR

```sh
openssl x509 -req -days 365 -in test.csr -signkey test.key -out test.crt
```

#### 5. 在nginx中配置新生成的证书，示例如下：

```
server{
    listen              443;
    ssl                 on;

    #配置ssl证书
    ssl_certificate     /path/to/test.crt;

    #配置ssl私钥
    ssl_certificate_key /path/to/test.key;

    server_name         www.ovaldi.org;
    root                /path/to/mysite/;
    index               index.htm index.html;
}
```

#### 6. 将80端口重定向到443

```
server{
    listen      80;
    server_name www.ovaldi.org;
    rewrite     ^(.*) https://$server_name$1 permanent;
}
```

#### 7. 重启nginx

```sh
sudo nginx -s reload
```
