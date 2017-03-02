$(document).ready(function(){
        // 用户名
         $(".user_txt").focus(function(event){
    	    if(event.target.value=="username/用户名")
    	    {
                 $(this).val("");
            }     
            if(event.target.value!='username/用户名')
            {
                $(this).css('color','#333333');
            }
        });
         
         $(".user_txt").blur(function(event){
         	 if(event.target.value=="")
         	  {
         		$(this).val("username/用户名");
                $(this).css('color','rgba(155, 148, 148, 0.5)');
         	  }	
         });

         // 密码
         $(".pass_txt").focus(function(event){
            if(event.target.value=="password/密码"){
            	$(this).val("");
            	this.type="password";
            }
            if(event.target.value!='password/密码')
            {
                $(this).css('color','#333333');
            }
         });

         $(".pass_txt").blur(function(event){
            if(event.target.value==""){
            	this.type="text";
            	$(this).val("password/密码");
                $(this).css('color','rgba(155, 148, 148, 0.5)');
            }
         });
        
         // 下拉列表
         $("#select_down_pic").click(function(){
            $(this).hide();
            $(".select_up").show();
            var timer;
            timer=setInterval(function(){
                  if($('.select').height()>=50)
            {
                clearInterval(timer);
            }
                else{
                $('.select').height($('.select').height()+5);
                    }
            },25);
            $(".li2").fadeIn(200);
            $(".li3").fadeIn(500);
         });
         $(".select_up,.li2,.li3").click(function(){
            var timer;
            timer=setInterval(function(){
                  if($('.select').height()<=20)
            {
                clearInterval(timer);
            }
                else{
                $('.select').height($('.select').height()-5);
                    }
            },25);
            $(".li2").fadeOut(300);
            $(".li3").fadeOut(100);
            $('.select_up').hide();
            $("#select_down_pic").show();
         });
         $(".li2,.li3").click(function(){
            var i=$(this).html();
            $(this).html($(".li1").html());
            $(".li1").html(i);
            $('.select_up_pic').hide();
            $('.select_down_pic').show();
         });
         $('.select').click(function(e){
            e.stopPropagation();
         });
         // 除select区域外点击事件
         $('body').click(function(){
             var timer;
            timer=setInterval(function(){
                  if($('.select').height()<=20)
            {
                clearInterval(timer);
            }
                else{
                $('.select').height($('.select').height()-5);
                    }
            },25);
            $(".li2").fadeOut(300);
            $(".li3").fadeOut(100);
            $('.select_up').hide();
            $("#select_down_pic").show();
         });
        // 获值函数
        jQuery.getvalue=function(value){
            var val=$(value).val();
            return val;
        }
        //回车确定事件
         $("body").keydown(function(event){
            if(event.keyCode=="13")
                {
                    $('.login').click();
                }

         });
         $(".login").click(function(){
           var User=$(".user_txt").val();
            var Pass=$(".pass_txt").val();
            var Type=$(".li1").html();
            if(Type=="学生"){
                type="student";
            }
            else if(Type=="教师"){
                type="teacher";
            }
            else{
                type="admin";
            }
                _login(User,Pass,type);
              });
    });

        function _login(user,pass,type){
           $.ajax({
            url:"Login.api",
            type:"POST",
            data:{"userid":user,"password":pass,"type":type},
            success:function(data){
                if(data=='ok')
                {
                    if(type=="student")
                    {
                        location.href="class.html";
                    }
                    if(type=="teacher")
                    {
                        location.href="Teacher.html";
                    }
                    if(type=="admin")
                    {
                        location.href="admin_student.html";
                    }
                }
                if(data=="nouser")
                {
                    alert("此用户不存在");
                }
                if(data=="wrongpassword")
                {
                    alert("密码错误");
                }
            },
            error:function(e,f,g)
            {
                alert(e);
                alert(f);
                alert(g);
            }
           });
        }


