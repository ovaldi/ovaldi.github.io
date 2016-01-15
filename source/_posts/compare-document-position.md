title: 使用compareDocumentPosition比较两个元素在文档中的位置
date: 2015-05-11 19:30:08
tags: [javascript,DOM API]
---

在开发一些页面编辑器的时候，有时需要比较两个元素的位置，这种情况下，我们可以使用compareDocumentPosition方法。
compareDocumentPosition方法比较两个节点，将会返回描述它们在文档中位置的整数。
<table><caption>compareDocumentPosition的枚举值</caption><tbody><tr><td>二进制值</td><td>枚举值</td><td>位置信息</td></tr><tr><td>000000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>0</td><td>元素一致</td></tr><tr><td>000001&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>1</td><td>没有关系，两个节点不属于同一个文档&nbsp;</td></tr><tr><td>000010&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>2</td><td>节点A在节点B后面&nbsp;</td></tr><tr><td>000100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>4</td><td>节点A在节点B前面&nbsp;</td></tr><tr><td>001000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>8</td><td>节点A位于节点B内部</td></tr><tr><td>010000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>16</td><td>节点A包含节点B&nbsp;</td></tr><tr><td>100000&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>32</td><td>没有关系，或是两个节点是同一元素的两个属性</td></tr></tbody></table>
拿到这个整数之后，通过一些位运算，我们就能得出元素位置的详细信息。（实际上，这与C#语言中的[Flags]一个道理）
直接上示例代码：

```js
var doc = document, html = doc.documentElement, body = doc.body;
var pos = html.compareDocumentPosition(body);//20

var after = pos & 2;//0
console.log('html在body后面',!!after);

var before = pos & 4;//4
console.log('html在body前面',!!before);

var inside = pos & 8;//0
console.log('html在body内部',!!inside);

var contain = pos & 16;//16
console.log('html包含body',!!contain);
```