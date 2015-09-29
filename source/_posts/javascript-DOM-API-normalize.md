title: 'javascript DOM API: normalize'
date: 2015-09-18 17:05:24
tags: javascript,DOM API,normalize
---

normalize方法的作用是：移除空的文本节点，并连接相邻的文本节点。(该方法在开发一些页面编辑器时很有用处)

执行以下示例代码：

    var div  = document.createElement('div'),
        tn1  = document.createTextNode('tn1'),
        tn2  = document.createTextNode('tn2'),
        span = document.createElement('span');

    div.appendChild(tn1);
    div.appendChild(tn2);
    div.appendChild(span);

打印div的子节点个数为3

    console.log(div.childNodes.length); //3

执行normalize方法

    div.normalize();

再次打印div的子元素个数，会发现子节点个数为2（tn1和tn2被合并成一个文本节点）

    console.log(div.childNodes.length);//2