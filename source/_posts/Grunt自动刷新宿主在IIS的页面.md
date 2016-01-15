title: Grunt自动刷新宿主在IIS的页面
date: 2015-06-22
---
在使用grunt-contrib-connect配合grunt-contrib-watch做自动刷新时，由于Web服务器是IIS，无法自动刷新页面。
想来想去，考虑到livereload的内部实现机制是基于WebSocket，于是在IIS返回的页面中加入

```html
<script type="text/javascript" src="//localhost:35729/livereload.js?snipver=1"></script>
```
	
这样一来，当修改前端监听的文件时，就会自动刷新页面了。