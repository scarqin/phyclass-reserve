//JavaScript Document
function overimg(obj)
{  var oDiv = document.getElementById(obj);
	//alert(oDiv.offsetWidth);
	if(oDiv.offsetWidth=='232')
	{
	  oDiv.style.background='url(images/select.png)';
	  oDiv.style.color='#fff'; 
	  oDiv.style.fontWeight='bold';
	}
	else
	{
	  oDiv.style.background='#71cd8c';
	  oDiv.style.color='#fff'; 
	  oDiv.style.fontWeight='bold';
	}
}
$(document).ready(function()
{   var DAYTIME;
    var DAYID;
    var CLASSNUM=0,phynum=0;
    var reservenum=1;
	$.ajax({
		url:"GetSession.api",
		type:"POST",
		success: function(data){
			if(data==0)
				{alert("您的账号未登录，请重新登录");
				location.href="login.html";}				
			},
			error:function(e,f,g){
				alert(e);
				alert(f);
				alert(g);
			}
		})
	$.ajax({
			url:"GetSubject.api",
			type:"POST",
			success: function(data){
                var obj=JSON.parse(data);
                var str;
                CLASSNUM=0;
               for(var i=0;i<obj.length;i++)
            	   {
            	   str=$("<div class='list_list' id="+i+" value="+obj[i].subjectid+">"+obj[i].subject+"</div>");
            	   CLASSNUM++;
            	   $(".list_main").append(str);
            	   }
			},
			error:function(e,f,g){
				alert(e);
				alert(f);
				alert(g);
			}
		})
    $("#exit").click(function(){
		$.ajax({
		url:"Logout.api",
		type:"POST",
		success: function(data){
			location.href="login.html";
			},
			error:function(e,f,g){
				alert(e);
				alert(f);
				alert(g);
			}
		})
	});
	function MymessageIn(phy,time){
		$("#mes_phy").val(phy).attr("disabled", true);
		$("#mes_time").val(time).attr("disabled", true);
		$(".My_message").show().fadeIn();
		$(".Message_head").show().addClass("UpIn");
		setTimeout(function(){$("#phy_name").show().addClass("UpIn");},50);
		setTimeout(function(){$("#phy_time").show().addClass("UpIn");},350);
		setTimeout(function(){$("#phy_mes").show().addClass("UpIn");},650);
		setTimeout(function(){$("#Message_btn").show().addClass("DownIn");},800);
		$("#re_time_btn").unbind(MymessageIn);
	}
	function MymessageOut(obj){
		$(".My_message").hide().fadeOut();
		$(".Message_head,#phy_name,#phy_time,#phy_mes").fadeOut().removeClass("UpIn");
        setTimeout(hidemes(),50);
        $(obj).unbind("click",MymessageOut);
	}
	function hidemes(){
		$("#Message_btn").fadeOut().removeClass("DownIn");
		$("#phy_mess").val(" ");
	} 
	function ImprovedataIn(){		
		$(".Improvedata_area").show();
		$(".Improvedata_head").show().addClass("leftin");
		setTimeout(function(){$("#nam").show().addClass("leftin");},50);
		setTimeout(function(){$("#num").show().addClass("leftin");},100);
		setTimeout(function(){$("#gra").show().addClass("leftin");},300);
		setTimeout(function(){$("#col").show().addClass("leftin");},600);
		setTimeout(function(){$("#maj").show().addClass("leftin");},900);
		setTimeout(function(){$("#cla").show().addClass("leftin");},1200);
		setTimeout(function(){$(".Improvedata_btn").fadeIn("slow");},1400);
		}
	function ImprovedataOut(){
		$(".Improvedata_area").fadeOut().removeClass("leftin");
		$(".Improvedata_head").fadeOut().removeClass("leftin");
		$("#nam").fadeOut().removeClass("leftin");
		$("#num").fadeOut().removeClass("leftin");
		$("#gra").fadeOut().removeClass("leftin");
		$("#col").fadeOut().removeClass("leftin");
		$("#maj").fadeOut().removeClass("leftin");
		$("#cla").fadeOut().removeClass("leftin");
		$(".Improvedata_btn").fadeOut().removeClass("leftin");
		}
	
	function MyreserveIn(){
		$("#firstline").show();
		$(".Myreserve_area").show();
		$(".Myreserve_head").show().addClass("easyUpIn");
		setTimeout(function(){$(".Myserve_list").show().addClass("easyUpIn");},500);
		setTimeout(function(){$(".Myreserve_main").show().addClass("easyUpIn");},800);
		setTimeout(function(){$(".Myreserve_foot").show().addClass("easyUpIn");},1100);
		}
	function MyreserveOut(){
		$(".Myreserve_area").fadeOut().removeClass("easyUpIn");
		$(".Myreserve_head").fadeOut().removeClass("easyUpIn");
		$(".Myserve_list").fadeOut().removeClass("easyUpIn");
		$(".Myreserve_main").fadeOut().removeClass("easyUpIn");
		$(".Myreserve_foot").fadeOut().removeClass("easyUpIn");
		}
	function ChangepwdIn(){		
		$(".Changepwd_area").show();
		$(".Changepwd_head").show().addClass("leftin");
		setTimeout(function(){$("#old").show().addClass("leftin");},500);
		setTimeout(function(){$("#new").show().addClass("leftin");},800);
		setTimeout(function(){$("#ensure").show().addClass("leftin");},1100);
		setTimeout(function(){$(".Changepwd_btn").fadeIn("slow");},1400);
		}
	function ChangepwdOut(){
		$(".Changepwd_area").fadeOut();
		$(".Changepwd_head").fadeOut().removeClass("leftin");
		$("#old").fadeOut().removeClass("leftin");
		$("#new").fadeOut().removeClass("leftin");
		$("#ensure").fadeOut().removeClass("leftin");
		$(".Changepwd_btn").fadeOut().removeClass("leftin");
		}
	function ReserveOut(){
		$("#t1,#t2,#t3,#t4,#t5,#t6,#t7,#t8,#t9,#t10,#t11,#t12,#t13,#t14,#t15,#t16,#t17,#t18,#t19,#t20").hide().fadeOut().removeClass("timeIn");
		$("#reserve_week").html("");
		$(".reserve_time").fadeOut();
		$("#reserve").fadeOut();
		$("#reserve").removeClass("easyLeftIn");
		}
	function ReserveIn(){
		$(".list_list").css("color","#a9a9a9").css("background-color","#fff");
		$("#reserve").css('display','block');
		$("#re_time").html("");
		$("#reserve").show().addClass("easyLeftIn");
		setTimeout(function(){$(".reserve_time").fadeIn("slow");},500);
	}
	$("#td1").click(function(){
		if($(".Changepwd_area").css('display')=='block')
		ChangepwdOut();
		if($("#reserve").css('margin-left')=='0px')
		ReserveOut();
		if($(".Myreserve_area").css('display')=='block')
		MyreserveOut();
		if($(".My_message").css('display')=='block')
		MymessageOut(this);
			$.ajax({
			url:"GetUserInfo.api",
			type:"POST",
			success: function(data){
				var obj=eval("("+data+")");
				UserId=obj.userid;
				$("#username").val(obj.username);
				$("#usernum").val(obj.tel);
				$("#grade").val(obj.grade);
				$("#college").val(obj.college);
				$("#major").val(obj.major);
				$("#classes").val(obj.classes);
				},
				error:function(e,f,g){
					alert(e);
					alert(f);
					alert(g);
				}
			})
		ImprovedataIn();		
		})
	$("#info_reset").click(function(){
		$.ajax({
			url:"GetUserInfo.api",
			type:"POST",
			success: function(data){
				var obj=eval("("+data+")");
				UserId=obj.userid;
				$("#username").val(obj.username);
				$("#usernum").val(obj.tel);
				$("#grade").val(obj.grade);
				$("#college").val(obj.college);
				$("#major").val(obj.major);
				$("#classes").val(obj.classes);
				},
				error:function(e,f,g){
					alert(e);
					alert(f);
					alert(g);
				}
			})		
	})	
	$("#info_save").click(function(){
		var UserName=$("#username").val();
		var UserTel=$("#usernum").val();
		var UserCollege=$("#college").val();
		var UserMajor=$("#major").val();
		var UserGrade=$("#grade").val();
		var UserClasses=$("#classes").val();
		$("#t1,#t2,#t3,#t4,#t5,#t6,#t7,#t8,#t9,#t10,#t11,#t12,#t13,#t14,#t15,#t16,#t17,#t18,#t19,#t20").hide().fadeOut().removeClass("timeIn");
		$.ajax({
				url:"FinishInfo.api",
				type:"POST",
				data:{"userid":UserId,"username":UserName,"tel":UserTel,"college":UserCollege,"major":UserMajor,"grade":UserGrade,"classes":UserClasses},
				success: function(data){
					alert("修改成功");
					},
					error:function(e,f,g){
						alert(e);
						alert(f);
						alert(g);
					}
				})
			});
	$("#td2").click(function(){
	if($(".Changepwd_area").css('display')=='block')
	ChangepwdOut();
	if($(".Improvedata_area").css('display')=='block');
	ImprovedataOut();
	if($(".Myreserve_area").css('display')=='block')
	MyreserveOut();
	if($(".My_message").css('display')=='block')
	MymessageOut(this);
	ReserveIn();
	reservenum=1;
		$(".list_list").click(function(){
			$(".reserve_timeweek_next,.reserve_timeweek_pre,#re_time_btn").unbind('click');
			$("#t1,#t2,#t3,#t4,#t5,#t6,#t7,#t8,#t9,#t10,#t11,#t12,#t13,#t14,#t15,#t16,#t17,#t18,#t19,#t20").hide().fadeOut().removeClass("timeIn");
			$("#reserve_week").html("");
			$(".list_list").css("color","#a9a9a9").css("background-color","#fff");
			$(this).css("color","#fff").css("background-color","#71cd8c");
			var self=this;
			var j=0;
			gettime(self,j);
			    $(".reserve_timeweek_next").click(function(){
				$("#t1,#t2,#t3,#t4,#t5,#t6,#t7,#t8,#t9,#t10,#t11,#t12,#t13,#t14,#t15,#t16,#t17,#t18,#t19,#t20").hide().removeClass("timeIn");
				j++;
				gettime(self,j);
			})
			function gettime(self,j){
					   var subjectID=parseInt($(self).attr('value'));
			                $.ajax({
			        		    url:"GetWeek.api",
			        		    type:"POST",
			        		    data:{"subjectid":subjectID},
			        		    success: function(data){
			        			var getweek=eval("("+data+")");
			                    if((j+1)>getweek.length)
			                    	{
			                    	alert("已到达最后一周");
			                    	$(".reserve_timeweek_pre").click();
			                    	}
			        			$("#reserve_week").html("第 "+getweek[j].weeks+" 周").fadeIn();
			                    $.ajax({
			                		url:"GetDay.api",
			                		type:"POST",
			                		data:{"weekid":getweek[j].weekid},
			                		success: function(data){
			                			var getday=eval("("+data+")");
			                			//alert(data);
			                			for(var m=0;m<getday.length;m++)
			                				if(getday[m].subjectid==subjectID)
			                					{
			                					if(getday[m].day=='1')
			                					{
			                					(parseInt(getday[m].t1)>=0&&parseInt(getday[m].t1)<parseInt(getday[m].maxnum))?$("#t1").attr("value",getday[m].id).show().addClass("timeIn"):$("#t1").hide();
			                					(parseInt(getday[m].t2)>=0&&parseInt(getday[m].t2)<parseInt(getday[m].maxnum))?$("#t2").attr("value",getday[m].id).show().addClass("timeIn") :$("#t2").hide();
			                					(parseInt(getday[m].t3)>=0&&parseInt(getday[m].t3)<parseInt(getday[m].maxnum))?$("#t3").attr("value",getday[m].id).show().addClass("timeIn") :$("#t3").hide();
			                					(parseInt(getday[m].t4)>=0&&parseInt(getday[m].t4)<parseInt(getday[m].maxnum))?$("#t4").attr("value",getday[m].id).show().addClass("timeIn") :$("#t4").hide();                   						
			                					}
			                					if(getday[m].day=='2')
			            						{
			            						(parseInt(getday[m].t1)>=0&&parseInt(getday[m].t1)<parseInt(getday[m].maxnum))?$("#t5").attr("value",getday[m].id).show().addClass("timeIn"):$("#t5").hide();
			            						(parseInt(getday[m].t2)>=0&&parseInt(getday[m].t2)<parseInt(getday[m].maxnum))?$("#t6").attr("value",getday[m].id).show().addClass("timeIn") :$("#t6").hide();
			            						(parseInt(getday[m].t3)>=0&&parseInt(getday[m].t3)<parseInt(getday[m].maxnum))?$("#t7").attr("value",getday[m].id).show().addClass("timeIn") :$("#t7").hide();
			            						(parseInt(getday[m].t4)>=0&&parseInt(getday[m].t4)<parseInt(getday[m].maxnum))?$("#t8").attr("value",getday[m].id).show().addClass("timeIn") :$("#t8").hide();                   						
			            						}
			                					if(getday[m].day=='3')
			            						{
			            						(parseInt(getday[m].t1)>=0&&parseInt(getday[m].t1)<parseInt(getday[m].maxnum))?$("#t9").attr("value",getday[m].id).show().addClass("timeIn"):$("#t9").hide();
			            						(parseInt(getday[m].t2)>=0&&parseInt(getday[m].t2)<parseInt(getday[m].maxnum))?$("#t10").attr("value",getday[m].id).show().addClass("timeIn") :$("#t10").hide();
			            						(parseInt(getday[m].t3)>=0&&parseInt(getday[m].t3)<parseInt(getday[m].maxnum))?$("#t11").attr("value",getday[m].id).show().addClass("timeIn"):$("#t11").hide();
			            						(parseInt(getday[m].t4)>=0&&parseInt(getday[m].t4)<parseInt(getday[m].maxnum))?$("#t12").attr("value",getday[m].id).show().addClass("timeIn") :$("#t12").hide();                   						
			            						}
			                					if(getday[m].day=='4')
			            						{
			            						(parseInt(getday[m].t1)>=0&&parseInt(getday[m].t1)<parseInt(getday[m].maxnum))?$("#t13").attr("value",getday[m].id).show().addClass("timeIn"):$("#t13").hide();
			            						(parseInt(getday[m].t2)>=0&&parseInt(getday[m].t2)<parseInt(getday[m].maxnum))?$("#t14").attr("value",getday[m].id).show().addClass("timeIn") :$("#t14").hide();
			            						(parseInt(getday[m].t3)>=0&&parseInt(getday[m].t3)<parseInt(getday[m].maxnum))?$("#t15").attr("value",getday[m].id).show().addClass("timeIn") :$("#t15").hide();
			            						(parseInt(getday[m].t4)>=0&&parseInt(getday[m].t4)<parseInt(getday[m].maxnum))?$("#t16").attr("value",getday[m].id).show().addClass("timeIn") :$("#t16").hide();                   						
			            						}
			                					if(getday[m].day=='5')
			            						{
			            						(parseInt(getday[m].t1)>=0&&parseInt(getday[m].t1)<parseInt(getday[m].maxnum))?$("#t17").attr("value",getday[m].id).show().addClass("timeIn"):$("#t17").hide();
			            						(parseInt(getday[m].t2)>=0&&parseInt(getday[m].t2)<parseInt(getday[m].maxnum))?$("#t18").attr("value",getday[m].id).show().addClass("timeIn") :$("#t18").hide();
			            						(parseInt(getday[m].t3)>=0&&parseInt(getday[m].t3)<parseInt(getday[m].maxnum))?$("#t19").attr("value",getday[m].id).show().addClass("timeIn") :$("#t19").hide();
			            						(parseInt(getday[m].t4)>=0&&parseInt(getday[m].t4)<parseInt(getday[m].maxnum))?$("#t20").attr("value",getday[m].id).show().addClass("timeIn") :$("#t20").hide();                   						
			            						}
			                					
			                					}
			                			},
			                			error:function(e,f,g){
			                				alert(e);
			                				alert(f);
			                				alert(g);
			                			}
			                		})       		    
			        			},
			        			error:function(e,f,g){
			        				alert(e);
			        				alert(f);
			        				alert(g);
			        			}
			        		}) 	        			
				}
			$(".reserve_timeweek_pre").click(function(){
				if(j>0)
				{
			    $("#t1,#t2,#t3,#t4,#t5,#t6,#t7,#t8,#t9,#t10,#t11,#t12,#t13,#t14,#t15,#t16,#t17,#t18,#t19,#t20").hide().fadeOut().removeClass("timeIn");
				j--;
				gettime(self,j);
				} 
				else
					alert("此为可预订的首周~");
				})
			$("#Message_sub").click(function(){
				var Comment=$("#phy_mess").val();
				if(reservenum==1){
				reservenum++;
                $.ajax({
					url:"Apply.api",
					type:"POST",
					data:{"comment":Comment,"id":DAYID,"time":DAYTIME},
					success: function(data){
						if(data==1)
							{
							alert("添加成功!");
							}
						if(data==2)
							{
							alert("您已提交过申请，请耐心等候或前往我的预定取消上次申请!");
							}
						if(data==0)
							alert("系统繁忙，请稍后再试!");
						},
						error:function(){
							if(data==0)
								alert("系统繁忙，请稍后再试!");
						}
					})
			}
			})
			$("#re_time_btn").click(function(){
				if($("#re_time").html()!='')
				{
				ReserveOut();
				MymessageIn($(self).html(),$("#re_time").html());
				}
			})
	   });
	});
	$("#td3").click(function(){
		if($(".Improvedata_area").css('display')=='block')
		ImprovedataOut();
		if($("#reserve").css('margin-left')=='0px')
		ReserveOut();
		if($(".Myreserve_area").css('display')=='block')
		MyreserveOut();
		if($(".My_message").css('display')=='block')
		MymessageOut(this);
		ChangepwdIn();		
		})
	$("#new_pwd").blur(function(){
	if($("#new_pwd").val().length<6)
		layer.changepwdTips('新密码应大于6位',"#pwd_strength1");
	})
	$("#ensure_pwd").blur(function(){
	if($("#ensure_pwd").val()!=$("#new_pwd").val())
		layer.changepwdTips('两次输入的密码不一致，请重新输入',"#ensure_pwd");
	})
	$("#pwd_save").click(function(){
		if($("#new_pwd").val().length<6)
		{
		layer.changepwdTips('新密码应大于6位',"#pwd_strength1");
		$("#new_pwd").focus();
		}
		else if($("#ensure_pwd").val()!=$("#new_pwd").val())
			{
			layer.changepwdTips('两次输入的密码不一致，请重新输入',"#ensure_pwd");
			$("#ensure_pwd").focus();
			}
		else
			{
			var OldPassword=$("#old_pwd").val();
			var NewPassword=$("#new_pwd").val();
			$.ajax({
			url:"ChangePassword.api",
			type:"POST",
			data:{"oldpassword":OldPassword,"newpassword":NewPassword},
			success: function(data){
				if(data==1)
				{
				alert("修改成功");
				location.href="student.html";
				}
				if(data==4)
					layer.changepwdTips('密码不正确',"#old_pwd");
				if(data==0)
					alert("系统繁忙，请稍后再试！");
				},
				error:function(e,f,g){
					alert(e);
					alert(f);
					alert(g);
				}
			})			
			}		
	})
	layer.changepwdTips = function(msg, obj){
	    $.layer({
	        type: 4,
	        shade: [0.1, "#fff"],
	        bgcolor: '',
	        shadeClose: true,
	        time: 2,
	        closeBtn: [0],
	        tips: {
	            msg: msg,
	            guide: 2,
	            style: ['background-color:; color:#f41f1f;', ''],
	            maxWidth:150,
	            isGuide: true,
	            follow: obj //吸附目标选择器
	        }, success: function(layero){
	            layero.find('.xubox_tips').css('padding-right', '10px').css('margin-top', '-5px').css('text-align', 'center').css('font-size','14px');
	        }
	    });
	};
	$("#td4").click(function(){
		var waitting;
		$("#Message_sub").unbind('click');
		if($(".Changepwd_area").css('display')=='block')
		ChangepwdOut();
		if($("#reserve").css('margin-left')=='0px')
		ReserveOut();
		if($(".Improvedata_area").css('display')=='block')
		ImprovedataOut();
		if($(".My_message").css('display')=='block')
		MymessageOut(this);
		$("#f_phy").html('');
		$("#f_room").html('');
		$("#f_mes").html('');
		$("#f_status").html('');
			$("#s_phy").html('');
            $("#s_room").html('');
            $("#s_mes").html('');
            $("#s_status").html('');
			$("#t_phy").html('');
			$("#t_room").html('');
            $("#t_mes").html('');
            $("#t_status").html('');
		$.ajax({
			url:"GetSubject.api",
			type:"POST",
			success: function(data){
                var obj=eval("("+data+")");
                $.ajax({
        			url:"GetApplicationS.api",
        			type:"POST",
        			success: function(data){
        				var reserve=eval("("+data+")");
        				var sub_name=new Array(reserve.length);
        				var sub_room=new Array(reserve.length);
        				for(var i=0;i<reserve.length;i++)
        					for(var j=0;j<obj.length;j++)
        			      	{	
        					   {
        						if(reserve[i].subjectid==obj[j].subjectid)
        							{
        							sub_room[i]=obj[j].room;
        							sub_name[i]=obj[j].subject;
        							break;
        							}							
        					   }
        			        }
        				$("#f_phy").html(sub_name[0]);
        				$("#f_room").html("实验三号楼"+sub_room[0]);
        				$("#f_mes").html(reserve[0].reply);
        				$(".first").removeClass('Myserve_linetext1 Myserve_linetext2 Myserve_linetext3');
        				reserve[0].status=='waiting'?waitting=reserve[0].applyid:waitting=0;
        				reserve[0].status=='waiting'?$("#f_status").html("<a id='Cancereserve'>未审核(点此取消)</a>"):reserve[0].status=='ok'?$("#f_status").html("已通过"):$("#f_status").html("未通过");
        				reserve[0].status=='waiting'?$(".first").addClass('Myserve_linetext1'):reserve[0].status=='ok'?$(".first").addClass('Myserve_linetext0'):$(".first").addClass('Myserve_linetext2');
           				if(reserve.length>1)
        				{
        					$("#s_phy").html(sub_name[1]);
                            $("#s_room").html("实验三号楼"+sub_room[1]);
                            $("#s_mes").html(reserve[1].reply);
                            $(".second").removeClass('Myserve_linetext1 Myserve_linetext2 Myserve_linetext3');
                            reserve[1].status=='waiting'?$("#s_status").html("<a id='Cancereserve'>未审核(点此取消)</a>"):reserve[1].status=='ok'?$("#s_status").html("已通过"):$("#s_status").html("未通过");
                            reserve[1].status=='waiting'?$(".second").addClass('Myserve_linetext1'):reserve[1].status=='ok'?$(".second").addClass('Myserve_linetext0'):$(".second").addClass('Myserve_linetext2');          				
        				}
        				if(reserve.length>2)
        				{
        					$("#t_phy").html(sub_name[2]);
        					$("#t_room").html("实验三号楼"+sub_room[2]);
                            $("#t_mes").html(reserve[2].reply); 
                            $(".thred").removeClass('Myserve_linetext1 Myserve_linetext2 Myserve_linetext3');
                            reserve[2].status=='waiting'?$("#t_status").html("<a id='Cancereserve'>未审核(点此取消)</a>"):reserve[2].status=='ok'?$("#t_status").html("已通过"):$("#t_status").html("未通过");		   
            				reserve[2].status=='waiting'?$(".thred").addClass('Myserve_linetext1'):reserve[2].status=='ok'?$(".thred").addClass('Myserve_linetext0'):$(".thred").addClass('Myserve_linetext2');            		      
        				}                                               
        		},
        				error:function(e,f,g){
        					alert("系统繁忙，请稍后再试");
        					location.href="login.html";
        				}
        			 
        			});
        			
			},
				error:function(e,f,g){
					alert(e);
					alert(f);
					alert(g);
				}
			})
		MyreserveIn();
	$("#f_status").click(function(){
			   if(waitting!=0)
				{
				if(confirm("确定取消该课程申请？"))
				{$.ajax({
				url:"CancelApplication.api",
				type:"POST",
				data:{"applyid":waitting},
				success: function(data){
					if(data==1)
						{
						$("#td4").click();
						$("#f_status").unbind('click');
						}
					else
						{alert("系统繁忙，请稍后再试!");}
					
					},
					error:function(e,f,g){
						alert(e);
						alert(f);
						alert(g);
					}
				})
				}
			  }
			})
})
	$("#phy_next").click(function(){
		if(phynum<(CLASSNUM-5))
		{
		phynum+=5;	
		$(".list_main").animate({"margin-top":"-=325px"});
		}
	});
	$("#phy_pre").click(function(){
		if(phynum>0)
		{
		phynum-=5;
		$(".list_main").animate({"margin-top":"+=325px"});
		}	
	});
	$("#t1,#t5,#t9,#t13,#t17").click(function(){
		DAYTIME="t1";
		DAYID=$(this).attr('value');
	})
	$("#t2,#t6,#t10,#t14,#t18").click(function(){
		DAYTIME="t2";
		DAYID=$(this).attr('value');
	})
	$("#t3,#t7,#t11,#t15,#t19").click(function(){
		DAYTIME="t3";
		DAYID=$(this).attr('value');
	})
	$("#t4,#t8,#t12,#t16,#t20").click(function(){
		DAYTIME="t4";
		DAYID=$(this).attr('value');
	})
	$("#t1,#t2,#t3,#t4").click(function(){
		$(this).addClass("animation");
		var txt=$("#reserve_week").html();
		var t=$(this).html();
		 $("#re_time").html(txt+'-'+'星期一'+'('+t+')');
		});
	$("#t5,#t6,#t7,#t8").click(function(){
		var txt=$("#reserve_week").html();
		var t=$(this).html();
		 $("#re_time").html(txt+'-'+'星期二'+'('+t+')');
		});
	$("#t9,#t10,#t11,#t12").click(function(){
		var txt=$("#reserve_week").html();
		var t=$(this).html();
		 $("#re_time").html(txt+'-'+'星期三'+'('+t+')');
		});
	$("#t13,#t14,#t15,#t16").click(function(){
		var txt=$("#reserve_week").html();
		var t=$(this).html();
		 $("#re_time").html(txt+'-'+'星期四'+'('+t+')');
		});
	$("#t17,#t18,#t19,#t20").click(function(){
		var txt=$("#reserve_week").html();
		var t=$(this).html();
		 $("#re_time").html(txt+'-'+'星期五'+'('+t+')');
		})
//密码强度验证
//CharMode函数 
//测试某个字符是属于哪一类.
$(function () {
    function CharMode(iN) {
        if (iN >= 48 && iN <= 57) //数字 
            return 1;
        if (iN >= 65 && iN <= 90) //大写字母 
            return 2;
        if (iN >= 97 && iN <= 122) //小写 
            return 4;
        else
            return 8; //特殊字符 
    }
    //bitTotal函数 
    //计算出当前密码当中一共有多少种模式 
    function bitTotal(num) {
        modes = 0;
        for (i = 0; i < 4; i++) {
            if (num & 1) modes++;
            num >>>= 1;
        }
        return modes;
    }
    //checkStrong函数 
    //返回密码的强度级别 
    function checkStrong(sPW) {
        Modes = 0; //输入的字符种类有几种如：a1两种aA_d三种
        for (i = 0; i < sPW.length; i++) {
            //测试每一个字符的类别并统计一共有多少种模式. 
            Modes |= CharMode(sPW.charCodeAt(i));
        }
        Modes = bitTotal(Modes); //由几种字符组成
        var pwdLength = sPW.length; //密码长度
        var level = 0; //密码强度级别
        if (pwdLength < 8 && Modes <= 2)
            level = 0;
        if ((pwdLength < 10 && Modes >= 3) || (pwdLength >= 8 && Modes == 2))
            level = 1;
        if (pwdLength >= 10 && Modes >= 3)
            level = 2;
        return level;
    }
    //pwStrength函数 
    //根据pwd强度改变css样式
    function pwStrength(pwd) {
        var $strength_L1 = $("#pwd_strength1");
		var $strength_L2 = $("#pwd_strength2");
		var $strength_L3 = $("#pwd_strength3");
		var left=$("#pwd_strength1").width();
		var i=1;
        if (pwd == null || pwd == '') {
                    $strength_L1.removeClass("security1");
				    $strength_L1.addClass("low_len");
        }
        else {
            S_level = checkStrong(pwd);
            switch (S_level) {

case 0: //低
                    {$strength_L1.removeClass("low_len");
					 $strength_L1.removeClass("security2");
					 $strength_L1.removeClass("security3");	
					 $strength_L2.removeClass("security2");
					 $strength_L2.removeClass("security3");
					 $strength_L3.removeClass("security3");
					 $strength_L3.removeClass("security2");
					 $strength_L3.removeClass("security1");				 
					 $strength_L1.addClass("security1");
					 $strength_L2.addClass("low_len");
					 $strength_L3.addClass("low_len");
					break;
					
					}
case 1: //中
                    {$strength_L1.removeClass("security1");
					 $strength_L1.removeClass("security3");
					 $strength_L2.removeClass("low_len");
					 $strength_L2.removeClass("security1");
					 $strength_L2.removeClass("security3");
					 $strength_L3.removeClass("security3");
					 $strength_L3.addClass("low_len");
					 $strength_L1.addClass("security2");
					 $strength_L2.addClass("security2");
                    break;}
case 2: //高
                    {$strength_L1.removeClass("security1");
					 $strength_L1.removeClass("security2");
					 $strength_L2.removeClass("security1");
					 $strength_L2.removeClass("security2");
					 $strength_L3.removeClass("low_len");
					 $strength_L1.addClass("security3");
					 $strength_L2.addClass("security3");
					 $strength_L3.addClass("security3");
                    break;}
default:
                    $strength_L1.addClass("low_len");
					$strength_L2.addClass("low_len");
					$strength_L3.addClass("low_len");
            }
        }
        return;
    }
 //pwd事件触发：当用户放开键盘或密码输入框失去焦点时,根据不同的级别显示不同的颜色
   $("#new_pwd").keyup(function () {
		pwStrength(this.value);
    })
   $("#pwd_new").blur(function () {
		pwStrength(this.value);
    })

});
});