$(function(){
	$(".calendarStart").val("2017-07-01");
	$(".calendarEnd").val("2017-07-27");
});

/*点击能耗信息*/
$(".energyInfo").on("click",function(){
    $("#subentry_items span:first-child").html("租户用电");
	getEnergyTable(1);
});
/*点击能耗统计*/
$("#statistic_energy").on("click",function(){
	getEnergyTable(1);
});
/*点击能耗分项*/
$("#subentry_energy").on("click",function(){
    $("#subentry_items span:first-child").html("租户用电");
	getEnergyTable(2);
});
/*点击能耗分级*/
$("#grade_energy").on("click",function(){
	getEnergyTable(3);
});
/*点击能耗报告*/
$("#profile_energy").on("click",function(){
	getEnergyTable(4);
});

/*点击能耗分析*/
$(".energyAnalysis").on("click",function(){
	getEnergyTable(5);
});
/*点击能耗同比*/
$("#consumption_energy").on("click",function(){
	getEnergyTable(5);
});
/*点击能耗环比*/
$("#consumption_chain_energy").on("click",function(){
	getEnergyTable(6);
});
/*点击能耗排名*/
$("#ranking_energy").on("click",function(){
	getEnergyTable(7);
});
/*点击能耗去向*/
$("#whereabouts_energy").on("click",function(){
	getEnergyTable(8);
});
/*点击历史数据*/
$("#historical_energy").on("click",function(){
	getEnergyTable(9);
});

//点击能耗报表
$(".energyReport").on("click",function(){
	reportgenerationtable(10);
});

//点击报表生成
$("#report_generation").on("click",function(){
	reportgenerationtable(10);
});
//点击测量点表
$("#survey_point").on("click",function(){
	getEnergyTable(11);
});
//点击同比报表
$("#size_statement").on("click",function(){
	getEnergyTable(12);
});
//点击环比报表
$("#link_report").on("click",function(){
	getEnergyTable(13);
});

//节能诊断
$(".diagnose").on("click",function(){
	getEnergyTable(14);
});

//能耗异常诊断
$("#energy_abnormal").on("click",function(){
	getEnergyTable(14);
});
//工作时间诊断
$("#worktime_diagnosis").on("click",function(){
	getEnergyTable(15);
});
//非工作时间诊断
$("#nonworking_diagnosis").on("click",function(){
	getEnergyTable(16);
});

//点击成本中心
$(".cost").on("click",function(){
	getEnergyTable(17);
});
//点击账单报表
$("#billing_statement").on("click",function(){
	getEnergyTable(17);
});
//点击成本统计
$("#cost_statistics").on("click",function(){
	getEnergyTable(18);
});

//默认能耗查询
function getEnergyTable(index){
	switch(index)
	{
		case 1:
			statistictable5();	//能耗统计
			break;
		case 2:
			subentrytable(); //能耗分项
			break;
		case 3:
			gradetable();	//能耗分级
			break;
		case 4:
			profiletable();	//能耗报告
			break;
		case 5:
			consumptiontable(); //能耗同比
			break;
		case 6:
			consumptionchaintable();	//能耗环比
			break;
		case 7:
			rankingtable();		//能耗排名
			break;
		case 8:
			whereaboutstable();	//能耗去向
			break;
		case 9:
			historicaldatatable();	//历史数据
			break;
		case 10:
			reportgenerationtable();//能耗报表
			break;
		case 11:
			surveypointtable();//能耗报表
			break;
		case 12:
			sizestatementtable();	//同比报表
			break;
		case 13:
			tablinkreporttable();	//环比报表
			break;
		case 14:
			abnormaltable();
			break;
		case 15:
			worktimetable();
			break;
		case 16:
			nonworkingtable();
			break;
		case 17:
			billingstatementtable();
			break;
		case 18:
			coststatistics();
			break;
		default:
			alert("未知错误");
	}

}
//点击查询按钮
function getEnergy(index){
	switch(index)
	{
		case 1:
			statisticenergy();	//能耗统计
			break;
		case 2:
			subentryenergy(); //能耗分项
			break;
		case 3:
			gradeenergy();	//能耗分级
			break;
		case 4:
			profileenergy();	//能耗报告
			break;
		case 5:
			consumptionenergy(); //能耗同比
			break;
		case 6:
			consumptionchainenergy();	//能耗环比
			break;
		case 7:
			rankingenergy();		//能耗排名
			break;
		case 8:
			whereaboutsenergy();	//能耗去向
			break;
		case 9:
			historicaldata();	//历史数据
			break;
		case 10:
			reportgenerationtable();	//能耗报表
			break;
		case 11:
			surveypointtable();	//能耗报表
			break;
		case 12:
			sizestatementtable();	//同比报表
			break;
		case 13:
			tablinkreporttable();	//环比报表
			break;
		case 14:
			abnormalenergy();	//能耗异常诊断
			break;
		case 15:
			worktimeenergy();	//工作时间诊断
			break;
		case 16:
			nonworkingenergy();	//非工作时间诊断
			break;
		case 17:
			billingstatementtable();
			break;
		case 18:
			coststatistics();
			break;
		default:
			alert("未知错误");
	}
}
/**********************************************************************/
//二、 /能耗信息
//2.1.能耗统计
function statisticenergy(){

	var type=$("#statis_type span:first-child").html();
	var view=$("#statis_view span:first-child").html();
	if((type=="电能")&&(view=="表格")){
		statistictable1();
	}else if((type=="水能")&&(view=="表格")){
		statistictable2();
	}else if((type=="燃气")&&(view=="表格")){
		statistictable3();
	}else if((type=="冷热量")&&(view=="表格")){
		statistictable4();
	}else if((type=="总能耗")&&(view=="表格")){
		statistictable5();
	}else if((type=="电能")&&(view=="曲线图")){
		statisticqucharts1();
	}else if((type=="水能")&&(view=="曲线图")){
		statisticqucharts2();
	}else if((type=="燃气")&&(view=="曲线图")){
		statisticqucharts3();
	}else if((type=="冷热量")&&(view=="曲线图")){
		statisticqucharts4();
	}else if((type=="总能耗")&&(view=="曲线图")){
		statisticqucharts5();
	}else if((type=="电能")&&(view=="柱状图")){
		statisticzhucharts1();
	}else if((type=="水能")&&(view=="柱状图")){
		statisticzhucharts2();
	}else if((type=="燃气")&&(view=="柱状图")){
		statisticzhucharts3();
	}else if((type=="冷热量")&&(view=="柱状图")){
		statisticzhucharts4();
	}else{
		statisticzhucharts5();
	}
}
function statistictable1(){
	$('#charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'>"
		+"<th>类别</th><th>单位</th><th>合计</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>" +
		"<th>11</th> <th>12</th> <th>13</th> <th>14</th> <th>15</th> <th>16</th> <th>17</th> <th>18</th> <th>19</th> <th>20</th>" +
		"<th>21</th> <th>21</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th></tr></thead>";
	html+= "<tbody><tr>" +
		"<td>电能</td><td>kwh</td>" +
		"<td>112060</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td>" +
		"<td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td>" +
		"<td>4095</td><td>4210</td><td>4095</td><td>4095</td><td>4210</td><td>4095</td></tr>"+
		"<td>成本</td><td>元</td>" +
		"<td>612060</td><td>2510</td><td>2595</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td>" +
		"<td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td>" +
		"<td>4095</td><td>4210</td><td>4095</td><td>4095</td><td>4210</td><td>4095</td></tr>"
		+"</tbody>";
$("#tab_energy_statistic table").empty().html(html);
}
function statistictable2(){
	$('#charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'>"
		+"<th>类别</th><th>单位</th><th>合计</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>" +
		"<th>11</th> <th>12</th> <th>13</th> <th>14</th> <th>15</th> <th>16</th> <th>17</th> <th>18</th> <th>19</th> <th>20</th>" +
		"<th>21</th> <th>21</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th></tr></thead>";
	html+= "<tbody><tr>" +
		"<td>水能</td><td>m<sup>3</sup></td>" +
		+"<tr><td>水能</td><td>m<sup>3</sup></td>" +
		"<td>85060</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td>" +
		"<td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td>" +
		"<td>3095</td><td>3210</td><td>3095</td><td>3095</td><td>3210</td><td>3095</td></tr>"
		+"</tbody>";

	$("#tab_energy_statistic table").empty().html(html);
}
function statistictable3(){
	$('#charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'>"
		+"<th>类别</th><th>单位</th><th>合计</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>" +
		"<th>11</th> <th>12</th> <th>13</th> <th>14</th> <th>15</th> <th>16</th> <th>17</th> <th>18</th> <th>19</th> <th>20</th>" +
		"<th>21</th> <th>21</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th></tr></thead>";
	html+= "<tbody><tr>" +
		"<td>燃气</td><td>m<sup>3</sup></td>" +
		"<td>58060</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td>" +
		"<td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td>" +
		"<td>2095</td><td>2210</td><td>2095</td><td>2095</td><td>2210</td><td>2095</td></tr>"
		+"</tbody>";

	$("#tab_energy_statistic table").empty().html(html);
}
function statistictable4(){
	$('#charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'>"
		+"<th>类别</th><th>单位</th><th>合计</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>" +
		"<th>11</th> <th>12</th> <th>13</th> <th>14</th> <th>15</th> <th>16</th> <th>17</th> <th>18</th> <th>19</th> <th>20</th>" +
		"<th>21</th> <th>21</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th></tr></thead>";
	html+= "<tbody><tr>" +
		"<td>冷热量</td><td>kw</td>" +
		"<td>31060</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td>" +
		"<td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td>" +
		"<td>1095</td><td>1210</td><td>1095</td><td>1095</td><td>1210</td><td>1095</td></tr>"
		+"</tbody>";

	$("#tab_energy_statistic table").empty().html(html);
}
function statistictable5(){
	$('#charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'>"
		+"<th>类别</th><th>单位</th><th>合计</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>" +
		"<th>11</th> <th>12</th> <th>13</th> <th>14</th> <th>15</th> <th>16</th> <th>17</th> <th>18</th> <th>19</th> <th>20</th>" +
		"<th>21</th> <th>21</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th></tr></thead>";
	html+= "<tbody><tr>" +
		"<td>电能</td><td>kwh</td>" +
		"<td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td>" +
		"<td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td>" +
		"<td>4095</td><td>4210</td><td>4095</td><td>4095</td><td>4210</td><td>4095</td></tr>"
		+"<tr><td>水能</td><td>m<sup>3</sup></td>" +
		"<td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td>" +
		"<td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td><td>3095</td><td>3210</td>" +
		"<td>3095</td><td>3210</td><td>3095</td><td>3095</td><td>3210</td><td>3095</td></tr>"
		+"<tr><td>燃气</td><td>m<sup>3</sup></td>" +
		"<td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td>" +
		"<td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td><td>2095</td><td>2210</td>" +
		"<td>2095</td><td>2210</td><td>2095</td><td>2095</td><td>2210</td><td>2095</td></tr>"+
		"<tr><td>冷热量</td><td>kw</td>"+
		"<td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td>" +
		"<td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td><td>1095</td><td>1210</td>" +
		"<td>1095</td><td>1210</td><td>1095</td><td>1095</td><td>1210</td><td>1095</td></tr>"
		+"</tbody>";

	$("#tab_energy_statistic table").empty().html(html);
}
function statisticqucharts1(){
	$("#tab_energy_statistic table").empty();
	var title = {
		text: '电能统计'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis = {
		title: {
			text: '电能消耗'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kwh'
	}

	var series =  [
		{
			color:'#f7a35c',
			name: '电能',
			data: [4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4095,4210,4095]
		}
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#charts').empty().highcharts(json);
}
function statisticqucharts2(){
	$("#tab_energy_statistic table").empty();
	var title = {
		text: '水能统计'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis = {
		title: {
			text: '水能消耗'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'm3'
	}

	var series =  [

		{
			color:'#7cb5ec',
			name: '水能',
			data: [3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3095,3210,3095]
		}
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#charts').empty().highcharts(json);
}
function statisticqucharts3(){
	$("#tab_energy_statistic table").empty();
	var title = {
		text: '燃气统计'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis = {
		title: {
			text: '燃气消耗'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'm3'
	}
	var series =  [

		{
			color:'#5c5c61',
			name: '燃气',
			data: [2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2095,2210,2095]
		}
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#charts').empty().highcharts(json);
}
function statisticqucharts4(){
	$("#tab_energy_statistic table").empty();
	var title = {
		text: '冷热量消耗统计'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis = {
		title: {
			text: '冷热量消耗'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kw'
	}
	var series =  [
		{
			color:'#a9ff96',
			name: '冷热量',
			data: [1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1095,1210,1095]
		},

	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#charts').empty().highcharts(json);
}
function statisticqucharts5(){
	$("#tab_energy_statistic table").empty();
	var title = {
		text: '总能耗统计'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
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

	var tooltip = {
		valueSuffix: ''
	}
	var series =  [
		{
			color:'#f13e4a',
			name: '冷热量',
			data: [1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1095,1210,1095]
		},
		{
			color:'#5c5c61',
			name: '燃气',
			data: [2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2095,2210,2095]
		},
		{
			color:'#7cb5ec',
			name: '水能',
			data: [3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3095,3210,3095]
		},
		{
			color:'#f7a35c',
			name: '电能',
			data: [4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4095,4210,4095]
		}
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#charts').empty().highcharts(json);
}

function statisticzhucharts1(){
	$("#tab_energy_statistic table").empty();
	var chart={
		type:'column'
	};
	var title={
		text: '电能统计'
	};
	var xAxis={
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis={
		min: 0,
		title: {
			text: '电能统计(kwh)'
		}
	};

	var tooltip= {
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
			color:'#f7a35c',
			name: '电能',
			data: [4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4095,4210,4095],
			tooltip: {
				valueSuffix: 'kwh'
			}
		}
	];


	var json = {};
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.plotOptions = plotOptions;
	json.series = series;


	$('#charts').empty().highcharts(json);
}
function statisticzhucharts2(){
	$("#tab_energy_statistic table").empty();
	var chart={
		type:'column'
	};
	var title={
		text: '水能统计'
	};
	var xAxis={
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis={
		min: 0,
		title: {
			text: '水能(m3)'
		}
	};
	var tooltip= {
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
			color:'#7cb5ec',
			name: '水能',
			data: [3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3095,3210,3095],
			tooltip: {
				valueSuffix: 'm3'
			}
		}
	];


	var json = {};
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.plotOptions = plotOptions;
	json.series = series;


	$('#charts').empty().highcharts(json);
}
function statisticzhucharts3(){
	$("#tab_energy_statistic table").empty();
	var chart={
		type:'column'
	};
	var title={
		text: '燃气统计'
	};
	var xAxis={
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis={
		min: 0,
		title: {
			text: '燃气能耗（m3)'
		}
	};
	var tooltip= {
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
			color:'#5c5c61',
			name: '燃气',
			data: [2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2095,2210,2095],
			tooltip: {
				valueSuffix: 'm3'
			}
		}
	];


	var json = {};
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.plotOptions = plotOptions;
	json.series = series;


	$('#charts').empty().highcharts(json);
}
function statisticzhucharts4(){
	$("#tab_energy_statistic table").empty();
	var chart={
		type:'column'
	};
	var title={
		text: '冷热量'
	};
	var xAxis={
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis={
		min: 0,
		title: {
			text: '冷热量（kw)'
		}
	};
	var tooltip= {
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
			color:'#a9ff96',
			name: '冷热量',
			data: [1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1095,1210,1095],
			tooltip: {
				valueSuffix: 'kw'
			}
		}
	];


	var json = {};
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.plotOptions = plotOptions;
	json.series = series;


	$('#charts').empty().highcharts(json);
}
function statisticzhucharts5(){
	$("#tab_energy_statistic table").empty();
	var chart={
		type:'column'
	};
	var title={
		text: '总能耗统计'
	};
	var xAxis={
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis={
		min: 0,
			title: {
			text: '总能耗'
		}
	};
	var tooltip= {
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
			color:'#d9521e',
			name: '冷热量',
			data: [1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1210,1095,1095,1210,1095],
			tooltip: {
				valueSuffix: 'kw'
			}
		},
		{
			color:'#f5911e',
			name: '燃气',
			data: [2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2210,2095,2095,2210,2095],
			tooltip: {
				valueSuffix: 'm3'
			}
		},
		{
			color:'#48c3d3',
			name: '水能',
			data: [3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3210,3095,3095,3210,3095],
			tooltip: {
				valueSuffix: 'm3'
			}
		},
		{
			color:'#009fc3',
			name: '电能',
			data: [4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4095,4210,4095],
			tooltip: {
				valueSuffix: 'kwh'
			}
		}
	];


	var json = {};
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.plotOptions = plotOptions;
	json.series = series;


	$('#charts').empty().highcharts(json);
}

//2.2.能耗分项
function subentryenergy(){
	var view=$("#subentry_view span:first-child").html();
	if(view=="表格"){
		subentrytable();
	}else if(view=="曲线图"){
		subentryqucharts();
	}else if(view=="柱状图"){
		subentryzhucharts();
	}else{
		subentrytable();
	}
}
function subentrytable(){
	$('#tab_subentry .charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'><th><input type='checkbox'/>选择</th> <th>时间</th> <th>能源类型</th> <th>建筑</th><th>分项</th><th>能耗(kwh)</th></tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-01</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-02</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-03</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-04</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-05</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-06</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-07</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-08</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-09</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-10</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-11</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-12</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-13</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-14</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-15</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-16</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-17</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-18</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-19</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-20</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-21</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-22</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-23</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-24</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-25</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-26</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-27</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>租户用电</td><td>687524</td></tr>";
	html+= "</tbody>";
	$("#tab_subentry table").empty().html(html);
	$('#tab_subentry .pages').show();
	tableForPages("#tab_subentry",6);
	checkAllOrNot("#tab_subentry");
}
function subentryqucharts(){
	$("#tab_subentry table").empty();
	var title = {
		text: '租户用户'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis = {
		title: {
			text: '租户用电'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kwh'
	}

	var series =  [
		{
			color:'#f7a35c',
			name: '租户用电',
			data: [4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4095,4210,4095]
		}
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#tab_subentry .charts').empty().highcharts(json);
	$('#tab_subentry .pages').hide();

}
function subentryzhucharts(){
	$("#tab_subentry table").empty();
	var chart={
		type:'column'
	};
	var title={
		text: '租户用电统计'
	};
	var xAxis={
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis={
		min: 0,
		title: {
			text: '租户用电统计(kwh)'
		}
	};

	var tooltip= {
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
			color:'#f7a35c',
			name: '租户用电',
			data: [4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4095,4210,4095],
			tooltip: {
				valueSuffix: 'kwh'
			}
		}
	];


	var json = {};
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.plotOptions = plotOptions;
	json.series = series;

	$('#tab_subentry .charts').empty().highcharts(json);
	$('#tab_subentry .pages').hide();

}

//2.3.能耗分级
function gradeenergy(){
	var view=$("#grade_view span:first-child").html();
	if(view=="表格"){
		gradetable();
	}else if(view=="曲线图"){
		gradequcharts();
	}else if(view=="柱状图"){
		gradezhucharts();
	}else{
		gradetable();
	}
}
function gradetable(){
	$('#tab_grade .charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'><th><input type='checkbox'/>选择</th> <th>时间</th> <th>能源类型</th> <th>建筑</th><th>分项</th><th>能耗(kwh)</th></tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-01</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-02</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-03</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-04</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-05</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-06</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-07</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-08</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-09</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-10</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-11</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-12</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-13</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-14</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-15</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-16</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-17</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-18</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-19</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-20</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-21</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-22</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-23</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-24</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-25</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-26</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-27</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "</tbody>";
	$("#tab_grade table").empty().html(html);
	$('#tab_grade .pages').show();
	tableForPages("#tab_grade",6);
	checkAllOrNot("#tab_grade");
}
function gradequcharts(){
	$("#tab_grade table").empty();
	var title = {
		text: '一级电'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis = {
		title: {
			text: '一级电'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kwh'
	}

	var series =  [
		{
			color:'#f7a35c',
			name: '一级电',
			data: [4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4095,4210,4095]
		}
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#tab_grade .charts').empty().highcharts(json);
	$('#tab_grade .pages').hide();

}
function gradezhucharts(){
	$("#tab_grade table").empty();
	var chart={
		type:'column'
	};
	var title={
		text: '一级用电统计'
	};
	var xAxis={
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis={
		min: 0,
		title: {
			text: '一级用电统计(kwh)'
		}
	};

	var tooltip= {
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
			color:'#f7a35c',
			name: '一级用电',
			data: [4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4210,4095,4095,4210,4095],
			tooltip: {
				valueSuffix: 'kwh'
			}
		}
	];


	var json = {};
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.plotOptions = plotOptions;
	json.series = series;

	$('#tab_grade .charts').empty().highcharts(json);
	$('#grade .pages').hide();

}

//2.4.能耗报告
function profileenergy(){
	profiletable();
}
function profiletable(){
	var html = "";
	html = "<thead><tr class='text-center'><th><input type='checkbox'/>选择</th> <th>时间</th> <th>能源类型</th> <th>建筑</th><th>分项</th><th>能耗(kwh)</th></tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-01</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-02</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-03</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-04</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-05</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-06</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07</td><td>电能</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>687524</td></tr>";
	html+= "</tbody>";
	$("#tab_energy_profile table").empty().html(html);
	$('#tab_energy_profile .pages').show();
	tableForPages("#tab_energy_profile",6);
	checkAllOrNot("#tab_energy_profile");
}
/*******************************************************************************/
//三、 /能耗分析
//3.1.能耗同比
function consumptionenergy(){
	var view=$("#consumption_view span:first-child").html();
	if(view=="表格"){
		consumptiontable();
	}else if(view=="曲线图"){
		consumptionqucharts();
	}else if(view=="柱状图"){
		consumptionzhucharts();
	}else{
		consumptiontable();
	}
}
function consumptiontable(){
	$('#tab_energy_consumption .charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'><th><input type='checkbox'/>选择</th> <th>统计对象</th><th>用户</th><th>能源类型</th><th>能耗单位</th><th>2016-07能耗</th><th>2017-07</th><th>同比能耗</th></tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td><input type='checkbox'/></td><td>B03-A座商业区1层~2层</td><td>物业</td><td>一级用电</td><td>kwh</td><td>120</td><td>1752</td><td>1360%</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>B03-A座商业区1层~2层</td><td>客房</td><td>一级用电</td><td>kwh</td><td>85</td><td>4565</td><td>5270%</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>B03-A座商业区1层~2层</td><td>后勤</td><td>一级用电</td><td>kwh</td><td>614</td><td>2565</td><td>317.7%</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>B03-A座商业区1层~2层</td><td>公区</td><td>一级用电</td><td>kwh</td><td>260</td><td>1665</td><td>540%</td></tr>";
	html+= "</tbody>";
	$("#tab_energy_consumption table").empty().html(html);
	$('#tab_energy_consumption .pages').show();
	tableForPages("#tab_energy_consumption",6);
	checkAllOrNot("#tab_energy_consumption");
}
function consumptionqucharts(){
	$("#tab_energy_consumption table").empty();
	var title = {
		text: 'B03-A座商业区1层~2层 一级用电能耗同比'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['物业','客房	','后勤','公区']
	};
	var yAxis = {
		title: {
			text: '一级用电'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kwh'
	}

	var series =  [
		{
			color:'#a9ff96',
			name: '2016年7月能耗',
			data: [120,85,614,260]
		},
		{
			color:'#7cb5ec',
				name: '2017年7月能耗',
			data: [1752,4565,2665,1665]
		}
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#tab_energy_consumption .charts').empty().highcharts(json);
	$('#tab_energy_consumption .pages').hide();

}
function consumptionzhucharts(){
	$("#tab_energy_consumption table").empty();
	var chart = {
		type: 'column'
	};
	var title = {
		text: 'B03-A座商业区1层~2层 一级用电能耗环比'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['物业','客房	','后勤','公区'],
		crosshair: true
	};
	var yAxis = {
		min: 0,
		title: {
			text: '一级用电(kwh)'
		}
	};
	var tooltip = {
		headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		footerFormat: '</table>',
		shared: true,
		useHTML: true
	};
	var plotOptions = {
		column: {
			pointPadding: 0.2,
			borderWidth: 0
		}
	};
	var credits = {
		enabled: false
	};

	var series= [{
		color:'#a9ff96',
		name: '2016年7月能耗',
		data: [120,85,614,260]
	},
		{
			color:'#7cb5ec',
			name: '2017年7月能耗',
			data: [1752,4565,2665,1665]
		}];

	var json = {};
	json.chart = chart;
	json.title = title;
	json.subtitle = subtitle;
	json.tooltip = tooltip;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.series = series;
	json.plotOptions = plotOptions;
	json.credits = credits;

	$('#tab_energy_consumption .charts').empty().highcharts(json);
	$('#tab_energy_consumption .pages').hide();

}

//3.2.能耗环比
function consumptionchainenergy(){
	var view=$("#consumption_chain_view span:first-child").html();
	if(view=="表格"){
		consumptionchaintable();
	}else if(view=="曲线图"){
		consumptionchainqucharts();
	}else if(view=="柱状图"){
		consumptionchainzhucharts();
	}else{
		consumptionchaintable();
	}
}
function consumptionchaintable(){
	$('#tab_energy_consumption_chain .charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'><th><input type='checkbox'/>选择</th> <th>统计对象</th><th>用户</th><th>能源类型</th><th>能耗单位</th><th>2017-06能耗</th><th>2017-07能耗</th><th>环比</th></tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td><input type='checkbox'/></td><td>B03-A座商业区1层~2层</td><td>物业</td><td>一级用电</td><td>kwh</td><td>1562</td><td>1752</td><td>12.16%</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>B03-A座商业区1层~2层</td><td>客房</td><td>一级用电</td><td>kwh</td><td>3185</td><td>4565</td><td>46.19%</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>B03-A座商业区1层~2层</td><td>后勤</td><td>一级用电</td><td>kwh</td><td>2014</td><td>2565</td><td>27.36%</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>B03-A座商业区1层~2层</td><td>公区</td><td>一级用电</td><td>kwh</td><td>1260</td><td>1665</td><td>540%</td></tr>";
	html+= "</tbody>";
	$("#tab_energy_consumption_chain table").empty().html(html);
	$('#tab_energy_consumption_chain .pages').show();
	tableForPages("#tab_energy_consumption_chain",6);
	checkAllOrNot("#tab_energy_consumption_chain");
}
function consumptionchainqucharts(){
	$("#tab_energy_consumption_chain table").empty();
	var title = {
		text: 'B03-A座商业区1层~2层 一级用电能耗环比'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['物业','客房	','后勤','公区']
	};
	var yAxis = {
		title: {
			text: '一级用电'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kwh'
	}



	var series =  [
		{
			color:'#a9ff96',
			name: '2017年6月能耗',
			data: [1562,3185,2014,1260]
		},
		{
			color:'#7cb5ec',
			name: '2017年7月能耗',
			data: [1752,4565,2665,1665]
		}
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#tab_energy_consumption_chain .charts').empty().highcharts(json);
	$('#tab_energy_consumption_chain .pages').hide();

}
function consumptionchainzhucharts(){
	$("#tab_energy_consumption_chain table").empty();
	var chart = {
		type: 'column'
	};
	var title = {
		text: 'B03-A座商业区1层~2层 一级用电能耗环比'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['物业','客房	','后勤','公区'],
		crosshair: true
	};
	var yAxis = {
		min: 0,
		title: {
			text: '一级用电(kwh)'
		}
	};
	var tooltip = {
		headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		footerFormat: '</table>',
		shared: true,
		useHTML: true
	};
	var plotOptions = {
		column: {
			pointPadding: 0.2,
			borderWidth: 0
		}
	};
	var credits = {
		enabled: false
	};

	var series= [{
		color:'#a9ff96',
		name: '2017年6月能耗',
		data: [1562,3185,2014,1260]
	},
		{
			color:'#7cb5ec',
			name: '2017年7月能耗',
			data: [1752,4565,2665,1665]
		}];

	var json = {};
	json.chart = chart;
	json.title = title;
	json.subtitle = subtitle;
	json.tooltip = tooltip;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.series = series;
	json.plotOptions = plotOptions;
	json.credits = credits;

	$('#tab_energy_consumption_chain .charts').empty().highcharts(json);
	$('#tab_energy_consumption_chain .pages').hide();

}

//3.3.能耗排名
function rankingenergy(){
	var view=$("#ranking_view span:first-child").html();
	if(view=="表格"){
		rankingtable();
	}else if(view=="曲线图"){
		rankingqucharts();
	}else if(view=="柱状图"){
		rankingzhucharts();
	}else{
		rankingtable();
	}
}
function rankingtable(){
	$('#tab_energy_ranking .charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'><th><input type='checkbox'/>选择</th> <th>能耗排名</th><th>用户</th><th>能源类型</th><th>能耗单位</th><th>能耗值</th></tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td><input type='checkbox'/></td><td>1</td><td>客房</td><td>一级用电</td><td>kwh</td><td>4565</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2</td><td>后勤</td><td>一级用电</td><td>kwh</td><td>2565</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>3</td><td>物业</td><td>一级用电</td><td>kwh</td><td>1752</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>4</td><td>公区</td><td>一级用电</td><td>kwh</td><td>1665</td></tr>";
	html+= "</tbody>";
	$("#tab_energy_ranking table").empty().html(html);
	$('#tab_energy_ranking .pages').show();
	tableForPages("#tab_energy_ranking",6);
	checkAllOrNot("#tab_energy_ranking");
}
function rankingqucharts(){
	$("#tab_energy_ranking table").empty();
	var title = {
		text: 'B03-A座商业区1层~2层 一级用电能耗环比'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['客房	','后勤','物业','公区']
	};
	var yAxis = {
		title: {
			text: '一级用电'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kwh'
	}



	var series =  [
		{
			color:'#7cb5ec',
			name: '2017年7月能耗',
			data: [4565,2665,1752,1665]
		}
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#tab_energy_ranking .charts').empty().highcharts(json);
	$('#tab_energy_ranking .pages').hide();

}
function rankingzhucharts(){
	$("#tab_energy_ranking table").empty();
	var chart = {
		type: 'column',
	};
	var title = {
		text: 'B03-A座商业区1层~2层 一级用电能耗环比'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['客房	','后勤','物业','公区'],
		crosshair: true
	};
	var yAxis = {
		min: 0,
		title: {
			text: '一级用电(kwh)'
		}
	};
	var tooltip = {
		headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
		footerFormat: '</table>',
		shared: true,
		useHTML: true
	};
	var plotOptions = {
		column: {
			pointPadding: 0.2,
			borderWidth: 0
		}
	};
	var credits = {
		enabled: false
	};

	var series =  [
		{
			color:'#7cb5ec',
			name: '2017年7月能耗',
			data: [4565,2665,1752,1665]
		}
	];

	var json = {};
	json.chart = chart;
	json.title = title;
	json.subtitle = subtitle;
	json.tooltip = tooltip;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.series = series;
	json.plotOptions = plotOptions;
	json.credits = credits;

	$('#tab_energy_ranking .charts').empty().highcharts(json);
	$('#tab_energy_ranking .pages').hide();

}

//3.4.能耗去向
function whereaboutsenergy(){
	var view=$("#whereabouts_view span:first-child").html();
	if(view=="表格"){
		whereaboutstable();
	}else if(view=="曲线图"){
		whereaboutsqucharts();
	}else if(view=="柱状图"){
		whereaboutszhucharts();
	}else{
		whereaboutstable();
	}
}
function whereaboutstable(){
	$('#tab_energy_whereabouts .charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'><th><input type='checkbox'/>选择</th><th>日期</th><th>建筑</th><th>能源类型</th><th>能耗单位</th><th>物业用电</th><th>客房用电</th><th>后勤用电</th><th>公区用电</th></tr></thead>";
	html+= "<tbody>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-01</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-02</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-03</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-04</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-05</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-06</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-07</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-08</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-09</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-10</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-11</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-12</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-13</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-14</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-15</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-16</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-17</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-18</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-19</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-20</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-21</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-22</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-23</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-24</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-25</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-26</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
		html+= "<tr><td><input type='checkbox'/></td><td>2017-07-27</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "</tbody>";
	$("#tab_energy_whereabouts table").empty().html(html);
	$('#tab_energy_whereabouts .pages').show();
	tableForPages("#tab_energy_whereabouts",6);
	checkAllOrNot("#tab_energy_whereabouts");
}
function whereaboutsqucharts(){
	$("#tab_energy_whereabouts table").empty();
	var title = {
		text: 'B03-A座商业区1层~2层 一级用电能耗去向'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27']
	};
	var yAxis = {
		title: {
			text: '一级用电'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kwh'
	}



	var series =  [
		{
			color:'#5c5c61',
			name: '物业用电',
			data: [65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65]
		},
		{
			color:'#5c5c61',
			name: '客房用电',
			data: [155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155]
		},
		{
			color:'#7cb5ec',
			name: '公区用电',
			data: [75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75]
		},
		{
			color:'#f7a35c',
			name: '后勤用电',
			data: [35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35]
		},
		{
			color:'#7cb5ec',
			name: '2017年7月能耗',
			data: [65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65]
		}
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#tab_energy_whereabouts .charts').empty().highcharts(json);
	$('#tab_energy_whereabouts .pages').hide();

}
function whereaboutszhucharts(){
	$("#tab_energy_whereabouts table").empty();
	var chart = {
		type: 'column',
	};
	var title = {
		text: 'B03-A座商业区1层~2层 一级用电能耗去向'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27'],
		crosshair: true
	};
	var yAxis = {
		min: 0,
		title: {
			text: '一级用电(kwh)'
		}
	};
	var tooltip= {
		pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
			shared: true
	};
	var plotOptions={
		column: {
			stacking: 'percent'
		}
	};
	var credits = {
		enabled: false
	};

	var series =  [
		{
			color:'#a9ff96',
			name: '物业用电',
			data: [65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65]
		},
		{
			color:'#5c5c61',
			name: '客房用电',
			data: [155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155]
		},
		{
			color:'#7cb5ec',
			name: '公区用电',
			data: [75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75]
		},
		{
			color:'#f7a35c',
			name: '后勤用电',
			data: [35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35]
		}
		
	];


	var json = {};
	json.chart = chart;
	json.title = title;
	json.subtitle = subtitle;
	json.tooltip = tooltip;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.series = series;
	json.plotOptions = plotOptions;
	json.credits = credits;

	$('#tab_energy_whereabouts .charts').empty().highcharts(json);
	$('#tab_energy_whereabouts .pages').hide();

}

//3.5.历史数据
function historicaldata(){
	var view=$("#historical_data_view span:first-child").html();
	if(view=="表格"){
		historicaldatatable();
	}else if(view=="曲线图"){
		historicaldataqucharts();
	}else if(view=="柱状图"){
		historicaldatazhucharts();
	}else{
		historicaldatatable();
	}
}
function historicaldatatable(){
	$('#tab_historical_data .charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'><th><input type='checkbox'/>选择</th><th>日期</th><th>建筑</th><th>能源类型</th><th>能耗单位</th><th>物业用电</th><th>客房用电</th><th>后勤用电</th><th>公区用电</th></tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-01</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-02</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-03</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-04</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-05</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-06</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-07</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-08</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-09</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-10</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-11</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-12</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-13</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-14</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-15</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-16</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-17</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-18</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-19</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-20</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-21</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-22</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-23</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-24</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-25</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-26</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>2017-07-27</td><td>B03-A座商业区1层~2层</td><td>一级用电</td><td>kwh</td><td>65</td><td>155</td><td>75</td><td>35</td></tr>";
	html+= "</tbody>";
	$("#tab_historical_data table").empty().html(html);
	$('#tab_historical_data .pages').show();
	tableForPages("#tab_historical_data",6);
	checkAllOrNot("#tab_historical_data");
}
function historicaldataqucharts(){
	$("#tab_historical_data table").empty();
	var title = {
		text: 'B03-A座商业区1层~2层 一级用电能耗去向'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27']
	};
	var yAxis = {
		title: {
			text: '一级用电'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kwh'
	}



	var series =  [
		{
			color:'#5c5c61',
			name: '物业用电',
			data: [65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65]
		},
		{
			color:'#5c5c61',
			name: '客房用电',
			data: [155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155]
		},
		{
			color:'#7cb5ec',
			name: '公区用电',
			data: [75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75]
		},
		{
			color:'#f7a35c',
			name: '后勤用电',
			data: [35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35]
		},
		{
			color:'#7cb5ec',
			name: '2017年7月能耗',
			data: [65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65]
		}
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#tab_historical_data .charts').empty().highcharts(json);
	$('#tab_historical_data .pages').hide();

}
function historicaldatazhucharts(){
	$("#tab_historical_data table").empty();
	var chart = {
		type: 'column',
	};
	var title = {
		text: 'B03-A座商业区1层~2层 一级用电能耗去向'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27'],
		crosshair: true
	};
	var yAxis = {
		min: 0,
		title: {
			text: '一级用电(kwh)'
		}
	};
	var tooltip= {
		pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
		shared: true
	};
	var plotOptions={
		column: {
			stacking: 'percent'
		}
	};
	var credits = {
		enabled: false
	};

	var series =  [
		{
			color:'#a9ff96',
			name: '物业用电',
			data: [65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65]
		},
		{
			color:'#5c5c61',
			name: '客房用电',
			data: [155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155]
		},
		{
			color:'#7cb5ec',
			name: '公区用电',
			data: [75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75,75]
		},
		{
			color:'#f7a35c',
			name: '后勤用电',
			data: [35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35,35]
		}

	];


	var json = {};
	json.chart = chart;
	json.title = title;
	json.subtitle = subtitle;
	json.tooltip = tooltip;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.series = series;
	json.plotOptions = plotOptions;
	json.credits = credits;

	$('#tab_historical_data .charts').empty().highcharts(json);
	$('#tab_historical_data .pages').hide();

}
//四、能耗报表
//4.1.报表生成
function reportgenerationtable(){
	var html = "";
	html = "<thead><tr class='text-center'><th  colspan='29'>2017年7月 B03-A座 建筑电能消耗报表(kwh)</th></tr>" +
		"<tr><th><input type='checkbox'/>选择</th><th>子类</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>" +
		"<th>11</th> <th>12</th> <th>13</th> <th>14</th> <th>15</th> <th>16</th> <th>17</th> <th>18</th> <th>19</th> <th>20</th>" +
		"<th>21</th> <th>21</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th></tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td><input type='checkbox'/></td><td>租户用电</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td>" +
		"<td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td>" +
		"<td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td><td>560</td></tr>";

	html+= "<tr><td><input type='checkbox'/></td><td>物业用电</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td>" +
		"<td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td>" +
		"<td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td><td>120</td>tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>公区照明插座用电</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td>" +
		"<td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td>" +
		"<td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td><td>175</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>公区暖通空调用电</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td>" +
		"<td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td>" +
		"<td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td><td>460</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>公区动力设备用电</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td>" +
		"<td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td>" +
		"<td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td><td>320</td></tr>";
	html+= "<tr><td><input type='checkbox'/></td><td>公区特殊设备用电</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td>" +
		"<td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td>" +
		"<td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td><td>65</td></tr>";
	html+= "</tbody>";
	$("#tab_report_generation table").empty().html(html);
	$('#tab_report_generation .pages').show();
	tableForPages("#tab_report_generation",6);
	checkAllOrNot("#tab_report_generation");
}

//4.2.测量点表
function surveypointtable(){
	var html = "";
	html = "<thead><tr class='text-center'>" +
		"<tr><th rowspan='2'>时间</th><th rowspan='2'>测点对象</th><th rowspan='2'>能源类型</th><th colspan='3'>测点表</th></tr>" +
		"<tr><th>开始表底(kwh)</th><th>结束表底(kwh)</th><th>能耗差(kwh)</th></tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td>2017年-01月</td><td>B-03A座1层~2层</td><td>电能</td><td>3560</td><td>6560</td><td>3000</td></tr>";
	html+= "<tr><td>2017年-02月</td><td>B-03A座1层~2层</td><td>电能</td><td>6560</td><td>9560</td><td>3000</td></tr>";
	html+= "<tr><td>2017年-03月</td><td>B-03A座1层~2层</td><td>电能</td><td>9560</td><td>12560</td><td>3000</td></tr>";
	html+= "<tr><td>2017年-04月</td><td>B-03A座1层~2层</td><td>电能</td><td>12560</td><td>15560</td><td>3000</td></tr>";
	html+= "<tr><td>2017年-05月</td><td>B-03A座1层~2层</td><td>电能</td><td>15560</td><td>15560</td><td>3000</td></tr>";
	html+= "<tr><td>2017年-06月</td><td>B-03A座1层~2层</td><td>电能</td><td>18560</td><td>21560</td><td>3000</td></tr>";
	html+= "<tr><td>2017年-07月</td><td>B-03A座1层~2层</td><td>电能</td><td>21560</td><td>24560</td><td>3000</td></tr>";
	html+= "</tbody>";
	$("#tab_survey_point table").empty().html(html);
	$('#tab_survey_point .pages').show();
	tableForPages("#tab_survey_point",6);
}

//4.3.同比报表
function sizestatementtable(){
	var html = "";
	html = "<thead><tr class='text-center'><th colspan='6'>2016年7月~2017年7月电能消耗同比报表</th></tr>" +
		"<tr class='text-center'><th>统计对象</th><th>能源类型</th><th>2016年7月</th><th>2017年7月</th><th>同比</tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td>B-03A座1层~2层</td><td>租户用电</td><td>530</td><td>6560</td><td>1137%</td></tr>";
	html+= "<tr><td>B-03A座1层~2层</td><td>物业用电</td><td>530</td><td>6560</td><td>1137%</td></tr>";
	html+= "<tr><td>B-03A座1层~2层</td><td>公区照明插座用电</td><td>530</td><td>6560</td><td>1137%</td></tr>";
	html+= "<tr><td>B-03A座1层~2层</td><td>公区暖通空调用电</td><td>530</td><td>6560</td><td>1137%</td></tr>";
	html+= "<tr><td>B-03A座1层~2层</td><td>公区动力设备用电</td><td>530</td><td>6560</td><td>1137%</td></tr>";
	html+= "<tr><td>B-03A座1层~2层</td><td>公区特殊设备用电</td><td>530</td><td>6560</td><td>1137%</td></tr>";
	html+= "</tbody>";
	$("#tab_common_size_statement table").empty().html(html);
	$('#tab_common_size_statement .pages').show();
	tableForPages("#tab_common_size_statement",6);
}

//4.4.环比报表
function tablinkreporttable(){
	var html = "";
	html = "<thead><tr class='text-center'><th colspan='6'>2017年6月~2017年7月电能消耗环比报表</th></tr>" +
		"<tr class='text-center'><th>统计对象</th><th>能源类型</th><th>2017年6月</th><th>2017年7月</th><th>环比</tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td>B-03A座1层~2层</td><td>租户用电</td><td>5430</td><td>6560</td><td>1137%</td></tr>";
	html+= "<tr><td>B-03A座1层~2层</td><td>物业用电</td><td>530</td><td>6560</td><td>1137%</td></tr>";
	html+= "<tr><td>B-03A座1层~2层</td><td>公区照明插座用电</td><td>5430</td><td>6560</td><td>1137%</td></tr>";
	html+= "<tr><td>B-03A座1层~2层</td><td>公区暖通空调用电</td><td>5430</td><td>6560</td><td>1137%</td></tr>";
	html+= "<tr><td>B-03A座1层~2层</td><td>公区动力设备用电</td><td>5430</td><td>6560</td><td>1137%</td></tr>";
	html+= "<tr><td>B-03A座1层~2层</td><td>公区特殊设备用电</td><td>5430</td><td>6560</td><td>1137%</td></tr>";
	html+= "</tbody>";
	$("#tab_link_report table").empty().html(html);
	$('#tab_link_report .pages').show();
	tableForPages("#tab_link_report",6);
}
//五、节能诊断
//5.1.能耗异常诊断
function abnormalenergy(){
	var view=$("#abnormal_energy_view span:first-child").html();
	if(view=="表格"){
		abnormaltable();
	}else if(view=="曲线图"){
		abnormalqucharts();
	}else if(view=="柱状图"){
		abnormalzhucharts();
	}else{
		abnormaltable();
	}
}
function abnormaltable(){
	$('#tab_energy_abnormal .charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'>" +
		"<tr><th rowspan='2'>建筑</th><th rowspan='2'>能源类型</th><th rowspan='2'>参考指标</th>" +
		"<th colspan='27'>2017年7月B-03座1层~2层逐日全天用电量统计（单位：kwh）</th></tr>" +
		"<tr><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>" +
		"<th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th>" +
		"<th>21</th><th>22</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th></tr></thead>";
	html+= "<tbody>";
	html+= "<tr><td>一层商场</td><td>电</td><td>250</td>" +
		"<td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td>" +
		"<td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td>" +
		"<td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td><td>240</td></tr>";
	html+= "<tr><td>2层商场</td><td>电</td><td>200</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td>" +
		"<td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td>" +
		"<td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td><td>190</td></tr>";
	html+= "</tbody>";
	$("#tab_energy_abnormal table").empty().html(html);
	$('#tab_energy_abnormal .pages').show();
	tableForPages("#tab_energy_abnormal",6);
}
function abnormalqucharts(){
	$("#tab_energy_abnormal table").empty();
	var title = {
		text: '2017年7月B-03座1层~2层逐日全天用电量统计'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2	','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis = {
		title: {
			text: '电'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kwh'
	}

	var series =  [
		{
			color:'#a9ff96',
			name: '1层',
			data: [240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240]
		},
		{
			color:'#7cb5ec',
			name: '2层',
			data: [190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190,190]
		},
		{
			color:'#00F',
			name: '2层标准',
			data: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200]
		},{
			color:'#009F00',
			name: '1层标准',
			data: [250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250,250]
		}
		
	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#tab_energy_abnormal .charts').empty().highcharts(json);
	$('#tab_energy_abnormal .pages').hide();

}
function abnormalzhucharts(){
	$("#tab_energy_abnormal table").empty();
	var chart={
		type:'column'
	};
	var title={
		text: '2017年7月B-03座1层~2层逐日全天用电量统计'
	};
	var xAxis={
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis={
		min: 0,
		title: {
			text: '电(kwh)'
		}
	};

	var tooltip= {
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
			color:'#a9ff96',
			name: '1层',
			data: [240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240]
		},
		{
			color:'#7cb5ec',
			name: '2层',
			data: [240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240]
		}

	];

	var json = {};
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.plotOptions = plotOptions;
	json.series = series;

	$('#tab_energy_abnormal .charts').empty().highcharts(json);
	$('#tab_energy_abnormal .pages').hide();

}

//5.2.工作时间诊断
function worktimeenergy(){
	var view=$("#worktime_view span:first-child").html();

	if(view=="表格"){
		worktimetable();
	}else if(view=="曲线图"){
		worktimequcharts();
	}else if(view=="柱状图"){
		worktimezhucharts();
	}else{
		worktimetable();
	}
}
function worktimetable(){
	$('#tab_work_time_diagnosis .charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'>" +
		"<tr><th rowspan='2'>日期</th><th rowspan='2'>时间</th><th colspan='2'>2017年7月B-03座1层~2层逐日工作时间全天用电量统计（单位：kwh）</th></tr>" +
		"<tr><th>1层</th><th>2层</th></tr></thead>";
		
	html+= "<tbody>";
	html+= "<tr><td rowspan='2'>7月1日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月2日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月3日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月4日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月5日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月6日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月7日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月8日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月9日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月10日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月11日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月12日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月13日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月14日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月15日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月16日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月17日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月18日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月19日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月20日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月21日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月22日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月23日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";					
	html+= "<tr><td rowspan='2'>7月24日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月25日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";			
	html+= "<tr><td rowspan='2'>7月26日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";
	html+= "<tr><td rowspan='2'>7月27日</td><td>9:00-12:00</td><td>200</td><td>120</td></tr>"
			+"<tr><td>14:00-18:00</td><td>240</td><td>150</td></tr>";			
	html+= "</tbody>";
	$("#tab_work_time_diagnosis table").empty().html(html);
	$("#tab_work_time_diagnosis .pages").show();
	tableForPages("#tab_work_time_diagnosis",6);

}
function worktimequcharts(){
	$("#tab_work_time_diagnosis table").empty();
	var title = {
		text: '2017年7月B-03座1层~2层逐日工作时间全天用电量统计'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2	','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','21','23','24','25','26','27']
	};
	var yAxis = {
		title: {
			text: '电'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kwh'
	}

	var series =  [
		{
			color:'#a9ff96',
			name: '1层9:00~12:00',
			data: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200]
		},
		{
			color:'#5c5c61',
			name: '2层9:00~12:00',
			data: [120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120]
		},
		{
			color:'#7cb5ec',
			name: '1层14:00~18:00',
			data: [240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240]
		},{
			color:'#f7a35c',
			name: '2层14:00~18:00',
			data: [150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150]
		}

	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#tab_work_time_diagnosis .charts').empty().highcharts(json);
	$('#tab_work_time_diagnosis .pages').hide();

}
function worktimezhucharts(){
	$("#tab_work_time_diagnosis table").empty();
	var chart={
		type:'column'
	};
	var title={
		text: '2017年7月B-03座1层~2层逐日工作时间全天用电量统计'
	};
	var xAxis={
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis={
		min: 0,
		title: {
			text: '电(kwh)'
		}
	};

	var tooltip= {
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
			color:'#a9ff96',
			name: '1层9:00~12:00',
			data: [200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200]
		},
		{
			color:'#5c5c61',
			name: '2层9:00~12:00',
			data: [120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120]
		},
		{
			color:'#7cb5ec',
			name: '1层14:00~18:00',
			data: [240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240]
		},{
			color:'#f7a35c',
			name: '2层14:00~18:00',
			data: [150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150]
		}

	];

	var json = {};
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.plotOptions = plotOptions;
	json.series = series;

	$('#tab_work_time_diagnosis .charts').empty().highcharts(json);
	$('#tab_work_time_diagnosis .pages').hide();

}

//5.3.非工作时间
function nonworkingenergy(){
	var view=$("#nonworking_view span:first-child").html();
	if(view=="表格"){
		nonworkingtable();
	}else if(view=="曲线图"){
		nonworkingqucharts();
	}else if(view=="柱状图"){
		nonworkingzhucharts();
	}else{
		nonworkingtable();
	}
}
function nonworkingtable(){
	$('#tab_non_working_diagnosis .charts').empty();
	var html = "";
	html = "<thead><tr class='text-center'>" +
		"<tr><th rowspan='2'>日期</th><th rowspan='2'>时间</th><th colspan='2'>2017年7月	B-03座1层~2层逐日非工作时间全天用电量统计（单位：kwh）</th></tr>" +
		"<tr><th>1层</th><th>2层</th></tr></thead>";
		
	html+= "<tbody>";
	html+= "<tr><td rowspan='2'>7月1日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月2日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月3日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月4日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月5日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月6日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月7日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月8日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月9日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月10日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月11日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月12日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月13日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月14日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月15日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月16日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月17日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月18日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月19日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月20日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月21日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月22日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月23日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";					
	html+= "<tr><td rowspan='2'>7月24日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月25日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";			
	html+= "<tr><td rowspan='2'>7月26日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";
	html+= "<tr><td rowspan='2'>7月27日</td><td>12:00-14:00</td><td>80</td><td>60</td></tr>"
			+"<tr><td>18:00-8:00</td><td>150</td><td>120</td></tr>";			
	html+= "</tbody>";
	$("#tab_non_working_diagnosis table").empty().html(html);
	$('#tab_non_working_diagnosis .pages').show();
	tableForPages("#tab_non_working_diagnosis",6);

}
function nonworkingqucharts(){
	$("#tab_non_working_diagnosis table").empty();
	var title = {
		text: '2017年7月	B-03座1层~2层逐日非工作时间全天用电量统计'
	};
	var subtitle = {
		text: ''
	};
	var xAxis = {
		categories: ['1','2	','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis = {
		title: {
			text: '电'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	};

	var tooltip = {
		valueSuffix: 'kwh'
	}

	var series =  [
		{
			color:'#a9ff96',
			name: '1层12:00~14:00',
			data: [80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80]
		},
		{
			color:'#5c5c61',
			name: '2层12:00~14:00',
			data: [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60]
		},
		{
			color:'#7cb5ec',
			name: '1层18:00~8:00',
			data: [150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150]
		},{
			color:'#f7a35c',
			name: '2层18:00~8:00',
			data: [120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120]
		}

	];

	var json = {};

	json.title = title;
	json.subtitle = subtitle;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.series = series;

	$('#tab_non_working_diagnosis .charts').empty().highcharts(json);
	$('#tab_non_working_diagnosis .pages').hide();

}
function nonworkingzhucharts(){
	$("#tab_non_working_diagnosis table").empty();
	var chart={
		type:'column'
	};
	var title={
		text: '2017年7月	B-03座1层~2层逐日非工作时间全天用电量统计'
	};
	var xAxis={
		categories: ['1','2	','3','4','5','6','7','8','9','10	','11','12','13','14','15','16','17','18','19','20','21	','21','23','24','25','26','27']
	};
	var yAxis={
		min: 0,
		title: {
			text: '电(kwh)'
		}
	};

	var tooltip= {
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
			color:'#a9ff96',
			name: '1层12:00~14:00',
			data: [80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80]
		},
		{
			color:'#5c5c61',
			name: '2层12:00~14:00',
			data: [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60]
		},
		{
			color:'#7cb5ec',
			name: '1层18:00~8:00',
			data: [150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150]
		},{
			color:'#f7a35c',
			name: '2层18:00~8:00',
			data: [120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120,120]
		}

	];

	var json = {};
	json.chart = chart;
	json.title = title;
	json.xAxis = xAxis;
	json.yAxis = yAxis;
	json.tooltip = tooltip;
	json.plotOptions = plotOptions;
	json.series = series;

	$('#tab_non_working_diagnosis .charts').empty().highcharts(json);
	$('#tab_non_working_diagnosis .pages').hide();

}
//八、成本中心
//8.1.账单报表
//tab_billing_statement
function billingstatementtable(){
	$('#tab_billing_statement .charts').empty();

	var html = "";
	html = "<thead><tr class='text-center'>"
		+"<th>类别</th><th>单位</th><th>合计</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>" +
		"<th>11</th> <th>12</th> <th>13</th> <th>14</th> <th>15</th> <th>16</th> <th>17</th> <th>18</th> <th>19</th> <th>20</th>" +
		"<th>21</th> <th>21</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th></tr></thead>";
	html+= "<tbody>"
	+"<tr>" +
		"<td>电能</td><td>kwh</td>" +
		"<td>112060</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td>" +
		"<td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td>" +
		"<td>4095</td><td>4210</td><td>4095</td><td>4095</td><td>4210</td><td>4095</td></tr>"
		+"<tr>" +
		"<td>成本</td><td>元</td>" +
		"<td>82060</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td>" +
		"<td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>4210</td>" +
		"<td>4095</td><td>2520</td><td>2560</td><td>4095</td><td>2520</td><td>2560</td></tr>"
		
		
		+"</tbody>";
	$("#tab_billing_statement table").empty().html(html);


}

//8.2成本统计
function coststatistics(){
	$('#tab_cost_statistics .charts').empty();

	var html = "";
	html = "<thead><tr class='text-center'>"
		+"<th>类别</th><th>单位</th><th>合计</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th>" +
		"<th>11</th> <th>12</th> <th>13</th> <th>14</th> <th>15</th> <th>16</th> <th>17</th> <th>18</th> <th>19</th> <th>20</th>" +
		"<th>21</th> <th>21</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th></tr></thead>";
	html+= "<tbody>"
	+"<tr>" +
		"<td>电能</td><td>kwh</td>" +
		"<td>112060</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td>" +
		"<td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td><td>4095</td><td>4210</td>" +
		"<td>4095</td><td>4210</td><td>4095</td><td>4095</td><td>4210</td><td>4095</td></tr>"
		+"<tr>" +
		"<td>成本</td><td>元</td>" +
		"<td>82060</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td>" +
		"<td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>2520</td><td>2560</td><td>4210</td>" +
		"<td>4095</td><td>2520</td><td>2560</td><td>4095</td><td>2520</td><td>2560</td></tr>"
		
		
		+"</tbody>";
	$("#tab_cost_statistics table").empty().html(html);


}
