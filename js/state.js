
//默认实时状态
$(function(){
	gepxTtree();
});
//选中实时状态
$(".equipment").on('click',function(){
	gepxTtree();
});

//点击室内环境
$(".environment").on('click',function(){
	geNewpxTtree();
});

function pxTtreeLeftdReal(data){

	var data=strToJson(data);
	$("#realstate").empty();
	pxTtreeBuildReal(JSON.stringify(data.items[0]));
	for(i=0;i<data.items.length;i++){
		if(i==0){
			$("#realstate").append("<li onclick=pxTtreeBuildReal('"+JSON.stringify(data.items[i])+"'); class='active' style='cursor: pointer;'><a>"+data.items[i].name+"</a></li>");
		}else{
			$("#realstate").append("<li onclick=pxTtreeBuildReal('"+JSON.stringify(data.items[i])+"'); style='cursor: pointer;'><a>"+data.items[i].name+"</a></li>");
		}
	}
	leftBlock();

}



//渲染实时状态建筑
function pxTtreeBuildReal(data){

	var data=strToJson(data);
	$("#tab_ammeter .block").empty();
	pxTtreeAreaReal(JSON.stringify(data.items[0]));
	for(i=0;i<data.items.length;i++){
		if(i==0){
			$("#tab_ammeter .block").append("<li onclick=pxTtreeAreaReal('"+JSON.stringify(data.items[i])+"'); class='active'>"+data.items[i].name+"</li>");
		}else{
			$("#tab_ammeter .block").append("<li onclick=pxTtreeAreaReal('"+JSON.stringify(data.items[i])+"');>"+data.items[i].name+"</li>");
		}
	}
	buildBlock();

}



//渲染实时状态分区和分层
function pxTtreeAreaReal(data){
	var data=strToJson(data);
	$("#tab_ammeter .f_floor").empty();
	pxlocationReal(JSON.stringify(data.items[0].items[0].ord));
	for(i=0;i<data.items.length;i++){
		if(i==0){
			$("#tab_ammeter .f_floor").append("<p>"+data.items[0].name+"</p><ul class='floor_choice' >");
			for(j=0;j<data.items[0].items.length;j++) {
				if(j==0){
				$("#tab_ammeter .f_floor ").append("<li  class='btn btn-default active' onclick=pxlocationReal('"+JSON.stringify(data.items[0].items[0].ord)+"',this);>" + data.items[i].items[j].name +"</li>");

				}else{
				$("#tab_ammeter .f_floor ").append("<li  class='btn btn-default' onclick=pxlocationReal('"+JSON.stringify(data.items[0].items[j].ord)+"',this);>" + data.items[i].items[j].name +"</li>");

				}
			}
				$("#tab_ammeter .f_floor").append("</ul>");
		}else{
			$("#tab_ammeter .f_floor").append("<p>"+data.items[i].name+"</p><ul class='floor_choice' >");
			for(j=0;j<data.items[i].items.length;j++) {
				$("#tab_ammeter .f_floor ").append("<li  class='btn btn-default' onclick=pxlocationReal('"+JSON.stringify(data.items[i].items[j].ord)+"',this);>" + data.items[i].items[j].name +"</li>");

			}


			$("#tab_ammeter .f_floor").append("</ul>");
		}
	}

}


//实时状态px跳转
function pxlocationReal(data,self){
	floorBlock(self);
	data = data.substring(0, data.length - 1);
	data=data.substring(7);
	var url="http://www.sinooceanconstruction.cn/file/"+data;
	$("#pxReal_src").attr("src",url);

}






//渲染室内环境建筑
function pxTtreeBuildEnvi(data){
	
	var data=strToJson(data);
	
	$("#tab_indoor_environment .block").empty();
	pxTtreeAreaEnvi(JSON.stringify(data.items[0]));
	for(i=0;i<data.items.length;i++){
		if(i==0){
			$("#tab_indoor_environment .block").append("<li onclick=pxTtreeAreaEnvi('"+JSON.stringify(data.items[i])+"'); class='active'>"+data.items[i].name+"</li>");
		}else{
			$("#tab_indoor_environment .block").append("<li onclick=pxTtreeAreaEnvi('"+JSON.stringify(data.items[i])+"');>"+data.items[i].name+"</li>");
		}
	}
	buildBlock();
}


//渲染实时状态分区和分层
function pxTtreeAreaEnvi(data){
	var data=strToJson(data);
	$("#tab_indoor_environment .f_floor").empty();
	pxlocationEnvi(JSON.stringify(data.items[0].items[0].ord));
	for(i=0;i<data.items.length;i++){
		if(i==0){
			$("#tab_indoor_environment .f_floor").append("<p>"+data.items[0].name+"</p><ul class='floor_choice' >");
			for(j=0;j<data.items[0].items.length;j++) {
				if(j==0){
					$("#tab_indoor_environment .f_floor ").append("<li  class='btn btn-default active' onclick=pxlocationEnvi('"+JSON.stringify(data.items[0].items[0].ord)+"',this);>" + data.items[i].items[j].name +"</li>");
				}else{
					$("#tab_indoor_environment .f_floor ").append("<li  class='btn btn-default' onclick=pxlocationEnvi('"+JSON.stringify(data.items[0].items[j].ord)+"',this);>" + data.items[i].items[j].name +"</li>");
				}
			}
			$("#tab_indoor_environment .f_floor").append("</ul>");
		}else{
			$("#tab_indoor_environment .f_floor").append("<p>"+data.items[i].name+"</p><ul class='floor_choice' >");
			for(j=0;j<data.items[i].items.length;j++) {
				$("#tab_indoor_environment .f_floor ").append("<li  class='btn btn-default' onclick=pxlocationEnvi('"+JSON.stringify(data.items[i].items[j].ord)+"',this);>" + data.items[i].items[j].name +"</li>");
			}

			$("#tab_indoor_environment .f_floor").append("</ul>");
		}
	}
}


//实时状态px跳转
function pxlocationEnvi(data,self){
	floorBlock(self);
	data = data.substring(0, data.length - 1);
	data=data.substring(7);
	var url="http://www.sinooceanconstruction.cn/file/"+data;
	$("#pxEnvi_src").attr("src",url);
}


//15.px页面Ttree
function gepxTtree(){

	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"roots","",true);
	$.ajax({
		type:'post',
		url:'/EasyEnergy/PxTreeSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data){
			pxTtreeLeftdReal(data);

		}
	});

}

//16.newpx页面Ttree
function geNewpxTtree(){

	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"roots","",true);
	$.ajax({
		type:'post',
		url:'/EasyEnergy/NewPxTreeSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data){
			pxTtreeBuildEnvi(data);	

		}
	});

}


//设置json
function setJson(jsonStr, name, value, array)
{
	if(!jsonStr)jsonStr="{}";
	var jsonObj = JSON.parse(jsonStr);
	if (array) {
		jsonObj[name] = eval("["+value+"]");
	}
	else {
		jsonObj[name] = value;
	}
	return JSON.stringify(jsonObj) ;
}

//String转JSON
function strToJson(str){
	var json = eval('(' + str + ')');
	return json;
}
