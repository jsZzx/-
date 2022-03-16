// 圣杯模式
var inherit = (function () {
    var F = function () {};
    return function (Target , Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
        Target.prototype.uber = Origin.prototype;
        }
    }())


//返回某节点的兄弟节点
function retSibling(e , n){
        while (e && n){
            if (n > 0){
                if (e.nextElementSibling){
                    e = e.nextElementSibling;
            }else {
                e = e.nextSibling;
                while(e && e.nodeType != 1){
                    e = e.nextSibling;
                }
            }
            n --;
        }else {
                if (e.previousElementSibling){
                    e = e.previousElementSibling;
                }else {
                    e = e.previousSibling;
                    while(e && e.nodeType != 1)
                    {
                        e = e.previousSibling;
                    }
                 }
            n ++;
        }  
    }
    return e;
}


//在原型链上创建insertAfter方法
Element.prototype.insertAfter = function (target , e) {
        var beforeTarget = retSibling(e,1);
        if(beforeTarget){
        this.insertBefore(target, beforeTarget);
    }else{
        this.appendChild(target);
    }
 }


 //滚动轮滚动距离
 function getScrollOffset(){
        if (window.pageXOffset){
            return {
                X : window.pageXOffset,
                Y : window.pageYOffset
            } 
        }else {
                return {
                    X : document.body.scrollLeft + document.documentElement.scrollLeft,
                    Y : document.body.scrollTop + document.documentElement.scrollTop
                }
            }
    }


//返回浏览器视口尺寸
function getViewportOffset() {
    if (document.documentElement.clientWidth){
        return{
            w : document.documentElement.clientWidth,
            h : document.documentElement.clientHeight
        }            
    }
    else if(document.body.clientWidth){
        return{
            w : document.body.clientWidth,
            h : document.body.clientHeight
        }
    }
    else{
        return {
            w : window.innerWidth,
            h : window.innerHeight
        }
    }
}


//查询计算样式
function getStyle(elem , prop){
    if(window.getComputedStyle){
        return window.getComputedStyle(elem , null)[prop];
    }else{
        return elem.currentStyle[prop];
    }
}