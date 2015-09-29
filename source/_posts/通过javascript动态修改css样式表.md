title: javascript动态修改style/link标签引入的css样式规则
date: 2015-09-29 10:48:34
tags: javascript style/link CSSRule
---
此前在开发公司的一款网页编辑器的时候，需要动态修改样式表规则，在这里大致总结了一下。

>修改style标签引入的css

    var css  = "body{ color: red;}";
    var style = document.getElementsByTagName('style')[0];

    //for Chrome & Firefox
    style.textContent = css;
    //or
    style.innerHTML   = css;
    //or
    style.appendChild(document.createTextNode(css));

    //for IE
    style.styleSheet.cssText = "body{ color: red;}";

>修改link标签引入的css

    var link = document.getElementsByTagName('link')[0];

    //for Chrome & Firefox
    link.sheet.insertRule(0, 'body', 'color: red;');
    link.sheet.deleteRule(0);

    //for IE
    link.styleSheet.addRule('body', 'color: red', 0);
    link.styleShhet.removeRule(0);

>在IE8下，有个黑魔法可以直接覆写link的引入的所有样式规则，示例如下：

    var link = document.getElementsByTagName('link')[0];
    link.styleSheet.cssText = 'body{ color: red;} div{ border: 1px solid #ccc;}';