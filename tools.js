//创建一个可以简单执行动画的函数
/*
 * 参数：
 * obj：要执行动画的对象
 * atter：动画执行的样式
 * target：执行动画的目标位置
 * speed：移动的速度
 * callback：回调函数
 */
function move(obj, atter, target, speed, callback) {
	//关闭上一个计时器
	clearInterval(obj.timer);
	//获取元素当前位置
	var current = parseInt(getStyle(obj, atter));
	//判断速度的正负值
	//如果从0向800移动，则speed为正相反为负
	if(current > target) {
		speed = -speed;
	}
	//开启一个计时器来执行动画效果
	obj.timer = setInterval(function() {
		//获取原来的值
		var oldValue = parseInt(getStyle(obj, atter));
		//在旧的基础上增加
		var newValue = oldValue + speed;
		//判断newValue是否大于800
		if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}
		//将新值设置给box
		obj.style[atter] = newValue + "px";
		if(newValue == target) {
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数
			callback && callback();
		}
	}, 30)
}

function getStyle(obj, name) {
	if(window.getComputedStyle) {
		//正常浏览器的方式，具有getComputedStyle方法
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name];
	}
}
/*
 * 定义一个函数，用来向一个元素中添加指定的class属性值
 * 参数：
 * obj：要添加的class属性的元素
 * cn：要添加的class值
 */
function addClass(obj, cn) {
	if(!hasClass(obj, cn)) {
		obj.className += " " + cn;
	}

}
/*
 * 判断一个元素是否含有指定的class属性值
 */
function hasClass(obj, cn) {
	//创建一个正则表达式
	var reg = new RegExp("\\b" + cn + "\\b");
	return reg.test(obj.className);
}
//删除class属性值
function removeName(obj, cn) {
	var reg = new RegExp("\\b" + cn + "\\b");
	obj.className = obj.className.replace(reg, "");
}
//切换一个类
function toggerName(obj, cn) {
	if(hasClass(obj, cn)) {
		removeName(obj, cn);
	} else {
		addClass(obj, cn);
	}
}
/*
 * 
 */
function toggerMenu (obj) {
	//切换类之前，获取元素的高度
	var begin=obj.offsetHeight;
//	toggerName(obj,"")
	var end=obj.offsetHeight;
	obj.style.height=begin+"px";
	move(obj,"height",end,10,function(){
		//动画执行完，删除之
		obj.style.height="";
	})
}