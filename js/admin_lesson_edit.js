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
	var temp;
	//获取课程信息
	$.post(
		"GetSubject.api",
		{},
		function(data){
			if(data=="error") alert("获取课程信息失败");
			else{
				var list=eval("("+data+")");temp=list;console.log(temp)
				for(var i=0;i<list.length;i++){
					$("#select_class").append("<option value="+list[i].subjectid+">"+list[i].subject+"</option>");
				}
			}
		}
	);
	
	//提交
	$(".save").click(function(){
		var subject=$("#change_name").val();
		var subjectid=$("#select_class").val();
		var room=$("#change_classroom").val();
		if(subject==""||subjectid=="") alert("请输入完整数据");
		else{
			$.post("UpdateSubject.api",
				{
				"subjectid":subjectid,
				"subject":subject,
				"room":room
				},
					function(data){
						if(data==1) alert("修改成功");
						else if(data==0) alert("操作有误");
						else if(data==2) alert("已存在");
			});
		}
	});

	$("#select_class").change(function(){
		$("#change_name").val("");
		$("#change_classroom").val("");
	}
)
});