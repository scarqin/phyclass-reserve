window.pagenum=15;//当前页显示数目
window.this_page=1;
var pages=0;

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
	
	//载入老师信息
	function get_teacher(this_page){
		$.post("GetTeacher.api",
			{
			 page:this_page,
		     pagenum:pagenum
		    },
		    function(data){
		    	var list=eval("("+data+")");
		    	for(var i=0;i<list.length;i++){
		    		$("#teacher_info_list").append("<tr>" +
		    				"<td class=\"info_select\"><label for=\"info_select_"+i+"\"></label><input type=\"checkbox\" id=\"info_select_"+i+"\" data-id="+list[i].userid+"></td>" +
		    				"<td class=\"info_name\">"+list[i].username+"</td>" +
		    				"<td class=\"info_code\">"+list[i].userid+"</td>" +
		    				"<td class=\"info_tel\">"+list[i].tel+"</td>" +
		    				"<td class=\"info_subject\">"+list[i].subject+"</td>" +
		    				"<td class=\"info_change\"></td>" +
		    				"</tr>");
					var oHeight=$(".info_major:last").css("height");
					if(oHeight!=="30px") {$("#teacher_info_list tr:last").css("height",oHeight);}
		    	}
		});
	}
	get_teacher(this_page);


	//显示总页数
	show_total_pages();
	function show_total_pages(){
		$.ajaxSetup({ async :false});
		$.post("GetPageSize.api",
			{
				object:"teacher",
				pagenum:pagenum
			},
			function(data){
				var list=eval("("+data+")");
				pages=Math.ceil(list[0].pagesize/15);
				$(".pagenav span").text("共"+pages+"页");
			}
		);
	}

	show_pages(1);
	function show_pages(this_page){
	    $(".footer_num").remove();
		var str="";
		if(pages>=5){
			if(this_page>2&&this_page<pages-1){
				for(var i=parseInt(this_page)-2;i<=parseInt(this_page)+2;i++){
					str+="<a class=footer_num>"+i+"</a>";
				}
			}
			else if(this_page==1||this_page==2){
				for(var i=1;i<=5;i++){
					str+="<a class=footer_num>"+i+"</a>";
				}
			}
			else if(this_page==pages-1||this_page==pages){
				for(var i=pages-4;i<=pages;i++){
					str+="<a class=footer_num>"+i+"</a>";
				}
			}
		}
		else{
			for(var i=1;i<=pages;i++) str+="<a class=footer_num>"+i+"</a>";
		}
		$("#first_page").after(str);
		if(this_page==1) $(".footer_num:eq(0)").addClass("footer_num_active");
	}


	//跳转
   // 页数选取
	$(".pagenav").on('click','.footer_num',function(){
	    $this=$(this);
	    var this_page=$this.text();
	    page_select(this_page);
	});

	function page_select(this_page){
	    $(".footer_num").removeClass("footer_num_active");
		show_pages(this_page);
	    if(this_page>2&&this_page<pages-1){$(".footer_num:eq(2)").addClass("footer_num_active");}
	    else if(this_page==1){$(".footer_num:eq(0)").addClass("footer_num_active");}
	    else if(this_page==2){$(".footer_num:eq(1)").addClass("footer_num_active");}
	    else if(this_page==3){$(".footer_num:eq(2)").addClass("footer_num_active");}
	    else if(this_page==4){$(".footer_num:eq(3)").addClass("footer_num_active");}
	    else if(this_page==pages-1){$(".footer_num:eq(3)").addClass("footer_num_active");}
	    else if(this_page==pages){$(".footer_num:eq(4)").addClass("footer_num_active");}
		$("tr").remove();
		get_teacher(this_page);
	}


	//跳转到首页
	$("#first_page").on("click",function(){
		page_select(1);
	});
	//跳转到最后一页
	$("#last_page").on("click",function(){
		page_select(pages);
	});
	//上一页
	$(".prev_page").on("click",function(){
		var selected=$(".footer_num_active").text();
		if (selected==1) alert("已经是第一页了");
		else {
			selected--;
			page_select(selected);
		}
	});
	//下一页
	$(".next_page").on("click",function(){
		var selected=$(".footer_num_active").text();
		if (selected==pages) alert("已经是最后一页了");
		else {
			selected++;console.log(selected)
			page_select(selected);
		}
	});
	//跳转到指定页数
	$("#jump").blur(function(){
		var selected=$(this).val();
		if(selected>pages) {alert("超出最大页数");$(this).val("");}
		if(selected==""||selected<=0) {alert("请输入正确页数");$(this).val("");}
		else if(selected>0&&selected<=pages) page_select(selected);
	});





	//添加老师
	$(".add").on("click",function(){
		$(".add_teacher").addClass("object_show");
		$("tr").removeClass("object_show");
		$(".info_change").removeClass("object_visible");
		$(".info_select label").removeClass("object_visible");
		$("info_change").css("visibility","hidden");
		$(".add_taecher_back").addClass("back_active");
	});

	$("#add").on("click",function(){
		var userid=$("#userid").val();
		var password=$("#password").val();
		var username=$("#username").val();
		var tel=$("#tel").val();
		if(userid==""||password==""||username==""||tel=="") alert("数据不能为空");
		else{
			$.post("AddTeacher.api",{
					userid:userid,
					password:password,
					username:username,
					tel:tel,
				},
			function(data){
					if(data==0) alert("操作失败");
					else if(data==1) alert("添加成功");
					else if(data==2) alert("用户已存在");
					window.location.reload();
				}
			);
		}
	});

	$("#cancel").on("click",function(){
		window.location.reload();
	})

	//编辑老师
	// $(".edit").on("click",function(){
	// 	$("tr").addClass("object_show");
	// 	$(".info_change").addClass("object_visible");
	// 	$(".delete_teacher").removeClass("object_show");
	// 	$(".add_teacher").removeClass("object_show");
	// 	$(".info_select label").removeClass("object_visible");
	// });

	var userid=0;
	$("table").on("click","tr .info_change",function(){
		$(".change_subject").addClass("object_show");
		$(this).parent().addClass("tr_edit");
		$(".change_subject_back").css("z-index","2");
		$(".change_subject_back").addClass("back_active");
		userid=$(this).prev().prev().prev().text();
		$.post("GetSubject.api",{},function(data){
			var list=eval("("+data+")");
			for(var i=0;i<list.length;i++){
				$("#subject").append("<option>"+list[i].subject+"</option>");
			}
		});
	});

	$("#change").on("click",function(){
		var value=$("#subject option:selected").text();
		$.post("UpdateTeacher.api",{subject:value,userid:userid},function(data){
			if (data==1) {alert("修改成功"); window.location.reload();}
			else if (data==0) {alert("修改失败"); window.location.reload();}
		});
	});

	$("#cancel_change").on("click",function(){
		$(".change_subject").removeClass("object_show");
		$(".change_subject_back").css("z-index","-1");
		$(".change_subject_back").removeClass("back_active");
		$(".tr_edit").removeClass("tr_edit");
	});

	//显示删除老师
	// var i=2;
	// $(".delete").on("click",function(){
	// 	$("tr").addClass("object_show");
	// 	$(".info_change").removeClass("object_visible");
	// 	$(".delete_teacher").removeClass("object_show");
	// 	$(".add_teacher").removeClass("object_show");
	// 	$("tr").addClass("object_show");
	// 	if(i%2==0){
	// 		$(".info_select label").addClass("object_visible");
	// 		$(".add_delete_edit input").addClass("object_show");
	// 	}
	// 	else{
	// 		$(".info_select label").removeClass("object_visible");
	// 		$(".add_delete_edit input").removeClass("object_show");
	// 	}
	// 	i++;
	// });

	//选择账号
	$("#teacher_info_list").on("click",".info_select label",function(e){
		e.stopPropagation();
		$(this).toggleClass("is_checked");
		var total_length=$(".is_checked").length;
		if(total_length){
			$(".info_change").addClass("info_change_none");
		}
		else{
			$(".info_change").removeClass("info_change_none");
		}	
	});

	//删除老师账户
	$("#delete_teacher").on("click",function(){
		var i=0;
		var a=$(":checked").parent().next().next();
		// a=$(":checked[name='checkboxes'][checked='checked']").data("id");
		console.log(a);
		var total_length=$(":checked").parent().parent().length;
		if(total_length!==0){
			for(i=0;i<total_length;i++){
				var id=a[i].innerHTML;
				$.post("DeleteUser.api",{userid:id},function(data){
					if(data==1){
						var navigatorName = "Microsoft Internet Explorer"; 
						$(":checked").parent().parent()[0].remove();
						$(":checked").parent().parent()[0].removeNode(true);					
					}
					else if(data==0) alert("删除失败");
				});
			}
		}
		else alert("请选择要删除的老师");
	});




});











