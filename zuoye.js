function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} 
	else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}
			else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}
			else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var title = document.getElementById('title');
var notice = document.getElementById('notice');
var box = document.getElementById('box');
var font = document.getElementsByTagName('font')[0];
var leftNode = document.getElementById('leftNode');
var rightNode = document.getElementById('rightNode');
var text1 = function(text){
	var rool = document.createElement('marquee');
	rool.innerHTML = text;
	font.appendChild(rool);
}
window.onload = function(){
	var t = "[温馨提示]最近有不少不法分子在网上骗人，请大家注意！！！";
	text1(t);
}
var i = 1;
var isMoving = false;
function next(){
	if(!isMoving){
		isMoving = true;
		i++;
		liChange();
		animate(images,{left:-1200*i},function(){
			if(i>5){
				images.style.left = "-1200px";
				i = 1;
			}
			isMoving = false;
		});
	}
}
function prev(){
	if(!isMoving){
		isMoving = true;
		i--;
		liChange();
		animate(images,{left:-1200*i},function(){
			if(i==0){
				images.style.left = "-6000px";
				i = 5;
			}
			isMoving = false;
		});
	}
}
var timer = setInterval(next,3000);
box.onmouseover = function(){
	animate(leftNode,{opacity:50});
	animate(rightNode,{opacity:50});
 	clearInterval(timer);
}
box.onmouseout = function(){
	animate(leftNode,{opacity:0});
	animate(rightNode,{opacity:0});
	timer = setInterval(next,3000);
}
leftNode.onclick = prev;
rightNode.onclick = next;
//小按钮点击
var li = document.getElementsByTagName('li');
for(var j = 0;j<li.length;j++){
	li[j].x = j;
	li[j].onclick = function(){
		i = this.x + 1;
		liChange();
		animate(images,{left:-1200*i })
	}
}
function liChange(){
	for(var j=0;j<li.length;j++){
		li[j].className = ' ';
	}
	if(i>5){
		li[0].className = 'active';
	}
	else if(i==0){
		li[4].className = 'active';
	}
	else{
		li[i-1].className = 'active';
	}	
}	