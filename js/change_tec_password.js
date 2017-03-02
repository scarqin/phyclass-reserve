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
    // 页面跳转
    $("#operation").click(function() {
        $(".handle_page").show();
        $(".change_all_imfo").hide();
        location.href = "Teacher.html";
    });
    $("#Change_info").click(function() {
        location.href = "change_tec_info.html";
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
    // 修改密码的重置
    $("#cancle").click(function() {
        $("#old_pass_txt").val("");
        $("#new_pass_txt").val("");
        $("#confirm_pass_txt").val("");
    });

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

    // 修改密码
    $("#confirm").click(function() {
        var new_pass = $("#new_pass_txt").val();
        var old_pass = $("#old_pass_txt").val();
        var confirm_pass = $("#confirm_pass_txt").val();

        if (new_pass != confirm_pass) {
            alert("两次输入的密码不同");
        } else if (new_pass == confirm_pass) {
            if (old_pass == "") {
                alert("请输入原密码！");
            } else if (old_pass != "") {
                if ($("#weak").css("background-color") == "rgb(249, 119, 129)") {
                    console.log(200000)
                    $.ajax({
                        url: "ChangePassword.api",
                        type: "POST",
                        data: {
                            "oldpassword": old_pass,
                            "newpassword": new_pass,
                        },
                        success: function(data) {
                            console.log(data)
                            if (data == 1) {
                                if (old_pass != new_pass) {
                                    alert("修改成功");
                                    location.href = "change_tec_password.html";
                                } else if (old_pass == new_pass) {
                                    alert("新旧密码相同，密码未修改");
                                }
                            } else if (data == 4) {
                                alert("旧密码错误");
                            } else if (data == "error") {
                                alert("修改失败");
                            }
                        }
                    });
                } else alert("密码长度为6~16位，至少包含数字、字母、特殊符号中的两类，字母区分大小写");
            }
        }
    });
});

function enterSave(evt) {
    evt = (evt) ? evt : ((window.event) ? window.event : ""); //兼容IE和Firefox获得keyBoardEvent对象
    var key = evt.keyCode ? evt.keyCode : evt.which; //兼容IE和Firefox获得keyBoardEvent对象的键值
    if (key == 13) {
        SaveMessage();
    }
}


//CharMode函数       
//测试某个字符是属于哪一类.       
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
    if (sPW.length < 6)
        return 0; //密码太短       
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //测试每一个字符的类别并统计一共有多少种模式.       
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}
//pwStrength函数       
//当用户放开键盘或密码输入框失去焦点时，根据不同的级别显示不同的颜色       
function pwStrength(pwd) {
    N_color = "#999";
    O_color = "#eeeeee";
    L_color = "rgb(249, 119, 129)";
    M_color = "rgb(249, 119, 129)";
    H_color = "rgb(249, 119, 129)";
    if (pwd == null || pwd == '') {
        Lcolor = Mcolor = Hcolor = N_color;
    } else {
        S_level = checkStrong(pwd);
        switch (S_level) {
            case 0:
                Lcolor = Mcolor = Hcolor = N_color;
                break;
            case 1:
                Lcolor = L_color;
                Mcolor = Hcolor = O_color;
                break;
            case 2:
                Lcolor = Mcolor = M_color;
                Hcolor = O_color;
                break;
            default:
                Lcolor = Mcolor = Hcolor = H_color;
        }
    }
    document.getElementById("weak").style.background = Lcolor;
    document.getElementById("middle").style.background = Mcolor;
    document.getElementById("strong").style.background = Hcolor;
    return;
}