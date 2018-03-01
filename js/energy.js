//调用时间控件
$(function(){
	nowTimeIni();

});
//初始化时间控件
function nowTimeIni(){
	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	var date = twomonthview(ndate.getDate());
	$(".calendarStart").val(year+"-"+month+"-"+date);
	$(".calendarEnd").val(year+"-"+month+"-"+date);
	$(".year-month").val(year+"-"+month);
}
//起始时间为当年当月1号
function nowMonthOne(){
	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	$(".calendarStart").val(year+"-"+month+"-01");
	
}

//以两位数表示月份
function twomonthview(month){
	if(month<10){
		month='0'+month;
	}else{
		month=month;
	}
	return month;
}

//String转JSON
function strToJson(str){
	var json = eval('(' + str + ')');
	return json;
}

//js求两个字符串时间相差的天数
function getsubday(startStr,endStr){
	var sta_date = new Date(startStr);
	var end_date = new Date(endStr);
	var date=end_date.getTime()-sta_date.getTime()  //时间差的毫秒数
	var days=Math.floor(date/(24*3600*1000));
	return days;

}

//js根据年月判断当月天数
function getdaysInmonth(year,month){ 
	month = parseInt(month,10); //parseInt(number,type)这个函数后面如果不跟第2个参数来表示进制的话，默认是10进制。 
	var temp = new Date(year,month,0); 
	return temp.getDate(); 
}

//将yyyy-mm-dd hh:mm:ss转成数字
function strtimetomath(str){
	//例如：2017-08-01 00:00:00
	var year=str.substring(0,4);
	var month=str.substring(5,7);
	var day=str.substring(8,10);
	var hour=str.substring(11,13);
	var minute=str.substring(14,16);
	var second=str.substring(17,19);
	var math=year+month+day+hour+minute+second;
	return math;
}

//将数字转成yyyy-mm-dd hh:mm:ss
function mathtostrtime(math){
	//例如：20170801000000
	var year=math.substring(0,4);
	var month=math.substring(4,6);
	var day=math.substring(6,8);
	var hour=math.substring(8,10);
	var minute=math.substring(10,12);
	var second=math.substring(12,14);
	var str=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
	return str;
}

//根据年月日字符串得到星期
function getRestweek(date){
	mdate = new Date(date);
	if((mdate.getDay()==0)||(mdate.getDay()==6)){ 
		var restweek="休息日"
	}else{ 
		var restweek="工作日"
	}
	return restweek;
	
}
//能耗报表导出Excel
function excelExport(id,name){
	layer.open({
		type: 1,
		title: name,
		area: ['27rem', '14.6rem'], //宽高
		content:$(id+" .energy_export"),
	});
}


/**************************************************************************************************************/

/**************************************************************************************************************/

/*点击能耗信息*/
$(".energyInfo").click(function(){
	$("#tab_energy_statistic .viewdown a span:first-child").html("表格");
	energystatis();
	nowTimeIni();//初始化时间
});

/*点击能耗统计*/
$("#energyInfo").click(function(){
	$("#tab_energy_statistic .viewdown a span:first-child").html("表格");
	energystatis();
	nowTimeIni();//初始化时间
});

//能耗统计查询
function energystatis(){
	
	getEnergyTree("#tab_energy_statistic",2);
}

//能耗统计调用接口
function getenergystatis(id,data){
	//获取当前时间
	var ndate = new Date();
	//获取当前年份
	var year=ndate.getFullYear();
	//获取当前月
	var month = twomonthview(ndate.getMonth() + 1);
	//获取当前日
	var date = twomonthview(ndate.getDate());
	//获取当前时
	var hour = twomonthview(ndate.getHours());
	//获取当前分
	var minutes = twomonthview(ndate.getMinutes());
	//获取当前秒
	var second = twomonthview(ndate.getSeconds());
	//当前年月日
	var nowdate=year+"-"+month+"-"+date;

	//获取时间控件得到的时间
	var sta_time=$(id+" .calendarStart").val();
	var end_time=$(id+" .calendarEnd").val()

	//给起始时间拼上时、分、秒
	var beginTime=sta_time+" 00:00:00";
	//判断结束时间，若是等于当前时间，则拼上当前时间的时分秒，若不是当前时间，则拼上23点59分59秒
	if(end_time==nowdate){
		var endTime=end_time+" "+hour+":"+minutes+":"+second;
	}else{
		var endTime=end_time+" 23:59:59";
	}

	
	//计算开始时间和结束时间的差，若差值等于0,将hour传给interval，
	// 若差值大于0且小于等于30，将day传给interval，
	//若差值大于30且小于等于200，将week传给interval，
	//若差值大于200且小于等于900，将month传给interval，
	//若差值大于900，将year传给interval，
	//若差值不满足以上条件，将day传给interval
	var subDays=getsubday(sta_time,end_time);
	if(subDays==0){
		var timeinter="hour";
	}else if((subDays>0)&&(subDays<=30)){
		var timeinter="day";
	}else if((subDays>30)&&(subDays<=200)){
		var timeinter="week";
	}else if((subDays>200)&&(subDays<=900)){
		var timeinter="month";
	}else if(subDays>900){
		var timeinter="year";
	}else{
		var timeinter="day";
	}
	
	//获取能耗类型字符串
	var ntype=$(id+" .itemsdown a span:first-child").html();
	//alert(ntype+"-------");
	if(ntype=="电能"){
		var typeindex=0;
	}else if(ntype=="水能"){
		var typeindex=3;
	}else if(ntype=="冷热量"){
		var typeindex=6;
	}else if(ntype=="燃气用量"){
		var typeindex=7;
	}
	//alert(typeindex+"*******************");
	
	var items=[];
	
	var data = strToJson(data);
	
	var itemslen=data.roots[typeindex].items[0].items;

	//alert(itemslen.length+"---------");
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
		
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Sum");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval",timeinter);
	
	jsonData = setJson(jsonData,"items",items);
	
	//打印传入的参数
	console.log(jsonData+"--------");
	//请求接口
	var view=$(id+" .viewdown a span:first-child").html();
	
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			//打印接口查询到的结果
			console.log(data);
			statisticsdownexcel(id,jsonData);
			switch(view)
			{
				case "表格":
					statisticstable(id,data,timeinter,ntype); //表格
					break;
				case "曲线图":
					statCurvescharts(id,data,timeinter,ntype);//曲线图
					break;
				case "柱状图":
					statColumnscharts(id,data,timeinter,ntype);//柱状图
					break;
				default:
					alert("能耗排名错误");
			}
			
		}
	});

	
}

//能耗统计表格渲染
function statisticstable(id,data,timeinter,ntype) {
	
	$(id+" .energy_type_name").html(ntype);
	$(id+" .charts").empty();
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	var data = strToJson(data);
	var html = "";
	var count = 0;
	html = "<thead><tr class='text-center'><th>建筑</th>";
	if(timeinter=="day"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(8)+ "</th>";
		}
	}else if(timeinter=="hour"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(10,15)+ "</th>";
		}
	}else if(timeinter=="week"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(5,10)+ "</th>";
		}
	}else if(timeinter=="month"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" +data.items[i].timestamp+ "</th>";
		}
	}else{
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" +data.items[i].timestamp+ "</th>";
		}
	}
	
	html += "</tr></thead><tbody>";
	for (j = 0; j < data.items[0].pairs.length; j++) {
	html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
	for (i = 0; i < data.items.length; i++) {
		html += "<td>" + data.items[i].pairs[j].value+ "</td>";

	}
	
	html+="</tr>";
	}
	
	html+="</tbody>";
	$(id+" table").html(html);

}

//能耗统计曲线图
function statCurvescharts(id,data,timeinter,ntype){
	
	$(id+".charts").empty();
	$(id+" table").empty();

	var title = {
		text: ''
	};

	var xAxis = {
		categories: []
	};
	var yAxis = {
		title: {
			text: '能耗'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};
	var tooltip={
		valueSuffix: 'kwh'
	};
	var series =  [
      {
         name: '',
         data: []
      }, 
      {
         name: '',
         data: []
      },
      {
         name: '',
         data: []
      },
      {
		 name: '',
         data: []
      },
      {
         name: '',
         data: []
      },
      {
         name: '',
         data: []
      },
      {
         name: '',
         data: []
      }
   ];

	var json = {};
	var data = strToJson(data);
	
	title.text=ntype+"统计";
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
		tooltip.valueSuffix="kwh";
		yAxis.title.text="电能(kwh)";
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
		yAxis.title.text="水能(m3)";
		tooltip.valueSuffix="m3";
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
		tooltip.valueSuffix="GJ";
		yAxis.title.text="冷热量(GJ)";
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
		tooltip.valueSuffix="m3";
		yAxis.title.text="燃气用量(m3)";
	}
	

	if(timeinter=="day"){
		for (i = 0; i < data.items.length; i++) {
			xAxis.categories[i]=((data.items[i].timestamp).substring(8));
		}
	}else if(timeinter=="hour"){
		for (i = 0; i < data.items.length; i++) {
			xAxis.categories[i]=((data.items[i].timestamp).substring(10,15));
		}
	}else if(timeinter=="week"){
		for (i = 0; i < data.items.length; i++) {
			xAxis.categories[i]=((data.items[i].timestamp).substring(5,10));
		}
	}else if(timeinter=="month"){
		for (i = 0; i < data.items.length; i++) {
			xAxis.categories[i]=(data.items[i].timestamp);
		}
	}else{
		for (i = 0; i < data.items.length; i++) {
			xAxis.categories[i]=(data.items[i].timestamp);
		}
	}
	
	

	for (j = 0; j < data.items[0].pairs.length; j++) {
		series[j].name=data.items[0].pairs[j].name;
		for (i = 0; i < data.items.length; i++) {
			series[j].data[i] =Number(data.items[i].pairs[j].value);
		}
	}



	json.title = title;
	json.xAxis=xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series =series;
	$(id+' .charts').highcharts(json);
}


//能耗统计柱状图
function statColumnscharts(id,data,timeinter,ntype){
	
	$(id+" .charts").empty();
	$(id+" table").empty();

	var chart={
		type:'column'
	};
	var title={
		text: '总能耗统计'
	};
	var xAxis={
		categories: []
	};
	var yAxis={
		min: 0,
		title: {
			text: '总能耗'
		}
	};
	var tooltip= {
		valueSuffix:"kwh",
		pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
		shared: true
	};
	var plotOptions={
		column: {
			stacking: 'percent'
		}
	};
	var series =  [
      {
         name: '',
         data: []
      }, 
      {
         name: '',
         data: []
      },
      {
         name: '',
         data: []
      },
      {
		 name: '',
         data: []
      },
      {
         name: '',
         data: []
      },
      {
         name: '',
         data: []
      },
      {
         name: '',
         data: []
      }
   ];

	var json = {};
	var data = strToJson(data);
	
	title.text=ntype+"统计";
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
		tooltip.valueSuffix="kwh";
		yAxis.title.text="电能(kwh)";
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
		yAxis.title.text="水能(m3)";
		tooltip.valueSuffix="m3";
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
		tooltip.valueSuffix="GJ";
		yAxis.title.text="冷热量(GJ)";
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
		tooltip.valueSuffix="m3";
		yAxis.title.text="燃气用量(m3)";
	}

	
	if(timeinter=="day"){
		for (i = 0; i < data.items.length; i++) {
			xAxis.categories[i]=((data.items[i].timestamp).substring(8));
		}
	}else if(timeinter=="hour"){
		for (i = 0; i < data.items.length; i++) {
			xAxis.categories[i]=((data.items[i].timestamp).substring(10,15));
		}
	}else if(timeinter=="week"){
		for (i = 0; i < data.items.length; i++) {
			xAxis.categories[i]=((data.items[i].timestamp).substring(5,10));
		}
	}else if(timeinter=="month"){
		for (i = 0; i < data.items.length; i++) {
			xAxis.categories[i]=(data.items[i].timestamp);
		}
	}else{
		for (i = 0; i < data.items.length; i++) {
			xAxis.categories[i]=(data.items[i].timestamp);
		}
	}
	
	

	for (j = 0; j < data.items[0].pairs.length; j++) {
		series[j].name=data.items[0].pairs[j].name;
		for (i = 0; i < data.items.length; i++) {
			series[j].data[i] =Number(data.items[i].pairs[j].value);
		}
	}
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.plotOptions = plotOptions;
	json.series = series;

	$(id+' .charts').highcharts(json);
}



//导出excel	
function statisticsdownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"能耗统计Excel");
			}
		});
	});
}

/*******************************************************************************************/





/*点击能耗分项，初始化能耗分项参数，调用能耗分项查询 */
$("#subentry_energy").on("click",function(){
	getEnergyTree("#tab_subentry",1);//动态渲染楼座和分区
	energysubentry();	//能耗分项查询
	nowTimeIni();//初始化时间
	
});

//能耗分项查询
function energysubentry(){
	getEnergyTree("#tab_subentry",3);
	
}

//能耗分项查询调用接口	
function getenergysubent(id,data){

	var typeindex=getTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	//alert(typeindex+"------"+buildindex+"------"+areaindex);
	
	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	var date = twomonthview(ndate.getDate());
	//当前时间的年月日
	var nowDate=year+"-"+month+"-"+date;

	//获取时间控件得到的时间
	var sta_time=$(id+" .calendarStart").val();
	var end_time=$(id+" .calendarEnd").val()

	//给起始时间拼上时、分、秒
	var beginTime=sta_time+" 00:00:00";
	//判断结束时间，若是等于当前时间，则拼上当前时间的时分秒，若不是当前时间，则拼上23点59分59秒
	if(end_time==nowDate){
		var endTime=end_time+" "+twomonthview(ndate.getHours())+":"+twomonthview(ndate.getMinutes())+":"+twomonthview(ndate.getSeconds());
	}else{
		var endTime=end_time+" 23:59:59";
	}
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	
	//计算开始时间和结束时间的差，若差值等于0,将hour传给interval，
	// 若差值大于0且小于等于30，将day传给interval，
	//若差值大于30且小于等于200，将week传给interval，
	//若差值大于200且小于等于900，将month传给interval，
	//若差值大于900，将year传给interval，
	//若差值不满足以上条件，将day传给interval
	var subDays=getsubday(sta_time,end_time);
	if(subDays==0){
		var interval="hour";
	}else if((subDays>0)&&(subDays<=30)){
		var interval="day";
	}else if((subDays>30)&&(subDays<=200)){
		var interval="week";
	}else if((subDays>200)&&(subDays<=900)){
		var interval="month";
	}else if(subDays>900){
		var interval="year";
	}else{
		var interval="day";
	}
	var timeinter=interval;
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Sum");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval",interval);
	
	var items=[];
	var data = strToJson(data);
	//alert(typeindex.type+"---"+typeindex.item+"---"+buildindex+"---"+areaindex);
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items;
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	//alert(JSON.stringify(items));
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			subentdownexcel(id,jsonData);
			energysubenttable(id,data,timeinter,ntype);
			
			
		}
	});
	
	
		
		
		
}

//能耗分项渲染表格
function energysubenttable(id,data,timeinter,ntype){
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	var data = strToJson(data);
	var html = "";
	var count = 0;
	html = "<thead><tr class='text-center'><th>楼层</th>";
	if(timeinter=="day"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(8)+ "</th>";
		}
	}else if(timeinter=="hour"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(10,15)+ "</th>";
		}
	}else if(timeinter=="week"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(5,10)+ "</th>";
		}
	}else if(timeinter=="month"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" +data.items[i].timestamp+ "</th>";
		}
	}else{
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" +data.items[i].timestamp+ "</th>";
		}
	}
	html += "</tr></thead><tbody>";
	for (j = 0; j < data.items[0].pairs.length; j++) {
	html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
	for (i = 0; i < data.items.length; i++) {
		html += "<td>" + data.items[i].pairs[j].value+ "</td>";

	}
	html+="</tr>";
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);	
}

//能耗分项导出excel
function subentdownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"能耗分项Excel");
			}
		});
	});	
}
/********************************************************************************/


/*点击能耗分级，初始化能耗分级参数，调用能耗分级查询*/
$("#grade_energy").on("click",function(){
	getEnergyGradeTree("#tab_grade",1);//动态渲染楼座和分区
	energygrade();	//能耗分级查询
	nowTimeIni();//初始化时间
});

//能耗分级查询
function energygrade(){
	getEnergyGradeTree("#tab_grade",2);
	
}

//能耗分级查询调用接口	
function getenergygrade(id,data){
	
	var typeindex=getgradeTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	//alert(typeindex+"------"+buildindex+"------"+areaindex);

	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	var date = twomonthview(ndate.getDate());
	//当前时间的年月日
	var nowDate=year+"-"+month+"-"+date;

	//获取时间控件得到的时间
	var sta_time=$(id+" .calendarStart").val();
	var end_time=$(id+" .calendarEnd").val()

	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	//给起始时间拼上时、分、秒
	var beginTime=sta_time+" 00:00:00";
	//判断结束时间，若是等于当前时间，则拼上当前时间的时分秒，若不是当前时间，则拼上23点59分59秒
	if(end_time==nowDate){
		var endTime=end_time+" "+twomonthview(ndate.getHours())+":"+twomonthview(ndate.getMinutes())+":"+twomonthview(ndate.getSeconds());
	}else{
		var endTime=end_time+" 23:59:59";
	}

	//计算开始时间和结束时间的差，若差值等于0,将hour传给interval，
	// 若差值大于0且小于等于30，将day传给interval，
	//若差值大于30且小于等于200，将week传给interval，
	//若差值大于200且小于等于900，将month传给interval，
	//若差值大于900，将year传给interval，
	//若差值不满足以上条件，将day传给interval
	var subDays=getsubday(sta_time,end_time);
	if(subDays==0){
		var interval="hour";
	}else if((subDays>0)&&(subDays<=30)){
		var interval="day";
	}else if((subDays>30)&&(subDays<=200)){
		var interval="week";
	}else if((subDays>200)&&(subDays<=900)){
		var interval="month";
	}else if(subDays>900){
		var interval="year";
	}else{
		var interval="day";
	}
	var timeinter=interval;
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Sum");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval",interval);
	
	var items=[];
	var data = strToJson(data);
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items;
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	//alert(JSON.stringify(items));
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			gradedownexcel(id,jsonData);
			energygradetable(id,data,timeinter,ntype);
			
			
		}
	});
	
		
}

//能耗分级渲染表格
function energygradetable(id,data,timeinter,ntype){
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	var data = strToJson(data);
	var html = "";
	var count = 0;
	html = "<thead><tr class='text-center'><th>楼层</th>";
	if(timeinter=="day"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(8)+ "</th>";
		}
	}else if(timeinter=="hour"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(10,15)+ "</th>";
		}
	}else if(timeinter=="week"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(5,10)+ "</th>";
		}
	}else if(timeinter=="month"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" +data.items[i].timestamp+ "</th>";
		}
	}else{
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" +data.items[i].timestamp+ "</th>";
		}
	}
	html += "</tr></thead><tbody>";
	for (j = 0; j < data.items[0].pairs.length; j++) {
	html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
	for (i = 0; i < data.items.length; i++) {
		html += "<td>" + data.items[i].pairs[j].value+ "</td>";

	}
	html+="</tr>";
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);	
}

//能耗分级导出excel
function gradedownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"能耗分级Excel");
			}
		});
	});	
}

/********************************************************************************/




/*点击能耗报告*/
$("#profile_energy").on("click",function(){
	yearchoicereport("#tab_energy_profile");//年月日分类
	getEnergyTree("#tab_energy_profile",1);//动态渲染楼座和分区
	reportenergy();//能耗查询
	nowTimeIni();//初始化时间
	
});

//能耗报告查询
function reportenergy(){
	getEnergyTree("#tab_energy_profile",5);	
}

//能耗报告调用接口
function getenergyreport(id,data){
	var typeindex=getTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	
	//获取时间控件得到的时间
	var sta_time=$(id+" .stardown a span:first-child").html();
	var end_time=$(id+" .enddown a span:first-child").html();
	//获取当前时间
	var ndate = new Date();
	//获取当前年份
	var year=ndate.getFullYear();
	//获取当前月
	var month = twomonthview(ndate.getMonth() + 1);
	//获取当前日
	var date = twomonthview(ndate.getDate());
	//获取当前时
	var hour = twomonthview(ndate.getHours());
	//获取当前分
	var minutes = twomonthview(ndate.getMinutes());
	//获取当前秒
	var second = twomonthview(ndate.getSeconds());
	
	//获取报告间隔
	var portinter=$(id+" .hideput_report").val();
	//给起始时间拼上1月1号0点0分0秒
	var beginTime=sta_time+"-01-01 00:00:00";
	
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	
	//若portinter为年报告且结束年份为当前年份，将year赋给interval，在结束时间后面拼上当前时间的月、日、时、分、秒
	//若portinter为年报告且结束年份不是当前年份，将year赋给interval，在结束时间后面拼上12月31日23点59分59秒
	//若portinter为季报告且结束年份为当前年份，将month赋给interval，在结束时间后面拼上当前时间的月、日、时、分、秒
	//若portinter为季报告且结束年份不是当前年份，将month赋给interval，在结束时间后面拼上12月31日23点59分59秒
	//若portinter为月报告且结束年份为当前年份，将month赋给interval，在结束时间后面拼上当前时间的月、日、时、分、秒
	//若portinter为月报告且结束年份不是当前年份，将month赋给interval，在结束时间后面拼上12月31日23点59分59秒
	if((portinter=="年报告")&&(end_time==year)){
		var endTime=end_time+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;
		var interval="year";
	}else if((portinter=="年报告")&&(end_time!=year)){
		var endTime=end_time+"-12-31 23:59:59";
		var interval="year";
	}else if((portinter=="月报告")&&(sta_time==year)){
		var endTime=sta_time+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;
		var interval="month";
	}else if((portinter=="月报告")&&(sta_time!=year)){
		var endTime=sta_time+"-12-31 23:59:59";
		var interval="month";
	}
	
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Sum");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval",interval);
	
	var items=[];
	var data = strToJson(data);
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items;
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	//alert(JSON.stringify(items));
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			profiledownexcel(id,jsonData);
			reporttotable(id,data,portinter,ntype);
			
			
		}
	});
}

//能耗报告渲染表格
function reporttotable(id,data,portinter,ntype){
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	var data = strToJson(data);
	var html = "";
	var count = 0;
	html = "<thead><tr class='text-center'><th>楼层</th>";
	if(portinter=="季报告"){
		for (i = 0; i < data.items.length; i++) {
		html += "<th>" +data.items[i].timestamp+ "</th>";
		}
		
		html += "</tr></thead><tbody>";
		for (j = 0; j < data.items[0].pairs.length; j++) {
			html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
			for (i = 0; i < data.items.length; i++) {
				html += "<td>" + data.items[i].pairs[j].value+ "</td>";
			}
			html+="</tr>";
		}
		
	}else{
		for (i = 0; i < data.items.length; i++) {
		html += "<th>" +data.items[i].timestamp+ "</th>";
		}
		html += "</tr></thead><tbody>";
		for (j = 0; j < data.items[0].pairs.length; j++) {
			html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
			for (i = 0; i < data.items.length; i++) {
				html += "<td>" + data.items[i].pairs[j].value+ "</td>";
			}
			html+="</tr>";
		}
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);		
}

//选择月报告
$("#tab_energy_profile .monthport").click(function(){
	monthchoicereport("#tab_energy_profile");
});

//选择年报告
$("#tab_energy_profile .yearport").click(function(){
	
	yearchoicereport("#tab_energy_profile");
	
});

//能耗报告导出excel
function profiledownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"能耗报告Excel");
			}
		});
	});	
}

/*******************************************************************************************/



/*点击能耗分析，初始化能耗同比参数，调用能耗同比查询*/
$(".energyAnalysis").on("click",function(){
	getEnergyTree("#tab_energy_consumption",1);//动态渲染楼座和分区
	energyconsumption();	//能耗同比查询
	nowTimeIni();//初始化时间
});

/*点击能耗同比，初始化能耗同比参数，调用能耗同比查询*/
$("#consumption_energy").on("click",function(){
	getEnergyTree("#tab_energy_consumption",1);//动态渲染楼座和分区
	energyconsumption();	//能耗同比查询
	nowTimeIni();//初始化时间
});

//能耗同比查询
function energyconsumption(){
	getEnergyTree("#tab_energy_consumption",6);
	
}

//能耗同比查询调用接口	
function getenergyconsumption(id,data){
	$(id+" .function_name").html("能耗同比");
	var typeindex=getTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	//alert(typeindex+"------"+buildindex+"------"+areaindex);
	//获取时间控件得到的时间
	var sta_time=$(id+" .year-month").val();
	//获取当前时间
	var ndate = new Date();
	//获取当前年份
	var year=ndate.getFullYear();
	//获取当前月
	var month = twomonthview(ndate.getMonth() + 1);
	//获取当前日
	var date = twomonthview(ndate.getDate());
	//获取当前时
	var hour = twomonthview(ndate.getHours());
	//获取当前分
	var minutes = twomonthview(ndate.getMinutes());
	//获取当前秒
	var second = twomonthview(ndate.getSeconds());
	
	var nowdate=year+"-"+month;
	//给起始时间拼上1月1号0点0分0秒
	var beginTime=sta_time+"-01 00:00:00";
	
	//若获取的时间为当前的年月，则在结束时间后面拼上当前时间的日、时、分、秒
	//若获取的时间不是当前的年月，则在结束时间后面拼上当月的最后一天23点59分59秒
	
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	
	if(sta_time==nowdate){
		var endTime=sta_time+"-"+date+" "+hour+":"+minutes+":"+second;
	}else{
		var days=getdaysInmonth((sta_time.substring(0,4)),(sta_time.substring(5,7)));
		var endTime=sta_time+"-"+days+" 23:59:59";
	}
	//alert(endTime+"-------------");
	var interval="month";
	
	var timeinter=interval;
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","YoY");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval",interval);
	
	var items=[];
	var treedate=data;
	var data = strToJson(data);
	//将能耗tree赋给treedate
	
	
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items;
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	//alert(JSON.stringify(items));
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			consumptiondownexcel(id,jsonData);
			//调用能耗同比渲染表格的方法，传的参数分别是：能耗排名数据、能耗tree数据、能耗分项下标、建筑楼座下标、建筑分区下标、开始时间、结束时间
			energyconsumptiontable(id,data,treedate,typeindex,buildindex,areaindex,beginTime,endTime,ntype);
			
			
		}
	});
	
	
		
		
		
}

//能耗同比渲染表格
function energyconsumptiontable(id,data,treedate,typeindex,buildindex,areaindex,beginTime,endTime,ntype){
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	
	var beginTime=strtimetomath(beginTime);
	var endTime=strtimetomath(endTime);
	
	//将能耗tree类型对象转成字符串
	var typeindex=JSON.stringify(typeindex);
	
	var data = strToJson(data);
	var html = "";
	var count = 0;
	html = "<thead><tr class='text-center'><th>楼层</th>";
	for (i = 0; i < data.items.length; i++) {
		html += "<th>" + data.items[i].timestamp+ "</th>";
	}
	html += "<th>同比</th><th class='btn_wid13'>操作</th></tr></thead><tbody>";
	
	for (j = 0; j < data.items[0].pairs.length; j++) {
		
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
		for (i = 0; i < data.items.length; i++) {
			html += "<td>" + data.items[i].pairs[j].value+ "</td>";

		}
		
		var depara=j;
		//同比值
		if(((data.items[0].pairs[j].value)!=null)&&((data.items[0].pairs[j].value)>0)&&((data.items[1].pairs[j].value)!=null)){
			var yearvalue=(((data.items[1].pairs[j].value)-(data.items[0].pairs[j].value))/(data.items[0].pairs[j].value)).toFixed(2)+"%";
		}else{
			var yearvalue="null";
		}
	
		html += "<td>"+yearvalue+"</td><td><button class='btn_details' onclick=deconsumption('"+id+"','"+depara+"','"+treedate+"','"+typeindex+"','"+buildindex+"','"+areaindex+"','"+beginTime+"','"+endTime+"','"+ntype+"')><span class='glyphicon glyphicon-list-alt'></span><span class='tabPic btn_name'>详情</span></button></td>";
		html+="</tr>";
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);	

	
}

//能耗同比导出excel
function consumptiondownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"能耗同比Excel");
			}
		});
	});	
}

//能耗同比详情调用接口
function deconsumption(id,depara,treedate,typeindex,buildindex,areaindex,beginTime,endTime,ntype){
	//将能耗tree赋给treedate
	var data =treedate;
	//将能耗tree类型字符串转成对象
	var typeindex = strToJson(typeindex);
	//将能耗tree转成JSON
	var data=strToJson(data);
	
	var funname=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items[depara].name;
	$(id+" .function_name").html(funname+" 能耗同比详情");
	
	var beginTime=mathtostrtime(beginTime);
	var endTime=mathtostrtime(endTime);
	
	
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","YoY");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval","month");
	
	var items=[];
	
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items[depara].items;
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	
	jsonData = setJson(jsonData,"items",items);
	
	//alert(JSON.stringify(jsonData));
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			dtconsumptiondownexcel(id,jsonData);
			energydtconsumptiontable(id,data,ntype);
			
			
		}
	});
	
}

//能耗同比详情渲染表格
function energydtconsumptiontable(id,data,ntype){
	if(ntype=="电能"){
		var surface="电表";
	}else if(ntype=="水能"){
		var surface="水表";
	}else if(ntype=="冷热量"){
		var surface="冷热量表";
	}else if(ntype=="燃气用量"){
		var surface="燃气表"
		
	}
	var data = strToJson(data);
	var html = "";
	var count = 0;
	html = "<thead><tr class='text-center'><th>"+surface+"</th>";
	for (i = 0; i < data.items.length; i++) {
		html += "<th>" + data.items[i].timestamp+ "</th>";
	}
	html += "<th>同比</th></tr></thead><tbody>";
	
	for (j = 0; j < data.items[0].pairs.length; j++) {
		
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
		for (i = 0; i < data.items.length; i++) {
			html += "<td>" + data.items[i].pairs[j].value+ "</td>";

		}
		
		var depara=j;
		//同比值
		if(((data.items[0].pairs[j].value)!=null)&&((data.items[0].pairs[j].value)>0)&&((data.items[1].pairs[j].value)!=null)){
			var yearvalue=(((data.items[1].pairs[j].value)-(data.items[0].pairs[j].value))/(data.items[0].pairs[j].value)).toFixed(2)+"%";
		}else{
			var yearvalue="null";
		}
	
		html += "<td>"+yearvalue+"</td>";
		html+="</tr>";
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);

}

//能耗同比详情导出excel
function dtconsumptiondownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"能耗同比详情Excel");
			}
		});
	});	
}

/**************************************************************************************************************************/

/*点击能耗环比，初始化能耗环比参数，调用能耗环比查询*/
$("#consumption_chain_energy").on("click",function(){
	getEnergyTree("#tab_energy_consumption_chain",1);//动态渲染楼座和分区
	energyconsumptionchain();	//能耗环比查询
	nowTimeIni();//初始化时间
	
});

//能耗环比查询
function energyconsumptionchain(){
	getEnergyTree("#tab_energy_consumption_chain",7);
	
}

//能耗环比查询调用接口	
function getenergyconsumptionchain(id,data){
	$(id+" .function_name").html("能耗环比");
	var typeindex=getTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	
	//alert(typeindex+"------"+buildindex+"------"+areaindex);
	//获取时间控件得到的时间
	var sta_time=$(id+" .year-month").val();
	//获取当前时间
	var ndate = new Date();
	//获取当前年份
	var year=ndate.getFullYear();
	//获取当前月
	var month = twomonthview(ndate.getMonth() + 1);
	//获取当前日
	var date = twomonthview(ndate.getDate());
	//获取当前时
	var hour = twomonthview(ndate.getHours());
	//获取当前分
	var minutes = twomonthview(ndate.getMinutes());
	//获取当前秒
	var second = twomonthview(ndate.getSeconds());
	
	var nowdate=year+"-"+month;
	//给起始时间拼上1号0点0分0秒
	var beginTime=sta_time+"-01 00:00:00";
	
	
	
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	//若获取的时间为当前的年月，则在结束时间后面拼上当前时间的日、时、分、秒
	//若获取的时间不是当前的年月，则在结束时间后面拼上当月的最后一天23点59分59秒
	if(sta_time==nowdate){
		var endTime=sta_time+"-"+date+" "+hour+":"+minutes+":"+second;
	}else{
		var days=getdaysInmonth((sta_time.substring(0,4)),(sta_time.substring(5,7)));
		var endTime=sta_time+"-"+days+" 23:59:59";
	}
	//alert(endTime+"-------------");
	
	
	
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","MoM");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval","month");
	
	var items=[];
	var treedate=data;
	var data = strToJson(data);
	
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items;
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	
	//alert(JSON.stringify(items));
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			consumptionchaindownexcel(id,jsonData);
			energyconsumptionchaintable(id,data,treedate,typeindex,buildindex,areaindex,beginTime,endTime,ntype);
			
			
		}
	});
	
	
		
		
		
}

//能耗环比渲染表格
function energyconsumptionchaintable(id,data,treedate,typeindex,buildindex,areaindex,beginTime,endTime,ntype){
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	var beginTime=strtimetomath(beginTime);
	var endTime=strtimetomath(endTime);
	
	//将能耗tree类型对象转成字符串
	var typeindex=JSON.stringify(typeindex);
	
	
	var data = strToJson(data);
	var html = "";
	var count = 0;
	html = "<thead><tr class='text-center'><th>楼层</th>";
	for (i = 0; i < data.items.length; i++) {
		html += "<th>" + data.items[i].timestamp+ "</th>";
	}
	html += "<th>环比</th><th class='btn_wid13'>操作</th></tr></thead><tbody>";
	
	for (j = 0; j < data.items[0].pairs.length; j++) {
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
		for (i = 0; i < data.items.length; i++) {
			html += "<td>" + data.items[i].pairs[j].value+ "</td>";

		}
		var depara=j;
		if(((data.items[0].pairs[j].value)!=null)&&((data.items[0].pairs[j].value)>0)&&((data.items[1].pairs[j].value)!=null)){
			var yearvalue=(((data.items[1].pairs[j].value)-(data.items[0].pairs[j].value))/(data.items[0].pairs[j].value)).toFixed(2)+"%";
		}else{
			var yearvalue="null";
		}
	html += "<td>"+yearvalue+"</td><td><button class='btn_details' onclick=deconsumptionchain('"+id+"','"+depara+"','"+treedate+"','"+typeindex+"','"+buildindex+"','"+areaindex+"','"+beginTime+"','"+endTime+"')><span class='glyphicon glyphicon-list-alt'></span><span class='tabPic btn_name'>详情</span></button></td>";
	html+="</tr>";
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);	
}

//能耗环比导出excel
function consumptionchaindownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"能耗环比Excel");
			}
		});
	});	
}

//能耗环比详情调用接口
function deconsumptionchain(id,depara,treedate,typeindex,buildindex,areaindex,beginTime,endTime){
	//alert(id+"----"+depara+"----"+treedate+"----"+typeindex+"----"+buildindex+"----"+areaindex+"----"+beginTime+"----"+endTime);
	//将能耗tree赋给treedate
	var data =treedate;
	
	//将能耗tree类型字符串转成对象
	var typeindex = strToJson(typeindex);
	
	//将能耗tree转成JSON
	var data=strToJson(data);
	
	var funname=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items[depara].name;
	$(id+" .function_name").html(funname+" 能耗环比详情");
	
	var beginTime=mathtostrtime(beginTime);
	var endTime=mathtostrtime(endTime);
		//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","MoM");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval","month");
	
	var items=[];
	
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items[depara].items;
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	
	
	jsonData = setJson(jsonData,"items",items);
	
	//alert(JSON.stringify(jsonData));
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			dtconsumptionchaindownexcel(id,jsonData);
			energydtconsumptiontablechain(id,data);
			
			
		}
	});
}
//能耗环比详情渲染表格
function energydtconsumptiontablechain(id,data){
	var data = strToJson(data);
	var html = "";
	var count = 0;
	html = "<thead><tr class='text-center'><th>楼层</th>";
	for (i = 0; i < data.items.length; i++) {
		html += "<th>" + data.items[i].timestamp+ "</th>";
	}
	html += "<th>环比</th></tr></thead><tbody>";
	
	for (j = 0; j < data.items[0].pairs.length; j++) {
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
		for (i = 0; i < data.items.length; i++) {
			html += "<td>" + data.items[i].pairs[j].value+ "</td>";

		}
		var depara=j;
		if(((data.items[0].pairs[j].value)!=null)&&((data.items[0].pairs[j].value)>0)&&((data.items[1].pairs[j].value)!=null)){
			var yearvalue=(((data.items[1].pairs[j].value)-(data.items[0].pairs[j].value))/(data.items[0].pairs[j].value)).toFixed(2)+"%";
		}else{
			var yearvalue="null";
		}
	html += "<td>"+yearvalue+"</td>";
	html+="</tr>";
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);		
}

//能耗环比详情导出excel
function dtconsumptionchaindownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"能耗环比详情Excel");
			}
		});
	});	
}

/**************************************************************************************************************************/

/*点击能耗排名，初始化能耗排名参数，调用能耗排名查询*/
$("#ranking_energy").on("click",function(){
	$("#tab_energy_ranking .viewdown a span:first-child").html("表格");
	hidputbutIni("#tab_energy_ranking");	//能耗排名查询隐藏域初始化
	getTypeRanksul("#tab_energy_ranking");
	energyrank();	//能耗排名查询
	nowTimeIni();//初始化时间
});

//能耗排名查询
function energyrank(){
	getEnergyTree("#tab_energy_ranking",8);
	
}

//能耗排名查询调用接口	
function getenergyrank(id,data){

	//获取当前时间
	var ndate = new Date();
	//获取当前年份
	var year=ndate.getFullYear();
	//获取当前月
	var month = twomonthview(ndate.getMonth() + 1);
	//获取当前日
	var date = twomonthview(ndate.getDate());
	//获取当前时
	var hour = twomonthview(ndate.getHours());
	//获取当前分
	var minutes = twomonthview(ndate.getMinutes());
	//获取当前秒
	var second = twomonthview(ndate.getSeconds());
	//当前年月日
	var nowdate=year+"-"+month+"-"+date;
	
	var typeindex=getTypeindex(id);
	
	
	
	
	//获取时间控件得到的时间
	var sta_time=$(id+" .calendarStart").val();
	var end_time=$(id+" .calendarEnd").val();
	
	
	//给起始时间拼上1月1号0点0分0秒
	var beginTime=sta_time+" 00:00:00";
	
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	
	//若结束的时间为当前的年月，则在结束时间后面拼上当前时间的时、分、秒
	//若获取的时间不是当前的年月，则在结束时间后面拼上23点59分59秒
	
	
	if(sta_time==nowdate){
		var endTime=end_time+" "+hour+":"+minutes+":"+second;
	}else{
		var endTime=sta_time+" 23:59:59";
	}
	
	var interval="month";
	
	var timeinter=interval;
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Rank");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval",interval);
	
	var items=[];
	
	var data = strToJson(data);
	//分区隐藏域
	var area=$(id+" .hideput_area").val();
	//分项
	var itemtype=$(id+" .itemsdown a span:first-child").html();
	
	var items=getTtemsRank(id,data);
	
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			rankdownexcel(id,jsonData);
			//获取视图类型字符串
			var view=$(id+" .toView span:first-child").html();
			switch(view)
			{
				case "表格":
					energyranktable(id,data,ntype); //表格
					break;
				case "柱状图":
					energyrankcolumncharts(id,data,ntype);//柱状图
					break;
				default:
					alert("能耗排名错误");
			}
			
			
			
			
			
		}
	});
	
	
		
	
		
}

//能耗排名渲染表格
function energyranktable(id,data,ntype){
	$(id+" charts").empty();
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	var data = strToJson(data);
	var html = "";
	var count = 0;
	html = "<thead><tr class='text-center'><th>排名</th><th>建筑</th>";
	for (i = 0; i < data.items.length; i++) {
		html += "<th>" + data.items[i].timestamp+ "平均能耗</th>";
	}
	html += "</tr></thead><tbody>";
	
	for (j = 0; j < data.items[0].pairs.length; j++) {
	html+="<tr><td>"+(Number(j)+1)+"</td><td>"+data.items[0].pairs[j].name+"</td>";
	for (i = 0; i < data.items.length; i++) {
		html += "<td>" + data.items[i].pairs[j].value+ "</td>";

	}
	html+="</tr>";
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	
}


//能耗排名渲染柱状图
function energyrankcolumncharts(id,data,ntype){
	var itemindex=$(id+" .itemsdown a span:first-child").html();
	
	var area=$(id+" .hideput_area").val();	
	$(id+" .charts").empty();
	$(id+" table").empty();

	var chart={
		type:'column'
	};
	var title={
		text: ''
	};
	var xAxis={
		categories: []
	};
	var yAxis={
		min: 0,
		title: {
			text: '总能耗'
		}
	};
	var tooltip= {
		valueSuffix:"kwh",
		pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
		shared: true
	};
	var series =  [
      {
         name: '',
         data: []
      }
   ];

	var json = {};
	var data = strToJson(data);
	
	title.text=(data.items[0].timestamp)+area+itemindex+"排名";
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
		tooltip.valueSuffix="kwh";
		yAxis.title.text="电能(kwh)";
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
		yAxis.title.text="水能(m3)";
		tooltip.valueSuffix="m3";
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
		tooltip.valueSuffix="GJ";
		yAxis.title.text="冷热量(GJ)";
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
		tooltip.valueSuffix="m3";
		yAxis.title.text="燃气用量(m3)";
	}
	
	for (i = 0; i < data.items[0].pairs.length; i++) {
		 xAxis.categories[i]=data.items[0].pairs[i].name;
		 series[0].data[i] =Number(data.items[0].pairs[i].value);
	}
	
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	
	json.series = series;

	$(id+' .charts').highcharts(json);
}

//能耗排名点击分区给隐藏域存值
$("#tab_energy_ranking .floor_choice li").click(function(){
    var value=$(this).html();
    $("#tab_energy_ranking .floor_choice li").removeClass("active");
    $(this).addClass("active");
    $("#tab_energy_ranking .hideput_area").val(value);
	$("#tab_energy_ranking .energy_subent_area").html(value);
	getTypeRanksul("#tab_energy_ranking");
	

});

//能耗排名导出excel
function rankdownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"能耗排名Excel");
			}
		});
	});	
}

/**************************************************************************************************************************/

/*点击能耗去向，初始化能耗去向参数，调用能耗去向查询*/
$("#whereabouts_energy").on("click",function(){
	whereItemul("#tab_energy_whereabouts");
	$("#tab_energy_whereabouts .viewdown a span:first-child").html("表格");
	getEnergyTree("#tab_energy_whereabouts",10);
	energywhere();	//能耗排名查询
	nowTimeIni();//初始化时间
});

//能耗去向查询
function energywhere(){
	getEnergyTree("#tab_energy_whereabouts",9);
}

//能耗去向查询调用接口	
function getenergywhere(id,data){
	//获取当前时间
	var ndate = new Date();
	//获取当前年份
	var year=ndate.getFullYear();
	//获取当前月
	var month = twomonthview(ndate.getMonth() + 1);
	//获取当前日
	var date = twomonthview(ndate.getDate());
	//获取当前时
	var hour = twomonthview(ndate.getHours());
	//获取当前分
	var minutes = twomonthview(ndate.getMinutes());
	//获取当前秒
	var second = twomonthview(ndate.getSeconds());
	//当前年月日
	var nowdate=year+"-"+month+"-"+date;
	
	//得到能耗分项下标
	var typeindex=getTypeindex(id);
	//得到建筑下标
	var buildindex=getBuildindex(id);
	
	
	//获取时间控件得到的时间
	var sta_time=$(id+" .calendarStart").val();
	var end_time=$(id+" .calendarEnd").val();
	
	
	//给起始时间拼上1月1号0点0分0秒
	var beginTime=sta_time+" 00:00:00";
	
	//若结束的时间为当前的年月，则在结束时间后面拼上当前时间的时、分、秒
	//若获取的时间不是当前的年月，则在结束时间后面拼上23点59分59秒
	if(sta_time==nowdate){
		var endTime=end_time+" "+hour+":"+minutes+":"+second;
	}else{
		var endTime=sta_time+" 23:59:59";
	}
	
	//alert(typeindex.type+"------------"+typeindex.item);
	
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	
	//alert(typeindex+"*******************");
	
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Ratio");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval","");
	
	
	var items=[];
	var data = strToJson(data);
	
	
	items=getTtemsWhere(id,data);
	
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			wheredownexcel(id,jsonData);
			console.log(data+"------");
			//获取视图类型字符串
			var view=$(id+" .viewdown a span:first-child").html();
			
			switch(view)
			{
				case "表格":
					energywheretable(id,data,ntype); //表格
					break;
				case "饼状图":
					energywherepiecharts(id,data,ntype);//饼状图
					break;
				default:
					alert("未知错误");
			}
		}
	});
	
	
		
		
		
}

//能耗去向渲染表格
function energywheretable(id,data,ntype){
	$(id+" table").empty();
	$(id+" .charts").empty();
	$(id+" .pages").css("display","block");
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	var data = strToJson(data);
	var countenergy=0;
	var html = "";
	if('items' in data){
		for (i = 0; i < data.items[0].pairs.length; i++) {
			if(data.items[0].pairs[i].value==null){
				var datavalue=0;
			}else{
				var datavalue=data.items[0].pairs[i].value;
			}
			countenergy=countenergy+Number(datavalue);
		}
		html = "<thead><tr class='text-center'><th>建筑</th><th>"+data.items[0].timestamp+"能耗</th><th>占比</th></tr></thead><tbody>";
		for (i = 0; i < data.items[0].pairs.length; i++) {
			
			if(data.items[0].pairs[i].value==null){
				var datavalue=0;
			}else{
				var datavalue=data.items[0].pairs[i].value;
			}
			//alert(countenergy);
			if(countenergy!=0){
				var provalue=(datavalue/countenergy*100).toFixed(2)+"%";
			}else{
				var provalue=0+"%";
			}
			html+="<tr><td>"+data.items[0].pairs[i].name+"</td><td>"+data.items[0].pairs[i].value+"</td><td>"+provalue+"</td>";
			html+="</tr>";
		}
	}else{
		html = "<thead><tr class='text-center'><th>建筑</th><th>能耗</th><th>占比</th></tr></thead><tbody><tr><td></td><td></td><td></td></tr>";
	}
	html+="</tbody>";
	$(id+" table").empty().html(html);
	
}

//能耗去向渲染饼状图
function energywherepiecharts(id,data,ntype){
	$(id+" table").empty();
	$(id+" .charts").empty();
	$(id+" .pages").css("display","none");
    var chart = {
	   type: 'pie',
       plotBackgroundColor: null,
       plotBorderWidth: null,
       plotShadow: false
    };
    var title = {
      text: 'B03-A地块能耗去向'   
    };      
    var tooltip = {
      pointFormat: '{name}: <b>{point.percentage:.1f}%</b>'
    };
    var plotOptions = {
      pie: {
         allowPointSelect: true,
         cursor: 'pointer',
         dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>：{point.percentage:.1f} %',
            style: {
               color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
         }
      }
    };
	
	/*
	var series= [{data: [['商业区50kwh',50],
         ['办公区 20kwh',20],
		  ['办公区11 20kwh',120],
		   ['办公区11 20kwh',120],
      ]
    }];   
	*/
	
	//[{data: [[],[]]}]
	var series= [];   
	var json = {};
	
	var data = strToJson(data);
	var build=$(id+" .energy_build_name").html();
	var itemindex=$(id+" .itemsdown a span:first-child").html();
	
	title.text=build+itemindex+"去向";
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	
	var compny=$(id+" .unit_value").html();
	var data1={};
	var data2=[];
	
	for (i = 0; i < data.items[0].pairs.length; i++) {
		var data3=[];
		if((data.items[0].pairs[i].value)==null){
			var dataname=data.items[0].pairs[i].name;
			var datavalue=0;
		}else{
			var dataname=data.items[0].pairs[i].name;
			var datavalue=data.items[0].pairs[i].value;
			
		}
		
		//alert(dataname+"-----"+datavalue);
		
		data3.push(dataname+" "+datavalue+compny);
		data3.push(Number(datavalue));
		data2.push(data3);
		
		
	} 
	data1.data=data2;
	series.push(data1);
	
	json.chart = chart; 
    json.title = title;     
    json.tooltip = tooltip;  
    json.series = series;
    json.plotOptions = plotOptions;
   
	$(id+" .charts").highcharts(json);	
}

//能耗去向导出excel
function wheredownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"能耗去向Excel");
			}
		});
	});	
}

/*******************************************************************************************/



/*点击能耗报表，初始化能耗报表参数，调用能耗报表查询 */
$(".energyReport").on("click",function(){
	getEnergyTree("#tab_report_generation",1);//动态渲染楼座和分区
	reportgeneration();	//生成能耗报表查询
	nowTimeIni();//初始化时间
	nowMonthOne();//初始起始时间
	
});

/*点击报表生成，初始化能耗报表生成参数，调用能耗报表生成查询 */
$("#report_generation").on("click",function(){
	getEnergyTree("#tab_report_generation",1);//动态渲染楼座和分区
	reportgeneration();	//生成能耗报表查询
	nowTimeIni();//初始化时间
	nowMonthOne();//初始起始时间
});

//生成能耗报表查询
function reportgeneration(){
	
	getEnergyTree("#tab_report_generation",12);
	
}

//生成能耗报表 查询调用接口	
function getreportgeneration(id,data){

	var typeindex=getTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	
	
	//alert(typeindex+"------"+buildindex+"------"+areaindex);
	
	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	var date = twomonthview(ndate.getDate());
	//当前时间的年月日
	var nowDate=year+"-"+month+"-"+date;

	//获取时间控件得到的时间
	var sta_time=$(id+" .calendarStart").val();
	var end_time=$(id+" .calendarEnd").val()

	//给起始时间拼上时、分、秒
	var beginTime=sta_time+" 00:00:00";
	//判断结束时间，若是等于当前时间，则拼上当前时间的时分秒，若不是当前时间，则拼上23点59分59秒
	if(end_time==nowDate){
		var endTime=end_time+" "+twomonthview(ndate.getHours())+":"+twomonthview(ndate.getMinutes())+":"+twomonthview(ndate.getSeconds());
	}else{
		var endTime=end_time+" 23:59:59";
	}
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	
	
	var interval="day";
	
	var timeinter=interval;
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Sum");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval",interval);
	
	var items=[];
	var data = strToJson(data);
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items;
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	//alert(JSON.stringify(items));
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			portgenerationdownexcel(id,jsonData);
			console.log(data+"------");
			getreportgenerationtable(id,data,ntype);
			
			
		}
	});
	
	
		
		
		
}

//生成能耗报表渲染表格
function getreportgenerationtable(id,data,ntype){
	
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	var data = strToJson(data);
	var html = "";
	
	
	var stcount = 0;
	html = "<thead><tr class='text-center'><th>楼层</th>";
	for (i = 0; i < data.items.length; i++) {
		html += "<th>" + (data.items[i].timestamp).substring(8)+ "</th>";
	}
	html += "<th>合计</th></tr></thead><tbody>";
	
	for (j = 0; j < data.items[0].pairs.length; j++) {
		var ecount = 0;
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
		for (i = 0; i < data.items.length; i++) {
			html += "<td>" + data.items[i].pairs[j].value+ "</td>";
			//count+=Number(data.items[i].pairs[j].value)；
			if(Number(data.items[i].pairs[j].value)>=0){
				var datavalue=Number(data.items[i].pairs[j].value);
			}else{
				var datavalue=0;
			}
			ecount=ecount+datavalue;
		}
		
		html+="<td>"+ecount+"</td></tr>";
		
	}
	
	html+="<tr><td>合计</td>";
	for (j = 0; j < data.items.length; j++) {
		var tcount = 0;
		for (i= 0; i < data.items[0].pairs.length; i++) {
			if(Number(data.items[j].pairs[i].value)>=0){
				var datavalue=Number(data.items[j].pairs[i].value);
			}else{
				var datavalue=0;
			}
			tcount=tcount+datavalue;
		}
		html+="<td>"+tcount+"</td>";
		stcount=stcount+tcount;
	}
	html+="<td>"+stcount+"</td></tr>";	
	
	
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);	
}

//生成能耗报表导出excel
function portgenerationdownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"生成能耗报表Excel");
			}
		});
	});	
}

/*******************************************************************************************/

/*点击测量点表，初始化测量点表参数，调用测量点表查询 */
$("#survey_point").on("click",function(){
	getEnergyTree("#tab_survey_point",11);//动态渲染楼座和分区
	surveypoint();	//测量点表查询
	nowTimeIni();//初始化时间
	nowMonthOne();//初始起始时间
});

//测量点表查询
function surveypoint(){
	
	getEnergyTree("#tab_survey_point",13);
	
}

//测量点表查询调用接口	
function getsurveypoint(id,data){
	
	var typeindex=getTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	var floorindex=getFloorindex(id)
	
	
	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	var date = twomonthview(ndate.getDate());
	//当前时间的年月日
	var nowDate=year+"-"+month+"-"+date;

	//获取时间控件得到的时间
	var sta_time=$(id+" .calendarStart").val();
	var end_time=$(id+" .calendarEnd").val()

	//给起始时间拼上时、分、秒
	var beginTime=sta_time+" 00:00:00";
	//判断结束时间，若是等于当前时间，则拼上当前时间的时分秒，若不是当前时间，则拼上23点59分59秒
	if(end_time==nowDate){
		var endTime=end_time+" "+twomonthview(ndate.getHours())+":"+twomonthview(ndate.getMinutes())+":"+twomonthview(ndate.getSeconds());
	}else{
		var endTime=end_time+" 23:59:59";
	}
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	var interval="day";
	
	var timeinter=interval;
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Sum");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval",interval);
	
	var items=[];
	console.log(data+"--------");
	var data = strToJson(data);
	
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items[floorindex].items;
	
	
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			surveypointdownexcel(id,jsonData);
			console.log(data+"------");
			getsurveypointtable(id,data,timeinter,ntype);
			
			
		}
	});
	
	
		
		
		
}

//测量点表渲染表格
function getsurveypointtable(id,data,timeinter,ntype){
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	
	var data = strToJson(data);
	var html = "";
	var ecount = 0;
	html = "<thead><tr class='text-center'><th>建筑</th>";
	if(timeinter=="day"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(8)+ "</th>";
		}
	}else if(timeinter=="hour"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(10,15)+ "</th>";
		}
	}else if(timeinter=="week"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" + (data.items[i].timestamp).substring(5,10)+ "</th>";
		}
	}else if(timeinter=="month"){
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" +data.items[i].timestamp+ "</th>";
		}
	}else{
		for (i = 0; i < data.items.length; i++) {
			html += "<th>" +data.items[i].timestamp+ "</th>";
		}
	}
	html += "</tr></thead><tbody>";
	
	for (j = 0; j < data.items[0].pairs.length; j++) {
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
		for (i = 0; i < data.items.length; i++) {
			html += "<td>" + data.items[i].pairs[j].value+ "</td>";
			//count+=Number(data.items[i].pairs[j].value)；
			if(Number(data.items[i].pairs[j].value)>=0){
				var datavalue=Number(data.items[i].pairs[j].value);
			}else{
				var datavalue=0;
			}
			ecount=ecount+datavalue;
		}
		
		html+="</tr>";
		
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);	
}

//测量点表导出excel
function surveypointdownexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"测量点表Excel");
			}
		});
	});	
}

/*******************************************************************************************/

/*点击同比报表，初始化点击同比报表参数，调用点击同比报表查询 */
$("#size_statement").on("click",function(){
	getEnergyTree("#tab_common_size_statement",11);//动态渲染楼座和分区
	sizestatement();	//点击同比报表查询
	nowTimeIni();//初始化时间
	
});

//点击同比报表查询
function sizestatement(){
	
	getEnergyTree("#tab_common_size_statement",14);
	
}

//点击同比报表查询调用接口	
function getsizestatement(id,data){
	
	var typeindex=getTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	var floorindex=getFloorindex(id)
	
	
	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	var date = twomonthview(ndate.getDate());
	//当前时间的年月日
	var nowdate=year+"-"+month+"-"+date;

		//获取时间控件得到的时间
	var sta_time=$(id+" .year-month").val();

	//给起始时间拼上1号0点0分0秒
	var beginTime=sta_time+"-01 00:00:00";
	
	//若获取的时间为当前的年月，则在结束时间后面拼上当前时间的日、时、分、秒
	//若获取的时间不是当前的年月，则在结束时间后面拼上当月的最后一天23点59分59秒
	if(sta_time==nowdate){
		var endTime=sta_time+"-"+date+" "+hour+":"+minutes+":"+second;
	}else{
		var days=getdaysInmonth((sta_time.substring(0,4)),(sta_time.substring(5,7)));
		var endTime=sta_time+"-"+days+" 23:59:59";
	}
	
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","YoY");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval","month");
	
	var items=[];
	console.log(data+"--------");
	var data = strToJson(data);
	
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items[floorindex].items;
	
	
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			sizestatementexcel(id,jsonData);
			getsizestatementtable(id,data,ntype);
			
			
		}
	});
	
	
		
		
		
}

//点击同比报表染表格
function getsizestatementtable(id,data,ntype){
	if(ntype=="电能"){
		var surface="电表";
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		var surface="水表";
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		var surface="冷热量表";
		$(id+" .unit_value").html("GJ");
	}
	var data = strToJson(data);
	var html = "";
	var count = 0;
	html = "<thead><tr class='text-center'><th>"+surface+"</th>";
	for (i = 0; i < data.items.length; i++) {
		html += "<th>" + data.items[i].timestamp+ "</th>";
	}
	html += "<th>同比</th></tr></thead><tbody>";
	
	for (j = 0; j < data.items[0].pairs.length; j++) {
		
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
		for (i = 0; i < data.items.length; i++) {
			html += "<td>" + data.items[i].pairs[j].value+ "</td>";

		}
		
		var depara=j;
		//同比值
		if(((data.items[0].pairs[j].value)!=null)&&((data.items[0].pairs[j].value)>0)&&((data.items[1].pairs[j].value)!=null)){
			var yearvalue=(((data.items[1].pairs[j].value)-(data.items[0].pairs[j].value))/(data.items[0].pairs[j].value)).toFixed(2)+"%";
		}else{
			var yearvalue="null";
		}
	
		html += "<td>"+yearvalue+"</td>";
		html+="</tr>";
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);

}

//点击同比报表导出excel
function sizestatementexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"同比报表Excel");
			}
		});
	});	
}

/*******************************************************************************************/

/*点击环比报表，初始化点击环比报表参数，调用点击环比报表查询 */
$("#link_report").on("click",function(){
	getEnergyTree("#tab_link_report",11);//动态渲染楼座和分区
	linkreport();	//点击环比报表查询
	nowTimeIni();//初始化时间
	
});

//环比报表查询
function linkreport(){
	
	getEnergyTree("#tab_link_report",15);
	
}

//点击环比报表查询调用接口	
function getlinkreport(id,data){
	
	var typeindex=getTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	var floorindex=getFloorindex(id)
	
	
	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	var date = twomonthview(ndate.getDate());
	
	//当前时间的年月日
	var nowdate=year+"-"+month+"-"+date;

	//获取时间控件得到的时间
	var sta_time=$(id+" .year-month").val();

	//给起始时间拼上1号0点0分0秒
	var beginTime=sta_time+"-01 00:00:00";
	
	//若获取的时间为当前的年月，则在结束时间后面拼上当前时间的日、时、分、秒
	//若获取的时间不是当前的年月，则在结束时间后面拼上当月的最后一天23点59分59秒
	if(sta_time==nowdate){
		var endTime=sta_time+"-"+date+" "+hour+":"+minutes+":"+second;
	}else{
		var days=getdaysInmonth((sta_time.substring(0,4)),(sta_time.substring(5,7)));
		var endTime=sta_time+"-"+days+" 23:59:59";
	}
	
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","MoM");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval","month");
	
	var items=[];
	console.log(data+"--------");
	var data = strToJson(data);
	
	
	
	//alert(typeindex.type+"---"+typeindex.item+"---"+buildindex+"---"+areaindex+"---"+floorindex+"---");
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items[floorindex].items;
	
	
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			linkreportexcel(id,jsonData);
			getlinkreporttable(id,data,ntype);
			
			
		}
	});
	
	
		
		
		
}

//点击环比报表染表格
function getlinkreporttable(id,data,ntype){
	if(ntype=="电能"){
		var surface="电表";
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		var surface="水表";
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		var surface="冷热量表";
		$(id+" .unit_value").html("GJ");
	}
	var data = strToJson(data);
	var html = "";
	var count = 0;
	html = "<thead><tr class='text-center'><th>"+surface+"</th>";
	for (i = 0; i < data.items.length; i++) {
		html += "<th>" + data.items[i].timestamp+ "</th>";
	}
	html += "<th>环比</th></tr></thead><tbody>";
	
	for (j = 0; j < data.items[0].pairs.length; j++) {
		
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td>";
		for (i = 0; i < data.items.length; i++) {
			html += "<td>" + data.items[i].pairs[j].value+ "</td>";

		}
		
		var depara=j;
		//环比值
		if(((data.items[0].pairs[j].value)!=null)&&((data.items[0].pairs[j].value)>0)&&((data.items[1].pairs[j].value)!=null)){
			var yearvalue=(((data.items[1].pairs[j].value)-(data.items[0].pairs[j].value))/(data.items[0].pairs[j].value)).toFixed(2)+"%";
		}else{
			var yearvalue="null";
		}
	
		html += "<td>"+yearvalue+"</td>";
		html+="</tr>";
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);

}


//环比报表导出excel
function linkreportexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"环比报表Excel");
			}
		});
	});	
}


/*******************************************************************************************/



/*点击节能诊断，初始化节能诊断参数，调用节能诊断查询 */
$(".diagnose").on("click",function(){
	getEnergyTree("#tab_energy_abnormal",1);//动态渲染楼座和分区
	energyabnormal();		//能耗异常诊断查询
	nowTimeIni();//初始化时间
	nowMonthOne();//初始起始时间
	
});

/*点击能耗异常诊断，初始化能耗异常诊断，调用能耗异常诊断查询 */
$("#energy_abnormal").on("click",function(){
	getEnergyTree("#tab_energy_abnormal",1);//动态渲染楼座和分区
	energyabnormal();	//能耗异常诊断查询
	nowTimeIni();//初始化时间
	nowMonthOne();//初始起始时间
});

//能耗异常诊断查询
function energyabnormal(){
	
	getEnergyTree("#tab_energy_abnormal",16);
	
}

//能耗异常诊断 查询调用接口	
function getenergyabnormal(id,data){

	var typeindex=getTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	
	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	var date = twomonthview(ndate.getDate());
	//当前时间的年月日
	var nowDate=year+"-"+month+"-"+date;

	//获取时间控件得到的时间
	var sta_time=$(id+" .calendarStart").val();
	var end_time=$(id+" .calendarEnd").val()

	//给起始时间拼上时、分、秒
	var beginTime=sta_time+" 00:00:00";
	//判断结束时间，若是等于当前时间，则拼上当前时间的时分秒，若不是当前时间，则拼上23点59分59秒
	if(end_time==nowDate){
		var endTime=end_time+" "+twomonthview(ndate.getHours())+":"+twomonthview(ndate.getMinutes())+":"+twomonthview(ndate.getSeconds());
	}else{
		var endTime=end_time+" 23:59:59";
	}
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	
	
	var interval="day";
	
	var timeinter=interval;
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Sum");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval",interval);
	
	var items=[];
	var data = strToJson(data);
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items;
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	//alert(JSON.stringify(items));
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			abnormalexcel(id,jsonData);
			getenergyabnormaltable(id,data,ntype);
			
			
		}
	});
	
	
		
		
		
}

//能耗异常诊断渲染表格
function getenergyabnormaltable(id,data,ntype){
	
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	var data = strToJson(data);
	html = "<thead><tr class='text-center'><th>楼层</th><th class='btn_wid'>参考指标</th>";
	
	for (i = 0; i < data.items.length; i++) {
		html += "<th>" + (data.items[i].timestamp).substring(8)+ "</th>";
	}
	
	html += "</tr></thead><tbody>";
	var stanvalue=150;
	for (j = 0; j < data.items[0].pairs.length; j++) {
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td><td>"+stanvalue+"</td>";
		for (i = 0; i < data.items.length; i++) {
			if((data.items[i].pairs[j].value)>stanvalue){
				html += "<td style='color:red;'>" + data.items[i].pairs[j].value+ "</td>";
			}else{
				html += "<td>" + data.items[i].pairs[j].value+ "</td>";
			}
			
			}
		html+="</tr>";	
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);	
}

//能耗异常导出excel
function abnormalexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"环比报表Excel");
			}
		});
	});	
}

/***********************************************************************************************/

/*点击工作时间异常诊断，初始化工作时间诊断，调用工作时间诊断查询 */
$("#worktime_diagnosis").on("click",function(){
	getEnergyTree("#tab_work_time_diagnosis",1);//动态渲染楼座和分区
	worktimenormal();	//能耗异常诊断查询
	nowTimeIni();//初始化时间
	nowMonthOne();//初始起始时间
});

//工作时间异常诊断查询
function worktimenormal(){
	
	getEnergyTree("#tab_work_time_diagnosis",17);
	
}

//工作时间异常诊断 查询调用接口	
function getworktimenormal(id,data){

	var typeindex=getTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	
	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	var date = twomonthview(ndate.getDate());
	//当前时间的年月日
	var nowDate=year+"-"+month+"-"+date;

	//获取时间控件得到的时间
	var sta_time=$(id+" .calendarStart").val();
	var end_time=$(id+" .calendarEnd").val()

	//给起始时间拼上时、分、秒
	var beginTime=sta_time+" 00:00:00";
	//判断结束时间，若是等于当前时间，则拼上当前时间的时分秒，若不是当前时间，则拼上23点59分59秒
	if(end_time==nowDate){
		var endTime=end_time+" "+twomonthview(ndate.getHours())+":"+twomonthview(ndate.getMinutes())+":"+twomonthview(ndate.getSeconds());
	}else{
		var endTime=end_time+" 23:59:59";
	}
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	
	
	var interval="day";
	
	var timeinter=interval;
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Sum");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval",interval);
	
	var items=[];
	var data = strToJson(data);
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items;
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	//alert(JSON.stringify(items));
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			worktimenormalexcel(id,jsonData);
			getworktimenormaltable(id,data,ntype);
			
			
		}
	});
	
	
		
		
		
}

//工作时间异常诊断渲染表格
function getworktimenormaltable(id,data,ntype){
	
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	var data = strToJson(data);
	html = "<thead><tr class='text-center'><th>楼层</th><th class='btn_wid'>参考指标</th>";
	
	
	for (i = 0; i < data.items.length; i++) {
		if(getRestweek(data.items[i].timestamp)=="工作日"){
			html += "<th>" + (data.items[i].timestamp).substring(8)+ "</th>";
		}
		
	}
	
	html += "</tr></thead><tbody>";
	var stanvalue=150;
	
	for (j = 0; j < data.items[0].pairs.length; j++) {
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td><td>"+stanvalue+"</td>";
		for (i = 0; i < data.items.length; i++) {
		if(getRestweek(data.items[i].timestamp)=="工作日"){
			if((data.items[i].pairs[j].value)>stanvalue){
				html += "<td style='color:red;'>" + data.items[i].pairs[j].value+ "</td>";
			}else{
				html += "<td>" + data.items[i].pairs[j].value+ "</td>";
			}
			
			}
		}
		html+="</tr>";	
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);	
}

//工作时间导出excel
function worktimenormalexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"工作时间Excel");
			}
		});
	});	
}

/***********************************************************************************************/

/*点击非工作时间异常诊断，初始化非工作时间诊断，调用非工作时间诊断查询 */
$("#nonworking_diagnosis").on("click",function(){
	getEnergyTree("#tab_non_working_diagnosis",1);//动态渲染楼座和分区
	nonworkingnormal();	//能耗异常诊断查询
	nowTimeIni();//初始化时间
	nowMonthOne();//初始起始时间
});

//非工作时间异常诊断查询
function nonworkingnormal(){
	
	getEnergyTree("#tab_non_working_diagnosis",18);
	
}

//非工作时间异常诊断 查询调用接口	
function getnonworkingnormal(id,data){

	var typeindex=getTypeindex(id);
	var buildindex=getBuildindex(id);
	var areaindex=getAreaindex(id);
	
	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	var date = twomonthview(ndate.getDate());
	//当前时间的年月日
	var nowDate=year+"-"+month+"-"+date;

	//获取时间控件得到的时间
	var sta_time=$(id+" .calendarStart").val();
	var end_time=$(id+" .calendarEnd").val()

	//给起始时间拼上时、分、秒
	var beginTime=sta_time+" 00:00:00";
	//判断结束时间，若是等于当前时间，则拼上当前时间的时分秒，若不是当前时间，则拼上23点59分59秒
	if(end_time==nowDate){
		var endTime=end_time+" "+twomonthview(ndate.getHours())+":"+twomonthview(ndate.getMinutes())+":"+twomonthview(ndate.getSeconds());
	}else{
		var endTime=end_time+" 23:59:59";
	}
	if((typeindex.type==0)||(typeindex.type==1)||(typeindex.type==2)){
		var ntype="电能";
	}else if((typeindex.type==3)||(typeindex.type==4)||(typeindex.type==5)){
		var ntype="水能";
	}else if(typeindex.type==6){
		var ntype="冷热量";
	}else if(typeindex.type==7){
		var ntype="燃气用量";
	}
	
	
	
	var interval="day";
	
	var timeinter=interval;
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Sum");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"interval",interval);
	
	var items=[];
	var data = strToJson(data);
	var itemslen=data.roots[typeindex.type].items[typeindex.item].items[buildindex].items[areaindex].items;
	for(i=0;i<itemslen.length;i++){
		var item=new Object();
		item.name=itemslen[i].name;
		item.ord=itemslen[i].ord;
		items.push(item);
	}
	//alert(JSON.stringify(items));
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			console.log(data+"------");
			nonworkingexcel(id,jsonData);
			getnonworkingnormaltable(id,data,ntype)
			
			
		}
	});
	
	
		
		
		
}

//非工作时间异常诊断渲染表格
function getnonworkingnormaltable(id,data,ntype){
	
	if(ntype=="电能"){
		$(id+" .unit_value").html("kwh");
	}else if(ntype=="水能"){
		$(id+" .unit_value").html("m3");
	}else if(ntype=="冷热量"){
		$(id+" .unit_value").html("GJ");
	}else if(ntype=="燃气用量"){
		$(id+" .unit_value").html("m3");
	}
	var data = strToJson(data);
	html = "<thead><tr class='text-center'><th>楼层</th><th class='btn_wid'>参考指标</th>";
	
	
	for (i = 0; i < data.items.length; i++) {
		if(getRestweek(data.items[i].timestamp)=="休息日"){
			html += "<th>" + (data.items[i].timestamp).substring(8)+ "</th>";
		}
		
	}
	
	html += "</tr></thead><tbody>";
	var stanvalue=150;
	
	for (j = 0; j < data.items[0].pairs.length; j++) {
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td><td>"+stanvalue+"</td>";
		for (i = 0; i < data.items.length; i++) {
		if(getRestweek(data.items[i].timestamp)=="休息日"){
			if((data.items[i].pairs[j].value)>stanvalue){
				html += "<td style='color:red;'>" + data.items[i].pairs[j].value+ "</td>";
			}else{
				html += "<td>" + data.items[i].pairs[j].value+ "</td>";
			}
			
			}
		}
		html+="</tr>";	
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);	
}

//非工作时间导出excel
function nonworkingexcel(id,jsonData){
	$(id+" .download").click(function(){
		$.ajax({
			type:'post',
			url:'/EasyEnergy/EnergyExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$(id+" .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(17)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$(id+" .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport(id,"非工作时间Excel");
			}
		});
	});	
}

/***********************************************************************************************/
//点击报警中心
$(".alarmCenter").on("click",function(){
	choiceAlarm("#tab_alarm_overview");
	getAlarmOverview("#tab_alarm_overview");	//实时报警
});

//点击实时报警
$("#choice_alarm_real").on("click",function(){
	choiceAlarm("#tab_alarm_overview");
	getAlarmOverview("#tab_alarm_overview");	//实时报警
});

//实时报警调用接口	
function getAlarmOverview(id){
	//设置能耗查询请求参数
	var alarmClass=[];
	var alarmClassType=$(id+" .hideput_build").val();
	alarmClass.push(alarmClassType);
	
	var jsonData = setJson(jsonData,"alarmClass",alarmClass);	
		
		console.log(jsonData+"--------");
	$.ajax({
		type:'post',
		url:'/EasyEnergy/RealAlarmSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data){
			console.log(data+"------");
			getAlarmOverviewtable(id,data);
			
		}

	});
}

//实时报警渲染表格
function getAlarmOverviewtable(id,data){
	var data=strToJson(data);
	html = "<thead><tr class='text-center'><th>报警设备</th>"+
				"<th>报警位置</th>"+
				"<th>报警时间</th>"+
				"<th>报警信息</th>"+
				"<th>设备状态</th>"+
				"<th>响应个数</th>"+
				"<th>未响应个数</th>"+
				"<th colspan='2'>操作</th>"+
				"</tr></thead><tbody>";
	if("items" in data){
		for (i = 0; i < data.items.length; i++) {
			if((data.items[i].sourceState)=="normal"){
				var sourceState="正常";
			}else if((data.items[i].sourceState)=="offnormal"){
				var sourceState="异常";
			}
			if((data.items[i].ackState)=="acked"){
				var ackState="已响应";
			}else if((data.items[i].ackState)=="unacked"){
				var ackState="未响应";
			}
			html+="<tr>"+
				"<td>"+data.items[i].source+"</td>"+
				"<td>"+data.items[i].alarmClass+"</td>"+
				"<td>"+data.items[i].timestamp+"</td>"+
				"<td>"+data.items[i].msgText+"</td>"+
				"<td>"+sourceState+"</td>"+
				"<td>"+data.items[i].ackNum+"</td>"+
				"<td>"+data.items[i].unAckNum+"</td>"+
				"<td class='td-edit btn_wid'><button class='btn_edit common_btn ack btn_equip_edit'><span class='tabPic btn_name' onclick=ackReaAlarm('"+id+"','"+data.items[i].uuid+"')>响应</span></button></td>"+
				"<td class='td_del btn_wid'><button class='btn_del delete btn_equip_del'><span class='tabPic btn_name' onclick=delReaAlarm('"+id+"','"+data.items[i].uuid+"')>删除</span></button></td></tr>";
		}
	}else{
			html+="<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}
	
	html+="</tbody>";
	$(id+" table").html(html);
	tableForPages(id,8);	

}

//实时报警导出excel
function AlarmOverviewexcel(){
	//获取当前时间
	var ndate = new Date();
	//获取当前年份
	var year=ndate.getFullYear();
	//获取当前月
	var month = twomonthview(ndate.getMonth() + 1);
	//获取当前日
	var date = twomonthview(ndate.getDate());
	//获取当前时
	var hour = twomonthview(ndate.getHours());
	//获取当前分
	var minutes = twomonthview(ndate.getMinutes());
	//获取当前秒
	var second = twomonthview(ndate.getSeconds());
	
	//获取时间控件得到的时间
	var beginTime=year+"-"+month+"-"+date+" 00:00:00";	//当前日期的0点0分0秒开始
	
	
	var endTime=year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;		//当前时间结束

	//设置能耗查询请求参数
	var alarmClass=[];
	var alarmClassType=$("#tab_alarm_overview .hideput_build").val();
	alarmClass.push(alarmClassType);
	
	var jsonData =setJson(jsonData,"beginTime",beginTime);
		jsonData = setJson(jsonData,"endTime",endTime);
		//jsonData = setJson(jsonData,"ackState","unacked");
		jsonData = setJson(jsonData,"ackState","");
		jsonData = setJson(jsonData,"sourceState","normal");
		jsonData = setJson(jsonData,"alarmClass",alarmClass);	
		
		console.log(jsonData+"--------");

		$.ajax({
			type:'post',
			url:'/EasyEnergy/HistoryAlarmExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$("#tab_alarm_overview .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(11)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$("#tab_alarm_overview .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport("#tab_alarm_overview","实时报警Excel");
			}
		});

}

//选中报警分类
function choiceAlarm(id){
	$(id+" .floorList li").click(function(){
		var value=$(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(id+" .energy_build_name").html(value);		//顶部标题
		$(id+" .hideput_build").val(value);				//建筑隐藏域
		getAlarmOverview(id);		
	});
}


//报警响应
function ackReaAlarm(id,index){
	$(id+" .operaname").html("确定响应此条报警信息？");
	layer.open({
		type: 1,
		title:"提示",
		area: ['27rem', '14.6rem'], //宽高
		content:$(id+" .sure_box"),
	});
	
	$(id+" .sure_btn").click(function(){
		var uuids=[];
		uuids.push(index);
		var jsonData =setJson(jsonData,"requestCommand","each");
			jsonData = setJson(jsonData,"uuids",uuids);
			console.log(jsonData+"------");
		$.ajax({
			type:'post',
			url:'/EasyEnergy/AlarmAckCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data){
				console.log(data+"------");
				layer.closeAll();
				getAlarmOverview(id);
			}
		});		
	});
	
	$(id+" .rest_btn").click(function(){	
		layer.closeAll();
		getAlarmOverview(id);
		
	});
}

//报警删除
function delReaAlarm(id,index){
	$(id+" .operaname").html("确定删除此条报警信息？");
	layer.open({
		type: 1,
		title:"提示",
		area: ['27rem', '14.6rem'], //宽高
		content:$(id+" .sure_box"),
	});
	
	$(id+" .sure_btn").click(function(){	
		var uuids=[];
		uuids.push(index);
		var jsonData =setJson(jsonData,"requestCommand","froce");
			jsonData = setJson(jsonData,"uuids",uuids);
			console.log(jsonData+"------");
		$.ajax({
			type:'post',
			url:'/EasyEnergy/AlarmAckCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data){
				console.log(data+"------");
				layer.closeAll();
				getAlarmOverview(id);
			}
		});		
	});
	
	$(id+" .rest_btn").click(function(){	
		layer.closeAll();
		getAlarmOverview(id);
		
	});
	
	
}

/*********************************************************************************************************/

//点击报警历史
$("#choice_alarm_his").on("click",function(){
	choiceHisAlarm("#tab_alarm_history");
	alarmhistory();	//实时报警
});

function alarmhistory(){
	getAlarmhistory("#tab_alarm_history");	//实时报警
}

//报警历史调用接口	
function getAlarmhistory(id){
	//获取当前时间
	var ndate = new Date();
	//获取当前年份
	var year=ndate.getFullYear();
	//获取当前月
	var month = twomonthview(ndate.getMonth() + 1);
	//获取当前日
	var date = twomonthview(ndate.getDate());
	//获取当前时
	var hour = twomonthview(ndate.getHours());
	//获取当前分
	var minutes = twomonthview(ndate.getMinutes());
	//获取当前秒
	var second = twomonthview(ndate.getSeconds());
	
	var nowdate= year+"-"+month+"-"+date;
	
	//起始时间为时间控件得到的日期拼上时、分、秒
	var beginTime=$(id+" .calendarStart").val()+" 00:00:00";	//当前日期的0点0分0秒开始
	
	if(($(id+" .calendarEnd").val())==nowdate){
		var endTime=$(id+" .calendarEnd").val()+" "+hour+":"+minutes+":"+second;		//当前时间结束
	}else{
		var endTime=$(id+" .calendarEnd").val()+" 23:59:59";		//时间控件得到的日期拼上23时59分59秒
	}
	

	//设置能耗查询请求参数
	var alarmClass=[];
	var alarmClassType=$(id+" .hideput_build").val();
	alarmClass.push(alarmClassType);
	
	var jsonData =setJson(jsonData,"beginTime",beginTime);
		jsonData = setJson(jsonData,"endTime",endTime);
		jsonData = setJson(jsonData,"ackState","acked");
		jsonData = setJson(jsonData,"sourceState","normal");
		jsonData = setJson(jsonData,"alarmClass",alarmClass);	
		
		console.log(jsonData+"--------");
	$.ajax({
		type:'post',
		url:'/EasyEnergy/HistoryAlarmSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data){
			console.log(data+"------");
			getAlarmhistorytable(id,data);
			
		}

	});
}

//报警历史渲染表格
function getAlarmhistorytable(id,data){
	var data=strToJson(data);
	html = "<thead><tr class='text-center'><th>报警设备</th>"+
				"<th>报警位置</th>"+
				"<th>报警时间</th>"+
				"<th>报警信息</th>"+
				"<th>设备状态</th>"+
				"<th>响应个数</th>"+
				"<th>未响应个数</th>"+
				"<th>响应时间</th>"+
				"<th>响应状态</th>"+
				"</tr></thead><tbody>";
	if("items" in data){
		for (i = 0; i < data.items.length; i++) {
			if((data.items[i].sourceState)=="normal"){
				var sourceState="正常";
			}else if((data.items[i].sourceState)=="offnormal"){
				var sourceState="异常";
			}
			if((data.items[i].ackState)=="acked"){
				var ackState="已响应";
			}else if((data.items[i].ackState)=="unacked"){
				var ackState="未响应";
			}
			html+="<tr>"+
				"<td>"+data.items[i].source+"</td>"+
				"<td>"+data.items[i].alarmClass+"</td>"+
				"<td>"+data.items[i].timestamp+"</td>"+
				"<td>"+data.items[i].msgText+"</td>"+
				"<td>"+sourceState+"</td>"+
				"<td>"+data.items[i].ackNum+"</td>"+
				"<td>"+data.items[i].unAckNum+"</td>"+
				"<td>"+data.items[i].ackTime+"</td>"+
				"<td>"+ackState+"</td></tr>";
		}
	}else{
			html+="<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>";
	}
	
	html+="</tbody>";
	$(id+" table").html(html);
	tableForPages(id,8);	

}

//报警历史导出excel
function Alarmhistoryexcel(){
	//获取当前时间
	var ndate = new Date();
	//获取当前年份
	var year=ndate.getFullYear();
	//获取当前月
	var month = twomonthview(ndate.getMonth() + 1);
	//获取当前日
	var date = twomonthview(ndate.getDate());
	//获取当前时
	var hour = twomonthview(ndate.getHours());
	//获取当前分
	var minutes = twomonthview(ndate.getMinutes());
	//获取当前秒
	var second = twomonthview(ndate.getSeconds());
	
	//获取时间控件得到的时间
	var beginTime=year+"-"+month+"-"+date+" 00:00:00";	//当前日期的0点0分0秒开始
	
	
	var endTime=year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;		//当前时间结束

	//设置能耗查询请求参数
	var alarmClass=[];
	var alarmClassType=$("#tab_alarm_overview .hideput_build").val();
	alarmClass.push(alarmClassType);
	
	var jsonData =setJson(jsonData,"beginTime",beginTime);
		jsonData = setJson(jsonData,"endTime",endTime);
		jsonData = setJson(jsonData,"ackState","acked");
		jsonData = setJson(jsonData,"sourceState","normal");
		jsonData = setJson(jsonData,"alarmClass",alarmClass);	
		
		console.log(jsonData+"--------");

		$.ajax({
			type:'post',
			url:'/EasyEnergy/HistoryAlarmExportCmd',
			contentType:"application/text,charset=utf-8",
			data:jsonData,
			success:function(data) {
				var data=strToJson(data);
				if(data.responseCommand=='OK'){
					$("#tab_alarm_overview .energy_export_ul").empty().append("<li class='xsl_name'>"+data.requestCommand.substring(11)+"</li><li class='export_success'>导出成功</li>");
				}else{
					$("#tab_alarm_overview .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
				}
				excelExport("#tab_alarm_overview","报警历史Excel");
			}
		});

}

//选中报警分类
function choiceHisAlarm(id){
	$(id+" .floorList li").click(function(){
		var value=$(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(id+" .energy_build_name").html(value);		//顶部标题
		$(id+" .hideput_build").val(value);				//建筑隐藏域
	});
}


/*********************************************************************************************************/
/*点击成本中心，初始化账单报表，调用账单报表诊断查询 */
$(".cost").on("click",function(){
	getEnergyTree("#tab_billing_statement",19);//动态渲染楼座和分区
	billingstatement();	//账单报表
	nowTimeIni();//初始化时间
	nowMonthOne();//初始起始时间
});

/*点击账单报表，初始账单报表，调用账单报表查询 */
$("#billing_statement").on("click",function(){
	getEnergyTree("#tab_billing_statement",19);//动态渲染楼座和分区
	billingstatement();	//账单报表
	nowTimeIni();//初始化时间
	nowMonthOne();//初始起始时间
});

//账单报表查询
function billingstatement(){
	
	getEnergyTree("#tab_billing_statement",20);
	
}

//账单报表查询调用接口	
function getbillingstatement(id,data){
	
	var itemname=$(id+" .itemsdown a span:first-child").html();
	
	var buildindex=getBuildindex(id);
	var ndate = new Date();
	var year=ndate.getFullYear();
	var month = twomonthview(ndate.getMonth() + 1);
	var date = twomonthview(ndate.getDate());
	//当前时间的年月日
	var nowDate=year+"-"+month+"-"+date;

	//获取时间控件得到的时间
	var sta_time=$(id+" .calendarStart").val();
	var end_time=$(id+" .calendarEnd").val()

	//给起始时间拼上时、分、秒
	var beginTime=sta_time+" 00:00:00";
	//判断结束时间，若是等于当前时间，则拼上当前时间的时分秒，若不是当前时间，则拼上23点59分59秒
	if(end_time==nowDate){
		var endTime=end_time+" "+twomonthview(ndate.getHours())+":"+twomonthview(ndate.getMinutes())+":"+twomonthview(ndate.getSeconds());
	}else{
		var endTime=end_time+" 23:59:59";
	}
	
	var interval="day";
	
	//设置能耗查询请求参数
	var jsonData = setJson(null,"requestCommand","Sum");
	jsonData = setJson(jsonData,"responseCommand","");
	jsonData = setJson(jsonData,"beginTime",beginTime);
	jsonData = setJson(jsonData,"endTime",endTime);
	jsonData = setJson(jsonData,"queryType","Money");
	jsonData = setJson(jsonData,"interval",interval);
	
	var items=[];
	var data = strToJson(data);
	
	var itemname=$(id+" .itemsdown a span:first-child").html();
	if(itemname=="租户用电"){
		item0={};
		item0.name=data.roots[1].items[0].items[buildindex].name;
		item0.ord=data.roots[1].items[0].items[buildindex].ord;
		items.push(item0);
	}else if(itemname=="租户用水"){
		item0={};
		item0.name=data.roots[4].items[0].items[buildindex].name;
		item0.ord=data.roots[4].items[0].items[buildindex].ord;
		items.push(item0);
	}else if(itemname=="公区用水"){
		item0={};
		item0.name=data.roots[4].items[1].items[buildindex].name;
		item0.ord=data.roots[4].items[1].items[buildindex].ord;
		items.push(item0);
	}else if(itemname=="燃气用量"){
		item0={};
		item0.name=data.roots[7].items[0].items[buildindex].name;
		item0.ord=data.roots[7].items[0].items[buildindex].ord;
		items.push(item0);
	}else if(itemname=="公区用电"){
		for(i=1;i<6;i++){
		item={};
		item.name=data.roots[1].items[i].items[buildindex].name;
		item.ord=data.roots[1].items[i].items[buildindex].ord;
		items.push(item);
		}
		
	}
	jsonData = setJson(jsonData,"items",items);
	
	console.log(jsonData+"--------");
	
	//请求接口
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergySearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
			
			console.log(data+"------");
			//getbillingstatementtable(id,data,itemname);
			
			
		}
	});
	
	
		
		
		
}

//账单报表渲染表格
function getbillingstatementtable(id,data,itemname){

	var data = strToJson(data);
	html = "<thead><tr class='text-center'><th>建筑</th>";
	
	for (i = 0; i < data.items.length; i++) {
		html += "<th>" + (data.items[i].timestamp).substring(8)+ "</th>";
	}
	
	html += "</tr></thead><tbody>";
	var stanvalue=150;
	for (j = 0; j < data.items[0].pairs.length; j++) {
		html+="<tr><td>"+data.items[0].pairs[j].name+"</td><td>"+stanvalue+"</td>";
		for (i = 0; i < data.items.length; i++) {
			if((data.items[i].pairs[j].value)>stanvalue){
				html += "<td style='color:red;'>" + data.items[i].pairs[j].value+ "</td>";
			}else{
				html += "<td>" + data.items[i].pairs[j].value+ "</td>";
			}
			
			}
		html+="</tr>";	
	}
	
	html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,8);	
}


/*************************************************************************************************/

//点击账单模板
$("#cost_template").on("click",function(){
	costtemplate();
});

function costtemplate(){
	getCostTemplate("#tab_cost_template");//获取账单模板
}

//调用账单模板查询接口
function getCostTemplate(id){
	var sBuildName=$(id+" .hideput_build").val();
	var sEnergyType=$(id+" .itemdown a span:first-child").html();
	$.ajax({
		type:'post',
		url:'http://120.76.24.134:8080/yuanyang/housMeter/page',
		data:{sBuildName:sBuildName,sEnergyType:sEnergyType},
		success:function(data) {
			console.log(JSON.stringify(data)+"------");
			getCostTemplateTable(id,data);
		}
	});
}

//账单模板渲染表格
function getCostTemplateTable(id,data){
	
	var html="";
		html+="<thead><tr class='text-center'><th><input type='checkbox'/>选择</th><th>模板编号</th><th>项目编号</th><th>房产编号</th>"+
		"<th>建筑名称</th><th>业户编号</th><th>业户名称</th><th>业户地址</th><th>收费项目名称</th>"+
		"<th>电表编号</th><th>单价</th><th>备注</th><th class='btn_wid5'>操作</th></tr></thead><tbody>";
		for(i=0;i<data.length;i++){
			if((data[i].sRemarks)!=null){
				var	sRemarks=data[i].sRemarks;
			}else{
				var	sRemarks="";
			}
			html+="<tr><td><input type='checkbox'></td><td>"+data[i].sCode+"</td>"+
						  "<td>"+data[i].sProjectCode+"</td>"+
						  "<td>"+data[i].sHouseCode+"</td>"+
						  "<td>"+data[i].sBuildName+"</td>"+
						  "<td>"+data[i].sOwnerCode+"</td>"+
						  "<td>"+data[i].sOwnerName+"</td>"+
						  "<td>"+data[i].sOwnerPos+"</td>"+
						  "<td>"+data[i].sPricProName+"</td>"+
						  "<td>"+data[i].sMeterCode+"</td>"+
						  "<td>"+data[i].sEnergyPrice+"</td>"+
						  "<td>"+sRemarks+"</td>"+
						  "<td><button type='button' onclick=findOneTemplate('"+data[i].sCode+"') class='btn_edit modify btn_equip_edit' data-toggle='modal' data-target='#editOwnerModal'><span class='tabPic btn_name'>编辑</span></button></td>></tr>";
		}
		html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,6);
	checkAllOrNot(id)	
}

//查询单个账单模板
function findOneTemplate(sCode){
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/housMeter/findOne",
		dataType: 'jsonp',
		data :{sCode:sCode},
		success : function(data) {
			$("#tab_cost_template .hideput_build").val(data.sBuildName);
			$("#tab_cost_template .itemdown a span:first-child").html(data.sEnergyType);
			
			$("#editOwnerModal .sCode").val(data.sCode);
			$("#editOwnerModal .sProjectCode").val(data.sProjectCode);
			$("#editOwnerModal .sHouseCode").val(data.sHouseCode);
			$("#editOwnerModal .sOwnerCode").val(data.sOwnerCode);
			$("#editOwnerModal .sOwnerName").val(data.sOwnerName);
			$("#editOwnerModal .sOwnerPos").val(data.sOwnerPos);
			$("#editOwnerModal .sPricProName").val(data.sPricProName);
			$("#editOwnerModal .sMeterCode").val(data.sMeterCode);
			$("#editOwnerModal .sEnergyPrice").val(data.sEnergyPrice);
			$("#editOwnerModal .sRemarks").val(data.sRemarks);	

			}
		});
	
}

//添加单个模板
$("#addOwnerModal .btn_sure").click(function(){
	var sBuildName=$("#tab_cost_template .hideput_build").val();
	var sEnergyType=$("#tab_cost_template .itemdown a span:first-child").html();

	var sProjectCode=$("#addOwnerModal .sProjectCode").val();
	var sHouseCode=$("#addOwnerModal .sHouseCode").val();
	var sOwnerCode=$("#addOwnerModal .sOwnerCode").val();
	var sOwnerName=$("#addOwnerModal .sOwnerName").val();
	var sOwnerPos=$("#addOwnerModal .sOwnerPos").val();
	var sPricProName=$("#addOwnerModal .sPricProName").val();
	var sMeterCode=$("#addOwnerModal .sMeterCode").val();
	var sEnergyPrice=$("#addOwnerModal .sEnergyPrice").val();
	var sRemarks=$("#addOwnerModal .sRemarks").val();
	
	
	
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/housMeter/add",
		dataType: 'jsonp',
		data :{sBuildName:sBuildName,
			sEnergyType:sEnergyType,
			sProjectCode:sProjectCode,
			sHouseCode:sHouseCode,
			sOwnerCode:sOwnerCode,
			sOwnerName:sOwnerName,
			sOwnerPos:sOwnerPos,
			sPricProName:sPricProName,
			sMeterCode:sMeterCode,
			sEnergyPrice:sEnergyPrice,
			sRemarks:sRemarks},
		success : function(data) {
			costtemplate();
		}
	});
	$("#addOwnerModal input").val("");
	
});

//修改模板
$("#editOwnerModal .btn_sure").click(function(){
	
	var sBuildName=$("#tab_cost_template .hideput_build").val();
	var sEnergyType=$("#tab_cost_template .itemdown a span:first-child").html();
	
	var sCode=$("#editOwnerModal .sCode").val();
	var sProjectCode=$("#editOwnerModal .sProjectCode").val();
	var sHouseCode=$("#editOwnerModal .sHouseCode").val();
	var sOwnerCode=$("#editOwnerModal .sOwnerCode").val();
	var sOwnerName=$("#editOwnerModal .sOwnerName").val();
	var sOwnerPos=$("#editOwnerModal .sOwnerPos").val();
	var sPricProName=$("#editOwnerModal .sPricProName").val();
	var sMeterCode=$("#editOwnerModal .sMeterCode").val();
	var sEnergyPrice=$("#editOwnerModal .sEnergyPrice").val();
	var sRemarks=$("#editOwnerModal .sRemarks").val();
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/housMeter/edit",
		data :{sCode:sCode,
			sBuildName:sBuildName,
			sEnergyType:sEnergyType,
			sProjectCode:sProjectCode,
			sHouseCode:sHouseCode,
			sOwnerCode:sOwnerCode,
			sOwnerName:sOwnerName,
			sOwnerPos:sOwnerPos,
			sPricProName:sPricProName,
			sMeterCode:sMeterCode,
			sEnergyPrice:sEnergyPrice,
			sRemarks:sRemarks},
		success : function(data) {
			costtemplate();
		}
	});
	cleanPrice();
});

//取消添加模板
$("#addOwnerModal .btn_reset").click(function(){
	$("#addOwnerModal input").val("");
});

//删除模板
$("#delOwnerModal .btn_sure").click(function(){
	
	var chichecks=$("#tab_cost_template table tbody input[type='checkbox']:checked");
	//创建一个集合
	var arrysCode=[];
	for ( var i = 0; i < chichecks.length; i++) {
		arrysCode[i]=chichecks.eq(i).parent().next().html();
	}	
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/housMeter/delAll",
		data :{arrysCode:arrysCode},
		success : function(data) {
			costtemplate();
		}
	});
});


//查看能耗单价	
$("#tab_cost_template .btn_modify").click(function(){
	
	var sBuildName=$("#tab_cost_template .hideput_build").val();
	var sEnergyType=$("#tab_cost_template .itemdown a span:first-child").html();
	$.ajax({
		type:'post',
		url:'http://120.76.24.134:8080/yuanyang/housMeter/findPrice',
		data:{sBuildName:sBuildName,sEnergyType:sEnergyType},
		success:function(data) {
			$("#editPriceModal .sEnergyPrice").val(data);
			
		}
	});
	
});

//批量修改能耗价格
$("#editPriceModal .btn_sure").click(function(){
	var sBuildName=$("#tab_cost_template .hideput_build").val();
	var sEnergyType=$("#tab_cost_template .itemdown a span:first-child").html();
	var sEnergyPrice=$("#editPriceModal .sEnergyPrice").val();
	$.ajax({
		type:'post',
		url:'http://120.76.24.134:8080/yuanyang/housMeter/editAll',
		data:{sBuildName:sBuildName,sEnergyType:sEnergyType,sEnergyPrice:sEnergyPrice},
		success:function(data) {
			costtemplate();
			
		}
	});
});


//点击输入框选择文件
$("#leadInOwnerModal .choiceexcel").click(function(){
	$('input[class=Ownerfile]').click();
});

//选择文件，将文件名显示在输入框
$("input[class=Ownerfile]").change(function() { 
$("#leadInOwnerModal .choiceexcel").val($(this).val());  
});  

//点击上传文件
$("#leadInOwnerModal .btn_sure").click(function(){
	//创建FormData()对象
	var formdata =  new FormData();
	//根据class获取file
	var file = $("#leadInOwnerModal .Ownerfile");
	//将file添加到foemData()对象
	formdata.append("file",file[0].files[0]);
	//创建一个XMLHttpRequest()
	var oReq = new XMLHttpRequest();
	oReq.open("POST", "http://120.76.24.134:8080/yuanyang/housMeter/upExcel", true);
	oReq.onload = function(oEvent) {
		if (oReq.status == 200) {
			
		} else {
			
		}
	};
		oReq.send(formdata); 
	costtemplate();
});


//导出excel
$("#leadOutOwnerModal").click(function(){
	var sBuildName=$("#tab_cost_template .hideput_build").val();
	var sEnergyType=$("#tab_cost_template .itemdown a span:first-child").html();
	$.ajax({
		type:'post',
		url:'http://120.76.24.134:8080/yuanyang/housMeter/exportExcel',
		data:{sBuildName:sBuildName,sEnergyType:sEnergyType},
		success:function(data) {
			if(data.ResultState==true){
				$("#tab_cost_template .energy_export_ul").empty().append("<li class='xsl_name'>"+data.ResultMsg+"</li><li class='export_success'>导出成功</li>");
			}else{
				$("#tab_cost_template .energy_export_ul").empty().append("<li class='export_error'>导出Excel失败</li>");
			}
				excelExport("#tab_cost_template","账单模板Excel");
		}
	});
});

/*点击设施运维*/
$(".operation").click(function(){
	equipmentledger();
});

/*点击设备台账*/
$("#equipment_ledger").click(function(){
	equipmentledger();
});

//设备台账查询
function equipmentledger(){
	getequipmentledger("#tab_equipment_ledger");
}


//调用设备台账查询接口
function getequipmentledger(id){
	var sBuildName=$(id+" .hideput_build").val();
	var sEquipName=$(id+" .input_put").val();
	$.ajax({
		type:'post',
		url:'http://120.76.24.134:8080/yuanyang/equipment/page',
		data:{sBuildName:sBuildName,sEquipName:sEquipName},
		success:function(data) {
			console.log(JSON.stringify(data)+"------");
			getequipmentledgerTable(id,data);
		}
	});	
}

//设备台账渲染表格
function  getequipmentledgerTable(id,data){	
	var html="";
		html+="<thead><tr class='text-center'><th><input type='checkbox'/>选择</th><th>设备编号</th><th>设备名称</th><th>设备品牌</th>"+
		"<th>设备系统</th><th>设备位置</th><th>设备状态</th><th>设备二维码</th>"+
		"<th>维保类型</th><th>备注</th><th colspan='2'>操作</th></tr></thead><tbody>";
		for(i=0;i<data.length;i++){
			if((data[i].sRemarks)!=null){
				var	sRemarks=data[i].sRemarks;
			}else{
				var	sRemarks="";
			}
			html+="<tr><td><input type='checkbox'></td><td>"+data[i].sEquipCode+"</td>"+
						  "<td>"+data[i].sEquipName+"</td>"+
						  "<td>"+data[i].sEquipBrand+"</td>"+
						  "<td>"+data[i].sEquipSystem+"</td>"+
						  "<td>"+data[i].sEquipPos+"</td>"+
						  "<td>"+data[i].sEquipState+"</td>"+
						  "<td>"+data[i].sQRCode+"</td>"+
						  "<td>"+data[i].sMainteType+"</td>"+
						  "<td>"+sRemarks+"</td>"+
						  "<td><button type='button' onclick=findOneEquip('"+data[i].sCode+"') class='btn_edit modify btn_equip_edit' data-toggle='modal' data-target='#editEquipModal'><span class='tabPic btn_name'>编辑</span></button></td>"+
						  "<td><button type='button' onclick=delEquip('"+data[i].sCode+"') class='btn_del delete btn_equip_del' data-toggle='modal' data-target='#delEquipModal'><span class='tabPic btn_name'>删除</span></button></td>></tr>";
		}
		html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,6);
	checkAllOrNot(id)	
}

//点击编辑设备台账
function  findOneEquip(sCode){
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/equipment/findOne",
		data :{sCode:sCode},
		success : function(data) {
			$("#editEquipModal .sEquipCode").val(data.sEquipCode);
			$("#editEquipModal .sEquipName").val(data.sEquipName);
			$("#editEquipModal .sEquipBrand").val(data.sEquipBrand);
			$("#editEquipModal .sEquipSystem").val(data.sEquipSystem);
			$("#editEquipModal .sEquipPos").val(data.sEquipPos);
			$("#editEquipModal .sEquipState").val(data.sEquipState);
			$("#editEquipModal .equip_main_li a span:first-child").html(data.sMainteType);
			$("#editEquipModal .sRemarks").val(data.sRemarks);
			$("#editEquipModal .sCode").val(data.sCode);
		}
	});
}


//点击确定编辑设备台账
$("#editEquipModal .btn_sure").click(function(){
	var sCode=$("#editEquipModal .sCode").val();
	var sBuildName=$("#tab_cost_template .hideput_build").val();
	var sMainteType=$("#tab_cost_template .itemdown a span:first-child").html();
	var sEquipCode=$("#editEquipModal .sEquipCode").val();
	var sEquipName=$("#editEquipModal .sEquipName").val();
	var sEquipBrand=$("#editEquipModal .sEquipBrand").val();
	var sEquipSystem=$("#editEquipModal .sEquipSystem").val();
	var sEquipPos=$("#editEquipModal .sEquipPos").val();
	var sEquipState=$("#editEquipModal .sEquipState").val();
	var sRemarks=$("#editEquipModal .sRemarks").val();
	
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/equipment/edit",
		data :{sCode:sCode,
			sBuildName:sBuildName,
			sMainteType:sMainteType,
			sEquipCode:sEquipCode,
			sEquipName:sEquipName,
			sEquipBrand:sEquipBrand,
			sEquipPos:sEquipPos,
			sEquipSystem:sEquipSystem,
			sEquipState:sEquipState,
			sRemarks:sRemarks},
		success : function(data) {
			equipmentledger();
		}
	});
});





//生成二维码
function producesQRCode(id,code,name){
	var url=code+"|"+name;
	var str=utf16to8(url);
	var qr = qrcode(9, 'M');
	qr.addData(str);
	qr.make();
	var dom=document.createElement('DIV');
	dom.innerHTML = qr.createImgTag();
	var element=document.getElementById(id);
	element.appendChild(dom);
}


/***************************************************************************************************/
//点击查看水表信息
$("#watermater_into").on("click",function(){
	nowMonthOne();
	getwatermatervalue();
});

//点击查看气表信息
$("#gassmater_into").on("click",function(){

	nowMonthOne();
	getgassmatervalue();

});
//调用录入水表函数
function getwatermatervalue(){
	getmatervalue("#tab_watermater_into","租户用水");
}
//调用录入燃气表函数
function getgassmatervalue(){
	getmatervalue("#tab_gassmater_into","燃气用量");
}
//调用查询接口
function getmatervalue(id,sEnergyType){
	var sBuildName=$(id+" .hideput_build").val();
	var dSTartTime=$(id+" .calendarStart").val();
	var dEndTime=$(id+" .calendarEnd").val();
	$.ajax({
		type:'post',
		url:'http://120.76.24.134:8080/yuanyang/meterRead/page',
		data:{sBuildName:sBuildName,sEnergyType:sEnergyType,dSTartTime:dSTartTime,dEndTime:dEndTime},
		success:function(data) {
			console.log(JSON.stringify(data)+"------");
			getmatervalueTable(id,data,sEnergyType);
		}
	});
}

//渲染录入查询电表表格
function getmatervalueTable(id,data,sEnergyType){
	
	var html="";
	html+="<thead><tr class='text-center'><th>录入编号</th><th>电表编号</th><th>电表位置</th>"+
		"<th>抄表类型</th><th>抄表值</th><th>抄表时间</th><th>备注</th><th colspan='2'>操作</th></tr></thead><tbody>";
		for(i=0;i<data.length;i++){
			if((data[i].sRemarks)!=null){
				var	sRemarks=data[i].sRemarks;
			}else{
				var	sRemarks="";
			}
			html+="<tr><td>"+data[i].sCode+"</td>"+
						  "<td>"+data[i].sMeterCode+"</td>"+
						  "<td>"+data[i].sMeterPos+"</td>"+
						  "<td>"+data[i].sMeterReadType+"</td>"+
						  "<td>"+data[i].sMeterReadVlue+"</td>"+
						  "<td>"+data[i].dMeterReadDate+"</td>"+
						  "<td>"+sRemarks+"</td>";
			if(sEnergyType=="燃气用量"){
				html+="<td class='btn_wid5'><button type='button' onclick=editGassMeter('"+data[i].sCode+"') class='btn_edit modify btn_equip_edit' data-toggle='modal' data-target='#deitGassMeterModal'><span class='tabPic btn_name'>编辑</span></button></td>>"+
						  "<td class='btn_wid5'><button type='button' onclick=delGassMeter('"+data[i].sCode+"') class='btn_del delete btn_equip_del' data-toggle='modal' data-target='#delGassMeterModal'><span class='tabPic btn_name'>删除</span></button></td>></tr>";  
			}else if(sEnergyType=="租户用水"){
				html+="<td class='btn_wid5'><button type='button' onclick=editWaterMeter('"+data[i].sCode+"') class='btn_edit modify btn_equip_edit' data-toggle='modal' data-target='#deitGassMeterModal'><span class='tabPic btn_name'>编辑</span></button></td>>"+
						  "<td class='btn_wid5'><button type='button' onclick=delWaterMeter('"+data[i].sCode+"') class='btn_del delete btn_equip_del' data-toggle='modal' data-target='#delGassMeterModal'><span class='tabPic btn_name'>删除</span></button></td>></tr>";  
			}
			
		}
		html+="</tbody>";
	$(id+" table").empty().html(html);
	tableForPages(id,6);
}

//添加燃气表
$("#addGassMeterModal .btn_sure").click(function(){
	var sBuildName=$("#tab_gassmater_into .hideput_build").val();
	var sMeterCode=$("#addGassMeterModal .sMeterCode").val();
	var sMeterPos=$("#addGassMeterModal .sMeterPos").val();
	var sEnergyType="燃气用量";
	var sMeterReadType="燃气抄表";
	var sMeterReadVlue=$("#addGassMeterModal .sMeterReadVlue").val();
	var dMeterReadDate=$("#addGassMeterModal .dMeterReadDate").val();
	var sRemarks=$("#addGassMeterModal .sRemarks").val();
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/meterRead/add",
		data :{sBuildName:sBuildName,
			sMeterCode:sMeterCode,
			sMeterPos:sMeterPos,
			sEnergyType:sEnergyType,
			sMeterReadType:sMeterReadType,
			sMeterReadVlue:sMeterReadVlue,
			dMeterReadDate:dMeterReadDate,
			sRemarks:sRemarks},
		success : function(data) {
			getgassmatervalue();
		}
	});
	$("#addGassMeterModal input").val("");
	
});

//添加水表
$("#addWaterMeterModal .btn_sure").click(function(){
	var sBuildName=$("#tab_watermater_into .hideput_build").val();
	var sMeterCode=$("#addWaterMeterModal .sMeterCode").val();
	var sMeterPos=$("#addWaterMeterModal .sMeterPos").val();
	var sEnergyType="租户用水";
	var sMeterReadType="租户用水抄表";
	var sMeterReadVlue=$("#addWaterMeterModal .sMeterReadVlue").val();
	var dMeterReadDate=$("#addWaterMeterModal .dMeterReadDate").val();
	var sRemarks=$("#addWaterMeterModal .sRemarks").val();
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/meterRead/add",
		data :{sBuildName:sBuildName,
			sMeterCode:sMeterCode,
			sMeterPos:sMeterPos,
			sEnergyType:sEnergyType,
			sMeterReadType:sMeterReadType,
			sMeterReadVlue:sMeterReadVlue,
			dMeterReadDate:dMeterReadDate,
			sRemarks:sRemarks},
		success : function(data) {
			getwatermatervalue();
		}
	});
	$("#addWaterMeterModal input").val("");

});

//取消添加燃气表
$("#addGassMeterModal .btn_reset").click(function(){
	$("#addGassMeterModal input").val("");
});

//取消添加水表
$("#addWaterMeterModal .btn_reset").click(function(){
	$("#addWaterMeterModal input").val("");
});

//点击删除
function delGassMeter(sCode){
	$("#delGassMeterModal .sCode").val(sCode);
}

//点击删除
function delWaterMeter(sCode){
	$("#delWaterMeterModal .sCode").val(sCode);
}

//点击确定删除燃气表
$("#delGassMeterModal .btn_sure").click(function(){
	var sCode=$("#delGassMeterModal .sCode").val();
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/meterRead/del",
		data :{sCode:sCode},
		success : function(data) {
			getgassmatervalue();
		}
	});
});

//点击确定删除水表
$("#delWaterMeterModal .btn_sure").click(function(){
	var sCode=$("#delWaterMeterModal .sCode").val();
	var sEnergyType="租户用水";
	var sBuildName=$("#tab_watermater_into .hideput_build").val();
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/meterRead/del",
		data :{sCode:sCode},
		success : function(data) {
			getwatermatervalue();
		}
	});
});

//点击修改燃气表
function editGassMeter(sCode){
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/meterRead/findOne",
		data :{sCode:sCode},
		success : function(data) {
			$("#deitGassMeterModal .sCode").val(data.sCode);
			$("#deitGassMeterModal .sMeterCode").val(data.sMeterCode);
			$("#deitGassMeterModal .sMeterPos").val(data.sMeterPos);
			$("#deitGassMeterModal .sMeterReadVlue").val(data.sMeterReadVlue);
			$("#deitGassMeterModal .dMeterReadDate").val(data.dMeterReadDate);
			$("#deitGassMeterModal .sRemarks").val(data.sRemarks);
		}
	});
	
}

//点击修改水表
function editWaterMeter(sCode){
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/meterRead/findOne",
		data :{sCode:sCode},
		success : function(data) {
			$("#deitWaterMeterModal .sCode").val(data.sCode);
			$("#deitWaterMeterModal .sMeterCode").val(data.sMeterCode);
			$("#deitWaterMeterModal .sMeterPos").val(data.sMeterPos);
			$("#deitWaterMeterModal .sMeterReadVlue").val(data.sMeterReadVlue);
			$("#deitWaterMeterModal .dMeterReadDate").val(data.dMeterReadDate);
			$("#deitWaterMeterModal .sRemarks").val(data.sRemarks);
		}
	});

}

//点击确定修改燃气表
$("#deitGassMeterModal .btn_sure").click(function(){
	var sBuildName=$("#tab_gassmater_into .hideput_build").val();
	var sMeterCode=$("#deitGassMeterModal .sMeterCode").val();
	var sMeterPos=$("#deitGassMeterModal .sMeterPos").val();
	var sEnergyType="燃气用量";
	var sMeterReadType="燃气抄表";
	var sMeterReadVlue=$("#deitGassMeterModal .sMeterReadVlue").val();
	var dMeterReadDate=$("#deitGassMeterModal .dMeterReadDate").val();
	var sRemarks=$("#deitGassMeterModal .sRemarks").val();
	var sCode=$("#deitGassMeterModal .sCode").val();
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/meterRead/edit",
		data :{sBuildName:sBuildName,
			sMeterCode:sMeterCode,
			sMeterPos:sMeterPos,
			sEnergyType:sEnergyType,
			sMeterReadType:sMeterReadType,
			sMeterReadVlue:sMeterReadVlue,
			dMeterReadDate:dMeterReadDate,
			sRemarks:sRemarks,
		sCode:sCode},
		success : function(data) {
			getgassmatervalue();
		}
	});
	$("#addGassMeterModal input").val("");
});

//点击确定修改水表
$("#deitWaterMeterModal .btn_sure").click(function(){
	var sBuildName=$("#tab_watermater_into .hideput_build").val();
	var sMeterCode=$("#deitWaterMeterModal .sMeterCode").val();
	var sMeterPos=$("#deitWaterMeterModal .sMeterPos").val();
	var sEnergyType="租户用水";
	var sMeterReadType="租户用水抄表";
	var sMeterReadVlue=$("#deitWaterMeterModal .sMeterReadVlue").val();
	var dMeterReadDate=$("#deitWaterMeterModal .dMeterReadDate").val();
	var sRemarks=$("#deitWaterMeterModal .sRemarks").val();
	var sCode=$("#deitWaterMeterModal .sCode").val();
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/meterRead/edit",
		data :{sBuildName:sBuildName,
			sMeterCode:sMeterCode,
			sMeterPos:sMeterPos,
			sEnergyType:sEnergyType,
			sMeterReadType:sMeterReadType,
			sMeterReadVlue:sMeterReadVlue,
			dMeterReadDate:dMeterReadDate,
			sRemarks:sRemarks,
			sCode:sCode},
		success : function(data) {
			getwatermatervalue();
		}
	});
	$("#addWaterMeterModal input").val("");
});

/********************************************************************************************/

//点击输入框选择文件------水表
$("#leadInWaterMeterModal .choiceexcel").click(function(){
	$('input[class=Waterfile]').click();
});

//选择文件，将文件名显示在输入框------水表
$("input[class=Waterfile]").change(function() {
	$("#leadInWaterMeterModal .choiceexcel").val($(this).val());
});

//点击上传文件------水表
$("#leadInWaterMeterModal .btn_sure").click(function(){
	var sBuildName=$("#tab_watermater_into .hideput_build").val();
	var sEnergyType="租户用水";
	//创建FormData()对象
	var formdata =  new FormData();
	//根据class获取file
	var file = $("#leadInWaterMeterModal .Waterfile");
	//将file添加到foemData()对象
	formdata.append("file",file[0].files[0]);
	//创建一个XMLHttpRequest()
	var oReq = new XMLHttpRequest();
	oReq.open("POST", "http://120.76.24.134:8080/yuanyang/meterRead/upExcel", true);
	oReq.onload = function(oEvent) {
		if (oReq.status == 200) {

		} else {

		}
	};
	oReq.send(formdata);
	getmatervalue("#tab_watermater_into",sBuildName,sEnergyType);
});

/********************************************************************************************/
//点击输入框选择文件------燃气表
$("#leadInGassMeterModal .choiceexcel").click(function(){
	$('input[class=Gassfile]').click();
});

//选择文件，将文件名显示在输入框------燃气表
$("input[class=Gassfile]").change(function() {
	$("#leadInGassMeterModal .choiceexcel").val($(this).val());
});

//点击上传文件------燃气表
$("#leadInGassMeterModal .btn_sure").click(function(){
	var sBuildName=$("#tab_gassmater_into .hideput_build").val();
	var sEnergyType="燃气用量";
	//创建FormData()对象
	var formdata =  new FormData();
	//根据class获取file
	var file = $("#leadInGassMeterModal .Gassfile");
	//将file添加到foemData()对象
	formdata.append("file",file[0].files[0]);
	//创建一个XMLHttpRequest()
	var oReq = new XMLHttpRequest();
	oReq.open("POST", "http://120.76.24.134:8080/yuanyang/meterRead/upExcel", true);
	oReq.onload = function(oEvent) {
		if (oReq.status == 200) {

		} else {

		}
	};
	oReq.send(formdata);
	getmatervalue("#tab_gassmater_into",sBuildName,sEnergyType);
});

/****************************************************************************************/
//点击查看建筑信息
$("#building_information").on("click",function(){
	buildinginfo("B03-A座");
});	

$("#tab_building_information .floorList li").click(function(){
	    var value=$(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$("#tab_building_information .energy_build_name").html(value);
		buildinginfo(value);
});

//查询建筑信息
function buildinginfo(sBuildName){
	getBuildinginfo("#tab_building_information",sBuildName);
}

//调用建筑查询接口
function getBuildinginfo(id,sBuildName){
	$.ajax({
		type:'post',
		url:'http://120.76.24.134:8080/yuanyang/build/findOne',
		data:{sBuildName:sBuildName},
		success:function(data) {
			console.log(JSON.stringify(data)+"------");
			getBuildTable(id,data);
		}
	});
}

//建筑查询渲染表格
function getBuildTable(id,data){
	//渲染修改模态
	$("#editBuildInfoModal .sBuildCode").val(data.sBuildCode);
	$("#editBuildInfoModal .sBuildName").val(data.sBuildName);
	$("#editBuildInfoModal .sBuildAdrees").val(data.sBuildAdrees);
	$("#editBuildInfoModal .sBuildDate").val(data.sBuildDate);
	$("#editBuildInfoModal .sBuildShaco").val(data.sBuildShaco);
	$("#editBuildInfoModal .sBuildStru").val(data.sBuildStru);
	$("#editBuildInfoModal .sWallMater").val(data.sWallMater);
	$("#editBuildInfoModal .sWallheat").val(data.sWallheat);
	$("#editBuildInfoModal .sframeType").val(data.sframeType);
	$("#editBuildInfoModal .sGlassType").val(data.sGlassType);
	$("#editBuildInfoModal .sframeMater").val(data.sframeMater);
	$("#editBuildInfoModal .sFloorCount").val(data.sFloorCount);
	$("#editBuildInfoModal .sBuildfun").val(data.sBuildfun);
	$("#editBuildInfoModal .sBuildAcreage").val(data.sBuildAcreage);
	$("#editBuildInfoModal .sAirSystem").val(data.sAirSystem);
	$("#editBuildInfoModal .sHeatSystem").val(data.sHeatSystem);
	
	//渲染表格
		html="";
		html+="<thead><tr class='text-center'><th>名称</th><th>内容</th></tr></thead>";
		html+="<tbody><tr><td>建筑名称</td><td>"+data.sBuildName+"</td></tr>";
		html+="<tr><td>建筑地址</td><td>"+data.sBuildAdrees+"</td></tr>";
		html+="<tr><td>建筑年代</td><td>"+data.sBuildDate+"</td></tr>";
		html+="<tr><td>建筑体型系数</td><td>"+data.sBuildShaco+"</td></tr>";
		html+="<tr><td>建筑结构形式</td><td>"+data.sBuildStru+"</td></tr>";
		html+="<tr><td>建筑外墙材料形式</td><td>"+data.sWallMater+"</td></tr>";
		html+="<tr><td>建筑外墙保温形式</td><td>"+data.sWallheat+"</td></tr>";
		html+="<tr><td>建筑外窗类型</td><td>"+data.sframeType+"</td></tr>";
		html+="<tr><td>建筑玻璃类型</td><td>"+data.sGlassType+"</td></tr>";
		html+="<tr><td>窗框材料类型</td><td>"+data.sframeMater+"</td></tr>";
		html+="<tr><td>建筑层数</td><td>"+data.sFloorCount+"</td></tr>";
		html+="<tr><td>建筑功能</td><td>"+data.sBuildfun+"</td></tr>";
		html+="<tr><td>建筑面积</td><td>"+data.sBuildAcreage+"</td></tr>";
		html+="<tr><td>建筑空调系统形式</td><td>"+data.sAirSystem+"</td></tr>";
		html+="<tr><td>建筑采暖系统形式</td><td>"+data.sHeatSystem+"</td></tr>";
		html+="<tr><td>填表日期</td><td>"+data.dLastDate+"</td></tr></tbody>";
		$(id+" table").empty().html(html);
		tableForPages(id,8);	
}

//添加建筑信息 
$("#addBuildInfoModal .btn_sure").click(function(){
	var sBuildName=$("#addBuildInfoModal .sBuildName").val();
	var sBuildAdrees=$("#addBuildInfoModal .sBuildAdrees").val();
	var sBuildDate=$("#addBuildInfoModal .sBuildDate").val();
	var sBuildShaco=$("#addBuildInfoModal .sBuildShaco").val();
	var sBuildStru=$("#addBuildInfoModal .sBuildStru").val();
	var sWallMater=$("#addBuildInfoModal .sWallMater").val();
	var sWallheat=$("#addBuildInfoModal .sWallheat").val();
	var sframeType=$("#addBuildInfoModal .sframeType").val();
	var sGlassType=$("#addBuildInfoModal .sGlassType").val();
	var sframeMater=$("#addBuildInfoModal .sframeMater").val();
	var sFloorCount=$("#addBuildInfoModal .sFloorCount").val();
	var sBuildfun=$("#addBuildInfoModal .sBuildfun").val();
	var sBuildAcreage=$("#addBuildInfoModal .sBuildAcreage").val();
	var sAirSystem=$("#addBuildInfoModal .sAirSystem").val();
	var sHeatSystem=$("#addBuildInfoModal .sHeatSystem").val();
	
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/build/add",
		data :{sBuildName:sBuildName,
			sBuildAdrees:sBuildAdrees,
			sBuildDate:sBuildDate,
			sBuildShaco:sBuildShaco,
			sBuildStru:sBuildStru,
			sWallMater:sWallMater,
			sWallheat:sWallheat,
			sframeType:sframeType,
			sGlassType:sGlassType,
			sframeMater:sframeMater,
			sFloorCount:sFloorCount,
			sBuildfun:sBuildfun,
			sBuildAcreage:sBuildAcreage,
			sAirSystem:sAirSystem,
			sHeatSystem:sHeatSystem},
		success : function(data) {
			}
	});
	
	$("#addBuildInfoModal input").val("");
	
});	


//修改建筑信息 
$("#editBuildInfoModal .btn_sure").click(function(){
	var sBuildName=$("#editBuildInfoModal .sBuildName").val();
	var sBuildAdree=$("#editBuildInfoModal .sBuildAdree").val();
	var sBuildDate=$("#editBuildInfoModal .sBuildDate").val();
	var sBuildShaco=$("#editBuildInfoModal .sBuildShaco").val();
	var sBuildStru=$("#editBuildInfoModal .sBuildStru").val();
	var sWallMater=$("#editBuildInfoModal .sWallMater").val();
	var sWallheat=$("#editBuildInfoModal .sWallheat").val();
	var sframeType=$("#editBuildInfoModal .sframeType").val();
	var sGlassType=$("#editBuildInfoModal .sGlassType").val();
	var sframeMater=$("#editBuildInfoModal .sframeMater").val();
	var sFloorCount=$("#editBuildInfoModal .sFloorCount").val();
	var sBuildfun=$("#editBuildInfoModal .sBuildfun").val();
	var sBuildAcreage=$("#editBuildInfoModal .sBuildAcreage").val();
	var sAirSystem=$("#editBuildInfoModal .sAirSystem").val();
	var sHeatSystem=$("#editBuildInfoModal .sHeatSystem").val();
	
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/build/edit",
		data :{sBuildCode:sBuildCode,
			sBuildName:sBuildName,
			sBuildAdree:sBuildAdree,
			sBuildDate:sBuildDate,
			sBuildShaco:sBuildShaco,
			sBuildStru:sBuildStru,
			sWallMater:sWallMater,
			sWallheat:sWallheat,
			sframeType:sframeType,
			sGlassType:sGlassType,
			sframeMater:sframeMater,
			sFloorCount:sFloorCount,
			sBuildfun:sBuildfun,
			sBuildAcreage:sBuildAcreage,
			sAirSystem:sAirSystem,
			sHeatSystem:sHeatSystem},
		success : function(data) {
			buildinginfo(sBuildName);
			}
	});
	
	$("#addBuildInfoModal input").val("");
	
});

//删除建筑信息
$("#delBuildInModal .btn_sure").click(function(){
	var sBuildCode=$("#editBuildInfoModal .sBuildCode").val();
	$.ajax({
		type : "post",
		url :"http://120.76.24.134:8080/yuanyang/housMater/delAll",
		data :{sBuildCode:sBuildCode},
		success : function(data) {
			buildinginfo(sBuildName);
		}
	});
});


//取消添加建筑信息	
$("#addBuildInfoModal .btn_reset").click(function(){
	$("#addBuildInfoModal input").val("");
});



/***********************************************************************************************/



//能耗分项tree查询，公用
function getEnergyTree(id,index){
	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergyTreeSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
		//console.log(data);
		switch(index)
			{
				case 1:
					buildChoice(id,data); //能耗tree(动态建筑和动态分区)
					break;
				case 2:
					getenergystatis(id,data); //能耗统计
					break;
				case 3:
					getenergysubent(id,data); //能耗分项
					break;
				case 4:
					getenergygrade(id,data); //能耗分级
					break;
				case 5:
					getenergyreport(id,data); //能耗报告
					break;
				case 6:
					getenergyconsumption(id,data); //能耗同比
					break;
				case 7:
					getenergyconsumptionchain(id,data); //能耗环比
					break;
				case 8:
					getenergyrank(id,data); //能耗排名
					break;
				case 9:
					getenergywhere(id,data); //能耗去向
					break;
				case 10:
					buildTree(id,data); //建筑tree(动态渲染建筑)
					break;
				case 11:
					reportBuildChoice(id,data); //能耗tree(动态建筑和动态分区)
					break;
				case 12:
					getreportgeneration(id,data); //生成能耗报表
					break;
				case 13:
					getsurveypoint(id,data); //测量点表
					break;
				case 14:
					getsizestatement(id,data); //同比报表
					break;	
				case 15:
					getlinkreport(id,data); //环比报表
					break;
				case 16:
					getenergyabnormal(id,data); //能耗异常诊断
					break;
				case 17:
					getworktimenormal(id,data); //工作时间异常诊断
					break;
				case 18:
					getnonworkingnormal(id,data); //非工作时间异常诊断
					break;
				case 19:
					costbuildTree(id,data); //建筑tree(动态渲染建筑)
					break;
				case 20:
					getAlarmOverview(id); //实时报警
					break;
				default:
					alert("未知错误");
			}
			
		
		
		
		}
	});
}


//能耗分级tree查询，公用
function getEnergyGradeTree(id,index){
	var jsonData = setJson(null,"requestCommand","");
	jsonData = setJson(jsonData,"responseCommand","");
	$.ajax({
		type:'post',
		url:'/EasyEnergy/EnergyTreeSearchCmd',
		contentType:"application/text,charset=utf-8",
		data:jsonData,
		success:function(data) {
		//console.log(data);
		
		switch(index)
			{
				case 1:
					buildChoiceGrade(id,data); //能耗tree
					break;
				case 2:
					getenergygrade(id,data); //能耗分级
					break;
				default:
					alert("未知错误");
			}
			
		
		
		
		}
	});
}



//渲染能耗Tree建筑（包含分区）
function buildChoice(id,data){
	hidputbutIni(id);//根据id初始化隐藏域和顶部标题
	var html="";
	$(id+" .floorList").html(html);	
	var data = strToJson(data);
	areaChoice(id,JSON.stringify(data.roots[0].items[0].items[0]));
	var treeitems=data.roots[0].items[0].items;
	for(i=0;i<treeitems.length;i++){
		if(i==0){
			html+="<li class='active' onclick=areaChoice('"+id+"','"+JSON.stringify(data.roots[0].items[0].items[i])+"')>"+treeitems[i].name+"</li>";
		}else{
			html+="<li onclick=areaChoice('"+id+"','"+JSON.stringify(data.roots[0].items[0].items[i])+"')>"+treeitems[i].name+"</li>";
		}
	}
	$(id+" .floorList").html(html);
	//选中建筑
	buildActive(id);
	
}

//动态渲染建筑Ttree（不包含分区）
function buildTree(id,data){
	var html="";
	var data = strToJson(data);
	var treeitems=data.roots[0].items[0].items;
	for(i=0;i<treeitems.length;i++){
		if(i==0){
			html+="<li class='active'>"+treeitems[i].name+"</li>";
		}else{
			html+="<li>"+treeitems[i].name+"</li>";
		}
	}
	$(id+" .floorList").html(html);
	//选中建筑
	OnlybuildActive(id);	
}

//成本中心动态渲染建筑Ttree（不包含分区）
function costbuildTree(id,data){
	var html="";
	var data = strToJson(data);
	var treeitems=data.roots[0].items[0].items;
	for(i=0;i<treeitems.length;i++){
		if(i==0){
			html+="<li class='active'>"+treeitems[i].name+"</li>";
		}else{
			html+="<li>"+treeitems[i].name+"</li>";
		}
	}
	$(id+" .floorList").html(html);
	//选中建筑
	OnlybuildCostActive(id);	
}

//渲染能耗分级Tree建筑
function buildChoiceGrade(id,data){
	hidputbutIni(id);//根据id初始化隐藏域和顶部标题
	var html="";
	$(id+" .floorList").html(html);	
	var data = strToJson(data);
	areaChoiceGrade(id,JSON.stringify(data.roots[0].items[0].items[0]));
	var treeitems=data.roots[0].items[0].items;
	for(i=0;i<treeitems.length;i++){
		if(i==0){
			html+="<li class='active' onclick=areaChoiceGrade('"+id+"','"+JSON.stringify(data.roots[0].items[0].items[i])+"')>"+treeitems[i].name+"</li>";
		}else{
			html+="<li onclick=areaChoiceGrade('"+id+"','"+JSON.stringify(data.roots[0].items[0].items[i])+"')>"+treeitems[i].name+"</li>";
		}
	}
	$(id+" .floorList").html(html);
	//选中建筑
	buildActiveGrade(id);
}

//渲染能耗Tree分区
function areaChoice(id,data){
	console.log(data);
	var html="";
	$(id+" .floor_choice").html(html);	
	var data = strToJson(data);
	if(('items' in data)==true){
		for(i=0;i<data.items.length;i++){
			if(i==0){
				html+="<li class='btn btn-default ch fivwid active'>"+data.items[i].name+"</li>";
			}else{
				html+="<li class='btn btn-default ch fivwid'>"+data.items[i].name+"</li>";
			}
		}
	}else{
		html+="";
	}
	$(id+" .floor_choice").html(html);	
	//B-03A座商业区分项渲染
	getTypeItemsIniul(id);
	//选中分区
	areaActive(id);
	
}

//渲染能耗Tree分区
function areaChoiceGrade(id,data){
	console.log(data);
	var html="";
	$(id+" .floor_choice").html(html);	
	var data = strToJson(data);
	if(('items' in data)==true){
		for(i=0;i<data.items.length;i++){
			if(i==0){
				html+="<li class='btn btn-default ch fivwid active'>"+data.items[i].name+"</li>";
			}else{
				html+="<li class='btn btn-default ch fivwid'>"+data.items[i].name+"</li>";
			}
		}
	}else{
		html+="";
	}
	$(id+" .floor_choice").html(html);	
	//B-03A座商业区分级渲染
	getTypeGradeIniul(id);
	//选中分区
	areaActiveGrade(id);
	
}


//渲染能耗报表Tree建筑（能耗报表建筑----------到层）
function reportBuildChoice(id,data){
	hidputbutIni(id);//根据id初始化隐藏域和顶部标题
	$(id+" .energy_floor_name").html("1L");
	$(id+" .hideput_floor").val("1L");
	var html="";
	$(id+" .floorList").html(html);	
	var data = strToJson(data);
	reportAreaChoice(id,JSON.stringify(data.roots[0].items[0].items[0]));
	var treeitems=data.roots[0].items[0].items;
	for(i=0;i<treeitems.length;i++){
		if(i==0){
			html+="<li class='active' onclick=reportAreaChoice('"+id+"','"+JSON.stringify(data.roots[0].items[0].items[i])+"')>"+treeitems[i].name+"</li>";
		}else{
			html+="<li onclick=reportAreaChoice('"+id+"','"+JSON.stringify(data.roots[0].items[0].items[i])+"')>"+treeitems[i].name+"</li>";
		}
	}
	$(id+" .floorList").html(html);
	//选中建筑
	buildActive(id);
	
}

//渲染能耗报表Tree分区（能耗报表分区----------到层）
function reportAreaChoice(id,data){
	
	var data=strToJson(data);
	$(id+" .f_floor").empty();
	if("items" in data){
	for(i=0;i<data.items.length;i++){
		if(i==0){
				$(id+" .f_floor ").append("<p>"+data.items[0].name+"</p><ul class='floor_choice' >");
			for(j=0;j<data.items[0].items.length;j++) {
				if(j==0){
				$(id+" .f_floor ").append("<li  class='btn btn-default active'>" + data.items[i].items[j].name +"</li>");

				}else{
				$(id+" .f_floor ").append("<li  class='btn btn-default'>" + data.items[i].items[j].name +"</li>");

				}
				
			}
				$(id+" .f_floor ").append("</ul>");
		}else{
			$(id+" .f_floor ").append("<p>"+data.items[i].name+"</p><ul class='floor_choice'>");
			for(j=0;j<data.items[i].items.length;j++) {
			$(id+" .f_floor ").append("<li  class='btn btn-default'>" + data.items[i].items[j].name +"</li>");

			}


			$(id+" .f_floor").append("</ul>");
		}
		
	}
	floorActive(id);
	}
	getTypeItemsul(id);
	
}






//分项-----选中建筑,给选中的建筑添加选中样式,给顶部建筑标题添加文本值，给建筑隐藏域赋值(包含分区)
function buildActive(id){
	
    $(id+" .floorList li").on('click',function(){
        var value=$(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(id+" .energy_build_name").html(value);		//顶部标题
		$(id+" .hideput_build").val(value);				//建筑隐藏域
		
		if((value=="B03-A座")||(value=="B03-B座")||(value=="B03-C座")||(value=="B04座")){
			$(id+" .hideput_area").val("商业区");				//分区隐藏域
			$(id+" .energy_area_name").html("商业区");			//分区顶部标题
		}else if((value=="B06-D座")||(value=="B06-E座")){
			$(id+" .hideput_area").val("办公区");				//分区隐藏域
			$(id+" .energy_area_name").html("办公区");			//分区顶部标题
		}else if(value=="B05座"){
			$(id+" .hideput_area").val("");
			$(id+" .energy_area_name").html("");			//分区顶部标题
		}
		//根据建筑分区判断分项
		getTypeItemsul(id);
	 });
	 
	 
	
	
}

//建筑分项（不包含分区）
function OnlybuildActive(id){
	
    $(id+" .floorList li").on('click',function(){
        var value=$(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(id+" .energy_build_name").html(value);		//顶部标题
		$(id+" .hideput_build").val(value);				//建筑隐藏域
		
		if((value=="B03-A座")||(value=="B03-B座")||(value=="B03-C座")||(value=="B04座")){
			$(id+" .itemsdown a span:first-child").html("租户用电");
			$(id+" .energy_type_name").html("租户用电");
			$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
				"<li><a>物业用电</a></li>"+
				"<li><a>公区照明</a></li>"+
				"<li><a>公区空调</a></li>"+
				"<li><a>公区动力</a></li>"+
				"<li><a>特殊用电</a></li>"+
				"<li><a>租户用水</a></li>"+
				"<li><a>公区用水</a></li>"+
				"<li><a>冷热量</a></li>"+
				"<li><a>燃气用量</a></li>");
			selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");
		}else if((value=="B06-D座")||(value=="B06-E座")){
			$(id+" .itemsdown a span:first-child").html("租户用电");
			$(id+" .energy_type_name").html("租户用电");
			$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
				"<li><a>公区照明</a></li>"+
				"<li><a>公区空调</a></li>"+
				"<li><a>公区动力</a></li>"+
				"<li><a>租户用水</a></li>"+
				"<li><a>公区用水</a></li>"+
				"<li><a>冷热量</a></li>");
			selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");
		}else if(value=="B05座"){
		$(id+" .itemsdown a span:first-child").html("");
			$(id+" .energy_type_name").html("");
			$(id+" .type_energy_ul").empty().append("");
			
		}
		
	 });
	 
	 
	
	
}

//成本建筑分项（不包含分区）
function OnlybuildCostActive(id){
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
			"<li><a>公区用电</a></li>"+
			"<li><a>租户用水</a></li>"+
			"<li><a>公区用水</a></li>"+
			"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");
	$(id+" .floorList li").on('click',function(){
        var value=$(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(id+" .energy_build_name").html(value);		//顶部标题
		$(id+" .hideput_build").val(value);				//建筑隐藏域
		$(id+" .itemsdown a span:first-child").html("租户用电");
		$(id+" .energy_type_name").html("租户用电");
		$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
			"<li><a>公区用电</a></li>"+
			"<li><a>租户用水</a></li>"+
			"<li><a>公区用水</a></li>"+
			"<li><a>燃气用量</a></li>");
		selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");
	});
}

//能耗去向分项
function whereItemul(id){
		$(id+" .itemsdown a span:first-child").html("租户用电");
			$(id+" .energy_type_name").html("租户用电");
			$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
				"<li><a>物业用电</a></li>"+
				"<li><a>公区照明</a></li>"+
				"<li><a>公区空调</a></li>"+
				"<li><a>公区动力</a></li>"+
				"<li><a>特殊用电</a></li>"+
				"<li><a>租户用水</a></li>"+
				"<li><a>公区用水</a></li>"+
				"<li><a>冷热量</a></li>"+
				"<li><a>燃气用量</a></li>");
			selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");
}

//分级-----选中建筑,给选中的建筑添加选中样式,给顶部建筑标题添加文本值，给建筑隐藏域赋值
function buildActiveGrade(id){
	
    $(id+" .floorList li").on('click',function(){
        var value=$(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(id+" .energy_build_name").html(value);		//顶部标题
		$(id+" .hideput_build").val(value);				//建筑隐藏域
		
		if((value=="B03-A座")||(value=="B03-B座")||(value=="B03-C座")||(value=="B04座")){
			$(id+" .hideput_area").val("商业区");				//分区隐藏域
			$(id+" .energy_area_name").html("商业区");			//分区顶部标题
		}else if((value=="B06-D座")||(value=="B06-E座")){
			$(id+" .hideput_area").val("办公区");				//分区隐藏域
			$(id+" .energy_area_name").html("办公区");			//分区顶部标题
		}else if(value=="B05座"){
			$(id+" .hideput_area").val("");
			$(id+" .energy_area_name").html("");			//分区顶部标题
		}
		//根据建筑分区判断分级
		getTypeGradeul(id);
	 });
	 
	 
	
	
}


//分项------选中分区,给选中的分区添加选中样式,给顶部建筑标题添加文本值，给建筑隐藏域赋值
function areaActive(id){
    $(id+" .floor_choice li").on('click',function(){
        var value=$(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(id+" .energy_area_name").html(value);		//顶部标题
		$(id+" .hideput_area").val(value);			//建筑隐藏域
		
		//根据建筑分区判断分项
		getTypeItemsul(id);
     });
	
}

//分层------选中分层,给选中的分层添加选中样式,给顶部建筑标题添加文本值，给分区隐藏域和分层隐藏域赋值
function floorActive(id){
	$(id+" .f_floor li").click(function(){
		 
		var value=($(this).html()).replace(/\s+/g,"");
		var build=$(id+" .hideput_build").val();
		$(this).addClass("active").siblings().removeClass("active");
		$(this).addClass("active");
		$(id+" .energy_floor_name").html(value);		//顶部标题
		$(id+" .hideput_floor").val(value);
		
		
		var build=$(id+" .hideput_build").val();
		
		if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&((value=="1L")||(value=="2L"))){
			$(id+" .energy_area_name").html("商业区");
			$(id+" .hideput_area").val("商业区");
		}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(value=="机房层")){
			$(id+" .energy_area_name").html("机房层");
			$(id+" .hideput_area").val("机房层");
		}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(value=="15L")){
			$(id+" .energy_area_name").html("避难层");
			$(id+" .hideput_area").val("避难层");
		}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(value=="顶楼")){	
			$(id+" .energy_area_name").html("顶楼");
			$(id+" .hideput_area").val("顶楼");
		}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&((value=="-1L")||(value=="-2L")||(value=="-3L")||(value=="夹层"))){	
			$(id+" .energy_area_name").html("地下室");
			$(id+" .hideput_area").val("地下室");
		}else if((build=="B04座")&&(value=="影院夹层")){
			$(id+" .energy_area_name").html("影院夹层");
			$(id+" .hideput_area").val("影院夹层");
		}else if((build=="B04座")&&(value=="顶楼")){
			$(id+" .energy_area_name").html("顶楼");
			$(id+" .hideput_area").val("顶楼");
		}else if((build=="B04座")&&((value=="-1L")||(value=="-2L"))){	
			$(id+" .energy_area_name").html("地下室");
			$(id+" .hideput_area").val("地下室");
		}else if((build=="B04座")&&((value=="1L")||(value=="2L")||(value=="3L")||(value=="4L")||(value=="5L"))){	
			$(id+" .energy_area_name").html("商业区");
			$(id+" .hideput_area").val("商业区");
		}else if(((build=="B06-D座")||(build=="B06-E座"))&&(value=="顶楼")){		
			$(id+" .energy_area_name").html("顶楼");
			$(id+" .hideput_area").val("顶楼");
		}else if(((build=="B06-D座")||(build=="B06-E座"))&&((value=="-1L")||(value=="-2L"))){		
			$(id+" .energy_area_name").html("地下室");
			$(id+" .hideput_area").val("地下室");
		}else{
			$(id+" .energy_area_name").html("办公区");
			$(id+" .hideput_area").val("办公区");
		}
		
		getTypeItemsul(id);
		
	});
	

	
	
}


//分级------选中分区,给选中的分区添加选中样式,给顶部建筑标题添加文本值，给建筑隐藏域赋值
function areaActiveGrade(id){
    $(id+" .floor_choice li").on('click',function(){
        var value=$(this).html();
		$(this).addClass("active").siblings().removeClass("active");
		$(id+" .energy_area_name").html(value);		//顶部标题
		$(id+" .hideput_area").val(value);			//建筑隐藏域
		
		//根据建筑分区判断分级
		getTypeGradeul(id);
     });
	
}





//默认B-03座商业区分项渲染
function getTypeItemsIniul(id){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
		"<li><a>物业用电</a></li>"+
		"<li><a>公区照明</a></li>"+
		"<li><a>公区空调</a></li>"+
		"<li><a>公区动力</a></li>"+
		"<li><a>特殊用电</a></li>"+
		"<li><a>租户用水</a></li>"+
		"<li><a>公区用水</a></li>"+
		"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");
}

//默认B-03座商业区分级渲染
function getTypeGradeIniul(id){
	$(id+" .itemsdown a span:first-child").html("一级用电");
	$(id+" .energy_type_name").html("一级用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>一级用电</a></li>"+
	"<li><a>二级用电</a></li>"+
	"<li><a>三级用电</a></li>"+
	"<li><a>四级用电</a></li>"+
	"<li><a>一级用水</a></li>"+
	"<li><a>二级用水</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".classes-menu",".classes",id+" .energy_type_name");
}


//根据分项和分区，得到对应的items数组(能耗排名)
function getTtemsRank(id,data){
	//分项
	var type=$(id+" .itemsdown a span:first-child").html();
	//分区
	var area=$(id+" .hideput_area").val();
	var items=[];
	if(area!=""){
		if((area=="商业区")&&(type=="租户用电")){
			//B03-A座,B03-B座,B03-C座,B04座
			for(i=0;i<4;i++){
				var item=new Object();
				item.name=(data.roots[1].items[0].items[i].name)+(data.roots[1].items[0].items[i].items[0].name)+type;
				item.ord=data.roots[1].items[0].items[i].items[0].ord;	
				items.push(item);				
			}
		}else if((area=="商业区")&&(type=="物业用电")){
			//B03-A座,B03-B座,B03-C座,B04座
			for(i=0;i<4;i++){
				var item=new Object();
				item.name=(data.roots[1].items[1].items[i].name)+(data.roots[1].items[1].items[i].items[0].name)+type;
				item.ord=data.roots[1].items[1].items[i].items[0].ord;	
				items.push(item);				
			}
		}else if((area=="商业区")&&(type=="公区照明")){
			//B03-A座,B03-B座,B03-C座,B04座
			for(i=0;i<4;i++){
				var item=new Object();
				item.name=(data.roots[1].items[2].items[i].name)+(data.roots[1].items[2].items[i].items[0].name)+type;
				item.ord=data.roots[1].items[2].items[i].items[0].ord;	
				items.push(item);				
			}
		}else if((area=="商业区")&&(type=="公区空调")){
			//B03-A座,B03-B座,B03-C座,B04座
			for(i=0;i<4;i++){
				var item=new Object();
				item.name=(data.roots[1].items[3].items[i].name)+(data.roots[1].items[3].items[i].items[0].name)+type;
				item.ord=data.roots[1].items[3].items[i].items[0].ord;	
				items.push(item);				
			}			
		}else if((area=="商业区")&&(type=="公区动力")){
			//B03-A座,B03-B座,B03-C座,B04座
			for(i=0;i<4;i++){
				var item=new Object();
				item.name=(data.roots[1].items[4].items[i].name)+(data.roots[1].items[4].items[i].items[0].name)+type;
				item.ord=data.roots[1].items[4].items[i].items[0].ord;	
				items.push(item);				
			}			
		}else if((area=="商业区")&&(type=="特殊用电")){
			//B03-A座,B03-B座,B03-C座,B04座
			for(i=0;i<4;i++){
				var item=new Object();
				item.name=(data.roots[1].items[5].items[i].name)+(data.roots[1].items[5].items[i].items[0].name)+type;
				item.ord=data.roots[1].items[5].items[i].items[0].ord;	
				items.push(item);				
			}			
		}else if((area=="商业区")&&(type=="租户用水")){
			//B03-A座,B03-B座,B03-C座,B04座
			for(i=0;i<4;i++){
				var item=new Object();
				item.name=(data.roots[4].items[0].items[i].name)+(data.roots[4].items[0].items[i].items[0].name)+type;
				item.ord=data.roots[4].items[0].items[i].items[0].ord;	
				items.push(item);				
			}						
		}else if((area=="商业区")&&(type=="公区用水")){
			//B03-A座,B03-B座,B03-C座,B04座
			for(i=0;i<4;i++){
				var item=new Object();
				item.name=(data.roots[4].items[1].items[i].name)+(data.roots[4].items[1].items[i].items[0].name)+type;
				item.ord=data.roots[4].items[1].items[i].items[0].ord;	
				items.push(item);				
			}							
		}else if((area=="商业区")&&(type=="冷热量")){
			//B0-4座
			var item0=new Object();
			item0.name=(data.roots[6].items[0].items[3].name)+(data.roots[6].items[0].items[3].items[0].name)+type;
			item0.ord=data.roots[6].items[0].items[3].items[0].ord;
			items.push(item0);
			
		}else if((area=="商业区")&&(type=="燃气")){
			//B03-A座,B03-B座,B03-C座,B04座
			for(i=0;i<4;i++){
				var item=new Object();
				item.name=(data.roots[7].items[0].items[i].name)+(data.roots[7].items[0].items[i].items[0].name)+type;
				item.ord=data.roots[7].items[0].items[i].items[0].ord;	
				items.push(item);				
			}									
		}else if((area=="办公区")&&(type=="租户用电")){
			//B03-A座,B03-B座,B03-C座,B06-D座,B06-E座
			for(i=0;i<3;i++){
				var item=new Object();
				item.name=(data.roots[1].items[0].items[i].name)+(data.roots[1].items[0].items[i].items[1].name)+type;
				item.ord=data.roots[1].items[0].items[i].items[1].ord;	
				items.push(item);				
			}
			for(i=5;i<7;i++){
				var item=new Object();
				item.name=(data.roots[1].items[0].items[i].name)+(data.roots[1].items[0].items[i].items[1].name)+type;
				item.ord=data.roots[1].items[0].items[i].items[1].ord;	
				items.push(item);				
			}					
		}else if((area=="办公区")&&(type=="公区照明")){
			//B03-A座,B03-B座,B03-C座,B06-D座,B06-E座
			for(i=0;i<3;i++){
				var item=new Object();
				item.name=(data.roots[1].items[2].items[i].name)+(data.roots[1].items[2].items[i].items[1].name)+type;
				item.ord=data.roots[1].items[2].items[i].items[1].ord;	
				items.push(item);				
			}
			for(i=5;i<7;i++){
				var item=new Object();
				item.name=(data.roots[1].items[2].items[i].name)+(data.roots[1].items[2].items[i].items[1].name)+type;
				item.ord=data.roots[1].items[2].items[i].items[1].ord;	
				items.push(item);				
			}								

		}else if((area=="办公区")&&(type=="公区空调")){
			//B03-A座,B03-B座,B03-C座,B06-D座,B06-E座
			for(i=0;i<3;i++){
				var item=new Object();
				item.name=(data.roots[1].items[3].items[i].name)+(data.roots[1].items[3].items[i].items[1].name)+type;
				item.ord=data.roots[1].items[3].items[i].items[1].ord;	
				items.push(item);				
			}
			for(i=5;i<7;i++){
				var item=new Object();
				item.name=(data.roots[1].items[3].items[i].name)+(data.roots[1].items[3].items[i].items[1].name)+type;
				item.ord=data.roots[1].items[3].items[i].items[1].ord;	
				items.push(item);				
			}									
		}else if((area=="办公区")&&(type=="公区动力")){
			//B03-A座,B03-B座,B03-C座,B06-D座,B06-E座
			for(i=0;i<3;i++){
				var item=new Object();
				item.name=(data.roots[1].items[4].items[i].name)+(data.roots[1].items[4].items[i].items[1].name)+type;
				item.ord=data.roots[1].items[4].items[i].items[1].ord;	
				items.push(item);				
			}
			for(i=5;i<7;i++){
				var item=new Object();
				item.name=(data.roots[1].items[4].items[i].name)+(data.roots[1].items[4].items[i].items[1].name)+type;
				item.ord=data.roots[1].items[4].items[i].items[1].ord;	
				items.push(item);				
			}								
		}else if((area=="办公区")&&(type=="租户用水")){
			//B03-A座,B03-B座,B03-C座,B06-D座,B06-E座
			for(i=0;i<3;i++){
				var item=new Object();
				item.name=(data.roots[4].items[0].items[i].name)+(data.roots[4].items[0].items[i].items[1].name)+type;
				item.ord=data.roots[4].items[0].items[i].items[1].ord;	
				items.push(item);				
			}
			for(i=5;i<7;i++){
				var item=new Object();
				item.name=(data.roots[4].items[0].items[i].name)+(data.roots[4].items[0].items[i].items[1].name)+type;
				item.ord=data.roots[4].items[0].items[i].items[1].ord;	
				items.push(item);				
			}							
		}else if((area=="办公区")&&(type=="公区用水")){
			//B03-A座,B03-B座,B03-C座,B06-D座,B06-E座
			for(i=0;i<3;i++){
				var item=new Object();
				item.name=(data.roots[4].items[1].items[i].name)+(data.roots[4].items[1].items[i].items[1].name)+type;
				item.ord=data.roots[4].items[1].items[i].items[1].ord;	
				items.push(item);				
			}
			for(i=5;i<7;i++){
				var item=new Object();
				item.name=(data.roots[4].items[1].items[i].name)+(data.roots[4].items[1].items[i].items[1].name)+type;
				item.ord=data.roots[4].items[1].items[i].items[1].ord;	
				items.push(item);				
			}							
		}else if((area=="办公区")&&(type=="冷热量")){
			//B06-E座
			var item0=new Object();
			item0.name=(data.roots[6].items[0].items[0].name)+(data.roots[6].items[0].items[6].items[0].name)+type;
			item0.ord=data.roots[6].items[0].items[6].items[0].ord;
			items.push(item0);
		}else if((area=="机房层")&&(type=="公区照明")){
			//B03-A座,B03-B座,B03-C座
			for(i=0;i<3;i++){
				var item=new Object();
				item.name=(data.roots[1].items[2].items[i].name)+(data.roots[1].items[2].items[i].items[2].name)+type;
				item.ord=data.roots[1].items[2].items[i].items[2].ord;	
				items.push(item);				
			}
		}else if((area=="机房层")&&(type=="公区空调")){
			//B03-A座,B03-B座,B03-C座
			for(i=0;i<3;i++){
				var item=new Object();
				item.name=(data.roots[1].items[3].items[i].name)+(data.roots[1].items[3].items[i].items[2].name)+type;
				item.ord=data.roots[1].items[3].items[i].items[2].ord;	
				items.push(item);				
			}
		}else if((area=="避难层")&&(type=="公区照明")){
			//B03-A座,B03-C座
			var item0=new Object();
			var item1=new Object();
			item0.name=(data.roots[1].items[2].items[0].name)+(data.roots[1].items[2].items[0].items[3].name)+type;
			item0.ord=data.roots[1].items[2].items[0].items[3].ord;
			item1.name=(data.roots[1].items[2].items[2].name)+(data.roots[1].items[2].items[2].items[3].name)+type;
			item1.ord=data.roots[1].items[2].items[2].items[3].ord;
			items.push(item0);
			items.push(item1);
		}else if((area=="避难层")&&(type=="公区空调")){
			//B03-A座,B03-C座
			var item0=new Object();
			var item1=new Object();
			item0.name=(data.roots[1].items[3].items[0].name)+(data.roots[1].items[3].items[0].items[3].name)+type;
			item0.ord=data.roots[1].items[3].items[0].items[3].ord;
			item1.name=(data.roots[1].items[3].items[2].name)+(data.roots[1].items[3].items[2].items[3].name)+type;
			item1.ord=data.roots[1].items[3].items[2].items[3].ord;
			items.push(item0);
			items.push(item1);
		}else if((area=="避难层")&&(type=="公区动力")){
			//B03-A座,B03-C座
			var item0=new Object();
			var item1=new Object();
			item0.name=(data.roots[1].items[4].items[0].name)+(data.roots[1].items[4].items[0].items[3].name)+type;
			item0.ord=data.roots[1].items[4].items[0].items[3].ord;
			item1.name=(data.roots[1].items[4].items[2].name)+(data.roots[1].items[4].items[2].items[3].name)+type;
			item1.ord=data.roots[1].items[4].items[2].items[3].ord;
			items.push(item0);
			items.push(item1);
		}else if((area=="避难层")&&(type=="特殊用电")){
			//B03-A座,B03-C座
			var item0=new Object();
			var item1=new Object();
			item0.name=(data.roots[1].items[5].items[0].name)+(data.roots[1].items[5].items[0].items[3].name)+type;
			item0.ord=data.roots[1].items[5].items[0].items[3].ord;
			item1.name=(data.roots[1].items[5].items[2].name)+(data.roots[1].items[5].items[2].items[3].name)+type;
			item1.ord=data.roots[1].items[5].items[2].items[3].ord;
			items.push(item0);
			items.push(item1);
		}else if((area=="避难层")&&(type=="公区用水")){
			//B03-A座,B03-C座
			var item0=new Object();
			var item1=new Object();
			item0.name=(data.roots[4].items[1].items[0].name)+(data.roots[4].items[1].items[0].items[3].name)+type;
			item0.ord=data.roots[4].items[1].items[0].items[3].ord;
			item1.name=(data.roots[4].items[1].items[2].name)+(data.roots[4].items[1].items[2].items[3].name)+type;
			item1.ord=data.roots[4].items[1].items[2].items[3].ord;
			items.push(item0);
			items.push(item1);
		}else if((area=="顶楼")&&(type=="公区照明")){
			//B03-A座,B03-B座,B03-C座,B04座,B06-D座,B06-E座
			var item0=new Object();
			var item1=new Object();
			var item2=new Object();
			var item3=new Object();
			var item4=new Object();
			var item5=new Object();
			item0.name=(data.roots[1].items[2].items[0].name)+(data.roots[1].items[2].items[0].items[4].name)+type;
			item0.ord=data.roots[1].items[2].items[0].items[4].ord;
			item1.name=(data.roots[1].items[2].items[1].name)+(data.roots[1].items[2].items[1].items[3].name)+type;
			item1.ord=data.roots[1].items[2].items[1].items[3].ord;
			item2.name=(data.roots[1].items[2].items[2].name)+(data.roots[1].items[2].items[2].items[4].name)+type;
			item2.ord=data.roots[1].items[2].items[2].items[4].ord;
			item3.name=(data.roots[1].items[2].items[3].name)+(data.roots[1].items[2].items[3].items[2].name)+type;
			item3.ord=data.roots[1].items[2].items[3].items[2].ord;
			item4.name=(data.roots[1].items[2].items[5].name)+(data.roots[1].items[2].items[5].items[1].name)+type;
			item4.ord=data.roots[1].items[2].items[5].items[1].ord;
			item5.name=(data.roots[1].items[2].items[6].name)+(data.roots[1].items[2].items[6].items[1].name)+type;
			item5.ord=data.roots[1].items[2].items[6].items[1].ord;
			items.push(item0);
			items.push(item1);
			items.push(item2);
			items.push(item3);
			items.push(item4);
			items.push(item5);
		}else if((area=="顶楼")&&(type=="公区空调")){
			//B03-A座,B03-B座,B03-C座,B04座,B06-D座,B06-E座
			var item0=new Object();
			var item1=new Object();
			var item2=new Object();
			var item3=new Object();
			var item4=new Object();
			var item5=new Object();
			item0.name=(data.roots[1].items[3].items[0].name)+(data.roots[1].items[3].items[0].items[4].name)+type;
			item0.ord=data.roots[1].items[3].items[0].items[4].ord;
			item1.name=(data.roots[1].items[3].items[1].name)+(data.roots[1].items[3].items[1].items[3].name)+type;
			item1.ord=data.roots[1].items[3].items[1].items[3].ord;
			item2.name=(data.roots[1].items[3].items[2].name)+(data.roots[1].items[3].items[2].items[4].name)+type;
			item2.ord=data.roots[1].items[3].items[2].items[4].ord;
			item3.name=(data.roots[1].items[3].items[3].name)+(data.roots[1].items[3].items[3].items[2].name)+type;
			item3.ord=data.roots[1].items[3].items[3].items[2].ord;
			item4.name=(data.roots[1].items[3].items[5].name)+(data.roots[1].items[3].items[5].items[1].name)+type;
			item4.ord=data.roots[1].items[3].items[5].items[1].ord;
			item5.name=(data.roots[1].items[3].items[6].name)+(data.roots[1].items[3].items[6].items[1].name)+type;
			item5.ord=data.roots[1].items[3].items[6].items[1].ord;
			items.push(item0);
			items.push(item1);
			items.push(item2);
			items.push(item3);
			items.push(item4);
			items.push(item5);
		}else if((area=="顶楼")&&(type=="公区动力")){
			//B03-A座,B03-B座,B03-C座,B04座,B06-D座,B06-E座
			var item0=new Object();
			var item1=new Object();
			var item2=new Object();
			var item3=new Object();
			var item4=new Object();
			var item5=new Object();
			item0.name=(data.roots[1].items[4].items[0].name)+(data.roots[1].items[4].items[0].items[4].name)+type;
			item0.ord=data.roots[1].items[4].items[0].items[4].ord;
			item1.name=(data.roots[1].items[4].items[1].name)+(data.roots[1].items[4].items[1].items[3].name)+type;
			item1.ord=data.roots[1].items[4].items[1].items[3].ord;
			item2.name=(data.roots[1].items[4].items[2].name)+(data.roots[1].items[4].items[2].items[4].name)+type;
			item2.ord=data.roots[1].items[4].items[2].items[4].ord;
			item3.name=(data.roots[1].items[4].items[3].name)+(data.roots[1].items[4].items[3].items[2].name)+type;
			item3.ord=data.roots[1].items[4].items[3].items[2].ord;
			item4.name=(data.roots[1].items[4].items[5].name)+(data.roots[1].items[4].items[5].items[1].name)+type;
			item4.ord=data.roots[1].items[4].items[5].items[1].ord;
			item5.name=(data.roots[1].items[4].items[6].name)+(data.roots[1].items[4].items[6].items[1].name)+type;
			item5.ord=data.roots[1].items[4].items[6].items[1].ord;
			items.push(item0);
			items.push(item1);
			items.push(item2);
			items.push(item3);
			items.push(item4);
			items.push(item5);
		}else if((area=="顶楼")&&(type=="特殊用电")){
			//B03-A座,B03-B座,B03-C座,B04座,B06-D座,B06-E座
			var item0=new Object();
			var item1=new Object();
			var item2=new Object();
			var item3=new Object();
			var item4=new Object();
			var item5=new Object();
			item0.name=(data.roots[1].items[5].items[0].name)+(data.roots[1].items[5].items[0].items[4].name)+type;
			item0.ord=data.roots[1].items[5].items[0].items[4].ord;
			item1.name=(data.roots[1].items[5].items[1].name)+(data.roots[1].items[5].items[1].items[3].name)+type;
			item1.ord=data.roots[1].items[5].items[1].items[3].ord;
			item2.name=(data.roots[1].items[5].items[2].name)+(data.roots[1].items[5].items[2].items[4].name)+type;
			item2.ord=data.roots[1].items[5].items[2].items[4].ord;
			item3.name=(data.roots[1].items[5].items[3].name)+(data.roots[1].items[5].items[3].items[2].name)+type;
			item3.ord=data.roots[1].items[5].items[3].items[2].ord;
			item4.name=(data.roots[1].items[5].items[5].name)+(data.roots[1].items[5].items[5].items[1].name)+type;
			item4.ord=data.roots[1].items[5].items[5].items[1].ord;
			item5.name=(data.roots[1].items[5].items[6].name)+(data.roots[1].items[5].items[6].items[1].name)+type;
			item5.ord=data.roots[1].items[5].items[6].items[1].ord;
			items.push(item0);
			items.push(item1);
			items.push(item2);
			items.push(item3);
			items.push(item4);
			items.push(item5);
		}else if((area=="地下室")&&(type=="租户用电")){
			//B04座
			var item0=new Object();
			item0.name=(data.roots[1].items[0].items[3].name)+(data.roots[1].items[0].items[3].items[3].name)+type;
			item0.ord=data.roots[1].items[0].items[3].items[3].ord;
			items.push(item0);
			items.push(item0);
		}else if((area=="地下室")&&(type=="物业用电")){
			//B04座
			var item0=new Object();
			item0.name=(data.roots[1].items[1].items[3].name)+(data.roots[1].items[1].items[3].items[3].name)+type;
			item0.ord=data.roots[1].items[1].items[3].items[3].ord;
			items.push(item0);
			items.push(item0);
		}else if((area=="地下室")&&(type=="公区照明")){
			//B03-A座,B03-B座,B03-C座,B04座,B06-D座,B06-E座
			var item0=new Object();
			var item1=new Object();
			var item2=new Object();
			var item3=new Object();
			var item4=new Object();
			var item5=new Object();
			item0.name=(data.roots[1].items[2].items[0].name)+(data.roots[1].items[2].items[0].items[5].name)+type;
			item0.ord=data.roots[1].items[2].items[0].items[5].ord;
			item1.name=(data.roots[1].items[2].items[1].name)+(data.roots[1].items[2].items[1].items[4].name)+type;
			item1.ord=data.roots[1].items[2].items[1].items[4].ord;
			item2.name=(data.roots[1].items[2].items[2].name)+(data.roots[1].items[2].items[2].items[5].name)+type;
			item2.ord=data.roots[1].items[2].items[2].items[5].ord;
			item3.name=(data.roots[1].items[2].items[3].name)+(data.roots[1].items[2].items[3].items[3].name)+type;
			item3.ord=data.roots[1].items[2].items[3].items[3].ord;
			item4.name=(data.roots[1].items[2].items[5].name)+(data.roots[1].items[2].items[5].items[2].name)+type;
			item4.ord=data.roots[1].items[2].items[5].items[2].ord;
			item5.name=(data.roots[1].items[2].items[6].name)+(data.roots[1].items[2].items[6].items[2].name)+type;
			item5.ord=data.roots[1].items[2].items[6].items[2].ord;
			items.push(item0);
			items.push(item1);
			items.push(item2);
			items.push(item3);
			items.push(item4);
			items.push(item5);
		}else if((area=="地下室")&&(type=="公区空调")){
			//B04座,B06-D座,B06-E座
			var item0=new Object();
			var item1=new Object();
			var item2=new Object();
			item0.name=(data.roots[1].items[3].items[3].name)+(data.roots[1].items[3].items[3].items[3].name)+type;
			item0.ord=data.roots[1].items[3].items[3].items[3].ord;
			item1.name=(data.roots[1].items[3].items[5].name)+(data.roots[1].items[3].items[5].items[2].name)+type;
			item1.ord=data.roots[1].items[3].items[5].items[2].ord;
			item2.name=(data.roots[1].items[3].items[6].name)+(data.roots[1].items[3].items[6].items[2].name)+type;
			item2.ord=data.roots[1].items[3].items[6].items[2].ord;
			items.push(item0);
			items.push(item1);
			items.push(item2);
		}else if((area=="地下室")&&(type=="公区动力")){
			//B03-A座,B03-B座,B03-C座,B04座,B06-D座,B06-E座
			var item0=new Object();
			var item1=new Object();
			var item2=new Object();
			var item3=new Object();
			var item4=new Object();
			var item5=new Object();
			item0.name=(data.roots[1].items[4].items[0].name)+(data.roots[1].items[4].items[0].items[5].name)+type;
			item0.ord=data.roots[1].items[4].items[0].items[5].ord;
			item1.name=(data.roots[1].items[4].items[1].name)+(data.roots[1].items[4].items[1].items[4].name)+type;
			item1.ord=data.roots[1].items[4].items[1].items[4].ord;
			item2.name=(data.roots[1].items[4].items[2].name)+(data.roots[1].items[4].items[2].items[5].name)+type;
			item2.ord=data.roots[1].items[4].items[2].items[5].ord;
			item3.name=(data.roots[1].items[4].items[3].name)+(data.roots[1].items[4].items[3].items[3].name)+type;
			item3.ord=data.roots[1].items[4].items[3].items[3].ord;
			item4.name=(data.roots[1].items[4].items[5].name)+(data.roots[1].items[4].items[5].items[2].name)+type;
			item4.ord=data.roots[1].items[4].items[5].items[2].ord;
			item5.name=(data.roots[1].items[4].items[6].name)+(data.roots[1].items[4].items[6].items[2].name)+type;
			item5.ord=data.roots[1].items[4].items[6].items[2].ord;
			items.push(item0);
			items.push(item1);
			items.push(item2);
			items.push(item3);
			items.push(item4);
			items.push(item5);
		}else if((area=="地下室")&&(type=="特殊用电")){
			//B03-A座,B03-B座,B03-C座,B04座,B06-D座,B06-E座
			var item0=new Object();
			var item1=new Object();
			var item2=new Object();
			var item3=new Object();
			var item4=new Object();
			var item5=new Object();
			item0.name=(data.roots[1].items[5].items[0].name)+(data.roots[1].items[5].items[0].items[5].name)+type;
			item0.ord=data.roots[1].items[5].items[0].items[5].ord;
			item1.name=(data.roots[1].items[5].items[1].name)+(data.roots[1].items[5].items[1].items[4].name)+type;
			item1.ord=data.roots[1].items[5].items[1].items[4].ord;
			item2.name=(data.roots[1].items[5].items[2].name)+(data.roots[1].items[5].items[2].items[5].name)+type;
			item2.ord=data.roots[1].items[5].items[2].items[5].ord;
			item3.name=(data.roots[1].items[5].items[3].name)+(data.roots[1].items[5].items[3].items[3].name)+type;
			item3.ord=data.roots[1].items[5].items[3].items[3].ord;
			item4.name=(data.roots[1].items[5].items[5].name)+(data.roots[1].items[5].items[5].items[2].name)+type;
			item4.ord=data.roots[1].items[5].items[5].items[2].ord;
			item5.name=(data.roots[1].items[5].items[6].name)+(data.roots[1].items[5].items[6].items[2].name)+type;
			item5.ord=data.roots[1].items[5].items[6].items[2].ord;
			items.push(item0);
			items.push(item1);
			items.push(item2);
			items.push(item3);
			items.push(item4);
			items.push(item5);
		}else if((area=="地下室")&&(type=="冷热量")){
			//B03-A座,B03-B座,B03-C座,B04座,B06-E座
			var item0=new Object();
			var item1=new Object();
			var item2=new Object();
			var item3=new Object();
			var item4=new Object();
			item0.name=(data.roots[6].items[0].items[0].name)+(data.roots[6].items[0].items[0].items[5].name)+type;
			item0.ord=data.roots[6].items[0].items[0].items[5].ord;
			item1.name=(data.roots[6].items[0].items[1].name)+(data.roots[6].items[0].items[1].items[4].name)+type;
			item1.ord=data.roots[6].items[0].items[1].items[4].ord;
			item2.name=(data.roots[6].items[0].items[2].name)+(data.roots[6].items[0].items[2].items[5].name)+type;
			item2.ord=data.roots[6].items[0].items[2].items[5].ord;
			item3.name=(data.roots[6].items[0].items[6].name)+(data.roots[6].items[0].items[3].items[3].name)+type;
			item3.ord=data.roots[6].items[0].items[6].items[3].ord;
			item4.name=(data.roots[6].items[0].items[6].name)+(data.roots[6].items[0].items[6].items[2].name)+type;
			item4.ord=data.roots[6].items[0].items[6].items[2].ord;
			items.push(item0);
			items.push(item1);
			items.push(item2);
			items.push(item3);
			items.push(item4);
			
		}else if((area=="地下室")&&(type=="燃气")){
			//B03-A座,B03-B座,B03-C座,B04座
			var item0=new Object();
			var item1=new Object();
			var item2=new Object();
			var item3=new Object();
			item0.name=(data.roots[7].items[0].items[0].name)+(data.roots[7].items[0].items[0].items[5].name)+type;
			item0.ord=data.roots[7].items[0].items[0].items[5].ord;
			item1.name=(data.roots[7].items[0].items[1].name)+(data.roots[7].items[0].items[1].items[4].name)+type;
			item1.ord=data.roots[7].items[0].items[1].items[4].ord;
			item2.name=(data.roots[7].items[0].items[2].name)+(data.roots[7].items[0].items[2].items[5].name)+type;
			item2.ord=data.roots[7].items[0].items[2].items[5].ord;
			item3.name=(data.roots[7].items[0].items[3].name)+(data.roots[7].items[0].items[3].items[3].name)+type;
			item3.ord=data.roots[7].items[0].items[3].items[3].ord;
			items.push(item0);
			items.push(item1);
			items.push(item2);
			items.push(item3);
			
		}else if((area=="影院夹层")&&(type=="公区照明")){
			//B04座
			var item0=new Object();
			item0.name=(data.roots[1].items[2].items[3].name)+(data.roots[1].items[2].items[3].items[1].name)+type;
			item0.ord=data.roots[1].items[2].items[3].items[1].ord;
			items.push(item0);
			
		}else if((area=="影院夹层")&&(type=="公区空调")){
			//B04座
			var item0=new Object();
			item0.name=(data.roots[1].items[3].items[3].name)+(data.roots[1].items[3].items[3].items[1].name)+type;
			item0.ord=data.roots[1].items[3].items[3].items[1].ord;
			items.push(item0);
			
		}else if((area=="影院夹层")&&(type=="公区动力")){
			//B04座
			var item0=new Object();
			item0.name=(data.roots[1].items[4].items[3].name)+(data.roots[1].items[4].items[3].items[1].name)+type;
			item0.ord=data.roots[1].items[4].items[3].items[1].ord;
			items.push(item0);
			
		}else if((area=="影院夹层")&&(type=="特殊用电")){
			//B04座
			var item0=new Object();
			item0.name=(data.roots[1].items[5].items[3].name)+(data.roots[1].items[5].items[3].items[1].name)+type;
			item0.ord=data.roots[1].items[5].items[3].items[1].ord;
			items.push(item0);
		}else if((area=="影院夹层")&&(type=="公区用水")){
			//B04座
			var item0=new Object();
			item0.name=(data.roots[4].items[1].items[3].name)+(data.roots[1].items[4].items[3].items[1].name)+type;
			item0.ord=data.roots[4].items[1].items[3].items[1].ord;
			items.push(item0);
		}
	}else{
		if(type=="总用电"){
			var itemslen=data.roots[0].items[0].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[0].items[0].items[i].name)+type;
				item.ord=data.roots[0].items[0].items[i].ord;
				items.push(item);
			}
		}else if(type=="租户用电"){
			var itemslen=data.roots[1].items[0].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[1].items[0].items[i].name)+type;;
				item.ord=data.roots[1].items[0].items[i].ord;
				items.push(item);
			}
		}else if(type=="物业用电"){
			var itemslen=data.roots[1].items[1].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[1].items[1].items[i].name)+type;;
				item.ord=data.roots[1].items[1].items[i].ord;
				items.push(item);
			}
		}else if(type=="公区照明"){
			var itemslen=data.roots[1].items[2].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[1].items[2].items[i].name)+type;;
				item.ord=data.roots[1].items[2].items[i].ord;
				items.push(item);
			}
		}else if(type=="公区空调"){
			var itemslen=data.roots[1].items[3].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[1].items[3].items[i].name)+type;;
				item.ord=data.roots[1].items[3].items[i].ord;
				items.push(item);
			}
		}else if(type=="公区动力"){
			var itemslen=data.roots[1].items[4].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[1].items[4].items[i].name)+type;;
				item.ord=data.roots[1].items[4].items[i].ord;
				items.push(item);
			}
		}else if(type=="特殊用电"){
			var itemslen=data.roots[1].items[5].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[1].items[5].items[i].name)+type;;
				item.ord=data.roots[1].items[5].items[i].ord;
				items.push(item);
			}
		}else if(type=="总用水"){
			var itemslen=data.roots[3].items[0].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[3].items[0].items[i].name)+type;;
				item.ord=data.roots[3].items[0].items[i].ord;
				items.push(item);
			}
		}else if(type=="租户用水"){
			var itemslen=data.roots[4].items[0].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[4].items[0].items[i].name)+type;;
				item.ord=data.roots[4].items[0].items[i].ord;
				items.push(item);
			}
		}else if(type=="公区用水"){
			var itemslen=data.roots[4].items[1].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[4].items[1].items[i].name)+type;;
				item.ord=data.roots[4].items[1].items[i].ord;
				items.push(item);
			}
		}else if(type=="冷热量"){
			var itemslen=data.roots[6].items[0].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[6].items[0].items[i].name)+type;;
				item.ord=data.roots[6].items[0].items[i].ord;
				items.push(item);
			}
		}else if(type=="燃气"){
			var itemslen=data.roots[7].items[0].items;
			for(i=0;i<itemslen.length;i++){
				var item=new Object();
				item.name=(data.roots[7].items[0].items[i].name)+type;;
				item.ord=data.roots[7].items[0].items[i].ord;
				items.push(item);
			}
		}
	}
	
	

	return items;
}


//根据分项和建筑，得到对应的items数组(能耗去向)
function getTtemsWhere(id,data){
	//分项
	var type=$(id+" .itemsdown a span:first-child").html();
	//建筑 
	var area=$(id+" .hideput_build").val();
	var items=[];
	
	if((area=="B03-A座")&&(type=="租户用电")){
		//商业区，办公区
		for(i=0;i<2;i++){
			var item=new Object();
			item.name=(data.roots[1].items[0].items[0].name)+(data.roots[1].items[0].items[0].items[i].name)+type;
			item.ord=data.roots[1].items[0].items[0].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-A座")&&(type=="物业用电")){
		//商业区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[1].items[1].items[0].name)+(data.roots[1].items[1].items[0].items[i].name)+type;
			item.ord=data.roots[1].items[1].items[0].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-A座")&&(type=="公区照明")){
		//商业区、办公区、机房层、避难层、顶楼、地下室
		for(i=0;i<6;i++){
			var item=new Object();
			item.name=(data.roots[1].items[2].items[0].name)+(data.roots[1].items[2].items[0].items[i].name)+type;
			item.ord=data.roots[1].items[2].items[0].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-A座")&&(type=="公区空调")){
		//商业区、办公区、机房层、避难层、顶楼
		for(i=0;i<5;i++){
			var item=new Object();
			item.name=(data.roots[1].items[3].items[0].name)+(data.roots[1].items[3].items[0].items[i].name)+type;
			item.ord=data.roots[1].items[3].items[0].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-A座")&&(type=="公区动力")){
		//商业区、办公区、避难层、顶楼、地下室
		for(i=0;i<6;i++){
			var item=new Object();
			item.name=(data.roots[1].items[4].items[0].name)+(data.roots[1].items[4].items[0].items[i].name)+type;
			item.ord=data.roots[1].items[4].items[0].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-A座")&&(type=="特殊用电")){
		//商业区、避难层、顶楼、地下室
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[1].items[5].items[0].name)+(data.roots[1].items[5].items[0].items[i].name)+type;
			item.ord=data.roots[1].items[5].items[0].items[i].ord;
			items.push(item);
		}
		//避难层、顶楼、地下室
		for(i=3;i<6;i++){
			var item=new Object();
			item.name=(data.roots[1].items[5].items[0].name)+(data.roots[1].items[5].items[0].items[i].name)+type;
			item.ord=data.roots[1].items[5].items[0].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-A座")&&(type=="租户用水")){
		//商业区、办公区
		for(i=0;i<2;i++){
			var item=new Object();
			item.name=(data.roots[4].items[0].items[0].name)+(data.roots[4].items[0].items[0].items[i].name)+type;
			item.ord=data.roots[4].items[0].items[0].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-A座")&&(type=="公区用水")){
		//商业区、办公区、机房层
		for(i=0;i<3;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[0].name)+(data.roots[4].items[1].items[0].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[0].items[i].ord;
			items.push(item);
		}
		//地下室
		for(i=4;i<5;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[0].name)+(data.roots[4].items[1].items[0].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[0].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-A座")&&(type=="冷热量")){
		//地下室
		for(i=5;i<6;i++){
			var item=new Object();
			item.name=(data.roots[6].items[0].items[0].name)+(data.roots[6].items[0].items[0].items[i].name)+type;
			item.ord=data.roots[6].items[0].items[0].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-A座")&&(type=="燃气用量")){
		//商业区、地下室
		var item0=new Object();
		var item1=new Object();
		item0.name=(data.roots[7].items[0].items[0].name)+(data.roots[7].items[0].items[0].items[0].name)+type;
		item0.ord=data.roots[7].items[0].items[0].items[i].ord;
		item1.name=(data.roots[7].items[0].items[0].name)+(data.roots[7].items[0].items[0].items[5].name)+type;
		item1.ord=data.roots[7].items[0].items[0].items[5].ord;
		items.push(item0);
		items.push(item1);
	}else if((area=="B03-B座")&&(type=="租户用电")){
		//商业区，办公区
		for(i=0;i<2;i++){
			var item=new Object();
			item.name=(data.roots[1].items[0].items[1].name)+(data.roots[1].items[0].items[1].items[i].name)+type;
			item.ord=data.roots[1].items[0].items[1].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-B座")&&(type=="物业用电")){
		//商业区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[1].items[1].items[1].name)+(data.roots[1].items[1].items[1].items[i].name)+type;
			item.ord=data.roots[1].items[1].items[1].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-B座")&&(type=="公区照明")){
		//商业区、办公区、机房层、顶楼、地下室
		for(i=0;i<5;i++){
			var item=new Object();
			item.name=(data.roots[1].items[2].items[1].name)+(data.roots[1].items[2].items[1].items[i].name)+type;
			item.ord=data.roots[1].items[2].items[1].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-B座")&&(type=="公区空调")){
		//商业区、办公区、机房层、顶楼
		for(i=0;i<4;i++){
			var item=new Object();
			item.name=(data.roots[1].items[3].items[1].name)+(data.roots[1].items[3].items[1].items[i].name)+type;
			item.ord=data.roots[1].items[3].items[1].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-B座")&&(type=="公区动力")){
		//商业区、办公区
		for(i=0;i<2;i++){
			var item=new Object();
			item.name=(data.roots[1].items[4].items[1].name)+(data.roots[1].items[4].items[1].items[i].name)+type;
			item.ord=data.roots[1].items[4].items[1].items[i].ord;
			items.push(item);
		}
		//顶楼、地下室
		for(i=3;i<5;i++){
			var item=new Object();
			item.name=(data.roots[1].items[4].items[1].name)+(data.roots[1].items[4].items[1].items[i].name)+type;
			item.ord=data.roots[1].items[4].items[1].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-B座")&&(type=="特殊用电")){
		//商业区
		for(i=0;i<2;i++){
			var item=new Object();
			item.name=(data.roots[1].items[5].items[1].name)+(data.roots[1].items[5].items[1].items[i].name)+type;
			item.ord=data.roots[1].items[5].items[1].items[i].ord;
			items.push(item);
		}
		//顶楼、地下室
		for(i=3;i<5;i++){
			var item=new Object();
			item.name=(data.roots[1].items[5].items[1].name)+(data.roots[1].items[5].items[1].items[i].name)+type;
			item.ord=data.roots[1].items[5].items[1].items[i].ord;
			items.push(item);
		}		
	}else if((area=="B03-B座")&&(type=="租户用水")){
		//商业区、办公区
		for(i=0;i<2;i++){
			var item=new Object();
			item.name=(data.roots[4].items[0].items[1].name)+(data.roots[4].items[0].items[1].items[i].name)+type;
			item.ord=data.roots[4].items[0].items[1].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-B座")&&(type=="公区用水")){
		//商业区、办公区、机房层
		for(i=0;i<4;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[1].name)+(data.roots[4].items[1].items[1].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[1].items[i].ord;
			items.push(item);
		}
		//地下室
		for(i=5;i<6;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[1].name)+(data.roots[4].items[1].items[1].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[1].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-B座")&&(type=="冷热量")){
		//地下层
		for(i=4;i<5;i++){
			var item=new Object();
			item.name=(data.roots[6].items[0].items[1].name)+(data.roots[6].items[0].items[1].items[i].name)+type;
			item.ord=data.roots[6].items[0].items[1].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-B座")&&(type=="燃气用量")){
		//商业区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[7].items[0].items[1].name)+(data.roots[7].items[0].items[1].items[i].name)+type;
			item.ord=data.roots[7].items[0].items[1].items[i].ord;
			items.push(item);
		}
		//地下层
		for(i=4;i<5;i++){
			var item=new Object();
			item.name=(data.roots[7].items[0].items[1].name)+(data.roots[7].items[0].items[1].items[i].name)+type;
			item.ord=data.roots[7].items[0].items[1].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-C座")&&(type=="租户用电")){
		//商业区，办公区
		for(i=0;i<2;i++){
			var item=new Object();
			item.name=(data.roots[1].items[0].items[2].name)+(data.roots[1].items[0].items[2].items[i].name)+type;
			item.ord=data.roots[1].items[0].items[2].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-C座")&&(type=="物业用电")){
		//商业区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[1].items[1].items[2].name)+(data.roots[1].items[1].items[2].items[i].name)+type;
			item.ord=data.roots[1].items[1].items[2].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-C座")&&(type=="公区照明")){
		//商业区、办公区、机房层、避难层、顶楼、地下室
		for(i=0;i<6;i++){
			var item=new Object();
			item.name=(data.roots[1].items[2].items[2].name)+(data.roots[1].items[2].items[2].items[i].name)+type;
			item.ord=data.roots[1].items[2].items[2].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-C座")&&(type=="公区空调")){
		//商业区、办公区、机房层、避难层、顶楼
		for(i=0;i<5;i++){
			var item=new Object();
			item.name=(data.roots[1].items[3].items[2].name)+(data.roots[1].items[3].items[2].items[i].name)+type;
			item.ord=data.roots[1].items[3].items[2].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-C座")&&(type=="公区动力")){
		//商业区、办公区
		for(i=0;i<2;i++){
			var item=new Object();
			item.name=(data.roots[1].items[4].items[2].name)+(data.roots[1].items[4].items[2].items[i].name)+type;
			item.ord=data.roots[1].items[4].items[2].items[i].ord;
			items.push(item);
		}
		//避难层、顶楼、地下层
		for(i=3;i<6;i++){
			var item=new Object();
			item.name=(data.roots[1].items[4].items[2].name)+(data.roots[1].items[4].items[2].items[i].name)+type;
			item.ord=data.roots[1].items[4].items[2].items[i].ord;
			items.push(item);
		}	
	}else if((area=="B03-C座")&&(type=="特殊用电")){
		//商业区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[1].items[5].items[2].name)+(data.roots[1].items[4].items[2].items[i].name)+type;
			item.ord=data.roots[1].items[5].items[2].items[i].ord;
			items.push(item);
		}
		//避难层、顶楼、地下室
		for(i=3;i<6;i++){
			var item=new Object();
			item.name=(data.roots[1].items[5].items[2].name)+(data.roots[1].items[4].items[2].items[i].name)+type;
			item.ord=data.roots[1].items[5].items[2].items[i].ord;
			items.push(item);
		}		
	}else if((area=="B03-C座")&&(type=="租户用水")){
		//商业区、办公区
		for(i=0;i<2;i++){
			var item=new Object();
			item.name=(data.roots[4].items[0].items[2].name)+(data.roots[4].items[0].items[2].items[i].name)+type;
			item.ord=data.roots[4].items[0].items[2].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-C座")&&(type=="公区用水")){
		//商业区、办公区、机房层、避难层
		for(i=0;i<2;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[2].name)+(data.roots[4].items[1].items[2].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[2].items[i].ord;
			items.push(item);
		}
		//地下室
		for(i=5;i<6;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[2].name)+(data.roots[4].items[1].items[2].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[2].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-C座")&&(type=="冷热量")){
		//地下室
		for(i=5;i<6;i++){
			var item=new Object();
			item.name=(data.roots[6].items[0].items[2].name)+(data.roots[6].items[0].items[2].items[i].name)+type;
			item.ord=data.roots[6].items[0].items[2].items[i].ord;
			items.push(item);
		}
	}else if((area=="B03-C座")&&(type=="燃气用量")){
		//商业区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[7].items[0].items[2].name)+(data.roots[7].items[0].items[2].items[i].name)+type;
			item.ord=data.roots[7].items[0].items[2].items[i].ord;
			items.push(item);
		}
		//商业区、地下室
		for(i=5;i<6;i++){
			var item=new Object();
			item.name=(data.roots[7].items[0].items[2].name)+(data.roots[7].items[0].items[2].items[i].name)+type;
			item.ord=data.roots[7].items[0].items[2].items[i].ord;
			items.push(item);
		}
	}else if((area=="B04座")&&(type=="租户用电")){
		//商业区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[1].items[0].items[3].name)+(data.roots[1].items[0].items[3].items[i].name)+type;
			item.ord=data.roots[1].items[0].items[3].items[i].ord;
			items.push(item);
		}
		//地下室
		for(i=3;i<4;i++){
			var item=new Object();
			item.name=(data.roots[1].items[0].items[3].name)+(data.roots[1].items[0].items[3].items[i].name)+type;
			item.ord=data.roots[1].items[0].items[3].items[i].ord;
			items.push(item);
		}
	}else if((area=="B04座")&&(type=="物业用电")){
		//商业区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[1].items[1].items[3].name)+(data.roots[1].items[1].items[3].items[i].name)+type;
			item.ord=data.roots[1].items[1].items[3].items[i].ord;
			items.push(item);
		}
		//地下室
		for(i=3;i<4;i++){
			var item=new Object();
			item.name=(data.roots[1].items[1].items[3].name)+(data.roots[1].items[1].items[3].items[i].name)+type;
			item.ord=data.roots[1].items[1].items[3].items[i].ord;
			items.push(item);
		}
	}else if((area=="B04座")&&(type=="公区照明")){
		//商业区、影院夹层、顶楼、地下室
		for(i=0;i<4;i++){
			var item=new Object();
			item.name=(data.roots[1].items[2].items[3].name)+(data.roots[1].items[2].items[3].items[i].name)+type;
			item.ord=data.roots[1].items[2].items[3].items[i].ord;
			items.push(item);
		}
	}else if((area=="B04座")&&(type=="公区空调")){
		//商业区、影院夹层、顶楼、地下室
		for(i=0;i<4;i++){
			var item=new Object();
			item.name=(data.roots[1].items[3].items[3].name)+(data.roots[1].items[3].items[3].items[i].name)+type;
			item.ord=data.roots[1].items[3].items[3].items[i].ord;
			items.push(item);
		}
	}else if((area=="B04座")&&(type=="公区动力")){
		//商业区、影院夹层、顶楼、地下室
		for(i=0;i<4;i++){
			var item=new Object();
			item.name=(data.roots[1].items[4].items[3].name)+(data.roots[1].items[4].items[3].items[i].name)+type;
			item.ord=data.roots[1].items[4].items[3].items[i].ord;
			items.push(item);
		}
	}else if((area=="B04座")&&(type=="特殊用电")){
		//商业区、影院夹层、顶楼、地下室
		for(i=0;i<4;i++){
			var item=new Object();
			item.name=(data.roots[1].items[5].items[3].name)+(data.roots[1].items[5].items[3].items[i].name)+type;
			item.ord=data.roots[1].items[5].items[3].items[i].ord;
			items.push(item);
		}
	}else if((area=="B04座")&&(type=="租户用水")){
		//商业区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[4].items[0].items[3].name)+(data.roots[4].items[0].items[3].items[i].name)+type;
			item.ord=data.roots[4].items[0].items[3].items[i].ord;
			items.push(item);
		}
		//地下层
		for(i=3;i<4;i++){
			var item=new Object();
			item.name=(data.roots[4].items[0].items[3].name)+(data.roots[4].items[0].items[3].items[i].name)+type;
			item.ord=data.roots[4].items[0].items[3].items[i].ord;
			items.push(item);
		}
	}else if((area=="B04座")&&(type=="公区用水")){
		//商业区、影院夹层
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[3].name)+(data.roots[4].items[1].items[3].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[3].items[i].ord;
			items.push(item);
		}
		//地下室
		for(i=3;i<4;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[3].name)+(data.roots[4].items[1].items[3].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[3].items[i].ord;
			items.push(item);
		}		
	}else if((area=="B04座")&&(type=="冷热量")){
		//商业区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[6].items[0].items[3].name)+(data.roots[6].items[0].items[3].items[i].name)+type;
			item.ord=data.roots[6].items[0].items[3].items[i].ord;
			items.push(item);
		}
		//地下室
		for(i=3;i<4;i++){
			var item=new Object();
			item.name=(data.roots[6].items[0].items[3].name)+(data.roots[6].items[0].items[3].items[i].name)+type;
			item.ord=data.roots[6].items[0].items[3].items[i].ord;
			items.push(item);
		}
	}else if((area=="B04座")&&(type=="燃气用量")){
		//商业区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[7].items[0].items[3].name)+(data.roots[7].items[0].items[3].items[i].name)+type;
			item.ord=data.roots[7].items[0].items[3].items[i].ord;
			items.push(item);
		}
		//地下室
		for(i=3;i<4;i++){
			var item=new Object();
			item.name=(data.roots[7].items[0].items[3].name)+(data.roots[7].items[0].items[3].items[i].name)+type;
			item.ord=data.roots[7].items[0].items[3].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-D座")&&(type=="租户用电")){
		//办公区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[1].items[0].items[5].name)+(data.roots[1].items[0].items[5].items[i].name)+type;
			item.ord=data.roots[1].items[0].items[5].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-D座")&&(type=="公区照明")){
		//办公区、顶楼、地下室
		for(i=0;i<3;i++){
			var item=new Object();
			item.name=(data.roots[1].items[2].items[5].name)+(data.roots[1].items[2].items[5].items[i].name)+type;
			item.ord=data.roots[1].items[2].items[5].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-D座")&&(type=="公区空调")){
		//办公区、顶楼、地下室
		for(i=0;i<3;i++){
			var item=new Object();
			item.name=(data.roots[1].items[3].items[5].name)+(data.roots[1].items[3].items[5].items[i].name)+type;
			item.ord=data.roots[1].items[3].items[5].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-D座")&&(type=="公区动力")){
		//办公区、顶楼、地下室
		for(i=0;i<3;i++){
			var item=new Object();
			item.name=(data.roots[1].items[4].items[5].name)+(data.roots[1].items[4].items[5].items[i].name)+type;
			item.ord=data.roots[1].items[4].items[5].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-D座")&&(type=="特殊用电")){
		//顶楼、地下室
		for(i=1;i<3;i++){
			var item=new Object();
			item.name=(data.roots[1].items[5].items[5].name)+(data.roots[1].items[5].items[5].items[i].name)+type;
			item.ord=data.roots[1].items[5].items[5].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-D座")&&(type=="租户用水")){
		//办公区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[4].items[0].items[5].name)+(data.roots[4].items[0].items[5].items[i].name)+type;
			item.ord=data.roots[4].items[0].items[5].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-D座")&&(type=="公区用水")){
		//办公区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[5].name)+(data.roots[4].items[1].items[5].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[5].items[i].ord;
			items.push(item);
		}
		//地下室
		for(i=2;i<3;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[5].name)+(data.roots[4].items[1].items[5].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[5].items[i].ord;
			items.push(item);
		}		
	}else if((area=="B06-E座")&&(type=="租户用电")){
		//办公区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[1].items[0].items[6].name)+(data.roots[1].items[0].items[6].items[i].name)+type;
			item.ord=data.roots[1].items[0].items[6].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-E座")&&(type=="公区照明")){
		//办公区、顶楼、地下室
		for(i=0;i<3;i++){
			var item=new Object();
			item.name=(data.roots[1].items[2].items[6].name)+(data.roots[1].items[2].items[6].items[i].name)+type;
			item.ord=data.roots[1].items[2].items[6].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-E座")&&(type=="公区空调")){
		//办公区、顶楼、地下室
		for(i=0;i<3;i++){
			var item=new Object();
			item.name=(data.roots[1].items[3].items[6].name)+(data.roots[1].items[3].items[6].items[i].name)+type;
			item.ord=data.roots[1].items[3].items[6].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-E座")&&(type=="公区动力")){
		//办公区、顶楼、地下室
		for(i=0;i<3;i++){
			var item=new Object();
			item.name=(data.roots[1].items[4].items[6].name)+(data.roots[1].items[4].items[6].items[i].name)+type;
			item.ord=data.roots[1].items[4].items[6].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-E座")&&(type=="特殊用电")){
		//顶楼、地下室
		for(i=1;i<3;i++){
			var item=new Object();
			item.name=(data.roots[1].items[5].items[6].name)+(data.roots[1].items[5].items[6].items[i].name)+type;
			item.ord=data.roots[1].items[5].items[6].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-E座")&&(type=="租户用水")){
		//办公区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[4].items[0].items[6].name)+(data.roots[4].items[0].items[6].items[i].name)+type;
			item.ord=data.roots[4].items[0].items[6].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-E座")&&(type=="公区用水")){
		//办公区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[6].name)+(data.roots[4].items[1].items[6].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[6].items[i].ord;
			items.push(item);
		}
		//地下室 
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[4].items[1].items[6].name)+(data.roots[4].items[1].items[6].items[i].name)+type;
			item.ord=data.roots[4].items[1].items[6].items[i].ord;
			items.push(item);
		}
	}else if((area=="B06-E座")&&(type=="冷热量")){
		//办公区
		for(i=0;i<1;i++){
			var item=new Object();
			item.name=(data.roots[6].items[0].items[6].name)+(data.roots[6].items[0].items[6].items[i].name)+type;
			item.ord=data.roots[6].items[0].items[6].items[i].ord;
			items.push(item);
		}
	}
	
	return items;
}

//根据ID取得对应的楼座和分区，判断渲染哪些分项
function getTypeItemsul(id){
	
	var build=$(id+" .hideput_build").val();
	var area=$(id+" .hideput_area").val();
	

if((build=='B03-A座')&&(area=='商业区')){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>物业用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-A座')&&(area=='办公区')){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-A座')&&(area=='机房层')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-A座')&&(area=='避难层')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-A座')&&(area=='顶楼')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-A座')&&(area=='地下室')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>公区用水</a></li>"+
	"<li><a>冷热量</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-B座')&&(area=='商业区')){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>物业用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-B座')&&(area=='办公区')){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-B座')&&(area=='机房层')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-B座')&&(area=='顶楼')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-B座')&&(area=='地下室')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>冷热量</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-C座')&&(area=='商业区')){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>物业用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-C座')&&(area=='办公区')){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-C座')&&(area=='机房层')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-C座')&&(area=='避难层')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-C座')&&(area=='顶楼')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B03-C座')&&(area=='地下室')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>冷热量</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B04座')&&(area=='商业区')){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>物业用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>"+
	"<li><a>冷热量</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B04座')&&(area=='影院夹层')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
		"<li><a>公区空调</a></li>"+
		"<li><a>公区动力</a></li>"+
		"<li><a>特殊用电</a></li>"+
		"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B04座')&&(area=='顶楼')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
		"<li><a>公区空调</a></li>"+
		"<li><a>公区动力</a></li>"+
		"<li><a>特殊用电</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B04座')&&(area=='地下室')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append("<li><a>租户用电</a></li>"+
		"<li><a>物业用电</a></li>"+
		"<li><a>公区照明</a></li>"+
		"<li><a>公区空调</a></li>"+
		"<li><a>公区动力</a></li>"+
		"<li><a>特殊用电</a></li>"+
		"<li><a>租户用水</a></li>"+
		"<li><a>公区用水</a></li>"+
		"<li><a>冷热量</a></li>"+
		"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");
	
}else if((build=='B06-D座')&&(area=='办公区')){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B06-D座')&&(area=='顶楼')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B06-D座')&&(area=='地下室')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B06-E座')&&(area=='办公区')){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>"+
	"<li><a>冷热量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B06-E座')&&(area=='顶楼')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if((build=='B06-E座')&&(area=='地下室')){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else{
	$(id+" .itemsdown a span:first-child").html("");
	$(id+" .energy_type_name").html("");
	$(id+" .type_energy_ul").empty().append("");
}

}

//根据ID取得对应的楼座和分区，判断渲染哪些分级
function getTypeGradeul(id){
	var build=$(id+" .hideput_build").val();

	var area=$(id+" .hideput_area").val();
	//alert(build+"------"+area);

if(((build=='B03-A座')||(build=='B03-B座')||(build=='B03-C座')||(build=='B04座'))&&(area=='商业区')){
	$(id+" .itemsdown a span:first-child").html("一级用电");
	$(id+" .energy_type_name").html("一级用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>一级用电</a></li>"+
	"<li><a>二级用电</a></li>"+
	"<li><a>三级用电</a></li>"+
	"<li><a>四级用电</a></li>"+
	"<li><a>一级用水</a></li>"+
	"<li><a>二级用水</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".classes-menu",".classes",id+" .energy_type_name");

}else if(((build=='B03-A座')||(build=='B03-B座')||(build=='B03-C座')||(build=='B06-D座')||(build=='B06-E座'))&&(area=='办公区')){
	$(id+" .itemsdown a span:first-child").html("一级用电");
	$(id+" .energy_type_name").html("一级用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>一级用电</a></li>"+
	"<li><a>二级用电</a></li>"+
	"<li><a>三级用电</a></li>"+
	"<li><a>四级用电</a></li>"+
	"<li><a>一级用水</a></li>"+
	"<li><a>二级用水</a></li>");
	selectTypeChoice(".classes-menu",".classes",id+" .energy_type_name");
	
}else if(((build=='B03-A座')||(build=='B03-B座')||(build=='B03-C座')||(build=='B04座'))&&(area=='机房层')){
	$(id+" .itemsdown a span:first-child").html("一级用电");
	$(id+" .energy_type_name").html("一级用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>一级用电</a></li>"+
	"<li><a>二级用电</a></li>"+
	"<li><a>三级用电</a></li>"+
	"<li><a>四级用电</a></li>"+
	"<li><a>一级用水</a></li>"+
	"<li><a>二级用水</a></li>");
	selectTypeChoice(".classes-menu",".classes",id+" .energy_type_name");

}else if(((build=='B03-A座')||(build=='B03-C座'))&&(area=='避难层')){
	$(id+" .itemsdown a span:first-child").html("一级用电");
	$(id+" .energy_type_name").html("一级用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>一级用电</a></li>"+
	"<li><a>二级用电</a></li>"+
	"<li><a>三级用电</a></li>"+
	"<li><a>四级用电</a></li>"+
	"<li><a>一级用水</a></li>"+
	"<li><a>二级用水</a></li>");
	selectTypeChoice(".classes-menu",".classes",id+" .energy_type_name");

}else if(area=='顶楼'){
	$(id+" .itemsdown a span:first-child").html("一级用电");
	$(id+" .energy_type_name").html("一级用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>一级用电</a></li>"+
	"<li><a>二级用电</a></li>"+
	"<li><a>三级用电</a></li>"+
	"<li><a>四级用电</a></li>"+
	"<li><a>一级用水</a></li>"+
	"<li><a>二级用水</a></li>");
	selectTypeChoice(".classes-menu",".classes",id+" .energy_type_name");

}else if(((build=='B03-A座')||(build=='B03-B座')||(build=='B03-C座')||(build=='B04座'))&&(area=='地下室')){
	$(id+" .itemsdown a span:first-child").html("一级用电");
	$(id+" .energy_type_name").html("一级用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>一级用电</a></li>"+
	"<li><a>二级用电</a></li>"+
	"<li><a>三级用电</a></li>"+
	"<li><a>四级用电</a></li>"+
	"<li><a>一级用水</a></li>"+
	"<li><a>二级用水</a></li>"+
	"<li><a>冷热量</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".classes-menu",".classes",id+" .energy_type_name");

}else if((build=='B06-E座')&&(area=='办公区')){
	$(id+" .itemsdown a span:first-child").html("一级用电");
	$(id+" .energy_type_name").html("一级用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>一级用电</a></li>"+
	"<li><a>二级用电</a></li>"+
	"<li><a>三级用电</a></li>"+
	"<li><a>四级用电</a></li>"+
	"<li><a>一级用水</a></li>"+
	"<li><a>二级用水</a></li>"+
	"<li><a>冷热量</a></li>");
	selectTypeChoice(".classes-menu",".classes",id+" .energy_type_name");

}else{
	$(id+" .itemsdown a span:first-child").html("");
	$(id+" .energy_type_name").html("");
	$(id+" .type_energy_ul").empty().append("");
}

}

//根据ID取得对应的分区，判断渲染哪些分项(能耗排名)
function getTypeRanksul(id){

var area=$(id+" .hideput_area").val();
if(area=='商业区'){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>物业用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>"+
	"<li><a>冷热量</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if(area=='办公区'){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>"+
	"<li><a>冷热量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if(area=='机房层'){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if(area=='避难层'){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>公区用水</a>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if(area=='顶楼'){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");

}else if(area=='地下室'){
	$(id+" .itemsdown a span:first-child").html("租户用电");
	$(id+" .energy_type_name").html("租户用电");
	$(id+" .type_energy_ul").empty().append(" <li><a>租户用电</a></li>"+
	"<li><a>物业用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>"+
	"<li><a>冷热量</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");
}else if(area=='影院夹层'){
	$(id+" .itemsdown a span:first-child").html("公区照明");
	$(id+" .energy_type_name").html("公区照明");
	$(id+" .type_energy_ul").empty().append(" <li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>公区用水</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");
}else{
	$(id+" .itemsdown a span:first-child").html("总用电");
	$(id+" .energy_type_name").html("总用电");
	$(id+" .type_energy_ul").empty().append("<li><a>总用电</a></li>"+ 
	"<li><a>租户用电</a></li>"+
	"<li><a>物业用电</a></li>"+
	"<li><a>公区照明</a></li>"+
	"<li><a>公区空调</a></li>"+
	"<li><a>公区动力</a></li>"+
	"<li><a>特殊用电</a></li>"+
	"<li><a>总用水</a></li>"+
	"<li><a>租户用水</a></li>"+
	"<li><a>公区用水</a></li>"+
	"<li><a>冷热量</a></li>"+
	"<li><a>燃气用量</a></li>");
	selectTypeChoice(".childs-menu",".childs",id+" .energy_type_name");
}

}



//选择月报告，显示一个年份选择
function monthchoicereport(id){
	$(id+" .hideput_report").val("月报告");
	$(id+" .enddown").hide();
	$(id+" .stardown .staryear_choice_name").html("年份");
	var ndate = new Date();
	var year=Number(ndate.getFullYear());
	$(id+" .stardown a span:first-child").html(year);
	var html="";
	for(i=year;i>=2010;i--){
	html+="<li><a>"+i+"</a></li>"
	}
	$(id+" .stardown .year_choice_ul").empty().html(html);
	selectChoice(".stardown .year_choice_ul",".stardown .years_value");
	
}

//选择年报告，显示两个年份选择
function yearchoicereport(id){
	$(id+" .hideput_report").val("年报告");
	$(id+" .enddown").show();
	$(id+" .stardown .staryear_choice_name").html("起始年份");
	$(id+" .enddown .endyear_choice_name").html("结束年份");
	var ndate = new Date();
	var year=Number(ndate.getFullYear());
	$(id+" .stardown a span:first-child").html("2010");
	$(id+" .enddown a span:first-child").html(year);
	var html="";
	for(i=year;i>=2010;i--){
	html+="<li><a>"+i+"</a></li>"
	}
	$(id+" .enddown .year_choice_ul").empty().html(html);
	$(id+" .stardown .year_choice_ul").empty().html(html);
	selectChoice(".enddown .year_choice_ul",".enddown .years_value");
	selectChoice(".stardown .year_choice_ul",".stardown .years_value");
}


//根据id获取能耗分项第1层和第2层节点的下标
function getTypeindex(id){
	//创建一个对象
	var typeindex=new Object();
	var type=$(id+" .itemsdown a span:first-child").html();
	if(type=="租户用电"){
		typeindex.type=1;
		typeindex.item=0;
	}else if(type=="物业用电"){
		typeindex.type=1;
		typeindex.item=1;
	}else if(type=="公区照明"){
		typeindex.type=1;
		typeindex.item=2;
	}else if(type=="公区空调"){
		typeindex.type=1;
		typeindex.item=3;
	}else if(type=="公区动力"){
		typeindex.type=1;
		typeindex.item=4;
	}else if(type=="特殊用电"){
		typeindex.type=1;
		typeindex.item=5;
	}else if(type=="租户用水"){
		typeindex.type=4;
		typeindex.item=0;
	}else if(type=="公区用水"){
		typeindex.type=4;
		typeindex.item=1;
	}else if(type=="冷热量"){
		typeindex.type=6;
		typeindex.item=0;
	}else if(type=="燃气用量"){
		typeindex.type=7;
		typeindex.item=0;
	}


	return typeindex;
}

//根据id获取能耗分级第1层和第2层节点的下标
function getgradeTypeindex(id){
	//创建一个对象
	var typeindex=new Object();
	var type=$(id+" .itemsdown a span:first-child").html();
	if(type=="一级用电"){
		typeindex.type=2;
		typeindex.item=0;
	}else if(type=="二级用电"){
		typeindex.type=2;
		typeindex.item=1;
	}else if(type=="三级用电"){
		typeindex.type=2;
		typeindex.item=2;
	}else if(type=="四级用电"){
		typeindex.type=2;
		typeindex.item=3;
	}else if(type=="一级用水"){
		typeindex.type=5;
		typeindex.item=0;
	}else if(type=="二级用水"){
		typeindex.type=5;
		typeindex.item=1;
	}else if(type=="冷热量"){
		typeindex.type=6;
		typeindex.item=0;
	}else if(type=="燃气用量"){
		typeindex.type=7;
		typeindex.item=0;
	}

	return typeindex;
}

//根据id获取第3L节点的下标(楼座)
function getBuildindex(id){
	var build=$(id+" .hideput_build").val();
	if(build=="B03-A座"){
		var buildindex=0;
	}else if(build=="B03-B座"){
		var buildindex=1;
	}else if(build=="B03-C座"){
		var buildindex=2;
	}else if(build=="B04座"){
		var buildindex=3;
	}else if(build=="B05座"){
		var buildindex=4;
	}else if(build=="B06-D座"){
		var buildindex=5;
	}else if(build=="B06-E座"){
		var buildindex=6;
	}
	return buildindex;

}

//根据id获取第4L节点的下标（分区）
function getAreaindex(id){
	var build=$(id+" .hideput_build").val();
	var area=$(id+" .hideput_area").val();
	if((build=="B03-A座")&&(area=="商业区")){
		var areaindex=0;
	}else if((build=="B03-A座")&&(area=="办公区")){
		var areaindex=1;
	}else if((build=="B03-A座")&&(area=="机房层")){
		var areaindex=2;
	}else if((build=="B03-A座")&&(area=="避难层")){
		var areaindex=3;
	}else if((build=="B03-A座")&&(area=="顶楼")){
		var areaindex=4;
	}else if((build=="B03-A座")&&(area=="地下室")){
		var areaindex=5;
	}else if((build=="B03-B座")&&(area=="商业区")){
		var areaindex=0;
	}else if((build=="B03-B座")&&(area=="办公区")){
		var areaindex=1;
	}else if((build=="B03-B座")&&(area=="机房层")){
		var areaindex=2;
	}else if((build=="B03-B座")&&(area=="顶楼")){
		var areaindex=3;
	}else if((build=="B03-B座")&&(area=="地下室")){
		var areaindex=4;
	}else if((build=="B03-C座")&&(area=="商业区")){
		var areaindex=0;
	}else if((build=="B03-C座")&&(area=="办公区")){
		var areaindex=1;
	}else if((build=="B03-C座")&&(area=="机房层")){
		var areaindex=2;
	}else if((build=="B03-C座")&&(area=="避难层")){
		var areaindex=3;
	}else if((build=="B03-C座")&&(area=="顶楼")){
		var areaindex=4;
	}else if((build=="B03-C座")&&(area=="地下室")){
		var areaindex=5;
	}else if((build=="B04座")&&(area=="商业区")){
		var areaindex=0;
	}else if((build=="B04座")&&(area=="影院夹层")){
		var areaindex=1;
	}else if((build=="B04座")&&(area=="顶楼")){
		var areaindex=2;
	}else if((build=="B04座")&&(area=="地下室")){
		var areaindex=3;
	}else if((build=="B06-D座")&&(area=="办公区")){
		var areaindex=0;
	}else if((build=="B06-D座")&&(area=="顶楼")){
		var areaindex=1;
	}else if((build=="B06-D座")&&(area=="地下室")){
		var areaindex=2;
	}else if((build=="B06-E座")&&(area=="办公区")){
		var areaindex=0;
	}else if((build=="B06-E座")&&(area=="顶楼")){
		var areaindex=1;
	}else if((build=="B06-E座")&&(area=="地下室")){
		var areaindex=2;
	}

	return areaindex;
}

//根据id获取第5L节点的下标（分层）
function getFloorindex(id){
	var build=$(id+" .hideput_build").val();
	var area=$(id+" .hideput_area").val();
	var floor=$(id+" .hideput_floor").val();
	//alert(id+"----"+build+"---"+area+"-----"+floor);
	if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座")||(build=="B04座"))&&(area=="商业区")&&(floor=="1L")){
		var floorindex=0;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座")||(build=="B04座"))&&(area=="商业区")&&(floor=="2L")){
		var floorindex=1;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座")||(build=="B04座")||(build=="B06-D座")||(build=="B06-E座"))&&(area=="顶楼")&&(floor=="顶楼")){
		var floorindex=0;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="机房层")&&(floor=="机房层")){
		var floorindex=0;
	}else if((build=="B03-A座")&&(area=="避难层")&&(floor=="15L")){
		var floorindex=0;
	}else if((build=="B03-C座")&&(area=="避难层")&&(floor=="16L")){
		var floorindex=0;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座")||(build=="B04座")||(build=="B06-D座")||(build=="B06-E座"))&&(area=="地下室")&&(floor=="-1L")){
		var floorindex=0;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座")||(build=="B04座")||(build=="B06-D座")||(build=="B06-E座"))&&(area=="地下室")&&(floor=="-2L")){
		var floorindex=1;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="地下室")&&(floor=="-3L")){
		var floorindex=2;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="地下室")&&(floor=="夹层")){
		var floorindex=3;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="3L")){
		var floorindex=0;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="4L")){
		var floorindex=1;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="5L")){
		var floorindex=2;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="6L")){
		var floorindex=3;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="7L")){
		var floorindex=4;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="8L")){
		var floorindex=5;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="9L")){
		var floorindex=6;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="10L")){
		var floorindex=7;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="11L")){
		var floorindex=8;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="12L")){
		var floorindex=9;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="13L")){
		var floorindex=10;
	}else if(((build=="B03-A座")||(build=="B03-B座")||(build=="B03-C座"))&&(area=="办公区")&&(floor=="14L")){
		var floorindex=11;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="16L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="15L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="15L"))){
		var floorindex=12;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="17L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="16L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="17L"))){
		var floorindex=13;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="18L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="17L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="18L"))){
		var floorindex=14;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="19L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="18L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="19L"))){
		var floorindex=15;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="20L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="19L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="20L"))){
		var floorindex=16;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="21L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="20L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="21L"))){
		var floorindex=17;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="22L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="21L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="22L"))){
		var floorindex=18;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="23L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="22L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="23L"))){
		var floorindex=19;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="24L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="23L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="24L"))){
		var floorindex=20;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="25L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="25L"))){
		var floorindex=21;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="26L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="26L"))){
		var floorindex=22;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="27L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="27L"))){
		var floorindex=23;
	}else if(((build=="B03-A座")&&(area=="办公区")&&(floor=="28L"))||((build=="B03-B座")&&(area=="办公区")&&(floor=="28L"))){
		var floorindex=24;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="1L")){
		var floorindex=0;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="2L")){
		var floorindex=1;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="3L")){
		var floorindex=2;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="4L")){
		var floorindex=3;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="5L")){
		var floorindex=4;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="6L")){
		var floorindex=5;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="7L")){
		var floorindex=6;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="8L")){
		var floorindex=7;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="9L")){
		var floorindex=8;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="10L")){
		var floorindex=9;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="11L")){
		var floorindex=10;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="12L")){
		var floorindex=11;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="13L")){
		var floorindex=12;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="14L")){
		var floorindex=13;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="15L")){
		var floorindex=14;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="16L")){
		var floorindex=15;
	}else if(((build=="B06-D座")||(build=="B06-E座"))&&(area=="办公区")&&(floor=="17L")){
		var floorindex=16;
	}

	return floorindex;
}






//根据id初始化隐藏域和顶部标题
function hidputbutIni(id){
	$(id+" .energy_build_name").html("B03-A座");	
	$(id+" .energy_area_name").html("商业区");
	$(id+" .hideput_build").val("B03-A座");
	$(id+" .hideput_area").val("商业区");
	$(id+" .hideput_report").val("年报告");
	$(id+" .left_portside li").removeClass("active");
	$(id+" .left_portside li:first-child").addClass("active");
	
}

