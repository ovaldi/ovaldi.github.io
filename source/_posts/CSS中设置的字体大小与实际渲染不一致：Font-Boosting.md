title: CSS中设置的字体大小与实际渲染不一致：Font Boosting
date: 2015-09-07 13:31:23
tags: Font Boosting
---
今天按照阿里工程师的一篇[文章](http://div.io/topic/1092)做一些手机端开发的试验的时候，使用Chrome的DevTools调试页面，遇到一个很奇怪的问题：CSS中设置的字体大小与实际渲染不一致。情况如下图所示：

![CSS中设置的字体大小与实际渲染不一致：Font Boosting](/img/1.png)

经过一番折腾与搜索，在Stackoverflow找到答案：

[stackoverflow.com/questions/13416989/computed-font-size-is-bigger-than-defined-in-css-on-the-asus-nexus-7](http://stackoverflow.com/questions/13416989/computed-font-size-is-bigger-than-defined-in-css-on-the-asus-nexus-7)

[webit bug链接](https://bugs.webkit.org/show_bug.cgi?id=FontBoosting)

原来是一个叫做 "Font Boosting" 的东西引起的，这东西的来源是因为：手机端屏幕一般比较小，当页面在屏幕上缩小后，用户可能需要左右移动滚动条才能看到文字，考虑到用户体验的问题，当viewport的设置initial-scale不等于1的时候，webkit会自动将字体放大。

可以用以下CSS解决这个问题：

    body, body * {
        max-height: 100%;
    }