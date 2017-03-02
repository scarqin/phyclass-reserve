$(document).ready(function() {
	var weekNum = 0;
	var timer = null;
	var item = $(".item");
	$.ajax({
		url: "/PhyClass/GetSession.api",
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
			url: "/PhyClass/GetSubject.api",
			type: "POST",
			success: function(data) {
				var obj = JSON.parse(data),
					str = "";
				for (var i = 0; i < obj.length; i++) {
					str += "<li class='exam_list_name' data-id=" + obj[i].subjectid + ">" + obj[i].subject + "</li>";
				}
				$('#exam_list').html(str);
			},
			error: function(e, f, g) {
				alert("链接不到服务器哦...");
			}
		})
		// 点击课程后   获取课程周数  根据周数获取课程 点击课程提交 判断
	$("#exam_list").on('click', '.exam_list_name', function(event) {
		event.stopPropagation();
		var $this = $(this);
		$("#exam_list").find('.exam_list_name').removeClass('active-li');
		$this.addClass('active-li');
		_getweek($this.data('id'));
		$('#btn_class_submit').data('data-exam_name', $this.html());

	})

	function _getweek(id) {
		$.ajax({
			url: "/PhyClass/GetWeek.api",
			type: "POST",
			data: {
				"subjectid": id
			},
			success: function(data) {
				$(".btn_next").removeClass("btn_next_active");
				$(".btn_last").removeClass("btn_last_active");
				if (data != 'error') {
					var len;
					var weeks = [];
					var weekid = [];
					weekNum = 0;
					data = JSON.parse(data);
					len = data.length;
					for (var i = 0; i < len; i++) {
						weeks.push(data[i].weeks); //将数据库的weeks赋值给自定义的weeks
						weekid.push(data[i].weekid);
					}
					_getday(weekNum, weekid);
					if (len > 1) {
						$(".btn_next").addClass("btn_next_active");
					}
					_btn_next(len, weeks, weekid);
					_btn_last(len, weeks, weekid);
					$("#week_number").html(weeks[weekNum]);

				} else $("#week_number").html("");
				clear_item();
				$('#choice_show_text').html("");

			},
			error: function(e, f, g) {
				alert("链接不到服务器哦...");
			}
		})
	}

	function _getday(weekNum, weekid) {
		$.ajax({
			url: "/PhyClass/GetDay.api",
			type: "POST",
			data: {
				"weekid": weekid[weekNum] //weekid 此实验weekid数组  weekNum第几周
			},
			success: function(data) {
				if (data != 'error') {
					$('#choice_show_text').html("");
					var str = '';
					var divNumber = 0;
					var data = JSON.parse(data);
					clear_item();
					for (var i = 0; i <= 4; i++) {
						for (var j = 1; j <= 4; j++) {
							divNumber = i + (j - 1) * 5
							if (item.eq(divNumber).html() != '') {
								item.eq(divNumber).html("");
							} //清楚上次课程的值
							if (data[i]['t' + j] != -1 && data[i]['t' + j] < data[i]['maxnum']) {
								if (divNumber <= 4) {
									str = '第 1~2 节'
								} else if (divNumber <= 9) {
									str = '第 3~4 节'
								} else if (divNumber <= 14) {
									str = '第 5~6 节'
								} else {
									str = '第 7~8 节'
								}
								item.eq(divNumber).html(str).addClass("item_active");
								item.eq(divNumber).data('data-day', i);
								item.eq(divNumber).data('data-id', data[i]['id']);
								item.eq(divNumber).data('data-time', 't' + j);
							}
						}
					} //添加css和时间在有数据的天数上

					$(".main_course_each").on('click', '.item_active', function(event) {
							event.stopPropagation();
							var str1 = "",
								str2 = "",
								str3 = "";
							var $this = $(this);
							$('#btn_class_submit').data('data-class_name', $this.html());
							var which_day = $this.data('data-day'); //周几 (从0开始)
							var time = $this.data('data-time');
							var id = $this.data('data-id');
							for (var k = 19; k >= 0; k--) {
								if (item.eq(k).hasClass('item_focus'))
									item.eq(k).removeClass('item_focus')
							}
							$(this).addClass('item_focus');
							str1 = $('#week_number').html();
							if (which_day == 0) str2 = '一'
							else if (which_day == 1) str2 = '二'
							else if (which_day == 2) str2 = '三'
							else if (which_day == 3) str2 = '四'
							else str2 = '五'
								//判断周几
							str3 = $this.html();
							$('#choice_show_text').html('第' + str1 + '周 ' + '星期' + str2 + '&nbsp' + str3);
							//提交按钮传出url
							$('#btn_class_submit').click(function() {
								var str = '';
								var class_name = $('#btn_class_submit').data('data-class_name'),
									exam_name = $('#btn_class_submit').data('data-exam_name'),
									str = 'submit-apply.html' + '?ie=utf-8' + '&class_name=' + class_name + '&exam_name=' + exam_name + '&id=' + id + '&time=' + time;
								location.href = str;
							})
						}) //选中显示出具体内容

				}
			},

			error: function(e, f, g) {
				alert("链接不到服务器哦...");
			}
		})

	}

	function _btn_next(len, weeks, weekid) {
		$(".btn_next").click(function() {
			clearTimeout(timer);
			timer = setTimeout(function() {
				if (weekNum < len - 1 && $(".btn_next").hasClass("btn_next_active")) {
					weekNum++;
					$("#week_number").html(weeks[weekNum]);
					$(".btn_last").addClass("btn_last_active")
					_getday(weekNum, weekid);
				}
				if (weekNum == len - 1) $(".btn_next").removeClass("btn_next_active");

			}, 200)
		});
	}

	function _btn_last(len, weeks, weekid) {
		$(".btn_last").click(function() {
			clearTimeout(timer);
			timer = setTimeout(function() {
				if (weekNum > 0 && $(".btn_last").hasClass("btn_last_active")) {
					weekNum--
					$("#week_number").html(weeks[weekNum]);
					$(".btn_next").addClass("btn_next_active")
					_getday(weekNum, weekid);
				}
				if (weekNum == 0) $(".btn_last").removeClass("btn_last_active");
			}, 200)
		});
	}

	function clear_item() {
		for (var i = 0; i <= 20; i++) {
			if (item.eq(i).html() != '' || item.eq(i).hasClass("item_active") || item.eq(i).hasClass('item_focus')) {
				item.eq(i).html("");
				item.eq(i).removeClass("item_active");
				item.eq(i).removeClass('item_focus');
			}
		}
	}

	function _exam_list_down() {
		clearTimeout(timer);
		timer = setTimeout(function() {
			if (parseInt($("#exam_list").css("bottom")) < 600) {
				$("#exam_list").animate({
					bottom: '+=300px'
				}, 300)
			} else $("#exam_list").animate({
				bottom: '681px'
			}, 200)
		}, 200)
	}

	function _exam_list_up() {
		clearTimeout(timer);
		timer = setTimeout(function() {
			if (parseInt($("#exam_list").css("bottom")) > 300) {
				$("#exam_list").animate({
					bottom: '-=300px'
				}, 300)
			} else $("#exam_list").animate({
				bottom: '0px'
			}, 200)

		}, 200)
	}
	$(".btn_down").click(_exam_list_down);

	$(".btn_up").click(_exam_list_up);

	$('#exam_list').on('mousewheel', function(e) {
		if (e.stopPropagation) e.stopPropagation();
		else e.cancelBubble = true;
		if (e.preventDefault) e.preventDefault();
		else e.returnValue = false;
		e = e.originalEvent;
		if (e.wheelDelta) { //判断浏览器IE，谷歌滑轮事件             
			if (e.wheelDelta > 0) { //当滑轮向上滚动时
				_exam_list_up();
			}
			if (e.wheelDelta < 0) { //当滑轮向下滚动时
				_exam_list_down();
			}
		} else if (e.detail) { //Firefox滑轮事件
			if (e.detail > 0) { //当滑轮向上滚动时
				_exam_list_up();
			}
			if (e.detail < 0) { //当滑轮向下滚动时
				_exam_list_down();
			}
		}
	})
	$("#exit").click(function() {
		if (confirm("确认退出?")) {
			alert("退出成功!");
			$.ajax({
				url: "/PhyClass/Logout.api",
				type: "POST",
				success: function(data) {
					location.href = "Login.html";
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