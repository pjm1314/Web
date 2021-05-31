/*
   * 定义一个获取样式的方法
   * */
function getStyle(obj, name) {
    if (window.getComputedStyle) {
        return getComputedStyle(obj, null)[name];
    }
}

/*
* 定义一个方法来移动元素
* */
function move(obj, attr, target, speed, callback) {
    //关闭上一个计时器
    clearInterval(obj.timer);
    //获取当前的元素信息
    let current = parseInt(getStyle(obj, name));
    //判断速度的正负值
    if (current>target){
        speed=-speed;
    }
    //开启一个计时器来执行动画效果
    obj.timer=setInterval(function () {
        let oldValue = parseInt(getStyle(obj, attr));
        let newValue = oldValue + speed;
        //判断newValue是否大于target
        if((speed<0 && newValue<target)||(speed>0 && newValue>target)){
            newValue=target;
        }
        //将新值赋给obj
        obj.style[attr]=newValue+"px";
        //判断新值是否等于target
        if (newValue==target){
            clearInterval(obj.timer);
            //动画执行完毕执行回调函数,有则执行，反之
            callback || callback();
        }
    },1000)

}