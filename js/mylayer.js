$(function(){
    $("#privi_btn_add").click(function(){
        $("#privi_btn_add input[type='text']").val("");
        $("#privi_btn_add input[type='password']").val("");
        layer.open({
                type:1,
                title:'添加用户',
                area:['27rem','21rem'],
                content:$("#privi_add_box"),
            }

        );
    });

    $(".btn_deit_layer").click(function(){
        layer.open({
                type:1,
                title:'修改权限',
                area:['27rem','18rem'],
                content:$("#privi_add_box"),
            }

        );
    });

    $(".btn_del_layer").click(function(){
        layer.open({
                type:1,
                title:'删除权限',
                area:['27rem','14.6rem'],
                content:$("#layer_del"),
            }

        );
    });
    $(".gd_number").click(function(){
        layer.open({
                type:1,
                title:'工单详情',
                area:['40rem','36rem'],
                content:$("#worksheet"),
            }

        );
    });
    $(".worksheet_del").click(function(){
        layer.open({
                type:1,
                title:'删除工单',
                area:['27rem','14.6rem'],
                content:$("#worksheet_del"),
            }

        );
    });

    $(".btn_wb_edit").click(function(){
        layer.open({
                type:1,
                title:'修改设备维保信息',
                area:['40.6rem','32.3rem'],
                content:$("#maintenance"),
            }

        );
    });
    $(".maintenance_del").click(function(){
        layer.open({
                type:1,
                title:'删除维保信息',
                area:['27rem','14.6rem'],
                content:$("#maintenance_del"),
            }

        );
    });
//二维码名片
    $(".erweima_layer").click(function(){
        layer.open({
                type:1,
                title:'设备名片',
                area:['25rem','16rem'],
                content:$("#equip_card"),
            }

        );
    });

//删除设备台账
    $(".btn_equip_del").click(function(){
        layer.open({
                type:1,
                title:'删除设备台账',
                area:['27rem','14.6rem'],
                content:$("#equip_del"),
            }

        );
    });





});

