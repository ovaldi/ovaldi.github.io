title: 将图片转换为Base64字符串
date: 2015-10-10 11:32:33
tags: Base64
--- 图片 Base64
### 第一种方式：Image & Canvas

```js
var img = document.createElement('img');
img.onload = function(){
    var canvas    = document.createElement('canvas');
    canvas.width  = img.width;
    canvas.height = img.height;
    var ctx       = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    console.log(canvas.toDataURL());
};
img.crossOrigin = "Anonymous";
img.src = '/favicon.png';
```

注意：如果图片来自其它站点，则需要该站点支持CORS规范

### 第二种方式：File API

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', '/favicon.png');
xhr.responseType = "arraybuffer";

xhr.onreadystatechange = function(){
  if(xhr.readyState == 4)  {
    //构造Blob对象
    var blob = new Blob([xhr.response]);
    //构造File对象
    var file = new File([blob], 'favicon.png', {type: "image/png"});
    //构造FileReader对象
    var reader = new FileReader();
    reader.onload = function(e){
        console.log(e.target.result);
    };
    reader.readAsDataURL(file);
  }
};
xhr.send();
```