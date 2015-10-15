title: Gulp任务之并行与串行
date: 2015-10-15 14:36:21
tags: Gulp
---
如你所知，Gulp任务默认情况下都是并行执行，一些刚接触Gulp的新同学经常会问：怎么让Gulp任务串行执行？

首先，确保需要串行执行的任务返回适当的对象或者触发适当的回调，以使Gulp能够得到当前任务的执行状态，参考以下三种方式：

#### 1. 返回Stream，Gulp可以监听end事件，以确定当前任务已经执行完毕

    gulp.task('less', function(){
        var stream = gulp.src(['./css/*.less'])
            .pipe(less())
            .pipe(gulp.dest('dist/css'));

        return stream;
    });

#### 2. 返回Promise，Gulp可以通过添加then回调，以确定当前任务已经执行完毕

    gulp.task('js', function(cb){
        var promise = new Promise(function(resolve, reject){
            setTimeout(function(){
                //...do something...
                resolve();
            }, 5000);
        });

        return promise;
    });

#### 3. 执行Gulp自身传入任务的回调

    gulp.task('js', function(callback){
        setTimeout(function(){
            //...do something...
            callback();
        }, 5000);
    });


#### 然后，我们的串行任务可能会是这么写的：

    var gulp = require('gulp');

    gulp.task('one', function(callback){
        setTimeout(function(){
            console.log('task: one');
            callback();
        }, 2000);
    });

    //two任务需要等待one任务执行完成
    gulp.task('two', ['one'], function(callback){
        var promise = new Promise(function(resolve, reject){
            setTimeout(function(){
                console.log('task: two');
                resolve();
            }, 3000);
        });

        return promise;
    });

    //default任务需要等待two任务执行完成
    gulp.task('default', ['two'], function(){
        console.log('task: default');
    });

#### 最后，执行以上代码，你将看到控制台依次输出：

    task: one
    task: two
    task: default

