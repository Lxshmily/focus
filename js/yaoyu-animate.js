/* ↓ 封装运动函数 ↓*/
	function animate(obj,json,fn){   //穿入对象(给谁)   ，  json   ，传入一个回调
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var flag=true;  //用来判断何时停止定时器  一定要写到遍历的外边
			//开始遍历json
			for(var k in json){  //k 属性   json[k] 值
				/* 获取当前样式【位置】*/
 				var current=0;
				if(k == "opacity" ){
					current = Math.round(parseInt(getStyle(obj,k)*100)) || 0;
					//console.log(getStyle(obj,k));
				}else{
					current = parseInt(getStyle(obj,k));
				}
				//var current = parseInt(getStyle(obj,k));
				/* 计算步长*/
				var step=(json[k]-current)/10;
				/* 对步长取整*/
				step=step>0 ? Math.ceil(step) : Math.floor(step);

				/*【透明度已经ok】*/
				if(k=="opacity"){   //判断是否为opacity属性
					if("opacity" in obj.style){    //判断对象样式是否支持opacity属性
						//obj.style.opacity=json[k];
						obj.style.opacity=(current+step)/100;
					}else{
						//obj.style.filter="alpha(opacity="+json[k]+")";   //如果不支持，采用兼容，只要兼容ie678
						obj.style.filter="alpha(opacity="+(current+step)*10+")"; 
					}
				}
				else if(k=="zIndex")
				{
					obj.style.zIndex = json[k];
				}
				else
				{
					/*开始动画*/
				obj.style[k]=current+step+"px";
				}
				

				if(current!=json[k]){  //只要其中一个不满足条件，就不应该停止定时器，这句一定在遍历里面
					flag=false;
				}			
			}
			if(flag){   //用于判断停止定时器的条件
				clearInterval(obj.timer);
				/* 当动画结束的时候开始回调函数 */
				if(fn){   //进行判断，fn为真，开始调用
					fn();   //回调函数一定是等待前面的动画执行完毕后  开始执行
				}
			}
		},30)
	}

	/*↓ 封装获取css样式函数及兼容性 ↓*/
	function getStyle(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}
		else{
			return window.getComputedStyle(obj,null)[attr];
		}
	}
