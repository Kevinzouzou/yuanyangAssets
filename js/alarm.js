$(function (){
	getAlarmCount();
});



//点击报警中心
$(".alarmCenter").on('click',function(){
	choeceAlarmreal();
	getAlarmCount();
})
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
	getdefaultAlarmRealInfos();/*默认实时报警查询*/
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
	getAlarmInfos();/*报警信息查询*/
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
	$.ajax({
		type:'post',
		url:'/EasyEnergy/AlarmNumSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:getEmptyPara(),
		success:function(data){
			//console.log(data);
			var data=strToJson(data);
			$("#notice").text(data.num-497);
			$("#notice").css("display","block");
			//alert("报警个数:"+data.num);

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
					var sourceState = data.items[i].sourceState=="normal"?"正常":data.items[i].sourceState;
					var ackState= data.items[i].ackState=="unacked"?"未响应":data.items[i].ackState;
					$("#alarmtable_his").append("<tr>"
						+"<td><input type='checkbox'/></td>"
						+"<td>"+data.items[i].source+"</td>"
						+"<td>"+data.items[i].alarmClass+"</td>"
						+"<td>"+data.items[i].timestamp+"</td>"
						+"<td>"+data.items[i].msgText+"</td>"
						+"<td>"+sourceState+"</td>"
						+"<td>"+data.items[i].ackNum+"</td>"
						+"<td>"+data.items[i].unAckNum+"</td>"
						+"<td>"+data.items[i].ackTime+"</td>"
						+"<td>"+ackState+"</td>"
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
			tableForPages("#tab_alarm_history",6);
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
		var msgText="";
		for(i=0;i<data.items.length;i++){
			console.log(data.items[i].ord+"------------");
			msgText = data.items[i].msgText=="电能用量超过阀值50"?"负载超过门阀值":data.items[i].msgText;
			msgText = data.items[i].msgText=="水能用量恢复异常"?"用水量异常":data.items[i].msgText;
			var sourceState = data.items[i].sourceState=="normal"?"正常":"<font style='color:red;'>报警</font>";
			$("#alarmtable_real").append("<tr>"
				+"<td><input type='checkbox'/></td>"
				+"<td>"+data.items[i].source+"</td>"
				+"<td>"+data.items[i].alarmClass+"</td>"
				+"<td>"+data.items[i].timestamp+"</td>"
				+"<td>"+msgText+"</td>"
				+"<td>"+sourceState+"</td>"
				+"<td>"+data.items[i].ackNum+"</td>"
				+"<td>"+data.items[i].unAckNum+"</td>"
				+"<td></td>"
				+"<td>未响应</td>"
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
	tableForPages("#tab_alarm_overview",6);

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
		var msgText="";
		for(i=0;i<data.items.length;i++){

			msgText = data.items[i].msgText=="电能用量超过阀值50"?"负载超过门阀值":data.items[i].msgText;
			msgText = data.items[i].msgText=="水能用量恢复异常"?"用水量异常":data.items[i].msgText;

			console.log(data.items[i].ord+"------------");
			$("#alarmtable_realdetai").append("<tr>"
				+"<td>"+data.items[i].source+"</td>"
				+"<td>"+data.items[i].alarmClass+"</td>"
				+"<td>"+data.items[i].timestamp+"</td>"
				+"<td>"+msgText+"</td>"
				+"<td>正常</td>"
				+"<td>"+data.items[i].ackNum+"</td>"
				+"<td>"+data.items[i].unAckNum+"</td>"
				+"<td></td>"
				+"<td>未响应</td>"
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
			tableForPages("#realarmdetai",6);
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
		area: ['50rem', '30rem'], //宽高
		content:$("#realarmdetai"),
	});
}



/*****************************************************************************************/
//点击权限管理历史
$(".privilege").on('click',function(){
	getUserInfos();
});

//权限管理
//查询用户
function getUserInfos(){
	$.ajax({
		type:'post',
		url:'/EasyEnergy/UserTemplateSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:getEmptyPara(),
		success:function(data){
			console.log(data);
			var data=strToJson(data);
			$("#privilege_table").empty().append("<thead><tr class='text-center'>"
				+"<th>电话</th>"
				+"<th>邮箱</th>"
				+"<th>用户名</th>"
				+"<th>用户权限</th>"
				+"<th colspan='2'>操作</th>"
				+"</tr></thead><tbody>");
			if(data.items!=undefined){
				for(i=0;i<data.items.length;i++){
					$("#privilege_table").append("<tr>"
						+"<td>13530686830</td>"
						+"<td>1291908217@qq.com</td>"
						+"<td>"+data.items[i].name+"</td>"
						+"<td>游客</td>"
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
	tableForPages("#tab_user_management",6);

}

$(".privi_add_form li .btn_sure").on('click',function(){
	addUser();
	layer.closeAll();
});
$(".privi_add_form li .btn_reset").on('click',function(){

	layer.closeAll();

});

//13.新增用户
function addUser(){
	var name=$(".privi_add_form .name").val();
	var pass=$(".privi_add_form .pass").val();
	var role=$(".privi_add_form .role").val();
	var email=$(".privi_add_form .email").val();
	var phone=$(".privi_add_form .phone").val();
	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"items",[{
		"name": name,
		"password": pass,
		"role": role,
		"email":email,
		"phone":phone,
	}]);
	console.log(jsonData);
	$.ajax({
		type:'post',
		url:'/EasyEnergy/UserAddCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
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