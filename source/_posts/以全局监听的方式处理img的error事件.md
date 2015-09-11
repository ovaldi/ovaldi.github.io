title: 以全局监听的方式处理img的error事件
date: 2015-09-11 16:34:37
tags: global img error
---

在开发一些电商页面时，往往会有大量的商品图片信息，当图片加载失败时，我们希望以一种更加友好的的方式改善用户体验：比如，换成一张友好的提示图片。

img标签在加载失败时，会触发error事件，所以，我们可以这么做

    $("img").on("error", function(){
        this.src = "/img/hint.jpg";
    });

然而，这种处理方法存在两个问题：

> 1. 无法监听到动态产生的img标签
> 2. 给每一个img元素都绑定事件处理函数带来的页面性能损耗

那么，如何解决上面的问题呢？也许你会说利用事件冒泡的机制来监听，可惜error事件并不会冒泡！
(事实上，在W3C的[DOM Level 2 Events](http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-eventgroupings-htmlevents)中规定，error事件是会冒泡的，而在[DOM Level 3 Events](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-error)中规定，error事件是不会冒泡的。)

要解决上述两个问题，我们需要先了解一下DOM事件发生的三个阶段：
> 1. 捕获阶段: 从根节点开始顺序而下，检测每个节点是否注册了事件处理函数。在标准浏览器中，我们可以通过指定addEventListener的第三个参数useCapture为true，以使事件处理函数在该阶段运行。(低版本IE中无此阶段)
> 2. 目标阶段: 触发在目标对象本身注册的事件处理函数，也称正常事件派发阶段。
> 3. 冒泡阶段: 从目标节点到根节点，检测每个节点是否注册了事件处理函数。在标准浏览器中，我们可以通过指定addEventListener的第三个参数useCapture为true，以使事件处理函数在该阶段运行。

通过了解以上三个阶段，我们就可以使用如下代码解决：

    document.addEventListener("error", function(e){
        var elem = e.target;
        if(elem.tagName.toLowerCase() === 'img'){
            elem.src = "/img/hint.jpg";
        }
    }, true /*指定事件处理函数在捕获阶段执行*/);

需要注意的是，由于低版本IE中，attachEvent方法无法指定事件处理函数在捕获阶段执行，所以，该方案不能适用。