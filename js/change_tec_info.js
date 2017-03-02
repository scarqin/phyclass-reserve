$(function() {
    //账号提示登录
    $.ajax({
        url: "GetSession.api",
        type: "POST",
        success: function(data) {
            if (data == 0) {
                alert("您的账号未登录，请重新登录");
                location.href = "login.html";
            }
        },
        error: function(e, f, g) {
            alert("链接不到服务器哦...");
        }
    });
    change_tec_info();
    // 页面跳转
    $("#operation").click(function() {
        $(".handle_page").show();
        $(".change_all_imfo").hide();
        location.href = "Teacher.html";
    });
    $("#Change_password").click(function() {
        location.href = "change_tec_password.html";
    });
    // 原始用户名与密码的显示
    $.post("GetUserInfo.api", {}, function(response) {
        $("#name_txt").val(response.username);
        $("#num_txt").val(response.tel);

        $("#name_txt,#num_txt").keyup(function() {

            if ($("#name_txt").val() != response.username || $("#num_txt").val() != response.tel) {
                $(".save").css("background", "red");
            } else {
                $(".save").css("background", "#bab2b2");
            }
        });
    }, "json");

    // 教师信息的重置
    $(".empty_tec_info").click(function() {
        $("#name_txt").val("");
        $("#num_txt").val("");
    });
     //教师信息的修改
	 function change_tec_info(){
		 $.post("GetUserInfo.api",{},function(data){
			 var Data = JSON.parse(data);
			   $(".save").click(function(){
				   if( $("#name_txt").val() != Data.username || $("#num_txt").val() != Data.tel){
				      if($("#name_txt").val() != "" && $("#num_txt").val() != ""){
						    $.post("ChangeInfoT.api",{
								"userid":Data.userid,
								"username":$("#name_txt").val(),
								"tel":$("#num_txt").val()
								},function(evt){
									   if (evt == 1) {
                                    alert("修改成功");
                                       } else {
                                    alert("修改失败");
                                       }
									});
						 }
					  else{alert("请输入完整教师信息！");}	 
				   }
				   else{alert("信息未改动！");}
				   });
			 });
		 }
    //退出登录
    $("#exit").click(function() {
        if (confirm("确定退出？")) {
            $.ajax({
                url: "Logout.api",
                type: "POST",
                success: function(response) {
                    console.log(response);
                    alert("退出成功");
                    location.href = "login.html";
                },
                error: function() {
                    alert("退出失败");
                },
            });
        } else {
            return false;
        }
    });

});