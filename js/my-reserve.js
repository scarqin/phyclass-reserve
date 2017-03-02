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
	$.ajax({
		url: "GetApplicationS.api",
		type: "POST",
		success: function(data) {
			if (data != 'error') {
				var data = JSON.parse(data);
				$.ajax({
					url: "GetSubject.api",
					type: "POST",
					success: function(subj) {
						var obj = JSON.parse(subj);
						var str = '';
						for (var i = 0; i < data.length; i++) {
							str = '<td >' + obj[data[i].subjectid - 1].subject + '</td>';
							str += '<td>' + '实验三号楼' + obj[data[i].subjectid - 1].room + '</td>';
							if (data[i].status == 'waiting') {
								str += "<td class='td_waiting' data-applyid=" + data[i].applyid + ">" + '审核中' + '(取消)' + '</td>'
								$('tr').eq(i + 1).addClass('waiting')
								$('tr').on('click', '.td_waiting', function() {
									var applyid = $(this).data('applyid');
									if (confirm("确认取消？")) {
										$.ajax({
											url: "CancelApplication.api",
											type: 'POST',
											data: {
												'applyid': applyid
											},
											success: function(cancel) {
												if (cancel == 1) {
													window.location.reload();
												} else alert('取消失败！')

											},
											error: function(e, f, g) {
												alert("链接不到服务器哦...");
											}
										})
									}
								})

							} else if (data[i].status == 'ok') {
								str += "<td>" + '审核通过' + '</td>'
								$('tr').eq(i + 1).addClass('pass')
							} else {
								str += "<td class='unsuccessful_td'>" + '未通过' + '</td>'
							}
							if (data[i].reply == undefined) str += '<td>' + '' + '</td>';
							else str += '<td class="text-left">' + data[i].reply + '</td>'
							$('tr').eq(i + 1).html(str);
							$('.unsuccessful_td').parent().addClass('unsuccessful')
						}
					},
					error: function(e, f, g) {
						alert("链接不到服务器哦...");
					}
				})
			}
		},
		error: function(e, f, g) {
			alert("链接不到服务器哦...");
		}

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