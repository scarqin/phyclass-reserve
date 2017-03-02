$(document).ready(function() {
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
	})
	$('#submit').click(function() {
		var oldPsw = $('#old_password').val();
		var newPsw = $('#new_password').val();
		var reWPsw = $('#reconfirm_case').val();
		//判断有无输入旧密码
		if (oldPsw != '') {
			//判断新密码长度
			if (newPsw.length >= 6) {
				//判断新密码是否正确输入两遍
				if (newPsw == reWPsw) {
					$.ajax({
						url: 'ChangePassword.api',
						type: 'POST',
						data: {
							'oldpassword': oldPsw,
							'newpassword': newPsw
						},
						success: function(data) {
							if (data == 1) alert('修改成功')
							else if (data == 4) alert('密码错误')
							else alert('修改失败')
						},
						error: function(e, f, g) {
							alert("链接不到服务器哦...");
						}
					})
				} else alert('两次输入密码不一致！')
			} else alert('密码长度为6~16位，可以是字母、数字、特殊符号，字母区分大小写')
		} else alert('请输入原密码！')
		return false;
	})

	function CharMode(iN) {
		if (iN >= 48 && iN <= 57) //数字    
			return 1;
		if (iN >= 65 && iN <= 90) //大写    
			return 2;
		if (iN >= 97 && iN <= 122) //小写    
			return 4;
		else
			return 8;
	}
	//bitTotal函数    
	//计算密码模式    
	function bitTotal(num) {
		modes = 0;
		for (i = 0; i < 4; i++) {
			if (num & 1) modes++;
			num >>>= 1;
		}
		return modes;
	}
	//返回强度级别    
	function checkStrong(pwd) {
		if (pwd.length < 6)
			return 0; //密码太短，不检测级别  
		Modes = 0;
		for (i = 0; i < pwd.length; i++) {
			//密码模式    
			Modes |= CharMode(pwd.charCodeAt(i));
		}
		return bitTotal(Modes);
	}

	$('#reset').click(function() {
			var Dfault_color = "rgba(101, 77, 77, 0.32)"
			$('#w').css('background-color', Dfault_color);
			$('#m').css('background-color', Dfault_color);
			$('#h').css('background-color', Dfault_color);
		})
		//显示颜色   
	$('#new_password').keyup(
		function() {
			var pwd = $(this).val();
			var Dfault_color = "rgba(101, 77, 77, 0.32)"; //默认颜色  
			var L_color = "rgb(249, 119, 129)"; //低强度的颜色，且只显示在最左边的单元格中  
			var M_color = "rgb(249, 119, 129)"; //中等强度的颜色，且只显示在左边两个单元格中  
			var H_color = "rgb(249, 119, 129)"; //高强度的颜色，三个单元格都显示  
			if (pwd == null || pwd == '') {
				Lcolor = Mcolor = Hcolor = Dfault_color;
			} else {
				S_level = checkStrong(pwd);
				switch (S_level) {
					case 0:
						Lcolor = Mcolor = Hcolor = Dfault_color;
						break;
					case 1:
						Lcolor = L_color;
						Mcolor = Hcolor = Dfault_color;
						break;
					case 2:
						Lcolor = L_color;
						Mcolor = M_color;
						Hcolor = Dfault_color;
						break;
					default:
						Lcolor = Lcolor = L_color;
						Mcolor = M_color;
						Hcolor = H_color;
				}
			}
			$('#w').css('background-color', Lcolor);
			$('#m').css('background-color', Mcolor);
			$('#h').css('background-color', Hcolor);
		})
	$("#exit").click(function() {
		if (confirm("确认退出?")) {
			alert("退出成功!");
			$.ajax({
				url: "Logout.api",
				type: "POST",
				success: function(data) {
					location.href = "login.html";
				},
				error: function(e, f, g) {
					alert(e);
					alert(f);
					alert(g);
				}
			})
		}
	});
})