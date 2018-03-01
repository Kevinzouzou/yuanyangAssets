/**
 * Created by Admin on 2017/8/25.
 */
$('.year-month').on('click',function(){
	var nowyear=($(this).val()).substring(0,4);
	var html='<div class="made-year-month"><div class="row text-center"><button class="prev01 pull-left"><</button>'+
        '<span class="value-year-month">'+nowyear+'</span><button class="next01 pull-right">></button></div>'+
        '<ul class="list-unstyled"><li>1月</li><li>2月</li><li>3月</li><li>4月</li><li>5月</li><li>6月</li>'+
        '<li>7月</li><li>8月</li><li>9月</li><li>10月</li><li>11月</li><li>12月</li></ul></div>';
    $(".made-year-month").html(html);
    $(".made-year-month").toggleClass("show");
    madeYearMonth();
});
function madeYearMonth(){
    $(".made-year-month .prev01").on('click',function(){
        var num=parseFloat($(".value-year-month").html());
        num--;
        $(".value-year-month").html(num);
    });
    $(".made-year-month .next01").on('click',function(){
        var num=parseFloat($(".value-year-month").html());
        num++;
        $(".value-year-month").html(num);
    });
    $(".made-year-month .list-unstyled li").on('click',function(){
        $(".made-year-month").removeClass("show");
        var text=twomonthview(parseInt($(this).text()));
		$(".year-month").val($(".value-year-month").html()+"-"+text);
	});
}

function twomonthview(month){
	if(month<10){
		month='0'+month;
	}else{
		month=month;
	}
	return month;
}
