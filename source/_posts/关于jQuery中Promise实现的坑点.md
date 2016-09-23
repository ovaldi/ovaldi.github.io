title: 关于jQuery中Promise实现的坑点
date: 2015-08-18
tags: [jQuery,Deferred,Promise]
---
Promise的出现，让我们可以较好的解决嵌套回调的问题，一般情况下，我们会优先选用专门的Promise工具类（比如[Q.js](https://github.com/kriskowal/q "Q.js") 或 [RSVP.js](https://github.com/tildeio/rsvp.js "RSVP.js")），然而，有些小项目会直接使用jQuery自带的Promise实现，这时候，就要小心有个坑了，jQuery对于Promise的实现是与其它Promise库不一致的（或者说，没有严格按照Promise A+规范去实现）。

这里写一个简单示例：

```js
function next () {
    var defer = $.Deferred();
    setTimeout(function () {
        defer.reject(0);
    }, 1000);
    return defer.promise();
}

next()
.then(function () {
    return 1;
}, function (num) {
    return num;
})
.then(function (num) {
    console.log(num + 1);
}, function (num) {
    console.log(num + 2);
});
```

如上代码，大家认为会打印出什么呢？

大部分Promise类库都会打印： 1，但jQuery打印的却是：2。

根据[Promise A+规范](https://promisesaplus.com/ "Promise A+规范")中2.2.7.1规定：

>If either onFulfilled or onRejected returns a value x, run the Promise Resolution Procedure [[Resolve]]\(promise2, x\).

所以，无论前面的Promise是Resolve还是Reject，都应该把返回值传递给下一个Promise的Resolve回调。