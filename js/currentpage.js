/**
 * Created by gao on 2017/7/21.
 */



//分页js


function  paginationNick(opt){

    //每页显示的数目
    var pageSize = 5;
    //获取content对象里面，数据的数量
    var numberItems = $('#content').children().size();
    //计算页面显示的数量
    var pageCount = Math.ceil(numberItems/pageSize);

    //隐藏域默认值
    $('#current_page').val(0);
    $('#pageSize').val(pageSize);

    var navigation_html = '<a class="previous_link" href="javascript:previous();">上一页</a>';
    var current_link = 0;
    while(pageCount > current_link){
        navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
        current_link++;
    }
    navigation_html += '<a class="next_link" href="javascript:next();">下一页</a>';

    $('#page_navigation').html(navigation_html);

    //add active_page class to the first page link
    $('#page_navigation .page_link:first').addClass('active_page');

    //隐藏该对象下面的所有子元素
    $('#content').children().css('display', 'none');

    //显示第n（pageSize）元素
    $('#content').children().slice(0, pageSize).css('display', 'block');

}

//上一页
function previous(){
    new_page = parseInt($('#current_page').val()) - 1;
    if($('.active_page').prev('.page_link').length==true){
        go_to_page(new_page);
    }

}
//下一页
function next(){
    new_page = parseInt($('#current_page').val()) + 1;
    if($('.active_page').next('.page_link').length==true){
        go_to_page(new_page);
    }

}
//跳转某一页
function go_to_page(page_num){
    var pageSize = parseInt($('#pageSize').val());
    start_from = page_num * pageSize;
    end_on = start_from + pageSize;
    $('#content').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
    $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');
    $('#current_page').val(page_num);
}
