//tts前台地址
//var TTS_URL="http://localhost:8080/tts-front-web/";//测试环境中的
var TTS_URL="http://tts.tmooc.cn/";
var E_URL = "http://www.tmooc.cn";
var tmooc_path = 'http://www.tmooc.cn';
//题库测试连接
var qw_kao_path = "http://tes.tmooc.cn/exam/examByCourse";
//题海
var qs_kao_path = "http://tes.tmooc.cn/exam/index";
//题库错题本
var qw_errorBooks = "http://tes.tmooc.cn/exam/toErrorBookIndex";
//问卷调查
//var will_vote_list ="http://vote.tmooc.cn/paperM/willVoteList.jsp";
var will_vote_list =TTS_URL+"studentCenter/toVote";
//qw考试
//var qw_tm_exam ="http://qwserver.tmooc.cn/web/tm_exam.html";
var qw_tm_exam ="http://tes.tmooc.cn/qsexam/index";

//tts视频播放路径
var tts_video_url="http://videotts.it211.com.cn/";
/**
 * Created by xxw on 2017/8/24.
 */
/*tab*/
function tabFunInit(t_) {
    var tit_ = t_.find('.tab-header-x span');
    tit_.click(function () {
        var d_ = $(this).data('tab_');
        if( !$(this).hasClass('active-x')){
            $(this).addClass('active-x').siblings().removeClass('active-x');
            t_.find('.tab-cont-x .tab-cont-list-x[data-tabcont=' + d_ + ']').addClass('active-x').siblings().removeClass('active-x');

        }
    })
}
tabFunInit($('.tab-box-x.md20180111lty'));
$('.md20180115lty.tab-box-x .tab-header-x span').click(function(){
	var d_ = $(this).data('tab_');
	if( !$(this).hasClass('active-x')){
        $(this).addClass('active-x').siblings().removeClass('active-x');
	}
	if(d_=="questall"){
		$(".md20180115lty .questtions-box-x .questtions-all-x tbody tr").show();
	}else{
	    $(".md20180115lty .questtions-box-x .questtions-all-x tbody tr").hide();
		$(".md20180115lty .questtions-box-x .questtions-all-x .question-"+d_.split("quest")[1]+"-x").show();
	}
})

/*下拉*/
function cusmot_select_fun(obj,callback){
    var cus_sel_box = (typeof(obj)=='string')?$('#'+obj):obj,
        cus_sel_list = cus_sel_box.find('ul.custom_sel_list'),
        cus_sel_val = cus_sel_box.find('input.custom_sel_val'),
        cus_sel_text = cus_sel_box.find('.custom_sel_text');
    	cus_sel_val.val('');
    	cus_sel_list.on('click.cusselect','li.option',function(){
        cus_sel_text.text($(this).text());
        cus_sel_val.val($(this).attr('ord_id'));
        if(callback && typeof(callback)=='function'){callback($(this).attr('ord_id'),cus_sel_box);}
    });
    cus_sel_box.on('click',function(){
        if(cus_sel_list.is(':hidden')){
            $(document).one('mousedown.order',function(e){
                var sel_cur_box = $(e.target).closest(cus_sel_box);
                if(sel_cur_box.length>0){return;}
                cus_sel_list.hide();
            });
            cus_sel_list.show();
        }else{
            $(document).off('mousedown.order');
            cus_sel_list.hide();
        }
    });
}
/*单选框*/
$('.radio-box-x').click(function(){
    if(!$(this).hasClass('active-x')){
        $(this).addClass('active-x').siblings().removeClass('active-x');
    }
});




/**
 * Created by liutingyu on 2017/8/24.
 */


/*考试测评页面*/
$(function () {
    /*如果有缓存的答题记录 页面初始化就显示出已作答的答题进度*/
    changePosition();

    function hj(){

        $('.exam_test>ul>li').each(function () {

            if($(this).find(".t_select>ul>li input:checked").length>0){

                if(!$(this).hasClass('checked')){/*阻止用户重复点击同一个input的时候也会出现未答题数量减少的情况*/

                    $(this).addClass('checked');

                    unLen--;

                    $('.number-lty').html(unLen);

                    /*改变小火箭的位置和进度条*/

                    var i=parseFloat((total-unLen)/total*HEIGHT);

                    $('.hj-path').css('height',i+'px');

                    $('.hj').css('bottom',i+'px');


                    if(unLen<=0){ /*防止用户答完题后 点击变负数的情况*/

                        $('.number-lty').html(0);
                    }

                }

            }else{

                if($(this).hasClass('checked')){

                    $(this).removeClass('checked');

                    unLen++;

                    $('.number-lty').html(unLen);

                    /*改变小火箭的位置和进度条*/

                    var i=parseFloat((total-unLen)/total*HEIGHT);

                    $('.hj-path').css('height',i+'px');

                    $('.hj').css('bottom',i+'px');

                }
            }

        })

    }

    var total=$('.exam_test>ul>li').length;/*总的题目数量*/

    var HEIGHT=300;  /*进度条的总高度*/

    var unLen=$('.exam_test>ul>li').not('checked').length;/*没有选中的题目数量*/

    if(total===unLen){

        $('.number-lty').html(total); /*用户未答题显示总的题目数量*/

    }

    hj();

    $('.t_select>ul>li').click(function () {

        hj();

    });
    $('#hj').click(function () {

        /*点击小火箭实现定位到第一个未答的题目*/

        $('.exam_test>ul>li').each(function () {

            if(!$(this).hasClass('checked')){

                $('html,body').finish().animate({"scrollTop":$(this).offset().top},500);

                if(!$('#hj').hasClass('fly')){

                    $('#hj').addClass('fly');

                }

                return false;
            }

        })
    }).mouseenter(function () {

        if($(this).hasClass('animation')||$(this).hasClass('fly')){

            $(this).removeClass('animation');

            $(this).removeClass('fly');

            $('.tips-lty').css('transform','scale(1)');/*提示气泡*/
        }

    }).mouseleave(function () {

        if(!$(this).hasClass('animation')){

            $(this).addClass('animation');

            $('.tips-lty').css('transform','scale(0)');
        }

    })
});
function changePosition() {

    var winWidth,contentWidth;

    // winWidth=document.documentElement.clientWidth; /*HTML文档所在窗口的当前宽度*/

    winWidth=$(window).width();/*宽度自适应*/

    contentWidth=$('.exam_content').width();

    if(winWidth<1160){

        $('.hj-box').hide();

    }else{

        $('.hj-box').css('left',(winWidth-contentWidth)/2+contentWidth+30+'px');

    }
}

/*监听屏幕尺寸变化 动态调整小火箭的位置*/

$(window).resize(function(){

    changePosition();
});
/*讲师测评页面*/
$(function () {

    function checkQues(){

        var id;

        $('.test-content>dl>dd').each(function () {

            if($(this).find('input:checked').length>0){

                if(!$(this).hasClass('checked')){

                    $(this).addClass('checked');

                    /*更改左侧小圆圈的颜色*/ /*prev 查找前一个兄弟  sblings 查找所有的兄弟元素 不分先后*/
                    id= $(this).closest('.popup-box-content').prev('.popup-box-content-title').attr('id'); /*slice(start,end) start从数组下标的起始位置开始截取 不包含end 返回一个新的子数组 不修改数组*/

                    if($('.teacher-location>li>a[href="#'+id+'"]').parent('li.first').length>0){

                        console.log(1);

                        $('.teacher-location>li>a[href="#'+id+'"]').css('background-position','-40px 13px');

                    }else if($('.teacher-location>li>a[href="#'+id+'"]').parent('li.last').length>0){

                        $('.teacher-location>li>a[href="#'+id+'"]').css('background-position','-40px -70px');
                    }else{

                        $('.teacher-location>li>a[href="#'+id+'"]').css('background-position','-40px -29px');

                    }
                }
            }else{

                if($(this).hasClass('checked')){

                    $(this).removeClass('checked');

                    id= $(this).closest('.popup-box-content').siblings('.popup-box-content-title').attr('id');

                    if($('.teacher-location>li>a[href="#'+id+'"]').parent('li.first').length>0){

                        $('.teacher-location>li>a[href="#'+id+'"]').css('background-position','0 -13px');

                    }else if($('.teacher-location>li>a[href="#'+id+'"]').parent('li.last').length>0){

                        $('.teacher-location>li>a[href="#'+id+'"]').css('background-position','0 -70px');
                    }else{

                        $('.teacher-location>li>a[href="#'+id+'"]').css('background-position','0 -29    px');

                    }


                }
            }
        })
    }
    $('.test-content>dl>dd').click(function () {

       checkQues();

    })
});