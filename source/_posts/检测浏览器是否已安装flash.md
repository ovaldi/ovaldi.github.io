title: 检测浏览器是否已安装flash
date: 2015-05-10 14:52:06
tags:
---

```js
//for IE, Firefox, Chrome
function hasFlash(){
    var nav = navigator, ua = nav.userAgent, swf;
    if(ua.indexOf("MSIE") !== -1) {
        try
        {
            swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        }
        catch(e)
        {
        }
    }
    else if(ua.indexOf("Firefox") !== -1 || ua.indexOf("Chrome") !== -1){
        swf = nav.plugins["Shockwave Flash"];
    }

    return !!swf;
}
```