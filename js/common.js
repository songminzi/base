
// 전체동의폼 ::민지
function allCheckFunc( obj ) {
  $("[name=checkOne]").prop("checked", $(obj).prop("checked") );
}

  /* 체크박스 체크시 전체선택 체크 여부 */
function oneCheckFunc( obj ){
  var allObj = $("[name=checkAll]");
  var objName = $(obj).attr("name");

  if( $(obj).prop("checked") ){
    checkBoxLength = $("[name="+ objName +"]").length;
    checkedLength = $("[name="+ objName +"]:checked").length;

    if( checkBoxLength == checkedLength ) {
        allObj.prop("checked", true);
    } else {
        allObj.prop("checked", false);
    }
  }
  else
  {
    allObj.prop("checked", false);
  }
}

$(function(){
  $("[name=checkAll]").click(function(){
    allCheckFunc( this );
  });
  $("[name=checkOne]").each(function(){
    $(this).click(function(){
      oneCheckFunc( $(this) );
    });
  });
});


// JavaScript Document
$(document).ready(function() {
  //클릭 이벤트
  $(".img_search").click(function(){
    $(".search_layer").stop().slideToggle(300);
    return false;
  });

});

//사이드 네비 토글
function side_nav_toggle(){
  $(".nav, .nav_dim").toggleClass("open");

  if($(".nav").hasClass("open")){

    $.lockBody();
  } else {
    $.unlockBody();
  }
}

$(document).ready(function() {

  //tab_1-------------------------------------------------------------------------------------

  $(".tab_1 .tab_menu a").click(function(){
    if($(this).hasClass("active")){
      return false;
    }

    $(".tab_1 .tab_menu a").removeClass("active");
    $(this).addClass("active");

    var tab_num = $(".tab_1 .tab_menu a").index(this); //클릭한 메뉴와 같은 순서의 탭 내용 show
    $(".tab_1 .tab_content").hide();
    $(".tab_1 .tab_content").eq(tab_num).fadeIn();
  });
  //------------------------------------------------------------------------------------------

});


//basic_modal-------------------------------------------------------------------------------------

function modal_open(element){
  $(".md_overlay_" + element).css("visibility", "visible").animate({opacity: 1}, 100);
  $(".modal_" + element).css({display: "block"});
  $.lockBody();
}

function modal_close(element){
  $(".md_overlay_" + element).css("visibility", "hidden").animate({opacity: 0}, 100);
  $(".modal_" + element).css({display: "none"});
  $.unlockBody();
}

//------------------------------------------------------------------------------------------

//모달 백그라운드 스크롤 막기
var scrollTop;

$.lockBody = function() {
  if(window.pageYOffset) {
    scrollTop = window.pageYOffset;
    $(".wrap").css({
      top: - (scrollTop)
    });
  }

  $('html, body').css({
    height: "100%",
    overflow: "hidden"
  });
}

$.unlockBody = function() {
  $('html, body').css({
    height: "",
    overflow: ""
  });

  $(".wrap").css({
    top: ''
  });

  window.scrollTo(0, scrollTop);
  window.setTimeout(function () {
    scrollTop = null;
  }, 0);

}

//아코디언
$(document).on("click",".accordion .trigger",function(){
  var my_trigger = $(this);
  var my_panel = $(this).siblings(".panel");
  var my_list_item = $(this).siblings(".list_item_title");

  var accordion_group = $(this).parents('.accordion'); //해당 아코디언 그룹

  if( my_trigger.hasClass('active') ){  //열려있을 때
    //해당 슬리아드 비활성화
    my_panel.stop().slideUp();
    my_trigger.removeClass('active');
  } else {  //닫혀있을 때
    accordion_group.find('.panel').stop().slideUp();
    accordion_group.find('.trigger').removeClass('active');


    //해당 슬라이드 활성화
    my_panel.stop().slideDown();
    my_trigger.addClass('active');
    my_list_item.addClass('active')
  }
});


//전체선택(함수는 lable에서 지정해야 합니다.)
function COM_check_box_all_fn(all_clase,select_class){
  var all_check = $('.'+all_clase); //전체 동의 체크박스
  var checkbox_num = $('.filter_wrap').find('.'+select_class).length; //체크 항목 개수
  var checkbox = $('.filter_wrap').find('.'+select_class); //전체동의를 제외한 체크박스

  //전체 동의 체크 했을 때
  all_check.click(function(){
    if(all_check.prop("checked") == true){
      checkbox.prop("checked",true);
    } else {
      checkbox.prop("checked",false);
    }
  });

  //전체동의 체크 해제 상태에서 모두 체크 되었을때, 전체동의 체크 상태에서 하나라도 해제 했을 때
  checkbox.click(function(){
    var checked_num = $("."+select_class+":checked").length; //체크된 박스 개수
    if(checked_num == checkbox_num){ //모두 체크 되었을 때
      all_check.prop("checked",true);
    } else {
      all_check.prop("checked",false);
    }
  });
}



// 숫자만 입력-------------------------------------------------------------------------------
// 숫자및 콤마사용(호출 ::onkeyup="return numkey_check(event)")
function numkey_check(evt) {
var _pattern = /^(\d{1,10}\)?)?$/;
var _value = event.srcElement.value;
if (!_pattern.test(_value)) {
  alert("숫자만 허용됩니다.");
  event.srcElement.value = event.srcElement.value.substring(0,event.srcElement.value.length - 1);
  event.srcElement.focus();
}
}

function numkey_comma_check(evt) {
var _pattern = /^(\d{1,5}([.]\d{0,2})?)?$/;
var _value = event.srcElement.value;
if (!_pattern.test(_value)) {
  alert("숫자만 입력가능하며,\n소수점 둘째자리까지만 허용됩니다.");
  event.srcElement.value = event.srcElement.value.substring(0,event.srcElement.value.length - 1);
  event.srcElement.focus();
}
}

//3자리 단위마다 콤마 생성
function addCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//모든 콤마 제거
function removeCommas(x) {
  if(!x || x.length == 0) return "";
  else return x.split(",").join("");
}
// 파일업로드-------------------------------------------------------------------------------
var file_cnt = 0;
// 이미지 업로드 함수 trigger(img_id:id,limit_cnt:파일갯수,file_type:(image:이미지,file:파일)
function file_upload_click(img_id,file_type,limit_cnt){
$('body').append('<form id="file_form" method="post"></form>');
var fileUpload = "<input type='file' name='file[]' id='ex_file' onchange=\"file_upload('"+img_id+"','"+file_type+"','"+limit_cnt+"');\" style='display:none' >";
$('#file_form').html(fileUpload);
$('#ex_file').click();
}


//파일업로드함수
function file_upload(img_id,file_type,limit_cnt){

  var formdata = new FormData($("#file_form")[0]);
  if(limit_cnt!=""){
    if($(".flie_li").length >= parseInt(limit_cnt)){
      alert('업로드는 '+limit_cnt+'개 까지만 등록 가능합니다.');
      return;
    }
  }

  $.ajax({
    url         : "/common/multi_fileUpload",
    type        : 'post',
    dataType    : 'json',
    processData : false,
    contentType : false,
    data        : formdata,
    success     : function(img_list){

      var str="";

      for(var i = 0; i < img_list.length; i++){
        str="<li id='id_file_"+i+"_"+file_cnt+"' class='flie_li' style='display:inline-block;width:300px;float:left;'>"
        if(file_type !="file"){
          str+="<img class='preview_img' src='"+img_list[i].path+"'>";
        }else{
          str+= img_list[i].orig_name;
        }
        str+= "<img src='/images/btn_del.gif' style='width:15px;cursor:pointer' onclick=\"file_upload_remove('"+i+"_"+file_cnt+"');\"/>";
        str+="<input type='hidden'  name='"+img_id+"_orig_name[]' id='"+img_id+"_orig_name_"+i+"' value='"+img_list[i].orig_name+"'/>";
        str+="<input type='hidden' name='"+img_id+"_org_path[]' id='"+img_id+"_org_"+i+"' value='"+img_list[i].orig_name+"'/>";
        str+="<input type='hidden' name='"+img_id+"_path[]' id='"+img_id+"_path_"+i+"' value='"+img_list[i].path+"'/>";
        str+="<input type='hidden' name='"+img_id+"_width[]' id='"+img_id+"_width_"+i+"' value='"+img_list[i].image_width+"'/>";
        str+="<input type='hidden' name='"+img_id+"_height[]' id='"+img_id+"_height_"+i+"' value='"+img_list[i].image_height+"'/>";
        str+="</li>";

        $('#'+img_id).append(str);
      }
      file_cnt++;
    }

  });

}

var file_upload_remove = function(file_no){
$("#id_file_"+file_no).remove();
}
// -------------------------------------------------------------------------------------

//달력 세팅
$(document).ready(function() {
  for (var i = 0; i < 100; i++) {

    $("#s_date_"+i).datepicker({
      defaultDate: "+0w",
      dateFormat: "yy-mm-dd",
      prevText: '이전 달',
      nextText: '다음 달',
      monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      showMonthAfterYear: true,
      changeMonth: true,
      changeYear: true,
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function(selectedDate) {
        $("#e_date_"+i).datepicker("option", "minDate", selectedDate);
      }
    });

    $("#e_date_"+i).datepicker({
      defaultDate: "+0w",
      dateFormat: "yy-mm-dd",
      prevText: '이전 달',
      nextText: '다음 달',
      monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      showMonthAfterYear: true,
      changeMonth: true,
      changeYear: true,
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function(selectedDate) {
        $("#s_date_"+i).datepicker("option", "maxDate", selectedDate);
      }
    });
  }
});

//뒤로 가기
function COM_history_back_fn(){
  if(window.history.length==1){
    location.href = "/<?=mapping('main')?>";
  }else{
    history.go(-1);
  }
}

// 민지:s

// 이미지줌(확대/축소)
function set_modal_open(img){
  $("#zoom_img").attr('src', img);
  modal_open('img_origin');
  image_zoom();
}
function image_zoom(){
  var el = document.querySelector('#box_id');
  var pz = new PinchZoom.default(el, {
    draggableUnzoomed: false,
  });
}

// 위시리스트 토글버튼
function wish_btn(element){
  if($(element).hasClass("on")){
    $(element).removeClass("on");
  } else {
    $(element).addClass("on");
  }
}

// 탭메뉴 토글기능
$(document).ready(function() {
  $(".tab_area_wrap > div").hide();
  $(".tab_area_wrap > div").first().show();
  $(".tab_toggle_menu li").click(function() {
    var list = $(this).index();
    $(".tab_toggle_menu li").removeClass("active");
    $(this).addClass("active");

    $(".tab_area_wrap > div").hide();
    $(".tab_area_wrap > div").eq(list).show();
  });
});

// 사업자정보확인
function license_check(){
  var url = "http://www.ftc.go.kr/bizCommPop.do?wrkr_no="+form_license.license_no.value;
  window.open(url, "bizCommPop", "width=750, height=700;");
}

// ios placeholder not showing
for(var i =0; i < $('.place_wrap textarea').length; i++){
	if ($('.place_wrap').eq(i).find('textarea').val().length === 0) {
		$('.place_wrap').eq(i).find('textarea').siblings('.place_p').css('display','block');
	}else{
		$('.place_wrap').eq(i).find('textarea').siblings('.place_p').css('display','none');
	}
}
$(".place_wrap textarea").on("propertychange change keyup paste input", function(){
	if ($(this).val().length === 0) {
		$(this).siblings('.place_p').css('display','block');
	 }else{
		$(this).siblings('.place_p').css('display','none');
	};
});
