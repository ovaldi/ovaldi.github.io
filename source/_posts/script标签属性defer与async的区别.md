title: script标签属性defer与async的区别
date: 2015-04-03 23:21:46
tags: javascript
---

默认情况下，浏览器中的js脚本是阻塞式的顺序加载，但我们可以通过给script标签添加defer或者async属性，以达到并行加载的目的，如：

    <script type="text/javascript" src="a.js" defer></script>

    <script type="text/javascript" src="a.js" async></script>

使用时需要注意两者的区别：

> defer并行加载js文件，会按照页面上script标签的顺序执行
> async并行加载js文件，下载完成立即执行，不会按照页面上script标签的顺序执行

著名的AMD类库Require.js，在动态载入模块时，就是利用async并行加载，加快依赖模块的载入速度。