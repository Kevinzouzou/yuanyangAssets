/**
 * Created by Administrator on 2017/7/10.
 */
var headerHeight=parseFloat($("header").css("height"));
var logoHeight=parseFloat($(".logo").css("height"));
var screenHeight=window.innerHeight;
var screenWidth=window.innerWidth;
var navHeight=parseFloat($(".nav").css("height"));
var rem=document.body.clientWidth/100;

var littleHeight=screenHeight-navHeight-headerHeight-0.42*rem-0.625*rem+"px"
$(".aside").css("height",screenHeight-logoHeight-headerHeight-0.42*rem+"px");
$(".littleHead").css("height",littleHeight);

//有下拉列表内容
function selectChoice(class1,class2){
    $(class1+">li>a").on('click',function(){
        var  html="<span>"+$(this).html()+"</span><span class='caret'></span>";
        $(class2).html(html);
    });
}


//有下拉列表内容
function selectTypeChoice(class1,class2,class3){
    $(class1+">li>a").on('click',function(){
        var  html="<span>"+$(this).html()+"</span><span class='caret'></span>";
        var  html1=$(this).html();
        $(class2).html(html);
        $(class3).html(html1);
    });
}

//视图选择
selectChoice(".toView-menu",".toView");




selectChoice(".childs-menu",".childs");
selectChoice(".styles-menu",".styles");

selectChoice(".equip_maintenance-menu",".equip_maintenance");

selectChoice(".classes-menu",".classes");
selectChoice(".users-menu",".users");
selectChoice(".alert_classify-menu",".alert_classify");
selectChoice(".equip_system-menu",".equip_system");
selectChoice(".equip_brand-menu",".equip_brand");
selectChoice(".data_base-menu",".data_base");


//选择值给另一个元素
function choiceValue(cla1,cla2){
    $(cla1).on('click',function(){
        var value=$(this).html();
        $(cla2).html(value);
    })
}

//左侧导航栏选中
function leftBlock(){
    //设备状态--楼层选择后的值
    $("#realstate>li").on('click',function(){
        var value=$(this).html();
        $(this).addClass("active").siblings().removeClass("active");
        $('.left_value').html(value).css("color","#fff");
    });
}

function buildBlock(){
    //设备状态--楼层选择后的值
    $(".block>li").on('click',function(){
        var value=$(this).html();
        $(this).addClass("active").siblings().removeClass("active");
        $('.block_value').html(value).css("color","#fff");
    });
}
buildBlock();
function floorBlock(self){
    var value=$(self).html();
    $(self).addClass("active").siblings().removeClass("active");
    $(self).addClass("active");
    $(".floor_choice_value").html(value);
}

$(".floor_choice>li").on('click',function(){
    var value=$(this).html();
    $(".floor_choice li").removeClass("active");
    $(this).addClass("active");
    $(".floor_choice_value").html(value);
});
floorBlock(self);

choiceValue(".classes-menu>li a",".classes_choice_value");
choiceValue(".toReport li a",".toReport_value");
choiceValue(".energyAnalysis_calendar calendarStart",".calendar_start_value");
choiceValue(".tab_energyAnalysis_list li a",".energyAnalysis_list_value");
choiceValue(".tab_expert_list li a",".tab_expert_list_value");
choiceValue(".tab_operation_list li a",".tab_operation_list_value");
$(".toReport li").on('click',function(){
    $(this).addClass("active").siblings().removeClass("active");
});

//bootstrap 日期插件
$(function() {
    $('.calendar').datetimepicker({
        format: 'yyyy-mm-dd',
        minView:'month',
        language: 'zh-CN',
        autoclose:true,
        //startDate:new Date(),
        //endDate:new Date(),
        pickerPosition:'bottom-right'//相对位置
    });
});

function childActive(cla){
    $(cla +">li").on('click',function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
}
childActive(".toReport");
childActive(".pagination");

$("#add_user_sel").click(function(){
    $("#privi_sele_ul").show();

});
$("#privi_sele_ul li a").click(function(){
    //获取a标签的文本和下拉框图标
    var html=$(this).html()+"<span class='caret pri_sele_icon'></span>";
    $("#add_user_sel").html(html);
    $("#privi_sele_ul").hide();
});
function checkAllOrNot(id){
    //复选框的全选、全不选事件
    var checkAll=$(id+" .table th input[type='checkbox']");
    checkAll.on('click',function(){
        if($(this).prop("checked")){
            var checkItem=$(this).parent().parent().parent().parent().children("tbody").find("input[type='checkbox']");
            checkItem.prop("checked",true);
        }else{
            var checkItem=$(this).parent().parent().parent().parent().children("tbody").find("input[type='checkbox']");
            checkItem.prop("checked",false);
        }
    });
//如果有一个没选中，则全选按钮不勾选
    var checkItem=$(id+" table tr td input[type='checkbox']");
    checkItem.on('click',function(){
        for(i=0;i<checkItem.length;i++){
            if(!checkItem[i].checked){
                var checkAll=$(this).parent().parent().parent().parent().children("thead").find("input[type='checkbox']");
                checkAll.prop("checked",false);//全选自动取消
                break;        }else{
                var checkAll=$(this).parent().parent().parent().parent().children("thead").find("input[type='checkbox']");if(i==checkItem.length-1){
                    checkAll.prop("checked",true);//全选自动勾选
                }        }
        }
    });
}
//能耗信息
checkAllOrNot("#tab_subentry");
checkAllOrNot("#tab_grade");
checkAllOrNot("#tab_energy_profile");
//能耗分析
checkAllOrNot("#tab_energy_consumption");
checkAllOrNot("#tab_energy_consumption_chain");
checkAllOrNot("#tab_energy_ranking");
checkAllOrNot("#tab_energy_whereabouts");
checkAllOrNot("#tab_historical_data");
//能耗报表
checkAllOrNot("#tab_report_generation");
checkAllOrNot("#tab_report_management");
//报警中心
checkAllOrNot("#tab_alarm_overview");
checkAllOrNot("#tab_alarm_history");
//设施运维
checkAllOrNot("#tab_work_order_management");
checkAllOrNot("#tab_maintenance_management");
checkAllOrNot("#tab_equipment_ledger");
checkAllOrNot("#tab_database_maintenance");
//权限管理
checkAllOrNot("#tab_user_management");




$("#byspec_sel").click(function(){
    $("#ul_sel").show();
});
$("#ul_sel li a").click(function(){
    //获取a标签的文本和下拉框图标
    var html=$(this).html()+"<span class='caret pri_sele_icon'></span>";
    $("#byspec_sel").html(html);
    $("#ul_sel").hide();

});

//table 分页显示
function tableForPages(id,pageSize){
	var numberItems =parseFloat($(id+" table tbody tr").length);  //获取对象里面，数据的数量
    if(numberItems<=pageSize){
        $(id+" .pages").css("display","none");
    }else{
		$(id+" .pages").css("display","block");
        var pageCount = Math.ceil(numberItems/pageSize);  //计算页面显示的数量
        $(id+" table tbody").children().css('display', 'none').slice(0,pageSize).css('display', '');
        var html= '<div class="pagination right"></div><div class="pull-left pagination-detail"><span class="page-size">共'+pageCount+'页</span>'+
            '<span class="pagination-info pageNum_now">当前第<span class="thePage">1</span>/'+pageCount+'页</span></div>';
        $(id+" .pages").html(html);
        $(id+" .pages .pagination").pagination({
            totalData:numberItems,
            showData:pageSize,
            items_per_page:pageSize,
            num_edge_entries:2,
            num_display_entries:4,
            current_page: 0,   //当前页索引
            link_to: "?id=__id__",  //分页的js中会自动把"__id__"替换为当前的数。0　
            coping:true
        });

        $(id+" .pages .pagination").on('click',function(){
            var pageNow=$(id+" .pages .pagination .active").text();
			$(id+" .pages .thePage").html(pageNow);
			var end_on=pageNow*pageSize;
            var start_from=end_on-pageSize;
            $(id+" table tbody").children().css('display', 'none').slice(start_from, end_on).css('display', '');
        });
    }
    
}
//设施运维
tableForPages("#tab_equipment_ledger",6);
tableForPages("#tab_building_information",8);
tableForPages("#tab_energy_ranking",5);




//设施运维数据库维护
$(".for_data_base").on('click',function(){
    var value=$(".data_base").text();
    $(".tables .forbtn").css("display","none");
    if(value=="生产数据库"){
        var div='<thead><tr class="text-center"><th><input type="checkbox"/>选择</th><th>数据文件/日志</th>'+
            '<th>周增长量</th><th>增长情况</th><th>磁盘空间</th><th>操作</th></tr></thead><tbody><tr>'+
            '<td><input type="checkbox"/></td><td>xxxxx数据文件</td><td>xxxxx</td><td>正常</td><td>xxxxx GB</td>'+
            '<td><button class="btn_del common_btn delete clear_disk btn_equip_del"><span class="tabPic btn_name">清理磁盘</span></button></td>'+
            '</tr><tr><td><input type="checkbox"/></td><td>xxxxx日志文件</td><td>xxxxx</td><td style="color:red;">异常</td>'+
            '<td>xxxxx GB</td><td><button class="btn_del common_btn delete clear_disk btn_equip_del"><span class="tabPic btn_name">清理磁盘</span></button></td></tr></tbody>';
        $("#for-data-bases").html(div);
        checkAllOrNot("#tab_database_maintenance");
    }else if(value=="镜像数据库"){
        var div='<thead><tr class="text-center"><th><input type="checkbox"/>选择</th><th>数据文件/日志</th>'+
            '<th>周增长量</th><th>增长情况</th><th>磁盘空间</th><th>操作</th></tr></thead><tbody><tr>'+
            '<td><input type="checkbox"/></td><td>xxxxx数据文件</td><td>xxxxx</td><td>正常</td><td>xxxxx GB</td>'+
            '<td><button class="btn_del common_btn delete clear_disk btn_equip_del"><span class="tabPic btn_name">清理磁盘</span></button></td>'+
            '</tr><tr><td><input type="checkbox"/></td><td>xxxxx日志文件</td><td>xxxxx</td><td style="color:red;">异常</td>'+
            '<td>xxxxx GB</td><td><button class="btn_del common_btn delete clear_disk btn_equip_del"><span class="tabPic btn_name">清理磁盘</span></button></td></tr></tbody>';
        $("#for-data-bases").html(div);
        checkAllOrNot("#tab_database_maintenance");
    }else if(value=="日志传送数据库"){
        var div='<thead><tr class="text-center"><th><input type="checkbox"/>选择</th><th>数据文件/日志</th>'+
            '<th>周增长量</th><th>增长情况</th><th>磁盘空间</th><th>操作</th></tr></thead><tbody><tr>'+
            '<td><input type="checkbox"/></td><td>xxxxx数据文件</td><td>xxxxx</td><td>正常</td><td>xxxxx GB</td>'+
            '<td><button class="btn_del common_btn delete clear_disk btn_equip_del"><span class="tabPic btn_name">清理磁盘</span></button></td>'+
            '</tr><tr><td><input type="checkbox"/></td><td>xxxxx日志文件</td><td>xxxxx</td><td style="color:red;">异常</td>'+
            '<td>xxxxx GB</td><td><button class="btn_del common_btn delete clear_disk btn_equip_del"><span class="tabPic btn_name">清理磁盘</span></button></td></tr></tbody>';
        $("#for-data-bases").html(div);
        checkAllOrNot("#tab_database_maintenance");
    }else if(value=="查看作业"){
        var div='<thead><tr class="text-center"><th>作业名称</th><th>开始时间</th>'+
            '<th>运行情况</th><th>操作</th></tr></thead><tbody><tr>'+
            '<td>xxxxxxxx</td><td>2017-05-22 22:00:15</td><td>正常</td>'+
            '<td><button class="btn_del delete btn_equip_del"><span class="tabPic btn_name">删除</span></button></td>'+
            '</tr><tr><td>xxxxxxxx</td><td>2017-05-23 22:00:15</td><td style="color:red;">错误</td>'+
            '<td><button class="btn_del delete btn_equip_del"><span class="tabPic btn_name">删除</span></button></td></tr></tbody>';
        $("#for-data-bases").html(div);
    }else if(value=="查看日志传送"){
        var div='<thead><tr class="text-center"><th>数据库名称</th><th>传送时间</th>'+
            '<th>IP地址</th><th>运行情况</th><th>信息</th><th colspan="2">操作</th></tr></thead><tbody><tr>'+
            '<td>xxxxxxxx</td><td>2017-01-25 09:20:20</td><td></td><td>正常</td><td></td>'+
            '<td class="btn_wid"><button class="btn_del common_btn btn-refresh btn_equip_del"><span class="tabPic btn_name">刷新</span></button></td>'+
            '<td class="btn_wid"><button class="btn_del delete btn_equip_del"><span class="tabPic btn_name">删除</span></button></td>'+
            '</tr><tr><td>xxxxxxxx</td><td>2017-02-26 09:20:20</td><td></td><td style="color:red;">错误</td>'+
            '<td></td><td><button class="btn_del common_btn btn-refresh btn_equip_del"><span class="tabPic btn_name">刷新</span></button></td>' +
            '<td><button class="btn_del delete btn_equip_del"><span class="tabPic btn_name">删除</span></button></td></tr></tbody>';
        $("#for-data-bases").html(div);
    }else if(value=="数据备份"){
        $(".tables .forbtn").css("display","block");
        var div='<thead><tr class="text-center"><th><input type="checkbox"/>选择</th>'+
            '<th>数据库名称</th><th>创建时间</th><th>上次备份时间</th><th>大小</th><th>状态</th><th>主文件路径</th><th>操作</th></tr></thead><tbody><tr><td><input type="checkbox"/></td>'+
            '<td>xxxxxxxx</td><td>2017-10-05 12:05:12</td><td>2016-10-05 12:05:12</td><td>552MB</td><td>正常</td><td>C:\Program File/Microsoft SQL Service/MSSQL/date</td><td><button class="btn_del delete btn_equip_del"><span class="tabPic btn_name">删除</span></button></td>'+
            '</tr><tr><td><input type="checkbox"/></td><td>xxxxxxxx</td><td>2017-10-05 11:05:05</td><td>2016-10-05 11:05:05</td><td>552MB</td><td style="color:red;">备份错误</td><td>C:\Program File/Microsoft SQL Service/MSSQL/date</td>'+
            '<td><button class="btn_del delete clear_disk btn_equip_del"><span class="tabPic btn_name">清理磁盘</span></button></td></tr></tbody>';
        $("#for-data-bases").html(div);
        checkAllOrNot("#tab_database_maintenance");
    }
});