function getDateNum(str){
	var num = 0;
	var strArray = str.split("_");
	var beginDateStr = strArray[0];
	var redressNum = strArray[1];
	var beginDate = new Date(beginDateStr);
	var days=Math.floor((new Date(strArray[2]).getTime()-beginDate.getTime())/(24*3600*1000))
	var beginWeekIndex = beginDate.getDay();
	var nowWeekIndex = new Date(strArray[2]).getDay();
	if(nowWeekIndex-beginWeekIndex == days){
		num = days;
	}else{
		num = 5-beginWeekIndex;
		days = days -7 + beginWeekIndex;
		num = num + Math.floor(days/7)*5;
		if(days % 7 <5){
			num = num + days % 7;
		}else{
			num = num + 5;
	    }
	}
	
	getClear(num+parseInt(redressNum));
}
function getClear(num){
	num = num +5-num%5;
	var liArray = $('.col-960').children('.course-list').children('.course-menu').children().children();
	for(var i=num;i<liArray.length;i++){
		var li=liArray[i];
		$(li).removeClass("opened");
	}
}

$(document).ready(function() {
	var html = '<div id="model1" style="display:none" class="md-2019031302-xxw text-center">'
		    +'<div class="cont text-center">'
		    +'<img src="'+TTS_URL+'private/ttsfront/css/img190313/img_19031306_x.png">'
		    +'<img class="close-btn-0313 js-close-0313" src="'+TTS_URL+'private/ttsfront/css/img190313/img_19031307_x.png"></div></div>'
		    +'<div class="md-2019031302-xxw" id="model2"  style="display:none;">'
		    +'<div class="md-2018040423-ll cus-win-model" id="md_2018040423_ll">'
		    +'<div class="tit" >支付完成</div>'
		    +'<p style="text-align: center;"><img src="'+TTS_URL+'private/ttsfront/css/img190313/img2018042301_ll.png"></p>'
		    +'<div style="text-align: center; padding-top: 10px;">'
		    +'<p class="color-red" id="js_error_tips" style="margin: 5px 0;opacity: 0;color:#fd573f;"><i class="cusfont cusfont-warning "></i>未支付成功，请在支付页面继续完成支付！</p>'
		    +'<button style="width: 300px;" class="form-btn form-btn-blue" type="button" id="js_pay_btn" >已支付完成</button>'
		    +'</div>'
		    +'<span class="cus-win-modelclose js-close-0313">×</span>'
		    +'</div>'
		    +'</div>';
		$('body').append(html);	
	$('#js_pay_btn').click(function(){
		$.ajax({
			url : TTS_URL+"buyCourseVideo/findOrderStatus",
			type: "post", 
			dataType: "json",
			data:{},
	  		success: function (data) {
	  			if(data.code == 1){
	  				$('.md-2019031302-xxw').hide();
	  				window.location.reload();
	  			}else{
	  				$("#js_error_tips").css({'opacity':'1'});
	  			}
	  		}
		
		})
	})
	$('body').on('click','#buyCourse',function(){
		var $t = $(this);
		/*if($t.hasClass('act')){
			$('#model1').show();
			
			return false;
		}*/
		$.ajax({
			url : TTS_URL+"buyCourseVideo/findStudentVideoPower",
			async: false,
			type: "post", 
			dataType: "json",
			data:{},
	  		success: function (data) {
	  			if(data){
	  				if(data.code == "1000"){
	  					//未开通
	  					$('#model2').show();
	  					var sender = window.location.href;
	  					window.open(TTS_URL+"buyCourseVideo/toBuyVideoPower?sender="+sender);
	  				}else if(data.code == "2000"){
	  					//已开通
	  					if(!$t.hasClass('act')){
	  						$t.addClass('act');
	  					}
	  					$('#model1').show();
	  			
	  				}else if(data.code == "4000"){
	  					$('body').append('<script src="'+TTS_URL+'private/ttsfront/js/layer/layer.js"></script>');
	  					layer.msg("不能使用公共账号购买校外回看！");
	  				}
	  				
	  			}
	  			
	  		}
		})
	})
	var versionCode=$("#version").val();
	$.ajax({
		type: "post", 
		url: TTS_URL+"studentCenter/getStuBaseMsg", 
		dataType: "json",
		data:{"versionCode":versionCode},
  		success: function (data) {
  			if(data.code>0){
  				var stuList=data.list;
  				var stu=stuList[0];
  				var beginDateString = stu.beginDateString;
  				var redress = stu.redress;
  				var now = stu.nowDateStr;
  				var str = beginDateString+"_"+redress+"_"+now;
  				$("#classStartTime").html(stu.beginDateString);
  				$("#pmName").html(stu.projectManager);
  				$("#classTeacherName").html(stu.classCharge);
  				getDateNum(str);
  			}
    	}, 
   		error: function (XMLHttpRequest, textStatus, errorThrown) { 
   			console.debug("取出教历进度错误");
		}
	});
	
	$('.md-2019031302-xxw  .js-close-0313').click(function () {
	    $(this).closest('.md-2019031302-xxw').hide();
	})
	

	
	
	/**购买视频悬浮窗*/
	$('body').append('<img class="fixed-0313img" id= "buyCourse" src="'+TTS_URL+'private/ttsfront/css/img190313/img_19031305_x.png"/>');
	
	
});
function startStudy(){
	var list = $('li.opened');
	var name = list.eq(list.length-1).closest('.course-list').prev().children('a').attr('name');
	location.href = "#"+name;
}

$('body').append('<script src="'+TTS_URL+'private/ttsfront/js/jquery.eBox.js"></script>');
/*获取学员公告信息--2019年4月19日新加的*/
var defaultVersionCookie = $.cookie('defaultVersionCookie');
$(function(){	
	 /*获取学员公告信息*/
    $.ajax({
    	url:TTS_URL + 'notice/getNotice',
    	dataType : 'json',
    	data : {},
    	success : function(d) {
    		if(d.list != '') {
    			if(d.list[0] != '') {
    					if(d.list[0].noticeContent.indexOf("<img")!= -1){
    						var html = '<div>'+d.list[0].noticeContent+'</div>'
    					}else{
    						var html = '<div style="display:inline-block;width:240px;vertical-align:middle;margin-right:15px;"> <div style="text-indent: 2em;line-height: 1.5;font-family: &quot;微软雅黑&quot;;font-size: 13px;word-break: break-word;">'+d.list[0].noticeContent+'</div></div>'
  					      +'<div style="display:inline-block;"><img src="'+ TTS_URL +'private/ttsfront/img_17/img_menu/gril.png" width="120" height="200"></div>';
    					}
    				
    				$_eBox({
    					title : { html : " &nbsp;&nbsp;&nbsp;&nbsp"+d.list[0].noticeTitle },
    					content : { html : html},
    					effect : {
    						type : "slide",
    						speed : 500,
    					},
    					openOnce : true
    				},
    				TTS_URL + "private/ttsfront/",
    				defaultVersionCookie
    				);
    			}
    		}
    	}
    	
    })
});




