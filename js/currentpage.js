/**
 * Created by gao on 2017/7/21.
 */



//��ҳjs


function  paginationNick(opt){

    //ÿҳ��ʾ����Ŀ
    var pageSize = 5;
    //��ȡcontent�������棬���ݵ�����
    var numberItems = $('#content').children().size();
    //����ҳ����ʾ������
    var pageCount = Math.ceil(numberItems/pageSize);

    //������Ĭ��ֵ
    $('#current_page').val(0);
    $('#pageSize').val(pageSize);

    var navigation_html = '<a class="previous_link" href="javascript:previous();">��һҳ</a>';
    var current_link = 0;
    while(pageCount > current_link){
        navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
        current_link++;
    }
    navigation_html += '<a class="next_link" href="javascript:next();">��һҳ</a>';

    $('#page_navigation').html(navigation_html);

    //add active_page class to the first page link
    $('#page_navigation .page_link:first').addClass('active_page');

    //���ظö��������������Ԫ��
    $('#content').children().css('display', 'none');

    //��ʾ��n��pageSize��Ԫ��
    $('#content').children().slice(0, pageSize).css('display', 'block');

}

//��һҳ
function previous(){
    new_page = parseInt($('#current_page').val()) - 1;
    if($('.active_page').prev('.page_link').length==true){
        go_to_page(new_page);
    }

}
//��һҳ
function next(){
    new_page = parseInt($('#current_page').val()) + 1;
    if($('.active_page').next('.page_link').length==true){
        go_to_page(new_page);
    }

}
//��תĳһҳ
function go_to_page(page_num){
    var pageSize = parseInt($('#pageSize').val());
    start_from = page_num * pageSize;
    end_on = start_from + pageSize;
    $('#content').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
    $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');
    $('#current_page').val(page_num);
}
