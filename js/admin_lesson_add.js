$(document).ready(function(){
    // $.post("GetSession.api",function(data){
    // 	if(data==0) alert("账号未登录，请重新登录");
    // 	location.href = "Login.html";
    // })
	
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
	$(window).resize(function(){
		$(".head_lay").removeClass("lay_resize");
		$(".content_lay").removeClass("lay_resize");
		var head_lay=parseInt($(".head_lay").css("width"));
		if(head_lay<1025) $(".head_lay").addClass("lay_resize");
		var content_lay=parseInt($(".content_lay").css("width"));
		if(content_lay<1025) $(".content_lay").addClass("lay_resize");
	});

	$(".save").click(function(){
		var subject=$("#class_name").val();
		var room=$("#classroom_name").val();
		if(subject==""||room=="") alert("请填写完整信息");
		else{
			$.post("AddSubject.api",
					{
				subject:subject,
				room:room
					},
			function(data){
				alert(data)
				// if(data==="ok") console.log("添加成功");
				// else if(data=="error") console.log("添加失败");
				// else if(data=="existed") console.log("课程已存在");
				location.reload();
			});
		}
	});
});
