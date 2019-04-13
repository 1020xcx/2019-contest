(function pushbox(){

    //点击开始的按钮的监听
    var home=document.getElementById('home');
    var playbutton=home.getElementsByTagName('img')[0];
    //点击play按钮进入select level的页面，当前页面不显示
    var level=document.getElementById('play');
    playbutton.onclick=function(){
    	home.style.display='none';
    	level.style.display='block';
    }
    
    //在主界面点击游戏说明进入游戏说明界面，当前页面隐藏
    var operation=document.getElementById('instructions');
    var instructions=home.getElementsByTagName('h5')[0];
    instructions.onclick=function(){
    	home.style.display='none'
    	operation.style.display='block';
    }
    
    //在游戏说明界面点击返回，返回主界面，当前页面隐藏
    var reback_operation=operation.getElementsByClassName('reback')[0];
    reback_operation.onclick=function(){
    	operation.style.display='none';
    	home.style.display='block';
    }
    
    //在level选择界面点击返回，则返回主界面，当期页面不显示
    var  reback_level=level.getElementsByClassName('reback')[0];
    reback_level.onclick=function(){
    	level.style.display='none';
    	home.style.display='block';
    }
    //选关点击事件，已通过得关可以随便选择，否则是能选择最小的未通过关
    //采用事件委托，在ul上绑定点击事件
    var levelselect=level.getElementsByTagName('ul')[0];
    var lastchoose=levelselect.getElementsByTagName('li');
    var canvars=document.getElementsByTagName('canvas')[0];
    var levelh=document.getElementsByTagName('h1');
    var drawtext=canvars.getContext('2d');
    for(var i=0;i<lastchoose.length;i++){
    	lastchoose[i].index=i;//给每个li加个索引，方便跳转至那关
    }
    levelselect.onclick=function(ev){
    	var event=ev||window.event;
    	var target=event.target||event.srcElement;
    	
    	if(target.tagName=='IMG'){
    		target=target.parentNode;//点击事件在图片上，转到li上
    	}
//  	if(target.index==0||target.previousElementSibling.className=='pass'){
    			level.style.display='none';
    			canvars.style.display='block';
    			refresh(drawtext,target.index);//绘制画布根据关卡
    			$(levelh[target.index]).fadeIn('normal');
    			setTimeout(function(){
    				$(levelh[target.index]).fadeOut('normal');
    			},1500);//去掉条件则用户可以选择关卡，否则为闯关模式
//  	}
    	
    }
    
    //画布的所有操作均封装为一个函数，以后每一关（即每一个画布均封装为一个独立函数） 
    function canvars1(){
    	//采用画布绘制第一关的界面
		//绘制墙壁，第一关绘制20面墙壁
		var wallarr=[]//存放所有墙壁的数组
		
		var wallnumber=20;//墙壁数量，第一关绘制20面墙壁
		//生成墙壁，每面墙壁大小均为40px*40px
		function createWall(){
			for(var i=0;i<wallnumber;i++){
				var wall={}//墙壁容器
				if(i<7){//第一行墙壁
					wall.positionX=20+i*40;//与第一面墙壁在同一行上的墙壁，每一次的x轴的位置都与上一次墙壁的位置相隔一面墙壁的宽度
					wall.positionY=202;//每一行墙壁的的Y轴坐标均相同	
				}else if(i<9){//第二行墙壁
					if(i==7){//第二行第一面墙壁的x轴的位置
						wall.positionX=20;//第二行第一面墙壁的x轴的位置
					}else{
						wall.positionX=260;//第二行第二面墙壁，中间有5个40px的空格单元用作游戏区域
					}
					wall.positionY=242;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else if(i<14){//第三行墙壁
					if(i==9){//第三行第一面墙壁的x轴的位置
						wall.positionX=20;//第三行第一面墙壁的x轴的位置
					}
					else{
						wall.positionX=140+(i-10)*40;//第三行第二面墙壁，中间有2个40px的空格单元用作游戏区域
					}
					wall.positionY=282;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else if(i<16){//第四行墙壁
					if(i==14){//第四行第一面墙壁的x轴的位置
						wall.positionX=20;//第四行第一面墙壁的x轴的位置
					}
					else{
						wall.positionX=140;//第四行第二面墙壁，中间有2个40px的空格单元用作游戏区域
					}
					wall.positionY=322;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else{//最后一行墙壁
		        	wall.positionX=20+(i-16)*40;
					wall.positionY=362;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}
				wallarr.push(wall);//将生成的每面墙壁依次放入墙壁数组中
			}
		}
		
	    //绘制墙壁
	    function drawWall(){
	    	createWall();
	    	for(var i=0;i<wallnumber;i++){
	    		drawtext.drawImage(wallimg,wallarr[i].positionX,wallarr[i].positionY);
	    	}
	    }
	    
	    var wallimg=new Image();
		wallimg.src='img/wall.PNG';//每面墙壁的图片均相同
		wallimg.onload=function(){
			drawWall();	//图片加载完成才开始绘制墙壁
		}
	    
	    //绘制游戏区域
	    var playzonenumber=9
	    var playzonearr=[];
	    function createPlayZone(){
	    	for(var i=0;i<playzonenumber;i++){
	    		var playzone={};
	    		if(i<5){//第一行游戏区域
	    			playzone.positionX=60+i*40;
	    			playzone.positionY=242;
	    		}else if(i<7){
	    			playzone.positionX=60+(i-5)*40;
	    			playzone.positionY=282;
	    		}else{
	    			playzone.positionX=60+(i-7)*40;
	    			playzone.positionY=322;
	    		}
	    		playzonearr.push(playzone)
	    	}
	    }
	    function drawPlayZone(){
	    	createPlayZone();
	    	for(var i=0;i<playzonenumber;i++){
	    		drawtext.drawImage(playzoneimg,playzonearr[i].positionX,playzonearr[i].positionY);
	    	}
	    }
	    var playzoneimg=new Image();
		playzoneimg.src='img/common.PNG';
		playzoneimg.onload=function(){
			drawPlayZone();
		}
		
		//绘制小人、木箱、宝石（目的地）
		//宝石
		var gemstone=new Image();
		gemstone.src='img/success.PNG';
		var gemstonePositionX=220;
		var gemstonePositionY=242;//记录宝石位置，便于后边判断游戏是否闯关成功
		gemstone.onload=function(){
			drawtext.drawImage(gemstone,gemstonePositionX,gemstonePositionY);
		}
		//木箱
		var woodencase=new Image();
		woodencase.src='img/woodencase.PNG';
		var woodencasePositionX=140;
		var woodencasePositionY=242;//记录木箱开始的坐标便于后边的移动
		woodencase.onload=function(){
			drawtext.drawImage(woodencase,woodencasePositionX,woodencasePositionY);
		}
		//小人
		var person=new Image();
		person.src='img/down.png';
		var personPositionX=100;
		var personPositionY=322;
		person.onload=function(){
			drawtext.drawImage(person,personPositionX,personPositionY,40,40);
		}
		
		//绘制下边重玩以及会主页按钮
		//回主页
		var backhome=new Image();
		backhome.src='img/backhome.png';
		var backhomePositionX=10;
		var backhomePositionY=470;//记录坐标,便于后边的监听事件确定事件源
		var backhomeWidth=110;
		var backhomeHeight=100;
		backhome.onload=function(){
			drawtext.drawImage(backhome,backhomePositionX,backhomePositionY,backhomeWidth,backhomeHeight);
		}
		//重玩
		var reagain=new Image();
		reagain.src='img/reagain.png';
		var reagainPositionX=200;
		var reagainPositionY=470;//记录坐标,便于后边的监听事件确定事件源
		var reagainWidth=110;
		var reagainHeight=100;
		reagain.onload=function(){
			drawtext.drawImage(reagain,reagainPositionX,reagainPositionY,reagainWidth,reagainHeight);
		}
		
		//控制小人以及木箱的移动	
		var mask=document.getElementsByClassName('mask')[0];//通关界面
		document.onkeydown=function(e){
		
			switch (e.which){
				case 38://上移
				    
				    personPositionY -= 40;
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==personPositionX&&wallarr[i].positionY==personPositionY){
				    		personPositionY += 40;
				    		break;//已碰到墙壁
				    	} 
				    	   
				    }
				    if(i==wallnumber){
				    	//更换小人图片
				        person.src='img/up.png';
				    	drawtext.clearRect(personPositionX,personPositionY+40,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX,personPositionY+40);//用游戏区域背景填充清空的区域
				    	//判断是否已碰到宝箱
				    	if(personPositionX==woodencasePositionX&&personPositionY==woodencasePositionY){
				    		drawtext.clearRect(woodencasePositionX,woodencasePositionY,40,40);//碰到木箱，推着木箱一块移动
				    		drawtext.drawImage(playzoneimg,woodencasePositionX,woodencasePositionY);
				    		woodencasePositionY -= 40;
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencase,woodencasePositionX,woodencasePositionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    	
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    if(woodencasePositionX==gemstonePositionX&&woodencasePositionY==gemstonePositionY){
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},500);
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[0];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass1.PNG');
				    }
					break;
				case 40://下移
				    
				    personPositionY += 40;
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==personPositionX&&wallarr[i].positionY==personPositionY){
				    		personPositionY -= 40;
				    		 break;//已碰到墙壁
				    	}
				    	   
				    }
				    if(i==wallnumber){
				    	person.src='img/down.png';
				    	drawtext.clearRect(personPositionX,personPositionY-40,40,40);
				    	drawtext.drawImage(playzoneimg,personPositionX,personPositionY-40);
				    	//判断是否已碰到宝箱
				    	if(personPositionX==woodencasePositionX&&personPositionY==woodencasePositionY){
				    		drawtext.clearRect(woodencasePositionX,woodencasePositionY,40,40);//碰到木箱，推着木箱一块移动
				    		drawtext.drawImage(playzoneimg,woodencasePositionX,woodencasePositionY);
				    		woodencasePositionY += 40;
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencase,woodencasePositionX,woodencasePositionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    	
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    if(woodencasePositionX==gemstonePositionX&&woodencasePositionY==gemstonePositionY){
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},500);
				    	var oLi=level.getElementsByTagName('li')[0];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass1.PNG');
				    	document.onkeydown=false;
				    }
					break;
				case 37://左移
				    
				    personPositionX -= 40;
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==personPositionX&&wallarr[i].positionY==personPositionY){
				    		personPositionX += 40;
				    		break;//已碰到墙壁
				    	}
				    	    
				    }
				    if(i==wallnumber){
				    	person.src='img/left.png';
				    	drawtext.clearRect(personPositionX+40,personPositionY,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX+40,personPositionY);
				    	//判断是否已碰到宝箱
				    	if(personPositionX==woodencasePositionX&&personPositionY==woodencasePositionY){
				    		drawtext.clearRect(woodencasePositionX,woodencasePositionY,40,40);
				    		drawtext.drawImage(playzoneimg,woodencasePositionX,woodencasePositionY);
				    		woodencasePositioX -= 40;//碰到木箱，推着木箱一块移动
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencase,woodencasePositionX,woodencasePositionY);//将新的位置绘制到画布上
				    	}
				    	else{//只移动小人
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    	
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    if(woodencasePositionX==gemstonePositionX&&woodencasePositionY==gemstonePositionY){
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},500);
				    	var oLi=level.getElementsByTagName('li')[0];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass1.PNG');
				    	document.onkeydown=false;
				    }
					break;
				case 39://右移
				    
				    personPositionX += 40;
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==personPositionX&&wallarr[i].positionY==personPositionY){
				    		personPositionX -= 40;
				    		break;//已碰到墙壁
				    	}
				    	    
				    }
				    if(i==wallnumber){
				    	person.src='img/right.png';
				    	drawtext.clearRect(personPositionX-40,personPositionY,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX-40,personPositionY);
				    	//判断是否已碰到宝箱
				    	if(personPositionX==woodencasePositionX&&personPositionY==woodencasePositionY){
				    		drawtext.clearRect(woodencasePositionX,woodencasePositionY,40,40);//碰到木箱，推着木箱一块移动
				    		drawtext.drawImage(playzoneimg,woodencasePositionX,woodencasePositionY);
				    		woodencasePositionX += 40;
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencase,woodencasePositionX,woodencasePositionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    	
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    if(woodencasePositionX==gemstonePositionX&&woodencasePositionY==gemstonePositionY){
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},500);
				    	document.onkeydown=false;
				    	var oLi=level.getElementsByTagName('li')[0];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass1.PNG');
				    }
					break;
				default:
					break;
		    }
		}
	
	   //设置画布内回首页以及重玩的点击事件
	   //采用事件委托方法，对canvarsfirst画布进行事件监听，通过计算事件触发的位置，判断是哪个事件
	   
	   canvars.onclick=function(e){
	   	//回首页点击事件
		   	if(e.offsetX>=backhomePositionX&&e.offsetX<=backhomePositionX+backhomeWidth&&e.offsetY>=backhomePositionY&&e.offsetY<=backhomePositionY+backhomeHeight){
		   		canvars.style.display='none';
		   		home.style.display='block';
		   		drawtext.clearRect(0,0,320,565);//清空画布
		   	    canvars1();//重新生成画布
		   	}
		   	//重玩点击事件
		   	if(e.offsetX>=reagainPositionX&&e.offsetX<=reagainPositionX+reagainWidth&&e.offsetY>=reagainPositionY&&e.offsetY<=reagainPositionY+reagainHeight){
		   		drawtext.clearRect(0,0,320,565);//清空画布
		   	    canvars1();//重新生成画布
		   	    $(levelh[0]).fadeIn('normal');
    			setTimeout(function(){
    				$(levelh[0]).fadeOut('normal');
    			},1500);
		   	}
		   	
		   	
	   }
    }
    
    //第二关绘制函数
    function canvars2(){
    	//绘制墙壁，第二关绘制20面墙壁
		var wallarr=[]//存放所有墙壁的数组
		
		var wallnumber=25;//墙壁数量，第二关绘制25面墙壁
		//生成墙壁，每面墙壁大小均为40px*40px
		function createWall(){
			for(var i=0;i<wallnumber;i++){
				var wall={}//墙壁容器
				if(i<6){//第一行墙壁
					wall.positionX=i*40;//与第一面墙壁在同一行上的墙壁，每一次的x轴的位置都与上一次墙壁的位置相隔一面墙壁的宽度
					wall.positionY=162;//每一行墙壁的的Y轴坐标均相同	
				}else if(i<10){//第二行墙壁
					if(i==6){//第二行第一面墙壁的x轴的位置
						wall.positionX=0;//第二行第二面墙壁，中间有5个40px的空格单元用作游戏区域
					}else{
						wall.positionX=200+(i-7)*40;
					}
					wall.positionY=202;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else if(i<12){//第三行墙壁
					if(i==10){//第三行第一面墙壁的x轴的位置
						wall.positionX=0;//第三行第一面墙壁的x轴的位置
					}
					else{
						wall.positionX=280;//第三行第二面墙壁，中间有2个40px的空格单元用作游戏区域
					}
					wall.positionY=242;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else if(i<14){//第四行墙壁
					if(i==12){//第四行第一面墙壁的x轴的位置
						wall.positionX=0;//第四行第一面墙壁的x轴的位置
					}
					else{
						wall.positionX=280;//第四行第二面墙壁，中间有2个40px的空格单元用作游戏区域
					}
					wall.positionY=282;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else if(i<17){//第五行墙壁
					if(i==14){
						wall.positionX=0;
					}
					else if(i==15){
						wall.positionX=120;
					}
					else{
						wall.positionX=280;
					}
					wall.positionY=322;
				}else{//最后一行墙壁
		        	wall.positionX=(i-17)*40;
					wall.positionY=362;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}
				wallarr.push(wall);//将生成的每面墙壁依次放入墙壁数组中
			}
		}
		
	    //绘制墙壁
	    function drawWall(){
	    	createWall();
	    	for(var i=0;i<wallnumber;i++){
	    		drawtext.drawImage(wallimg,wallarr[i].positionX,wallarr[i].positionY);
	    	}
	    }
	    
	    var wallimg=new Image();
		wallimg.src='img/wall.PNG';//每面墙壁的图片均相同
		wallimg.onload=function(){
			drawWall();	//图片加载完成才开始绘制墙壁
		}
	    
	    //绘制游戏区域
	    var playzonenumber=21
	    var playzonearr=[];
	    function createPlayZone(){
	    	for(var i=0;i<playzonenumber;i++){
	    		var playzone={};
	    		if(i<4){//第一行游戏区域
	    			playzone.positionX=40+i*40;
	    			playzone.positionY=202;
	    		}else if(i<10){
	    			playzone.positionX=40+(i-4)*40;
	    			playzone.positionY=242;
	    		}else if(i<16){
	    			playzone.positionX=40+(i-10)*40;
	    			playzone.positionY=282;
	    		}else{
	    			if(i<18)
	    			    playzone.positionX=40+(i-16)*40;
	    			else
	    			    playzone.positionX=160+(i-18)*40;
	    			playzone.positionY=322;
	    		}
	    		playzonearr.push(playzone)
	    	}
	    }
	    function drawPlayZone(){
	    	createPlayZone();
	    	for(var i=0;i<playzonenumber;i++){
	    		drawtext.drawImage(playzoneimg,playzonearr[i].positionX,playzonearr[i].positionY);
	    	}
	    }
	    var playzoneimg=new Image();
		playzoneimg.src='img/common.PNG';
		playzoneimg.onload=function(){
			drawPlayZone();
		}
		
		//绘制小人、木箱、宝石（目的地）
		//宝石
		var gemstonenumber=3;
		gemstonearr=[];
		function createGemstone(){
			for(var i=0;i<gemstonenumber;i++){
				var gemstone={};
				if(i<2){
					gemstone.positionX=160+i*40;//记录宝石位置，便于后边判断游戏是否闯关成功
					gemstone.positionY=242;
				}else{
					gemstone.positionX=200;//记录宝石位置，便于后边判断游戏是否闯关成功
					gemstone.positionY=322;
				}
				gemstonearr.push(gemstone);
		    }
		}
		function drawGemstone(){
			createGemstone();
			for(var i=0;i<gemstonenumber;i++){
				drawtext.drawImage(gemstoneimg,gemstonearr[i].positionX,gemstonearr[i].positionY);
			}
		}
		var gemstoneimg=new Image();
		gemstoneimg.src='img/success.PNG';
		gemstoneimg.onload=function(){
			drawGemstone();
		}
		//木箱
		var woodencasenumber=3;
		woodencasearr=[];
		function createWoodencse(){
			for(var i=0;i<woodencasenumber;i++){
				var woodencase={};
			    woodencase.positionX=80+i*40;//记录木箱开始的坐标便于后边的移动
				woodencase.positionY=282;
				woodencasearr.push(woodencase);
		    }
		}
		function drawWoodencase(){
			createWoodencse();
			for(var i=0;i<woodencasenumber;i++){
				drawtext.drawImage(woodencaseimg,woodencasearr[i].positionX,woodencasearr[i].positionY);
			}
		}
		var woodencaseimg=new Image();
		woodencaseimg.src='img/woodencase.PNG';
		woodencaseimg.onload=function(){
			drawWoodencase();
		}
		//小人
		var person=new Image();
		person.src='img/down.png';
		var personPositionX=200;
		var personPositionY=282;
		person.onload=function(){
			drawtext.drawImage(person,personPositionX,personPositionY,40,40);
		}
		
		//绘制下边重玩以及回主页按钮
		//回主页
		var backhome=new Image();
		backhome.src='img/backhome.png';
		var backhomePositionX=10;
		var backhomePositionY=470;//记录坐标,便于后边的监听事件确定事件源
		var backhomeWidth=110;
		var backhomeHeight=100;
		backhome.onload=function(){
			drawtext.drawImage(backhome,backhomePositionX,backhomePositionY,backhomeWidth,backhomeHeight);
		}
		//重玩
		var reagain=new Image();
		reagain.src='img/reagain.png';
		var reagainPositionX=200;
		var reagainPositionY=470;//记录坐标,便于后边的监听事件确定事件源
		var reagainWidth=110;
		var reagainHeight=100;
		reagain.onload=function(){
			drawtext.drawImage(reagain,reagainPositionX,reagainPositionY,reagainWidth,reagainHeight);
		}
		
		//控制小人以及木箱的移动	
		var mask=document.getElementsByClassName('mask')[0];//通关界面
		document.onkeydown=function(e){
			switch (e.which){
				case 38://上移
				    //判断小人是否有一个以上在一列的宝箱，如果有，则不能移动小人
				    var count=0;//记录小人上边的宝箱数
				    var personmoveable=true;//标记小人是否可以移动
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionY==personPositionY-40||woodencasearr[i].positionY==personPositionY-80)&&woodencasearr[i].positionX==personPositionX){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一列的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==personPositionX&&wallarr[i].positionY==(personPositionY-40)){
				    		
				    		personmoveable=false;
				    		break;//已碰到墙壁
				    	}  
				    }
				    //判断是否已碰到宝箱
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    for(var i=0;i<woodencasenumber;i++){
				    	if(woodencasearr[i].positionX==personPositionX&&woodencasearr[i].positionY==(personPositionY-40)){
				    		for(var j=0;j<wallnumber;j++){
				    			if(wallarr[j].positionX==woodencasearr[i].positionX&&wallarr[j].positionY==(woodencasearr[i].positionY-40)){
				    				personmoveable=false;//此时小人不可移动
				    				break;
				    			}//判断木箱是否碰到墙壁
				    			       
				    		}
				    		if(j==wallnumber){//木箱未碰到墙壁
				    		    currentwoodencase=i;
				    			break;
				    		}
				    			
				    	}
				    }
				    if(personmoveable){
				    	personPositionY -= 40;
				    	//更换小人图片
				        person.src='img/up.png';
				    	drawtext.clearRect(personPositionX,personPositionY+40,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX,personPositionY+40);//用游戏区域背景填充清空的区域
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if(personPositionX==gemstonearr[i].positionX&&(personPositionY+40)==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX,personPositionY+40);
				    	}
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionY -= 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    	
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    //所有木箱均已到达目的地才可
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[1];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass2.PNG');
				    }
					break;
				case 40://下移
				    var count=0;//记录小人下边的宝箱数
				    var personmoveable=true;
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionY==personPositionY+40||woodencasearr[i].positionY==personPositionY+80)&&woodencasearr[i].positionX==personPositionX){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一列的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==personPositionX&&wallarr[i].positionY==personPositionY+40){
				    		
				    		personmoveable=false
				    		 break;//已碰到墙壁
				    	}
				    	   
				    }
				    //判断是否已碰到宝箱
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    	for(var i=0;i<woodencasenumber;i++){
				    		if(woodencasearr[i].positionX==personPositionX&&woodencasearr[i].positionY==personPositionY+40){
				    			for(var j=0;j<wallnumber;j++){
				    				if(wallarr[j].positionX==woodencasearr[i].positionX&&wallarr[j].positionY==(woodencasearr[i].positionY+40)){
				    					personmoveable=false; 
				    					break;
				    				}//判断木箱是否碰到墙壁
				    			       
				    			}
				    		    if(j==wallnumber){//木箱未碰到墙壁
				    		    	currentwoodencase=i;
				    			    break;
				    		    }
				    			
				    		}
				    	}
				    
				    if(personmoveable){
				    	personPositionY += 40;
				    	person.src='img/down.png';
				    	drawtext.clearRect(personPositionX,personPositionY-40,40,40);
				    	drawtext.drawImage(playzoneimg,personPositionX,personPositionY-40);
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if(personPositionX==gemstonearr[i].positionX&&(personPositionY-40)==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX,personPositionY-40);
				    	}
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);	
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionY += 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[1];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass2.PNG');
				    }
				    break;
				case 37://左移
				    var count=0;//记录小人左边的宝箱数
				    var personmoveable=true;
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionX==personPositionX-40||woodencasearr[i].positionX==personPositionX-80)&&woodencasearr[i].positionY==personPositionY){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一行的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==(personPositionX-40)&&wallarr[i].positionY==personPositionY){
				    		personmoveable=false;
				    		break;//已碰到墙壁
				    	}  
				    }
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    	for(var i=0;i<woodencasenumber;i++){
				    		if(woodencasearr[i].positionX==(personPositionX-40)&&woodencasearr[i].positionY==personPositionY){
				    			for(var j=0;j<wallnumber;j++){
				    				if(wallarr[j].positionX==woodencasearr[i].positionX-40&&wallarr[j].positionY==woodencasearr[i].positionY){
				    					personmoveable=false;
				    					break;
				    				}//判断木箱是否碰到墙壁
				    			        
				    			}
				    		    if(j==wallnumber){//木箱未碰到墙壁
				    		    	currentwoodencase=i;
				    			    break;
				    		    }
				    			
				    		}
				    	}
				    if(personmoveable){
				    	personPositionX -= 40;
				    	person.src='img/left.png';
				    	drawtext.clearRect(personPositionX+40,personPositionY,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX+40,personPositionY);
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if((personPositionX+40)==gemstonearr[i].positionX&&personPositionY==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX+40,personPositionY);
				    	}
				    	//判断是否已碰到宝箱
				    	
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);	
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionX -= 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[1];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass2.PNG');
				    }
					break;
				case 39://右移
				    var count=0;//记录小人左边的宝箱数
				    var personmoveable=true;
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionX==personPositionX+40||woodencasearr[i].positionX==personPositionX+80)&&woodencasearr[i].positionY==personPositionY){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一行的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==(personPositionX+40)&&wallarr[i].positionY==personPositionY){
				    		personmoveable=false;
				    		break;//已碰到墙壁
				    	}
				    }//判断是否已碰到宝箱
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    	for(var i=0;i<woodencasenumber;i++){
				    		if(woodencasearr[i].positionX==(personPositionX+40)&&woodencasearr[i].positionY==personPositionY){
				    			for(var j=0;j<wallnumber;j++){
				    				if(wallarr[j].positionX==woodencasearr[i].positionX+40&&wallarr[j].positionY==woodencasearr[i].positionY){
				    					personmoveable=false;
				    					break;
				    				}//判断木箱是否碰到墙壁
				    			        
				    			}
				    		    if(j==wallnumber){//木箱未碰到墙壁
				    		    	currentwoodencase=i;
				    			    break;
				    		    }	
				    		}
				    	}
				    if(personmoveable){
				    	personPositionX += 40;
				    	person.src='img/right.png';
				    	drawtext.clearRect(personPositionX-40,personPositionY,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX-40,personPositionY);
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if((personPositionX-40)==gemstonearr[i].positionX&&personPositionY==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX-40,personPositionY);
				    	}
				    	
				    	
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);	
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionX += 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    	
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[1];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass2.PNG');
				    }
					break;
				default:
					break;
		    }
		}
	
	   //设置画布内回首页以及重玩的点击事件
	   //采用事件委托方法，对canvarsfirst画布进行事件监听，通过计算事件触发的位置，判断是哪个事件
	   
	   canvars.onclick=function(e){
	   	//回首页点击事件
		   	if(e.offsetX>=backhomePositionX&&e.offsetX<=backhomePositionX+backhomeWidth&&e.offsetY>=backhomePositionY&&e.offsetY<=backhomePositionY+backhomeHeight){
		   		canvars.style.display='none';
		   		home.style.display='block';
		   		drawtext.clearRect(0,0,320,565);//清空画布
		   	    canvars2();//重新生成画布
		   	}
		   	//重玩点击事件
		   	if(e.offsetX>=reagainPositionX&&e.offsetX<=reagainPositionX+reagainWidth&&e.offsetY>=reagainPositionY&&e.offsetY<=reagainPositionY+reagainHeight){
		   		drawtext.clearRect(0,0,320,565);//清空画布
		   	    canvars2();//重新生成画布
		   	    $(levelh[1]).fadeIn('normal');
    			setTimeout(function(){
    				$(levelh[1]).fadeOut('normal');
    			},1500);
		   	}
		   	
		   	
	   }
    }
    
    //第三关绘制函数
    function canvars3(){
    	//绘制墙壁，第三关绘制29面墙壁
		var wallarr=[]//存放所有墙壁的数组
		
		var wallnumber=29;//墙壁数量，第三关绘制29面墙壁
		//生成墙壁，每面墙壁大小均为40px*40px
		function createWall(){
			for(var i=0;i<wallnumber;i++){
				var wall={}//墙壁容器
				if(i<5){//第一行墙壁
					wall.positionX=40+i*40;//与第一面墙壁在同一行上的墙壁，每一次的x轴的位置都与上一次墙壁的位置相隔一面墙壁的宽度
					wall.positionY=142;//每一行墙壁的的Y轴坐标均相同	
				}else if(i<10){//第二行墙壁
					if(i<7){//第二行第一面墙壁的x轴的位置
						wall.positionX=(i-5)*40;//第二行第二面墙壁
					}else{
						wall.positionX=200+(i-7)*40;
					}
					wall.positionY=182;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else if(i<13){//第三行墙壁
					if(i==10){//第三行第一面墙壁的x轴的位置
						wall.positionX=0;//第三行第一面墙壁的x轴的位置
					}
					else if(i==11){
						wall.positionX=120;//第三行第二面墙壁
					}else{
						wall.positionX=280;
					}
					wall.positionY=222;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else if(i<17){//第四行墙壁
					if(i==13){//第四行第一面墙壁的x轴的位置
						wall.positionX=0;//第四行第一面墙壁的x轴的位置
					}
					else if(i==14){
						wall.positionX=120;//第四行第二面墙壁
					}
					else if(i==15){
						wall.positionX=200;
					}else{
						wall.positionX=280;
					}
					wall.positionY=262;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else if(i<19){//第五行墙壁
					if(i==17){
						wall.positionX=0;
					}
					else{
						wall.positionX=280;
					}
					wall.positionY=302;
				}else if(i<23){//第六行墙壁
					if(i==19){
						wall.positionX=0;
					}else{
						wall.positionX=200+(i-20)*40;
					}
					wall.positionY=342;
				}else{//最后一行墙壁
		        	wall.positionX=(i-23)*40;
					wall.positionY=382;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}
				wallarr.push(wall);//将生成的每面墙壁依次放入墙壁数组中
			}
		}
		
	    //绘制墙壁
	    function drawWall(){
	    	createWall();
	    	for(var i=0;i<wallnumber;i++){
	    		drawtext.drawImage(wallimg,wallarr[i].positionX,wallarr[i].positionY);
	    	}
	    }
	    
	    var wallimg=new Image();
		wallimg.src='img/wall.PNG';//每面墙壁的图片均相同
		wallimg.onload=function(){
			drawWall();	//图片加载完成才开始绘制墙壁
		}
	    
	    //绘制游戏区域
	    var playzonenumber=22
	    var playzonearr=[];
	    function createPlayZone(){
	    	for(var i=0;i<playzonenumber;i++){
	    		var playzone={};
	    		if(i<3){//第一行游戏区域
	    			playzone.positionX=80+i*40;
	    			playzone.positionY=182;
	    		}else if(i<8){
	    			if(i<5){
	    				playzone.positionX=40+(i-3)*40;
	    			}else{
	    				playzone.positionX=160+(i-5)*40;
	    			}
	    			
	    			playzone.positionY=222;
	    		}else if(i<12){
	    			if(i<10){
	    				playzone.positionX=40+(i-8)*40;
	    			}else if(i==10){
	    				playzone.positionX=160;
	    			}else{
	    				playzone.positionX=240;
	    			}
	    			
	    			playzone.positionY=262;
	    		}else if(i<18){
	    			playzone.positionX=40+(i-12)*40;
	    			playzone.positionY=302;
	    		}else{
	    			playzone.positionX=40+(i-18)*40;
	    			playzone.positionY=342;
	    		}
	    		playzonearr.push(playzone)
	    	}
	    }
	    function drawPlayZone(){
	    	createPlayZone();
	    	for(var i=0;i<playzonenumber;i++){
	    		drawtext.drawImage(playzoneimg,playzonearr[i].positionX,playzonearr[i].positionY);
	    	}
	    }
	    var playzoneimg=new Image();
		playzoneimg.src='img/common.PNG';
		playzoneimg.onload=function(){
			drawPlayZone();
		}
		
		//绘制小人、木箱、宝石（目的地）
		//宝石
		var gemstonenumber=3;
		gemstonearr=[];
		function createGemstone(){
			for(var i=0;i<gemstonenumber;i++){
				var gemstone={};
				if(i==0){
					gemstone.positionX=80;//记录宝石位置，便于后边判断游戏是否闯关成功
					gemstone.positionY=182;
				}else{
					if(i==1){
						gemstone.positionX=80;
					}else{
						gemstone.positionX=240;
					}
					//记录宝石位置，便于后边判断游戏是否闯关成功
					gemstone.positionY=302;
				}
				gemstonearr.push(gemstone);
		    }
		}
		function drawGemstone(){
			createGemstone();
			for(var i=0;i<gemstonenumber;i++){
				drawtext.drawImage(gemstoneimg,gemstonearr[i].positionX,gemstonearr[i].positionY);
			}
		}
		var gemstoneimg=new Image();
		gemstoneimg.src='img/success.PNG';
		gemstoneimg.onload=function(){
			drawGemstone();
		}
		//木箱
		var woodencasenumber=3;
		woodencasearr=[];
		function createWoodencse(){
			for(var i=0;i<woodencasenumber;i++){
				var woodencase={};
				if(i==0){
					woodencase.positionX=200;
					woodencase.positionY=222;
				}
				if(i==1){
					woodencase.positionX=80;
					woodencase.positionY=262;
				}
				if(i==2){
					woodencase.positionX=200;
					woodencase.positionY=302;
				}//记录木箱开始的坐标便于后边的移动
				woodencasearr.push(woodencase);
		    }
		}
		function drawWoodencase(){
			createWoodencse();
			for(var i=0;i<woodencasenumber;i++){
				drawtext.drawImage(woodencaseimg,woodencasearr[i].positionX,woodencasearr[i].positionY);
			}
		}
		var woodencaseimg=new Image();
		woodencaseimg.src='img/woodencase.PNG';
		woodencaseimg.onload=function(){
			drawWoodencase();
		}
		//小人
		var person=new Image();
		person.src='img/down.png';
		var personPositionX=240;
		var personPositionY=222;
		person.onload=function(){
			drawtext.drawImage(person,personPositionX,personPositionY,40,40);
		}
		
		//绘制下边重玩以及回主页按钮
		//回主页
		var backhome=new Image();
		backhome.src='img/backhome.png';
		var backhomePositionX=10;
		var backhomePositionY=470;//记录坐标,便于后边的监听事件确定事件源
		var backhomeWidth=110;
		var backhomeHeight=100;
		backhome.onload=function(){
			drawtext.drawImage(backhome,backhomePositionX,backhomePositionY,backhomeWidth,backhomeHeight);
		}
		//重玩
		var reagain=new Image();
		reagain.src='img/reagain.png';
		var reagainPositionX=200;
		var reagainPositionY=470;//记录坐标,便于后边的监听事件确定事件源
		var reagainWidth=110;
		var reagainHeight=100;
		reagain.onload=function(){
			drawtext.drawImage(reagain,reagainPositionX,reagainPositionY,reagainWidth,reagainHeight);
		}
		
		//控制小人以及木箱的移动	
		var mask=document.getElementsByClassName('mask')[0];//通关界面
		document.onkeydown=function(e){
			switch (e.which){
				case 38://上移
				    //判断小人是否有一个以上在一列的宝箱，如果有，则不能移动小人
				    var count=0;//记录小人上边的宝箱数
				    var personmoveable=true;//标记小人是否可以移动
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionY==personPositionY-40||woodencasearr[i].positionY==personPositionY-80)&&woodencasearr[i].positionX==personPositionX){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一列的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==personPositionX&&wallarr[i].positionY==(personPositionY-40)){
				    		
				    		personmoveable=false;
				    		break;//已碰到墙壁
				    	}  
				    }
				    //判断是否已碰到宝箱
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    for(var i=0;i<woodencasenumber;i++){
				    	if(woodencasearr[i].positionX==personPositionX&&woodencasearr[i].positionY==(personPositionY-40)){
				    		for(var j=0;j<wallnumber;j++){
				    			if(wallarr[j].positionX==woodencasearr[i].positionX&&wallarr[j].positionY==(woodencasearr[i].positionY-40)){
				    				personmoveable=false;//此时小人不可移动
				    				break;
				    			}//判断木箱是否碰到墙壁
				    			       
				    		}
				    		if(j==wallnumber){//木箱未碰到墙壁
				    		    currentwoodencase=i;
				    			break;
				    		}
				    			
				    	}
				    }
				    if(personmoveable){
				    	personPositionY -= 40;
				    	//更换小人图片
				        person.src='img/up.png';
				    	drawtext.clearRect(personPositionX,personPositionY+40,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX,personPositionY+40);//用游戏区域背景填充清空的区域
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if(personPositionX==gemstonearr[i].positionX&&(personPositionY+40)==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX,personPositionY+40);
				    	}
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionY -= 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    	
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    //所有木箱均已到达目的地才可
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[2];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass3.PNG');
				    }
					break;
				case 40://下移
				    var count=0;//记录小人下边的宝箱数
				    var personmoveable=true;
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionY==personPositionY+40||woodencasearr[i].positionY==personPositionY+80)&&woodencasearr[i].positionX==personPositionX){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一列的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==personPositionX&&wallarr[i].positionY==personPositionY+40){
				    		
				    		personmoveable=false
				    		 break;//已碰到墙壁
				    	}
				    	   
				    }
				    //判断是否已碰到宝箱
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    	for(var i=0;i<woodencasenumber;i++){
				    		if(woodencasearr[i].positionX==personPositionX&&woodencasearr[i].positionY==personPositionY+40){
				    			for(var j=0;j<wallnumber;j++){
				    				if(wallarr[j].positionX==woodencasearr[i].positionX&&wallarr[j].positionY==(woodencasearr[i].positionY+40)){
				    					personmoveable=false; 
				    					break;
				    				}//判断木箱是否碰到墙壁
				    			       
				    			}
				    		    if(j==wallnumber){//木箱未碰到墙壁
				    		    	currentwoodencase=i;
				    			    break;
				    		    }
				    			
				    		}
				    	}
				    
				    if(personmoveable){
				    	personPositionY += 40;
				    	person.src='img/down.png';
				    	drawtext.clearRect(personPositionX,personPositionY-40,40,40);
				    	drawtext.drawImage(playzoneimg,personPositionX,personPositionY-40);
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if(personPositionX==gemstonearr[i].positionX&&(personPositionY-40)==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX,personPositionY-40);
				    	}
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);	
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionY += 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[2];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass3.PNG');
				    }
				    break;
				case 37://左移
				    var count=0;//记录小人左边的宝箱数
				    var personmoveable=true;
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionX==personPositionX-40||woodencasearr[i].positionX==personPositionX-80)&&woodencasearr[i].positionY==personPositionY){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一行的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==(personPositionX-40)&&wallarr[i].positionY==personPositionY){
				    		personmoveable=false;
				    		break;//已碰到墙壁
				    	}  
				    }
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    	for(var i=0;i<woodencasenumber;i++){
				    		if(woodencasearr[i].positionX==(personPositionX-40)&&woodencasearr[i].positionY==personPositionY){
				    			for(var j=0;j<wallnumber;j++){
				    				if(wallarr[j].positionX==woodencasearr[i].positionX-40&&wallarr[j].positionY==woodencasearr[i].positionY){
				    					personmoveable=false;
				    					break;
				    				}//判断木箱是否碰到墙壁
				    			        
				    			}
				    		    if(j==wallnumber){//木箱未碰到墙壁
				    		    	currentwoodencase=i;
				    			    break;
				    		    }
				    			
				    		}
				    	}
				    if(personmoveable){
				    	personPositionX -= 40;
				    	person.src='img/left.png';
				    	drawtext.clearRect(personPositionX+40,personPositionY,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX+40,personPositionY);
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if((personPositionX+40)==gemstonearr[i].positionX&&personPositionY==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX+40,personPositionY);
				    	}
				    	//判断是否已碰到宝箱
				    	
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);	
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionX -= 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[2];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass3.PNG');
				    }
					break;
				case 39://右移
				    var count=0;//记录小人左边的宝箱数
				    var personmoveable=true;
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionX==personPositionX+40||woodencasearr[i].positionX==personPositionX+80)&&woodencasearr[i].positionY==personPositionY){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一行的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==(personPositionX+40)&&wallarr[i].positionY==personPositionY){
				    		personmoveable=false;
				    		break;//已碰到墙壁
				    	}
				    }//判断是否已碰到宝箱
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    	for(var i=0;i<woodencasenumber;i++){
				    		if(woodencasearr[i].positionX==(personPositionX+40)&&woodencasearr[i].positionY==personPositionY){
				    			for(var j=0;j<wallnumber;j++){
				    				if(wallarr[j].positionX==woodencasearr[i].positionX+40&&wallarr[j].positionY==woodencasearr[i].positionY){
				    					personmoveable=false;
				    					break;
				    				}//判断木箱是否碰到墙壁
				    			        
				    			}
				    		    if(j==wallnumber){//木箱未碰到墙壁
				    		    	currentwoodencase=i;
				    			    break;
				    		    }	
				    		}
				    	}
				    if(personmoveable){
				    	personPositionX += 40;
				    	person.src='img/right.png';
				    	drawtext.clearRect(personPositionX-40,personPositionY,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX-40,personPositionY);
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if((personPositionX-40)==gemstonearr[i].positionX&&personPositionY==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX-40,personPositionY);
				    	}
				    	
				    	
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);	
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionX += 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    	
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[2];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass3.PNG');
				    }
					break;
				default:
					break;
		    }
		}
	
	   //设置画布内回首页以及重玩的点击事件
	   //采用事件委托方法，对canvarsfirst画布进行事件监听，通过计算事件触发的位置，判断是哪个事件
	   
	   canvars.onclick=function(e){
	   	//回首页点击事件
		   	if(e.offsetX>=backhomePositionX&&e.offsetX<=backhomePositionX+backhomeWidth&&e.offsetY>=backhomePositionY&&e.offsetY<=backhomePositionY+backhomeHeight){
		   		canvars.style.display='none';
		   		home.style.display='block';
		   		drawtext.clearRect(0,0,320,565);//清空画布
		   	    canvars3();//重新生成画布
		   	}
		   	//重玩点击事件
		   	if(e.offsetX>=reagainPositionX&&e.offsetX<=reagainPositionX+reagainWidth&&e.offsetY>=reagainPositionY&&e.offsetY<=reagainPositionY+reagainHeight){
		   		drawtext.clearRect(0,0,320,565);//清空画布
		   	    canvars3();//重新生成画布
		   	    $(levelh[2]).fadeIn('normal');
    			setTimeout(function(){
    				$(levelh[2]).fadeOut('normal');
    			},1500);
		   	}
		   	
		   	
	   }
    }
    
    //第四关绘制
    function canvars4(){
    	//绘制墙壁，第四关绘制34面墙壁
		var wallarr=[]//存放所有墙壁的数组
		
		var wallnumber=34;//墙壁数量，第四关绘制34面墙壁
		//生成墙壁，每面墙壁大小均为40px*40px
		function createWall(){
			for(var i=0;i<wallnumber;i++){
				var wall={}//墙壁容器
				if(i<7){//第一行墙壁
					wall.positionX=40+i*40;//与第一面墙壁在同一行上的墙壁，每一次的x轴的位置都与上一次墙壁的位置相隔一面墙壁的宽度
					wall.positionY=122;//每一行墙壁的的Y轴坐标均相同	
				}else if(i<10){//第二行墙壁
					if(i<9){//第二行第一面墙壁的x轴的位置
						wall.positionX=(i-7)*40;//第二行第二面墙壁
					}else{
						wall.positionX=280;
					}
					wall.positionY=162;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else if(i<14){//第三行墙壁
					if(i==10){//第三行第一面墙壁的x轴的位置
						wall.positionX=0;//第三行第一面墙壁的x轴的位置
					}
					else if(i==11){
						wall.positionX=120;//第三行第二面墙壁
					}else if(i==12){
						wall.positionX=200;
					}else{
						wall.positionX=280;
					}
					wall.positionY=202;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else if(i<16){//第四行墙壁
					if(i==14){//第四行第一面墙壁的x轴的位置
						wall.positionX=0;//第四行第一面墙壁的x轴的位置
					}else{
						wall.positionX=280;
					}
					wall.positionY=242;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}else if(i<21){//第五行墙壁
					if(i==16){
						wall.positionX=0;
					}else if(i<19){
						wall.positionX=80+(i-17)*40;
					}else if(i==19){
						wall.positionX=200;
					}else{
						wall.positionX=280;
					}
					wall.positionY=282;
				}else if(i<23){//第六行墙壁
					if(i==21){
						wall.positionX=0;
					}else{
						wall.positionX=280;
					}
					wall.positionY=322;
				}else if(i<27){//第七行墙壁
					if(i==23){
						wall.positionX=0;
					}
					else if(i==24){
						wall.positionX=120;
					}else{
						wall.positionX=240+(i-25)*40;
					}
					wall.positionY=362;
				}else{//最后一行墙壁
		        	wall.positionX=(i-27)*40;
					wall.positionY=402;//每一行墙壁的的Y轴坐标均相同，与上一行墙壁Y轴的位置相差一面墙壁的高度
				}
				wallarr.push(wall);//将生成的每面墙壁依次放入墙壁数组中
			}
		}
		
	    //绘制墙壁
	    function drawWall(){
	    	createWall();
	    	for(var i=0;i<wallnumber;i++){
	    		drawtext.drawImage(wallimg,wallarr[i].positionX,wallarr[i].positionY);
	    	}
	    }
	    
	    var wallimg=new Image();
		wallimg.src='img/wall.PNG';//每面墙壁的图片均相同
		wallimg.onload=function(){
			drawWall();	//图片加载完成才开始绘制墙壁
		}
	    
	    //绘制游戏区域
	    var playzonenumber=28
	    var playzonearr=[];
	    function createPlayZone(){
	    	for(var i=0;i<playzonenumber;i++){
	    		var playzone={};
	    		if(i<5){//第一行游戏区域
	    			playzone.positionX=80+i*40;
	    			playzone.positionY=162;
	    		}else if(i<9){
	    			if(i<7){
	    				playzone.positionX=40+(i-5)*40;
	    			}else if(i==7){
	    				playzone.positionX=160;
	    			}else{
	    				playzone.positionX=240;
	    			}
	    			
	    			playzone.positionY=202;
	    		}else if(i<15){
	    				playzone.positionX=40+(i-9)*40;
	    			    playzone.positionY=242;
	    		}else if(i<18){
	    			if(i==15){
	    				playzone.positionX=40;
	    			}else if(i==16){
	    				playzone.positionX=160;
	    			}else{
	    				playzone.positionX=240;
	    			}
	    			playzone.positionY=282;
	    		}else if(i<24){
	    			playzone.positionX=40+(i-18)*40;
	    			playzone.positionY=322;
	    		}else{
	    			if(i<26){
	    				playzone.positionX=40+(i-24)*40;
	    			}else{
	    				playzone.positionX=160+(i-26)*40;
	    			}
	    			
	    			playzone.positionY=362;
	    		}
	    		playzonearr.push(playzone)
	    	}
	    }
	    function drawPlayZone(){
	    	createPlayZone();
	    	for(var i=0;i<playzonenumber;i++){
	    		drawtext.drawImage(playzoneimg,playzonearr[i].positionX,playzonearr[i].positionY);
	    	}
	    }
	    var playzoneimg=new Image();
		playzoneimg.src='img/common.PNG';
		playzoneimg.onload=function(){
			drawPlayZone();
		}
		
		//绘制小人、木箱、宝石（目的地）
		//宝石
		var gemstonenumber=5;
		gemstonearr=[];
		function createGemstone(){
			for(var i=0;i<gemstonenumber;i++){
				var gemstone={};
				if(i<4){
					if(i<3){
					    gemstone.positionX=80+i*40;//记录宝石位置，便于后边判断游戏是否闯关成功
				    }else{
				    	gemstone.positionX=240;
				    }
					
					gemstone.positionY=162;
				}else{
					    gemstone.positionX=160;
					    gemstone.positionY=202;
				    }
					//记录宝石位置，便于后边判断游戏是否闯关成功
				gemstonearr.push(gemstone);
		    }
		}
		function drawGemstone(){
			createGemstone();
			for(var i=0;i<gemstonenumber;i++){
				drawtext.drawImage(gemstoneimg,gemstonearr[i].positionX,gemstonearr[i].positionY);
			}
		}
		var gemstoneimg=new Image();
		gemstoneimg.src='img/success.PNG';
		gemstoneimg.onload=function(){
			drawGemstone();
		}
		//木箱
		var woodencasenumber=5;
		woodencasearr=[];
		function createWoodencse(){
			for(var i=0;i<woodencasenumber;i++){
				var woodencase={};
				if(i==0){
					woodencase.positionX=80;
					woodencase.positionY=202;
				}else if(i<3){
					if(i==1){
						woodencase.positionX=40;
					}else{
						woodencase.positionX=200;
					}
					woodencase.positionY=242;
				}else if(i==3){
					woodencase.positionX=160;
					woodencase.positionY=282;
				}else{
					woodencase.positionX=80;
					woodencase.positionY=322;
				}//记录木箱开始的坐标便于后边的移动
				woodencasearr.push(woodencase);
		    }
		}
		function drawWoodencase(){
			createWoodencse();
			for(var i=0;i<woodencasenumber;i++){
				drawtext.drawImage(woodencaseimg,woodencasearr[i].positionX,woodencasearr[i].positionY);
			}
		}
		var woodencaseimg=new Image();
		woodencaseimg.src='img/woodencase.PNG';
		woodencaseimg.onload=function(){
			drawWoodencase();
		}
		//小人
		var person=new Image();
		person.src='img/down.png';
		var personPositionX=80;
		var personPositionY=242;
		person.onload=function(){
			drawtext.drawImage(person,personPositionX,personPositionY,40,40);
		}
		
		//绘制下边重玩以及回主页按钮
		//回主页
		var backhome=new Image();
		backhome.src='img/backhome.png';
		var backhomePositionX=10;
		var backhomePositionY=470;//记录坐标,便于后边的监听事件确定事件源
		var backhomeWidth=110;
		var backhomeHeight=100;
		backhome.onload=function(){
			drawtext.drawImage(backhome,backhomePositionX,backhomePositionY,backhomeWidth,backhomeHeight);
		}
		//重玩
		var reagain=new Image();
		reagain.src='img/reagain.png';
		var reagainPositionX=200;
		var reagainPositionY=470;//记录坐标,便于后边的监听事件确定事件源
		var reagainWidth=110;
		var reagainHeight=100;
		reagain.onload=function(){
			drawtext.drawImage(reagain,reagainPositionX,reagainPositionY,reagainWidth,reagainHeight);
		}
		
		//控制小人以及木箱的移动	
		var mask=document.getElementsByClassName('mask')[0];//通关界面
		document.onkeydown=function(e){
			switch (e.which){
				case 38://上移
				    //判断小人是否有一个以上在一列的宝箱，如果有，则不能移动小人
				    var count=0;//记录小人上边的宝箱数
				    var personmoveable=true;//标记小人是否可以移动
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionY==personPositionY-40||woodencasearr[i].positionY==personPositionY-80)&&woodencasearr[i].positionX==personPositionX){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一列的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==personPositionX&&wallarr[i].positionY==(personPositionY-40)){
				    		
				    		personmoveable=false;
				    		break;//已碰到墙壁
				    	}  
				    }
				    //判断是否已碰到宝箱
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    for(var i=0;i<woodencasenumber;i++){
				    	if(woodencasearr[i].positionX==personPositionX&&woodencasearr[i].positionY==(personPositionY-40)){
				    		for(var j=0;j<wallnumber;j++){
				    			if(wallarr[j].positionX==woodencasearr[i].positionX&&wallarr[j].positionY==(woodencasearr[i].positionY-40)){
				    				personmoveable=false;//此时小人不可移动
				    				break;
				    			}//判断木箱是否碰到墙壁
				    			       
				    		}
				    		if(j==wallnumber){//木箱未碰到墙壁
				    		    currentwoodencase=i;
				    			break;
				    		}
				    			
				    	}
				    }
				    if(personmoveable){
				    	personPositionY -= 40;
				    	//更换小人图片
				        person.src='img/up.png';
				    	drawtext.clearRect(personPositionX,personPositionY+40,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX,personPositionY+40);//用游戏区域背景填充清空的区域
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if(personPositionX==gemstonearr[i].positionX&&(personPositionY+40)==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX,personPositionY+40);
				    	}
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionY -= 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    	
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    //所有木箱均已到达目的地才可
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[3];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass4.PNG');
				    }
					break;
				case 40://下移
				    var count=0;//记录小人下边的宝箱数
				    var personmoveable=true;
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionY==personPositionY+40||woodencasearr[i].positionY==personPositionY+80)&&woodencasearr[i].positionX==personPositionX){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一列的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==personPositionX&&wallarr[i].positionY==personPositionY+40){
				    		
				    		personmoveable=false
				    		 break;//已碰到墙壁
				    	}
				    	   
				    }
				    //判断是否已碰到宝箱
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    	for(var i=0;i<woodencasenumber;i++){
				    		if(woodencasearr[i].positionX==personPositionX&&woodencasearr[i].positionY==personPositionY+40){
				    			for(var j=0;j<wallnumber;j++){
				    				if(wallarr[j].positionX==woodencasearr[i].positionX&&wallarr[j].positionY==(woodencasearr[i].positionY+40)){
				    					personmoveable=false; 
				    					break;
				    				}//判断木箱是否碰到墙壁
				    			       
				    			}
				    		    if(j==wallnumber){//木箱未碰到墙壁
				    		    	currentwoodencase=i;
				    			    break;
				    		    }
				    			
				    		}
				    	}
				    
				    if(personmoveable){
				    	personPositionY += 40;
				    	person.src='img/down.png';
				    	drawtext.clearRect(personPositionX,personPositionY-40,40,40);
				    	drawtext.drawImage(playzoneimg,personPositionX,personPositionY-40);
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if(personPositionX==gemstonearr[i].positionX&&(personPositionY-40)==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX,personPositionY-40);
				    	}
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);	
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionY += 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[3];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass4.PNG');
				    }
				    break;
				case 37://左移
				    var count=0;//记录小人左边的宝箱数
				    var personmoveable=true;
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionX==personPositionX-40||woodencasearr[i].positionX==personPositionX-80)&&woodencasearr[i].positionY==personPositionY){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一行的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==(personPositionX-40)&&wallarr[i].positionY==personPositionY){
				    		personmoveable=false;
				    		break;//已碰到墙壁
				    	}  
				    }
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    	for(var i=0;i<woodencasenumber;i++){
				    		if(woodencasearr[i].positionX==(personPositionX-40)&&woodencasearr[i].positionY==personPositionY){
				    			for(var j=0;j<wallnumber;j++){
				    				if(wallarr[j].positionX==woodencasearr[i].positionX-40&&wallarr[j].positionY==woodencasearr[i].positionY){
				    					personmoveable=false;
				    					break;
				    				}//判断木箱是否碰到墙壁
				    			        
				    			}
				    		    if(j==wallnumber){//木箱未碰到墙壁
				    		    	currentwoodencase=i;
				    			    break;
				    		    }
				    			
				    		}
				    	}
				    if(personmoveable){
				    	personPositionX -= 40;
				    	person.src='img/left.png';
				    	drawtext.clearRect(personPositionX+40,personPositionY,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX+40,personPositionY);
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if((personPositionX+40)==gemstonearr[i].positionX&&personPositionY==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX+40,personPositionY);
				    	}
				    	//判断是否已碰到宝箱
				    	
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);	
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionX -= 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[3];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass4.PNG');
				    }
					break;
				case 39://右移
				    var count=0;//记录小人左边的宝箱数
				    var personmoveable=true;
				    for(var i=0;i<woodencasenumber;i++){
				    	if((woodencasearr[i].positionX==personPositionX+40||woodencasearr[i].positionX==personPositionX+80)&&woodencasearr[i].positionY==personPositionY){
				    		count++;
				    	}
				    }
				    if(count==2)
				        break;//小人上有两个在一行的
				    //判断是否还能移动，即还未到墙壁边界
				    for(var i=0;i<wallnumber;i++){
				    	if(wallarr[i].positionX==(personPositionX+40)&&wallarr[i].positionY==personPositionY){
				    		personmoveable=false;
				    		break;//已碰到墙壁
				    	}
				    }//判断是否已碰到宝箱
				    var currentwoodencase=-1;//记录当前木箱索引，便于控制木箱的移动
				    	for(var i=0;i<woodencasenumber;i++){
				    		if(woodencasearr[i].positionX==(personPositionX+40)&&woodencasearr[i].positionY==personPositionY){
				    			for(var j=0;j<wallnumber;j++){
				    				if(wallarr[j].positionX==woodencasearr[i].positionX+40&&wallarr[j].positionY==woodencasearr[i].positionY){
				    					personmoveable=false;
				    					break;
				    				}//判断木箱是否碰到墙壁
				    			        
				    			}
				    		    if(j==wallnumber){//木箱未碰到墙壁
				    		    	currentwoodencase=i;
				    			    break;
				    		    }	
				    		}
				    	}
				    if(personmoveable){
				    	personPositionX += 40;
				    	person.src='img/right.png';
				    	drawtext.clearRect(personPositionX-40,personPositionY,40,40);//清空小人之前的画布位置
				    	drawtext.drawImage(playzoneimg,personPositionX-40,personPositionY);
				    	for(var i=0;i<gemstonenumber;i++){//如果当前区域是有宝石的区域，则用宝石填充
				    		if((personPositionX-40)==gemstonearr[i].positionX&&personPositionY==gemstonearr[i].positionY)
				    		    drawtext.drawImage(gemstoneimg,personPositionX-40,personPositionY);
				    	}
				    	
				    	
				    	if(currentwoodencase>=0){//碰到木箱，推着木箱一块移动
				    		drawtext.clearRect(woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY,40,40);	
				    		drawtext.drawImage(playzoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		for(var i=0;i<gemstonenumber;i++){
				    			if(woodencasearr[currentwoodencase].positionX==gemstonearr[i].positionX&&woodencasearr[currentwoodencase].positionY==gemstonearr[i].positionY)
				    			    drawtext.drawImage(gemstoneimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);
				    		}
				    		woodencasearr[currentwoodencase].positionX += 40;//改变当前木箱位
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	    drawtext.drawImage(woodencaseimg,woodencasearr[currentwoodencase].positionX,woodencasearr[currentwoodencase].positionY);//将新的位置绘制到画布上
				    	}else{
				    		drawtext.drawImage(person,personPositionX,personPositionY,40,40);
				    	}
				    	
				    }
				    //判断是否已碰到宝石，即是否已抵达目的地
				    var achieve=0;//记录到达数
				    for(var i=0;i<gemstonenumber;i++){
				    	for(var j=0;j<woodencasenumber;j++){
				    		if(woodencasearr[j].positionX==gemstonearr[i].positionX&&woodencasearr[j].positionY==gemstonearr[i].positionY)
				    		    achieve++;
				    	}
				    }
				    if(achieve==gemstonenumber){//所有木箱均已到达，则通过本关
				    	setTimeout(function(){
				    		mask.style.display='block';
				    	},1000)
				    	
				    	document.onkeydown=false;//取消事件的监听
				    	//改变level页面的li相应的class属性为pass，以及图片也换成对应的图片
				    	var oLi=level.getElementsByTagName('li')[3];
				    	var oImg=oLi.getElementsByTagName('img')[0];
				    	oLi.className='pass';
				    	oImg.setAttribute('src','img/pass4.PNG');
				    }
					break;
				default:
					break;
		    }
		}
	
	   //设置画布内回首页以及重玩的点击事件
	   //采用事件委托方法，对canvarsfirst画布进行事件监听，通过计算事件触发的位置，判断是哪个事件
	   
	   canvars.onclick=function(e){
	   	//回首页点击事件
		   	if(e.offsetX>=backhomePositionX&&e.offsetX<=backhomePositionX+backhomeWidth&&e.offsetY>=backhomePositionY&&e.offsetY<=backhomePositionY+backhomeHeight){
		   		canvars.style.display='none';
		   		home.style.display='block';
		   		drawtext.clearRect(0,0,320,565);//清空画布
		   	    canvars4();//重新生成画布
		   	}
		   	//重玩点击事件
		   	if(e.offsetX>=reagainPositionX&&e.offsetX<=reagainPositionX+reagainWidth&&e.offsetY>=reagainPositionY&&e.offsetY<=reagainPositionY+reagainHeight){
		   		drawtext.clearRect(0,0,320,565);//清空画布
		   	    canvars4();//重新生成画布
		   	    $(levelh[3]).fadeIn('normal');
    			setTimeout(function(){
    				$(levelh[3]).fadeOut('normal');
    			},1500);
		   	}
		   	
		   	
	   }
    }
    //画布刷新函数
    function refresh(ele,index){
    	ele.clearRect(0,0,320,565);
    	switch(index){//刷新当前画布
		   	case 0:
		   		canvars1();//每个画布的生成函数名比该画布的索引值多一
		   		break;
		   	case 1:
		   		canvars2();
		   		break;
		   	case 2:
		   		canvars3();
		   		break;
		   	case 3:
		   		canvars4();
		   		break;
		   	default:
		   	    canvars4();
		   		break;
		}
    	
    }
   //设置最后通关页面的三个按钮点击事件
   //下一关按钮
   var mask=document.getElementsByClassName('mask')[0];
   var button=mask.getElementsByTagName('img');
   for(var i=0;i<button.length;i++){
	   	button[i].index=i;//设置索引
	   	button[i].onclick=function(){
			var currentcanvars;//用来记录当前真在显示的画布，便于后边的画布刷新
			for(var i0=0;i0<lastchoose.length;i0++){
				if(lastchoose[i0].className=='pass'){
					currentcanvars=i0;
				}
			}
	   		if(this.index==0){//回到主页
	   			home.style.display='block';
	   			canvars.style.display='none';
	   			mask.style.display='none';
		   		refresh(drawtext,currentcanvars);//刷新当前画布画布，按当前关卡样式
	   			
	   		}else if(this.index==1){//显示下一关
	   			var nextcanvars=currentcanvars+1;
	   			refresh(drawtext,nextcanvars);//第一个没有通过的li所对应的关卡即是下一关关卡，按下一关关卡样式
	   			mask.style.display='none';
	   			$(levelh[nextcanvars]).fadeIn('normal');
    			setTimeout(function(){
    				$(levelh[nextcanvars]).fadeOut('normal');
    			},1500);
	   		}else{//重玩本关  
		   		    refresh(drawtext,currentcanvars);//刷新画布
		   			mask.style.display='none';
	   			
	   		}
	   	}
   }
}())
