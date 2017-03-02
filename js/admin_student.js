
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

	function get_student(this_page){
		$.post("GetUser.api",
			{
				page:this_page,
				pagenum:pagenum
			},
			function(data){
				var list=eval("("+data+")");
				for(var i=0;i<list.length;i++){
					$("#student_info_list").append("<tr>" +
							"<td class=\"info_select\"><label for=\"info_select_"+i+"\"></label><input type=\"checkbox\" id=\"info_select_"+i+"\"></td>" +
							"<td class=\"info_name\">"+list[i].username+"</td>" +
							"<td class=\"info_code\">"+list[i].userid+"</td>" +
							"<td class=\"info_tel\">"+list[i].tel+"</td>" +
							"<td class=\"info_major\">"+list[i].major+"</td>" +
							"<td class=\"info_grade\">"+list[i].grade+"</td>" +
							"<td class=\"info_class\">"+list[i].classes+"</td>" +
							"</tr>");
					var oHeight=$(".info_major:last").css("height");
					if(oHeight!=="30px") {$("#student_info_list tr:last").css("height",oHeight);}
					$(".pagenav").show();
				}
			}
		);
	}
	get_student(this_page);


	//显示总页数
	show_total_pages();
	function show_total_pages(){
		$.ajaxSetup({ async :false});
		$.post("GetPageSize.api",
			{
				object:"student",
				pagenum:15
			},
			function(data){
				var list=eval("("+data+")");
				pages=Math.ceil(list[0].pagesize/15);
				$(".pagenav span").text("共"+pages+"页");
			}
		);
	}

	//页码处理函数
	show_pages(1);
	function show_pages(this_page){
	    $(".footer_num").remove();//清除原来的页数列表
		var str="";
		if(pages>=5){
			if(this_page>2&&this_page<pages-1){//当所选页数是第3-倒数第3页时
				for(var i=parseInt(this_page)-2;i<=parseInt(this_page)+2;i++){
					str+="<a class=footer_num>"+i+"</a>";
				}
			}
			else if(this_page==1||this_page==2){//当所选页数是第1~2页时
				for(var i=1;i<=5;i++){
					str+="<a class=footer_num>"+i+"</a>";
				}
			}
			else if(this_page==pages-1||this_page==pages){//当所选页数是最后两页时
				for(var i=pages-4;i<=pages;i++){
					str+="<a class=footer_num>"+i+"</a>";
				}
			}
		}
		//如果页数不足5页
		else{
			for(var i=1;i<=pages;i++) str+="<a class=footer_num>"+i+"</a>";
		}
		$("#first_page").after(str);//写入新的页数序号
		if(this_page==1) $(".footer_num:eq(0)").addClass("footer_num_active");//如果是第一页，背景设置为active
	}


	//页码样式处理函数
	function page_select(this_page){
	    $(".footer_num").removeClass("footer_num_active");//清除原有的active样式
		show_pages(this_page);//把选择的页数传给页码处理函数
	    if(this_page>2&&this_page<pages-1){$(".footer_num:eq(2)").addClass("footer_num_active");}
	    else if(this_page==1){$(".footer_num:eq(0)").addClass("footer_num_active");}
	    else if(this_page==2){$(".footer_num:eq(1)").addClass("footer_num_active");}
	    else if(this_page==3){$(".footer_num:eq(2)").addClass("footer_num_active");}
	    else if(this_page==4){$(".footer_num:eq(3)").addClass("footer_num_active");}
	    else if(this_page==pages-1){$(".footer_num:eq(3)").addClass("footer_num_active");}
	    else if(this_page==pages){$(".footer_num:eq(4)").addClass("footer_num_active");}
		$("tr").remove();//清除原来页码的信息
		get_student(this_page);//显示跳转后页码的信息
	}

    // 页数选取
	$(".pagenav").on('click','.footer_num',function(){
	    $this=$(this);
	    var this_page=$this.text();
	    //选择页数，传参到页码样式处理函数
	    page_select(this_page);
	});
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
	function jump(selected){
		if(selected>pages) {alert("超出最大页数");$(this).val("");}
		if(selected==""||selected<=0) {alert("请输入正确页数");$(this).val("");}
		else if(selected>0&&selected<=pages) page_select(selected);
	}




	//显示删除学生按钮
	// var i=2;
	// $(".delete").on("click",function(){
	// 		$(".info_select label").toggleClass("show_visible");
	// 		$(".search_and_delete input").toggleClass("show_visible");
	// 		$(".search_student").removeClass("show_display");
	// 	i++;	
	// });

	//点击改变选中状态
	$("#student_info_list").on("click",".info_select label",function(e){
		e.stopPropagation();
		$(this).toggleClass("is_checked");
	});

	//删除学生	
	$("#delete").on("click",function(){
		var i=0;
		var a=$(":checked").parent().next().next();
		var total_length=$(":checked").parent().parent().length;
		if(total_length!==0){
			for(i=0;i<total_length;i++){
				var id=a[i].innerText;
				$.post("DeleteUser.api",{userid:id},function(data){
					if(data=="ok"){
						$(":checked").parent().parent()[0].remove();
					}
					else if(data=="error") alert("删除失败");
				});
			}
		}
		else alert("请选择要删除的学生");
		var len=$("tr").length;
		if(!len){
			var p=$(".footer_num_active").text();
			p--;
			page_select(p);
			show_total_pages();
		}
	});


	//点击出现查找学生对话框//
	function show_search_dialog(){
		$(".search_student").addClass("show_display");
		$(".search_and_delete input").removeClass("show_visible");
		$(".back").addClass("back_show");
		$(".back").css("height",(parseInt($("table").css("height"))+50)+"px");
	}
	$(".search").click(show_search_dialog);
	//点击关闭查找对话框
	function close_dialog(){
		$(".search_student").removeClass("show_display");
		$(".back").removeClass("back_show");
	}
	$(".close").click(close_dialog);
	//查找学生
	$("#submit_student_info").on("click",function(){
		var user=$("#student_name").val();
		$.post("SearchStudent.api",{"user":user},function(data){
			if(data=="nouser") {alert("没有该用户");}
			else{
				$("table").empty();
				show_student_info(data);
				close_dialog();
				$(".pagenav").hide();
			    // $(".footer_num").remove();//清除原来的页数列表
			    // $("#first_page").after("<a class=footer_num>1</a>");
			    // $(".pagenav span").text("共1页");
			}
		});
	});





	//显示查找到的学生
	function show_student_info(data){
		var list=eval("("+data+")");
		for(var i=0;i<list.length;i++){
			$("table").append("<tr>" +
				"<td class=\"info_select\"><label for=\"info_select_"+i+"\"></label><input type=\"checkbox\" id=\"info_select_"+i+"\"></td>" +
				"<td class=\"info_name\">"+list[i].username+"</td>" +
				"<td class=\"info_code\">"+list[i].userid+"</td>" +
				"<td class=\"info_tel\">"+list[i].tel+"</td>" +
				"<td class=\"info_major\">"+list[i].major+"</td>" +
				"<td class=\"info_grade\">"+list[i].grade+"</td>" +
				"<td class=\"info_class\">"+list[i].classes+"</td>" +
				"</tr>");
			var oHeight=$(".info_major:last").css("height");
			if(oHeight!=="30px") {$("table tr:last").css("height",oHeight);}
		}
	}


	function doUpload() {
	     var formData = new FormData($( "#upload" )[0]);
	     $.ajax({
	          url: 'upload' ,
	          type: 'POST',
	          data: formData,
	          async: false,
	          cache: false,
	          contentType: false,
	          processData: false,
	          success: function (data) {
	              alert("上传成功");
	          },
	          error: function (returndata) {
	              alert(returndata);
	          }
	     });
	}
	$("#select_file").change(doUpload);

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





});


	







