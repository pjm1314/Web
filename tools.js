//创建一个可以简单执行动画的函数
/*
 * 参数：
 * obj：要执行动画的对象
 * atter：动画执行的样式
 * target：执行动画的目标位置
 * speed：移动的速度
 * callback：回调函数
 */
function move (obj,atter,target,speed,callback) {
	//关闭上一个计时器
	clearInterval(obj.timer);
	//获取元素当前位置
	var current=parseInt(getStyle(obj,atter));
	//判断速度的正负值
	//如果从0向800移动，则speed为正相反为负
	if(current>target){
		speed=-speed;
	}
	//开启一个计时器来执行动画效果
	obj.timer=setInterval(function(){
		//获取原来的值
		var oldValue=parseInt(getStyle(obj,atter));
		//在旧的基础上增加
		var newValue=oldValue+speed;
		//判断newValue是否大于800
		if((speed<0 && newValue<target)||(speed>0&&newValue>target)){
			newValue=target;
		}
		//将新值设置给box
		obj.style[atter]=newValue+"px";
		if (newValue==target) {
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数
			callback &&callback();
		}
	},30)
}
function getStyle(obj,name){
					if (window.getComputedStyle) {
						//正常浏览器的方式，具有getComputedStyle方法
						return getComputedStyle(obj,null)[name];
					} else{
						return obj.currentStyle[name];
					}
				}