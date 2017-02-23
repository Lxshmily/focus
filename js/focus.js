var silder=document.getElementById('silder_box');
var warp=document.getElementById("warp");
var lis=warp.children[0].children;
var arrow=document.getElementById("arrow");
var arrows=arrow.children;
var timer = null;
silder.onmouseover=function () {
	animate(arrow,{opacity:100});
	clearInterval(timer);
}
silder.onmouseout=function () {
	animate(arrow,{opacity:0});
	timer = setInterval(function(){	
		change(true);
	},2500);
}

 //  存储了每个图片的信息
    var json = [
        {   //  1
            width:400,
            top:20,
            left:50,
            opacity:20,
            z:2
        },
        {  // 2
            width:600,
            top:70,
            left:0,
            opacity:80,
            z:3
        },
        {   // 3
            width:800,
            top:100,
            left:200,
            opacity:100,
            z:4
        },
        {  // 4
            width:600,
            top:70,
            left:600,
            opacity:80,
            z:3
        },
        {   //5
            width:400,
            top:20,
            left:750,
            opacity:20,
            z:2
        }
    ];

    //函数节流   就是当前动画执行时执行下一次操作，否则不执行
    var jieliu=true;
	change();   //加载的时候执行一次
	for(var k in arrows){
		arrows[k].onclick=function(){			
			if(this.className=="arrow-prev")
			{
				//移除第一个  放到json的最后一个
				if(jieliu==true){
					change(false);
					jieliu=false;
				}
			}
			else
			{
				//把最后一个json删除 并添加到json的第一个位置
				if(jieliu==true){
					change(true); 
					jieliu=false;
				}
			}
		}
	}

//alert(lis.length);
function change(flag){
	if(flag){
		//把最后一个json删除 并添加到json的第一个位置
		json.unshift(json.pop());
	}
	else
	{
		//移除第一个  放到json的最后一个
		json.push(json.shift());
	}
	/*需要给每一个li添加json里的内容  用for循环*/
	for(var i=0;i<lis.length;i++){
		/*lis[i].index=i;
		lis[i].onclick=function(){
			change(true);
		}*/
		animate(lis[i],{
			width:json[i].width,
			top:json[i].top,
			left:json[i].left,
			opacity:json[i].opacity,
			zIndex:json[i].z
		},function(){jieliu=true;})
	}
}
timer = setInterval(function(){	
		change(true);		
},2500);