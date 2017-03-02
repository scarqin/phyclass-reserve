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
	$('#submit_message').keyup(function() {
			$('#max_length').html(50 - $("#submit_message").val().length)
			if ($("#submit_message").val() != '')
				$('.submit_apply').addClass('submit_apply_active')
			else $('.submit_apply').removeClass('submit_apply_active');
		})
		//windows框上面的url地址
	function _get_msg() {
		var url = window.location.search;
		url = decodeURI(url); //url转码
		var i = url.split('?'); //去掉首符号
		var params = i[1].split('&'); //分开各数据得到四个字符串
		var data = {};
		var comment = '';
		for (var n in params) {
			var m = params[n].split('=');
			data[m[0]] = m[1];
		}
		$('#exam_content').html(data.exam_name);
		$('#time_content').html(data.class_name);
		var id = data.id,
			time = data.time;
		$('.submit_apply_main').on('click', '.submit_apply_active', function() {
			comment = $("#submit_message").val()
			$.ajax({
				url: 'Apply.api',
				type: 'POST',
				data: {
					'comment': comment,
					'id': id,
					'time': time,
				},
				success: function(data) {
					if (data == 1) {
						alert("添加成功!");
						location.href = "my-reserve.html"
					} else if (data == 2) {
						alert("您已提交过申请，请耐心等候或取消上次申请!");
						location.href = "my-reserve.html"
					} else{
						alert("系统繁忙，请稍后再试!");
					}
				},
				error: function(e, f, g) {
					alert("链接不到服务器哦...");
				}
			})
		})
	}
	_get_msg();
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