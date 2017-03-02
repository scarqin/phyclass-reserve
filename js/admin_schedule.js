
$(document).ready(function(){
    // $.post("GetSession.api",function(data){
    // 	if(data==0) alert("账号未登录，请重新登录");
    // 	location.href = "Login.html";
    // })
	$(window).resize(function(){
		$(".head_lay").removeClass("lay_resize");
		$(".content_lay").removeClass("lay_resize");
		var head_lay=parseInt($(".head_lay").css("width"));
		if(head_lay<1025) $(".head_lay").addClass("lay_resize");
		var content_lay=parseInt($(".content_lay").css("width"));
		if(content_lay<1025) $(".content_lay").addClass("lay_resize");
	});

	
  	//载入课程列表
	$.post("GetSubject.api",{},function(data){
		var list=eval("("+data+")");
		for(var i=0;i<list.length;i++)
			$(".list_info ul").append("<li value=\""+list[i].subjectid+"\">"+list[i].subject+"</li>");
	});

    	//退出登录
	$("#exit").on("click",function(){
		$.post("Logout.api",{},function(data){
			if(data=="logouted") {
			location.href = "login.html";	
			alert("退出成功");
			}
			else alert("退出失败");
		})
		})

	//定义全局每星期变量
	window.d1=0;
	window.d2=0;
	window.d3=0;
	window.d4=0;
	window.d5=0;
	//判断所选为周几的第几节课程
	$(".lessons").on("click","li",function(){
		$(this).toggleClass("week_active");
 		var d=$(this).parent().attr("class");
 		var t=$(this).val();
 		if($(this).css("background-color")=="rgb(221, 36, 50)"){
			if(d=="monday") d1+=t;
			else if(d=="thuesday") d2+=t;
			else if(d=="wednesday") d3+=t;
			else if(d=="thursday") d4+=t;
			else if(d=="friday") d5+=t;
 		}
 		else{
			if(d=="monday") d1-=t;
			else if(d=="thuesday") d2-=t;
			else if(d=="wednesday") d3-=t;
			else if(d=="thursday") d4-=t;
			else if(d=="friday") d5-=t;
 		}
	});

	//设置课程
	setTimeout(function(){
		window.subjectid=$(".list_info ul li:first").val();
		$(".list_info ul li:first").addClass("list_active");
	}, 1000);

	$(".list_info").on("click","li",function(){
		$("#this_week").text("1");
		$(".week_active").removeClass();
		$(".list_active").removeClass();
		d1=d2=d3=d4=d5=0;
		max_week=0;
		subjectid=$(this).val();
		$(this).addClass("list_active");
		$(".pre").removeClass("pre_changed");
		$(".next").removeClass("next_changed");
	});


	//提交数据
	var temp=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
	$(".submit").on("click",function(){
		var week=$("#this_week").text();
		if(week <= 20){
			if(subjectid!==null){
				$.post("ChangeSchedule.api",{
					subjectid:subjectid,
					week:week,
					d1:d1,
					d2:d2,
					d3:d3,
					d4:d4,
					d5:d5,
					maxnum:30
				},
				function(data){
					if(data==1) {
						alert("设置成功");
						week++;
						d1=d2=d3=d4=d5=0;
						$(".week_active").removeClass();
						if(week==21) alert("最后一周已设置");
						else{
							$("#this_week").text(week);
							$("#this_week").val(week);
						}
						if(week==1) $(".pre").removeClass("pre_changed");
						else $(".pre").addClass("pre_changed");
						max_week=max_week>week?max_week:week;

					}
					else if(data==0) {
						alert("设置失败");
					location.reload();
					}

				});
			}
			else{alert("已到最后一周！");}		
		}
		temp[week-1][0]=d1;
		temp[week-1][1]=d2;
		temp[week-1][2]=d3;
		temp[week-1][3]=d4;
		temp[week-1][4]=d5;

	});
		var timer;
	//列表上滚
	function up(){
		if(timer) clearTimeout(timer);
		timer=setTimeout(function(){
		var top=$(".list_info ul").css("top");
		top=parseInt(top);
		var list_length=$(".list_info ul").css("height");
		list_length=parseInt(list_length);console.log(top);
		if(top>-389) $(".list_info ul").css("top","0px");
			else if(top>=-list_length+389){
				$(".list_info ul").animate({top:"+=389px"},200);
			}
		},200)
	}
	//列表下滚
	function down(){
		if(timer) clearTimeout(timer);
		timer=setTimeout(function(){
		var top=$(".list_info ul").css("top");
		top=parseInt(top);
		var list_length=$(".list_info ul").css("height");
		list_length=parseInt(list_length);console.log(top);
		if(top>-list_length+389+389) $(".list_info ul").animate({top:"-=389px"},200);
			else if(top<=-list_length+389+389){
				list_length=-list_length+389;
				$(".list_info ul").css("top",list_length+"px");
			}
		},200)
	}
	$(".up").click(up);
	$(".down").click(down);

	var week_temp=$("#this_week").text();
	//上一周
	$(".pre").on("click",function(){
		var week=parseInt($("#this_week").text());
		this_week=week;
		$(".week_active").removeClass();
		var week_temp=$("#this_week").text();
		if(this_week-1<max_week) $(".next").addClass("next_changed");
		else if(this_week-1==max_week) $(".next").removeClass("next_changed");
		if(week==1) alert("这已经是第一周了");
		else{
			d1=temp[week-2][0];
			d2=temp[week-2][1];
			d3=temp[week-2][2];
			d4=temp[week-2][3];
			d5=temp[week-2][4];
			week--;
			//见鬼了，这么多条件，下次用循环
			$("#this_week").text(week);
			//星期一
			if(d1==1) $(".monday li").eq(0).addClass("week_active");
			else if(d1==2) $(".monday li").eq(1).addClass("week_active");
			else if(d1==4) $(".monday li").eq(2).addClass("week_active");
			else if(d1==8) $(".monday li").eq(3).addClass("week_active");
			else if(d1==3) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(1).addClass("week_active");
			}
			else if(d1==5) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
			}
			else if(d1==9) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==6) {
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
			}
			else if(d1==10) {
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==12) {
				$(".monday li").eq(2).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==7) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
			}
			else if(d1==11) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==13) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==14) {
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==15) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			//星期二
			if(d2==1) $(".thuesday li").eq(0).addClass("week_active");
			else if(d2==2) $(".thuesday li").eq(1).addClass("week_active");
			else if(d2==4) $(".thuesday li").eq(2).addClass("week_active");
			else if(d2==8) $(".thuesday li").eq(3).addClass("week_active");
			else if(d2==3) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(1).addClass("week_active");
			}
			else if(d2==5) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
			}
			else if(d2==9) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==6) {
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
			}
			else if(d2==10) {
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==12) {
				$(".thuesday li").eq(2).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==7) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
			}
			else if(d2==11) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==13) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==14) {
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==15) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			//星期三
			if(d3==1) $(".wednesday li").eq(0).addClass("week_active");
			else if(d3==2) $(".wednesday li").eq(1).addClass("week_active");
			else if(d3==4) $(".wednesday li").eq(2).addClass("week_active");
			else if(d3==8) $(".wednesday li").eq(3).addClass("week_active");
			else if(d3==3) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(1).addClass("week_active");
			}
			else if(d3==5) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
			}
			else if(d3==9) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==6) {
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
			}
			else if(d3==10) {
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==12) {
				$(".wednesday li").eq(2).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==7) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
			}
			else if(d3==11) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==13) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==14) {
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==15) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			//星期四
			if(d4==1) $(".thursday li").eq(0).addClass("week_active");
			else if(d4==2) $(".thursday li").eq(1).addClass("week_active");
			else if(d4==4) $(".thursday li").eq(2).addClass("week_active");
			else if(d4==8) $(".thursday li").eq(3).addClass("week_active");
			else if(d4==3) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(1).addClass("week_active");
			}
			else if(d4==5) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
			}
			else if(d4==9) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==6) {
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
			}
			else if(d4==10) {
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==12) {
				$(".thursday li").eq(2).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==7) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
			}
			else if(d4==11) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==13) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==14) {
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==15) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			//星期五
			if(d5==1) $(".friday li").eq(0).addClass("week_active");
			else if(d5==2) $(".friday li").eq(1).addClass("week_active");
			else if(d5==4) $(".friday li").eq(2).addClass("week_active");
			else if(d5==8) $(".friday li").eq(3).addClass("week_active");
			else if(d5==3) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(1).addClass("week_active");
			}
			else if(d5==5) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
			}
			else if(d5==9) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==6) {
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
			}
			else if(d5==10) {
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==12) {
				$(".friday li").eq(2).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==7) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
			}
			else if(d5==11) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==13) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==14) {
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==15) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			if(week==1) $(".pre").removeClass("pre_changed");
			else $(".pre").addClass("pre_changed");
		}
	});
	//下一周
	window.max_week=0;
	function next_week(){
		var week=parseInt($("#this_week").text());
		$(".week_active").removeClass();
		if(week==20) alert("这已经是最后一周了");
		if(week>=max_week) alert("请顺序执行周数设置");
		else{
			$("#this_week").text(week);
			d1=temp[week][0];
			d2=temp[week][1];
			d3=temp[week][2];
			d4=temp[week][3];
			d5=temp[week][4];
			week++;
			//见鬼了，这么多条件，下次用循环
			$("#this_week").text(week);
			if(week==max_week) $(".next").removeClass("next_changed");
			//星期一
			if(d1==1) $(".monday li").eq(0).addClass("week_active");
			else if(d1==2) $(".monday li").eq(1).addClass("week_active");
			else if(d1==4) $(".monday li").eq(2).addClass("week_active");
			else if(d1==8) $(".monday li").eq(3).addClass("week_active");
			else if(d1==3) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(1).addClass("week_active");
			}
			else if(d1==5) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
			}
			else if(d1==9) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==6) {
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
			}
			else if(d1==10) {
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==12) {
				$(".monday li").eq(2).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==7) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
			}
			else if(d1==11) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==13) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==14) {
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			else if(d1==15) {
				$(".monday li").eq(0).addClass("week_active");
				$(".monday li").eq(1).addClass("week_active");
				$(".monday li").eq(2).addClass("week_active");
				$(".monday li").eq(3).addClass("week_active");
			}
			//星期二
			if(d2==1) $(".thuesday li").eq(0).addClass("week_active");
			else if(d2==2) $(".thuesday li").eq(1).addClass("week_active");
			else if(d2==4) $(".thuesday li").eq(2).addClass("week_active");
			else if(d2==8) $(".thuesday li").eq(3).addClass("week_active");
			else if(d2==3) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(1).addClass("week_active");
			}
			else if(d2==5) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
			}
			else if(d2==9) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==6) {
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
			}
			else if(d2==10) {
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==12) {
				$(".thuesday li").eq(2).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==7) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
			}
			else if(d2==11) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==13) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==14) {
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			else if(d2==15) {
				$(".thuesday li").eq(0).addClass("week_active");
				$(".thuesday li").eq(1).addClass("week_active");
				$(".thuesday li").eq(2).addClass("week_active");
				$(".thuesday li").eq(3).addClass("week_active");
			}
			//星期三
			if(d3==1) $(".wednesday li").eq(0).addClass("week_active");
			else if(d3==2) $(".wednesday li").eq(1).addClass("week_active");
			else if(d3==4) $(".wednesday li").eq(2).addClass("week_active");
			else if(d3==8) $(".wednesday li").eq(3).addClass("week_active");
			else if(d3==3) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(1).addClass("week_active");
			}
			else if(d3==5) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
			}
			else if(d3==9) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==6) {
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
			}
			else if(d3==10) {
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==12) {
				$(".wednesday li").eq(2).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==7) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
			}
			else if(d3==11) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==13) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==14) {
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			else if(d3==15) {
				$(".wednesday li").eq(0).addClass("week_active");
				$(".wednesday li").eq(1).addClass("week_active");
				$(".wednesday li").eq(2).addClass("week_active");
				$(".wednesday li").eq(3).addClass("week_active");
			}
			//星期四
			if(d4==1) $(".thursday li").eq(0).addClass("week_active");
			else if(d4==2) $(".thursday li").eq(1).addClass("week_active");
			else if(d4==4) $(".thursday li").eq(2).addClass("week_active");
			else if(d4==8) $(".thursday li").eq(3).addClass("week_active");
			else if(d4==3) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(1).addClass("week_active");
			}
			else if(d4==5) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
			}
			else if(d4==9) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==6) {
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
			}
			else if(d4==10) {
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==12) {
				$(".thursday li").eq(2).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==7) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
			}
			else if(d4==11) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==13) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==14) {
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			else if(d4==15) {
				$(".thursday li").eq(0).addClass("week_active");
				$(".thursday li").eq(1).addClass("week_active");
				$(".thursday li").eq(2).addClass("week_active");
				$(".thursday li").eq(3).addClass("week_active");
			}
			//星期五
			if(d5==1) $(".friday li").eq(0).addClass("week_active");
			else if(d5==2) $(".friday li").eq(1).addClass("week_active");
			else if(d5==4) $(".friday li").eq(2).addClass("week_active");
			else if(d5==8) $(".friday li").eq(3).addClass("week_active");
			else if(d5==3) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(1).addClass("week_active");
			}
			else if(d5==5) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
			}
			else if(d5==9) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==6) {
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
			}
			else if(d5==10) {
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==12) {
				$(".friday li").eq(2).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==7) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
			}
			else if(d5==11) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==13) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==14) {
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			else if(d5==15) {
				$(".friday li").eq(0).addClass("week_active");
				$(".friday li").eq(1).addClass("week_active");
				$(".friday li").eq(2).addClass("week_active");
				$(".friday li").eq(3).addClass("week_active");
			}
			if(week==1) $(".pre").removeClass("pre_changed");
			else $(".pre").addClass("pre_changed");
		}
		
	}
	$(".next").click(next_week);



	//鼠标滚轮
	$('.list_info').on('mousewheel', function(e) {
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;
		if (e.preventDefault) e.preventDefault();
		else e.returnValue = false;
		e = e.originalEvent;
		if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件             
			if (e.wheelDelta > 0) { //当滑轮向上滚动时
				up();
			}
			if (e.wheelDelta < 0) { //当滑轮向下滚动时
				down();
			}
		} else if (e.detail) { //Firefox滑轮事件
			if (e.detail > 0) { //当滑轮向上滚动时
				up();
			}
			if (e.detail < 0) { //当滑轮向下滚动时
				down();
			}
		}
	})

	


});


















