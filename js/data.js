$(function(){
	//getInfos(1);
});

function alarmInfos(){
	getAlarmType();
}

function getInfos(index){
	switch(index)
	{
		case 1:
			getAlarmType();/*报警类型查询*/
			break;
		case 2:
			getAlarmCount();/*报警个数查询*/
			break;
		case 3:
			AlarmExcelExport();/*导出报警Excel*/
			break;
		case 4:
			getAlarmInfos();/*报警信息查询*/
			break;
		case 5:
			getdefaultAlarmRealInfos();/*默认实时报警查询*/
			break;
		case 6:
			getAlarmRealInfos();/*实时报警条件查询*/
			break;
		case 7:
			getAlarmRealDetail();/*实时报警详情查询*/
			break;
		case 8:
			getAlarmResp();	/*报警响应*/
			break;
		case 9:
			getTreeInfos();	/*能耗tree查询*/
			break;
		case 10:
			getEnergy();/*能耗查询*/
			break;
		case 11:
			HistoryExcelExport();/*历史导出Excel*/
			break;
		case 12:
			getUserInfos();/*用户查询*/
			break;
		case 13:
			addUser();/*添加用户*/
			break;
		case 14:
			delUser();/*删除用户*/
			break;
		case 15:
			editUser();/*修改用户*/
			break;
		default:
			alert("未知错误!");
	}

}
//点击报警中心
$(".alarmCenter").on('click',function(){
	choeceAlarmreal();
})
//点击权限管理
$(".privilege").on('click',function(){
	getInfos(12);
});

//电表分项统计
$("#subentry_elect").on('click',function(){
	getTreeInfos(1);
});
//水表分项统计
$("#subentry_water").on('click',function(){
	getTreeInfos(2);
});
//电表分级统计
$("#grade_elect").on('click',function(){
	getTreeInfos(3);
});
//电表分级统计
$("#grade_water").on('click',function(){
	getTreeInfos(4);
});


//点击实时报警
$("#choice_alarm_real").on('click',function(){
	choeceAlarmreal();
});
//点击报警历史
$("#choice_alarm_his").on('click',function(){
	choeceAlarmrhis();
});




//普通方法无参请求参数处理
function getEmptyPara(){
	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	return jsonData;
}

//选择实时报警
function choeceAlarmreal(){
	getInfos(5);
	$.ajax({
		type:'post',
		url:'/EasyEnergy/AlarmClassSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:getEmptyPara(),
		success:function(data){
			var data=strToJson(data);
			$("#alarmtype_real_nav").empty();
			for(i=0;i<data.items.length;i++){
				$("#alarmtype_real_nav").append("<li><a>"+data.items[i].name+"</a></li>");
			}
			selectChoice(".alert_classify-menu",".alert_classify");
		}
	});
}


//选择历史报警
function choeceAlarmrhis(){
	var date = new Date();
	var myear=date.getFullYear();
	var mmonth = date.getMonth() + 1;
	var mdate = date.getDate();
	$("#alarmtime_start").val(myear+"-"+mmonth+"-01");
	$("#alarmtime_end").val(myear+"-"+mmonth+"-"+mdate);
	//报警信息查询
	getInfos(4);
	$.ajax({
		type:'post',
		url:'/EasyEnergy/AlarmClassSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:getEmptyPara(),
		success:function(data){
			var data=strToJson(data);
			$("#alarmtype_his_nav").empty();
			for(i=0;i<data.items.length;i++){
				$("#alarmtype_his_nav").append("<li><a>"+data.items[i].name+"</a></li>");
			}
			selectChoice(".alert_classify-menu",".alert_classify");
		}
	});
}






//1.查询所有报警类型
function getAlarmType(){

	$.ajax({
		type:'post',
		url:'/EasyEnergy/AlarmClassSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:getEmptyPara(),
		success:function(data){
			var data=strToJson(data);
			$("#alarmtype_real_nav").empty();
			$("#alarmtype_his_nav").empty();
			for(i=0;i<data.items.length;i++){
				$("#alarmtype_real_nav").append("<li><a>"+data.items[i].name+"</a></li>");
				$("#alarmtype_his_nav").append("<li><a>"+data.items[i].name+"</a></li>");

			}
		}
	});

}
//2.查询报警个数
function getAlarmCount(){
	alert("报警个数查询");
	$.ajax({
		type:'post',
		url:'/EasyEnergy/AlarmNumSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:getEmptyPara(),
		success:function(data){
			alert(data);

		}
	});

}

//报警信息参数处理
function getAlarmInfosPara(){
	var alarmClass = new Array();
	alarmClass[0]=$("#alarmtype_his span:first-child").text();


	var begintime=$("#alarmtime_start").val()+" "+"00:00:00";
	var endTime=$("#alarmtime_end").val()+" "+"23:59:59";


	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"alarmClass",alarmClass);
	jsonData = setJson(jsonData,"beginTime",begintime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"ackState","");
	jsonData = setJson(jsonData,"sourceState","");

	return jsonData;
}

//3.报警信息导出Excel
function AlarmExcelExport(){
	$.ajax({
		type:'post',
		url:'/EasyEnergy/HistoryAlarmExportCmd',
		contentType:"application/text,charset=utf-8",
		data:getAlarmInfosPara(),
		success:function(data){
			var data=strToJson(data);
			if(data.responseCommand=='OK'){
				$(".alarm_export_ul").empty().append("<li class='export_xsl_name'>"+data.requestCommand.substring(11)+"</li><li class='export_status_success'>导出成功</li>");
			}else{
				$(".alarm_export_ul").empty().append("<li class='export_status_error'>导出Excel失败</li>");
			}
			alarmExport();
		}
	});

}




//4.查询报警信息
function getAlarmInfos(){
	var starttime=$("#alarmtime_start").val();
	var endtime=$("#alarmtime_end").val();

	$.ajax({
		type:'post',
		url:'/EasyEnergy/HistoryAlarmSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:getAlarmInfosPara(),
		success:function(data){
			var data=strToJson(data);
			$("#alarmtable_his").empty().append("<thead>"
					+"<tr><th class='rolTh' colspan='10'>"+starttime+"~"+endtime+"集团报警历史</th></tr>"
				+"<tr class='text-center'>"
				+"<th><input type='checkbox'/>选择</th>"
				+"<th>报警源</th>"
				+"<th>报警分类</th>"
				+"<th>报警时间</th>"
				+"<th>报警信息</th>"
				+"<th>报警源状态</th>"
				+"<th>响应个数</th>"
				+"<th>未响应个数</th>"
				+"<th>响应时间</th>"
				+"<th>响应状态</th>"
				+"</tr></thead><tbody>");
			if(data.items!=undefined){
			for(i=0;i<data.items.length;i++){
				$("#alarmtable_his").append("<tr>"
					+"<td><input type='checkbox'/></td>"
					+"<td>"+data.items[i].source+"</td>"
					+"<td>"+data.items[i].alarmClass+"</td>"
					+"<td>"+data.items[i].timestamp+"</td>"
					+"<td>"+data.items[i].msgText+"</td>"
					+"<td>"+data.items[i].sourceState+"</td>"
					+"<td>"+data.items[i].ackNum+"</td>"
					+"<td>"+data.items[i].unAckNum+"</td>"
					+"<td>"+data.items[i].ackTime+"</td>"
					+"<td>"+data.items[i].ackState+"</td>"
					+"</tr>");
				}
			}else{
				$("#alarmtable_his").append("<tr>"
					+"<td></td>"
					+"<td></td>"
					+"<td></td>"
					+"<td></td>"
					+"<td></td>"
					+"<td></td>"
					+"<td></td>"
					+"<td></td>"
					+"<td></td>"
					+"<td></td>"
					+"</tr>");

			}
			$("#alarmtable").append("</tbody>");

		}
	});

}

//5.1默认实时报警参数处理
function getdefaultAlarmRealPara(){
	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"alarmClass",["电表","水表"]
	);
	return jsonData;
}

//实时报警渲染table
function realDataToTable(data){
	var data=strToJson(data);
	$("#alarmtable_real").empty().append("<thead><tr class='text-center'>"
		+"<th><input type='checkbox'/>选择</th>"
		+"<th>报警源</th>"
		+"<th>报警分类</th>"
		+"<th>报警时间</th>"
		+"<th>报警信息</th>"
		+"<th>报警源状态</th>"
		+"<th>响应个数</th>"
		+"<th>未响应个数</th>"
		+"<th>响应时间</th>"
		+"<th>响应状态</th>"
		+"<th>操作</th>"
		+"</tr></thead><tbody>");
	if(data.items!=undefined){
		for(i=0;i<data.items.length;i++){
			console.log(data.items[i].ord+"------------");
			$("#alarmtable_real").append("<tr>"
				+"<td><input type='checkbox'/></td>"
				+"<td>"+data.items[i].source+"</td>"
				+"<td>"+data.items[i].alarmClass+"</td>"
				+"<td>"+data.items[i].timestamp+"</td>"
				+"<td>"+data.items[i].msgText+"</td>"
				+"<td>"+data.items[i].sourceState+"</td>"
				+"<td>"+data.items[i].ackNum+"</td>"
				+"<td>"+data.items[i].unAckNum+"</td>"
				+"<td>"+data.items[i].ackTime+"</td>"
				+"<td>"+data.items[i].ackState+"</td>"
				+"<td><button class='btn_details' onclick=realarmdetai('"+data.items[i].ord+"');><span class='glyphicon glyphicon-list-alt'></span><span class='tabPic btn_name'>详情</span></button></td>"
				+"</tr>");
		}
	}else{
		$("#alarmtable_real").append("<tr>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"</tr>");

	}
	$("#alarmtable_real").append("</tbody>");
}

//5.2默认实时报警查询
function getdefaultAlarmRealInfos(){
	$.ajax({
		type:'post',
		url:'/EasyEnergy/RealAlarmSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:getdefaultAlarmRealPara(),
		success:function(data){
			realDataToTable(data);

		}
	});

}





//6.1条件实时报警参数处理
function getAlarmRealPara(){
	var alarmClass = new Array();
	alarmClass[0]=$("#alarmtype_real span:first-child").text();

	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"alarmClass",alarmClass);
	return jsonData;
}
//6.2条件实时条件查询
function getAlarmRealInfos(){
	$.ajax({
		type:'post',
		url:'/EasyEnergy/RealAlarmSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:getAlarmRealPara(),
		success:function(data){
			realDataToTable(data);

		}
	});

}


//报警详情渲染table
function alarmDetaitotable(data){
	var data=strToJson(data);
	$("#alarmtable_realdetai").empty().append("<thead><tr class='text-center'>"
		+"<th>报警源</th>"
		+"<th>报警分类</th>"
		+"<th>报警时间</th>"
		+"<th>报警信息</th>"
		+"<th>报警源状态</th>"
		+"<th>响应个数</th>"
		+"<th>未响应个数</th>"
		+"<th>响应时间</th>"
		+"<th>响应状态</th>"
		+"</tr></thead><tbody>");
	if(data.items!=undefined){
		for(i=0;i<data.items.length;i++){
			console.log(data.items[i].ord+"------------");
			$("#alarmtable_realdetai").append("<tr>"
				+"<td>"+data.items[i].source+"</td>"
				+"<td>"+data.items[i].alarmClass+"</td>"
				+"<td>"+data.items[i].timestamp+"</td>"
				+"<td>"+data.items[i].msgText+"</td>"
				+"<td>"+data.items[i].sourceState+"</td>"
				+"<td>"+data.items[i].ackNum+"</td>"
				+"<td>"+data.items[i].unAckNum+"</td>"
				+"<td>"+data.items[i].ackTime+"</td>"
				+"<td>"+data.items[i].ackState+"</td>"
				+"</tr>");
		}
	}else{
		$("#alarmtable_realdetai").append("<tr>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"<td></td>"
			+"</tr>");

	}
	$("#alarmtable_realdetai").append("</tbody>");
}

//7.实时报警详情查询
function realarmdetai(ord){
	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"ord",ord);
	$.ajax({
		type:'post',
		url:'/EasyEnergy/RealAlarmDetailSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data){
			alarmDetaitotable(data);
			realAlarmDetailLayer();
		}
	});
}



//8.报警响应
function getAlarmRespPara(){
	var jsonData = setJson(null,"requestCommand","all");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"ords",[""]);
	jsonData = setJson(jsonData,"uuids",[""]);
	return jsonData;
}
function getAlarmResp(){
	console.log(getAlarmRespPara());
	alert("报警响应");
	$.ajax({
		type:'post',
		url:'/EasyEnergy/AlarmAckCmd',
		contentType:"application/text,charset=utf-8",
		data:getAlarmRespPara(),
		success:function(data){
			alert(data);

		}
	});

}


//渲染电表分项建筑
function datatobuild1(data,index){
	var data=strToJson(data);
	$(".build_subentry_elect").empty();
	datatobuild11(JSON.stringify(data.roots[index].items[0].items[0]));
	for(i=0;i<data.roots[index].items[0].items.length;i++){
		if(i==0){
			$(".build_subentry_elect").append("<li onclick=datatobuild11('"+JSON.stringify(data.roots[index].items[0].items[i])+"'); class='selected'>"+data.roots[index].items[0].items[i].name+"</li>");
		}else{
			$(".build_subentry_elect").append("<li onclick=datatobuild11('"+JSON.stringify(data.roots[index].items[0].items[i])+"');>"+data.roots[index].items[0].items[i].name+"</li>");
		}
	}
}

//电表分项建筑选中样式
$(function (){
	$(".build_subentry_elect li").click(function(){
		$(".build_subentry_elect li.selected").removeClass("selected");
		$(this).addClass("selected");
	});
});



function datatobuild11(data){
	var data=strToJson(data);
	$(".type_subentry_elect").empty();
	datatobuild12(JSON.stringify(data.items[0]));
	for(i=0;i<data.items.length;i++){
		$(".type_subentry_elect").append("<li onclick=datatobuild12('"+JSON.stringify(data.items[i])+"');>"+data.items[i].name+"</li>");
	}
}


//能耗分类选中样式
$(function (){
	$(".type_subentry_elect li").click(function(){
		$(".type_subentry_elect li.selected").removeClass("selected");
		$(this).addClass("selected");
	});
});



function datatobuild12(data){
	var data=strToJson(data);
	$(".area_subentry_elect").empty();
	datatobuild13(JSON.stringify(data.items[0]));
	for(i=0;i<data.items.length;i++){
		$(".area_subentry_elect").append("<li onclick=datatobuild13('"+JSON.stringify(data.items[i])+"');>"+data.items[i].name+"</li>");
	}
}
//能耗分区选中样式
$(function (){
	$(".area_subentry_elect li").click(function(){
		$(".area_subentry_elect li.selected").removeClass("selected");
		$(this).addClass("selected");
	});
});

function datatobuild13(data){
	var data=strToJson(data);
	$(".floor_subentry_elect").empty();
	for(i=0;i<data.items.length;i++){
		$(".floor_subentry_elect").append("<li onclick=datatobuild14('"+JSON.stringify(data.items[i])+"');>"+data.items[i].name+"</li>");
	}
}

function datatobuild14(data){
	alert(data);
}

//能耗分层选中样式
$(function (){
	$(".floor_subentry_elect li").click(function(){
		$(".floor_subentry_elect li.selected").removeClass("selected");
		$(this).addClass("selected");
	});
});

function datatobuild14(data){
	var data=strToJson(data);
	$("#area_subentry_elect").empty();
	for(i=0;i<data.items.length;i++){
		$("#area_subentry_elect").append("<p>"+data.items[i].name+"</p><ul class='floor_choice' >");
		for(j=0;j<data.items[i].items.length;j++) {
			$("#area_subentry_elect").append("<p>" + data.items[i].items[j].name + "</p><ul class='floor_choice' >");
		}

			$("#area_subentry_elect").append("</ul>");
	}
}


//渲染水表分项建筑
function datatobuild2(data){
	var data=strToJson(data);
	$("#build_subentry_water").empty();
	for(i=0;i<data.roots[0].items[0].items.length;i++){
		$("#build_subentry_water").append("<li>"+data.roots[1].items[0].items[0].name+"</li>");
	}
}
//渲染电表分级建筑
function datatobuild3(data){
	var data=strToJson(data);
	$("#build_grade_elect").empty();
	for(i=0;i<data.roots[4].items[0].items.length;i++){
		$("#build_subentry_elect").append("<li>"+data.roots[0].items[0].items[0].name+"</li>");
	}
}
//渲染水表分级建筑
function datatobuild4(data){
	var data=strToJson(data);
	$("#build_grade_water").empty();
	for(i=0;i<data.roots[5].items[0].items.length;i++){
		$("#build_subentry_elect").append("<li>"+data.roots[0].items[0].items[0].name+"</li>");
	}
}

//9.能耗查询tree查询
function getTreeInfosPara(){
	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"roots","",true);
	return jsonData;
}
function getTreeInfos(index){

	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergyTreeSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:getTreeInfosPara(),
		success:function(data){
			switch(index)
			{
				case 1:
					datatobuild1(data,0);
					break;
				case 2:
					datatobuild1(data,1);
					break;
				case 3:
					datatobuild3(data);
					break;
				case 4:
					datatobuild4(data);
					break;
				default:
					alert("未知错误!");
			}
		}
	});

}



//10.能耗查询
function getEnergyPara(){
	var jsonData = setJson(null,"requestCommand","Sum");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime","2017-07-01 00:00:00");
	jsonData = setJson(jsonData,"endTime","2017-07-10 11:17:04");
	jsonData = setJson(jsonData,"interval","day");
	jsonData = setJson(jsonData,"items",[
		{"ord": "station:|h:1c8","name": "设备1"},
		{"ord": "station:|h:1c9","name": "设备2"}
		]);

	return jsonData;
}
function getEnergy(){
	alert("能耗查询");
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:getEnergyPara(),
		success:function(data){
			alert(data);


		}
	});

}
//11.历史导出Excel
function getHistoryExportPara(){
	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"covItems",[]);
	jsonData = setJson(jsonData,"interval",-1);
	jsonData = setJson(jsonData,"beginTime","2017-07-01 00:00:00");
	jsonData = setJson(jsonData,"endTime","2017-07-13 10:35:50");
	jsonData = setJson(jsonData,"intervalItems",[{
			"pairs": [],
			"name": "HistoryItem",
			"ord": "/easydevice/dev1"
			}]
	);
	return jsonData;
}
function HistoryExcelExport(){
	alert("历史导出Excel");
	$.ajax({
		type:'post',
		url:'/EasyEnergy/HistoryDataExportCmd',
		contentType:"application/text,charset=utf-8",
		data:getHistoryExportPara(),
		success:function(data){
			alert(data);


		}
	});

}


//


//12.查询用户
function getUserInfos(){
	$.ajax({
	type:'post',
	url:'/EasyEnergy/UserSearchCmd',
	contentType:"application/text,charset=utf-8",
	data:getEmptyPara(),
	success:function(data){
		var data=strToJson(data);
		$("#privilege_table").empty().append("<thead><tr class='text-center'>"
			+"<th>电话</th>"
			+"<th>邮箱</th>"
			+"<th>用户名</th>"
			+"<th>用户角色</th>"
			+"<th colspan='2'>操作</th>"
			+"</tr></thead><tbody>");
		if(data.items!=undefined){
			for(i=0;i<data.items.length;i++){
				$("#privilege_table").append("<tr>"
					+"<td>"+data.items[i].phone+"</td>"
					+"<td>"+data.items[i].email+"</td>"
					+"<td>"+data.items[i].name+"</td>"
					+"<td>"+data.items[i].role+"</td>"
					+"<td class='td-edit'><button class='btn_edit modify' onclick=useredit('"+data.items[i]+"')><span class='tabPic btn_name'>修改</span></button></td>"
					+"<td class='td_del'><button class='btn_del delete btn_del_layer' onclick=deluser('"+data.items[i]+"')><span class='tabPic btn_name'>删除</span></button></td>"
					+"</tr>");
			}
		}else{
			$("#privilege_table").append("<tr>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"<td></td>"
				+"</tr>");

		}
		$("#privilege_table").append("</tbody>");

	}
	});

}


//13.新增用户
function addUserPara(){
	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"items",[{
		"name": "ligao",
		"password": "admin12345",
		"role": "yonghu",
		"email":"123456@qq.com",
		"phone": "13513513513" ,
	}]);

	return jsonData;
}

function addUser(){
	alert("新增用户");
	$.ajax({
		type:'post',
		url:'/EasyEnergy/UserAddCmd',
		contentType:"application/text,charset=utf-8",
		data:addUserPara(),
		success:function(data){
			alert(data);

		}
	});

}

//14.删除用户
function delUserPara(){
	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"items",[{
		"name": "ligao",
		"password": "admin12345",
		"role": "yonghu",
		"email":"123456@qq.com",
		"phone": "13513513513" ,
	}]);

	return jsonData;
}

function delUser(){
	alert("删除用户");
	$.ajax({
		type:'post',
		url:'/EasyEnergy/UserDeleteCmd',
		contentType:"application/text,charset=utf-8",
		data:delUserPara(),
		success:function(data){
			alert(data);

		}
	});

}

//15.修改用户
function editUserPara(){
	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"items",[{
		"name": "ligao",
		"password": "admin12345",
		"role": "yonghu",
		"email":"123456@qq.com",
		"phone": "13513513513" ,
	}]);

	return jsonData;
}

function editUser(){
	alert("修改用户");
	$.ajax({
		type:'post',
		url:'/EasyEnergy/UserEditCmd',
		contentType:"application/text,charset=utf-8",
		data:editUserPara(),
		success:function(data){
			alert(data);

		}
	});

}




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


//报警信息导出Excel
function alarmExport(){
	layer.open({
		type: 1,
		title: '导出Excel',
		area: ['27rem', '14.6rem'], //宽高
		content:$("#alarm_export"),
	});
}


//实时报警详情
function realAlarmDetailLayer(){
	layer.open({
		type: 1,
		title: '实时报警详情',
		area: ['40rem', '36rem'], //宽高
		content:$("#realarmdetai"),
	});
}