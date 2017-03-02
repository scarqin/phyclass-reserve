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
    })
    // 审核与资料修改跳转
  $("#Change_info").click(function() {
    $(".change_info_title").css("background", "rgb(221, 37, 50)");
    $(".change_info_title").css("color", "white");
    $(".change_password_title").css("background", "#f1f1f1");
    $(".change_password_title").css("color", "#333333");
    $(".change_password").hide();
    $(".Change_info_page").show();
    // 原始用户名与密码的显示
    $.post("GetUserInfo.api", {}, function(response) {
      $("#name_txt").val(response.username);
      $("#num_txt").val(response.tel);
    }, "json")
    location.href = "change_tec_info.html";
  });
  $("#Change_password").click(function() {
    location.href = "change_tec_password.html";
  });
  window.applyid = "";
  window.comment_status = "";
  $(".handle_page").on('click', '.PASS', function() {
    applyid = $(this).data("id");
    $(".shape").show();
    $(".leave_word_lay").show();
    $(".leave_word_txt").val("");
    comment_status = 'ok';

  });

  $(".handle_page").on('click', '.REJECT', function() {
    applyid = $(this).data("id");
    $(".shape").show();
    $(".leave_word_lay").show();
    $(".leave_word_txt").val("");
    comment_status = 'no';
  });
  $(".leave_word_lay").on("click", ".leave_word_confirm", function() {
    var reply = $(".leave_word_txt").val();
    if (reply.length <= 27) {
      $.post("Reply.api", {
        'applyid': applyid,
        'reply': reply
      }, function(response) {
        if (response == 1) {
          $.post("CheckStatus.api", {
            'applyid': applyid,
            "status": comment_status
          }, function(data) {
            if (data == 1) {
              alert("审核成功");
              $(".shape").hide();
              $(".leave_word_lay").hide();
              var page = 1;
              var pagenum = 7;
              var handling_status = "waiting";
              getApplysum(pagenum, handling_status);
              getApplyContent(page, pagenum, handling_status);
            } else if (data == "error") {
              alert("审核失败");
              $(".shape").hide();
              $(".leave_word_lay").hide();
            }
          });
        } else {
          alert("error");
          $(".shape").hide();
          $(".leave_word_lay").hide();
        }
      });
    } else {
      alert("留言字数限制应小于25个！");
    }
  });

  // 初进页面时待处理数据的显示 
  first_data();
  // 留言框退出事件
  $(".leave_word_lay").on('click', '.leave_word_exit', function(e) {
    e.stopPropagation();
    $(".leave_word_lay").hide();
    $(".shape").hide();
  });

  //退出登录
  $("#exit").click(function() {
    if (confirm("确定退出？")) {
      $.ajax({
        url: "Logout.api",
        type: "POST",
        success: function(response) {
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
  function judge(){
        var max = $(".num").length - 1;
      if ($(".handle_detail").is(":visible")) {
          var status = "waiting";
        } else if ($(".pass_handle_detail").is(":visible")) {
          var status = "ok";
        } else if ($(".reject_handle_detail").is(":visible")) {
          var status = "no";
        }

        $.post("GetApplicationNum.api", {
            "pagenum": 7,
            "status": status
          },
          function(data) {
            var num_sum = Math.ceil(data / 7);
            if($(".num").eq(max).hasClass("num_click")){
            if($(".num").eq(max).html() == num_sum){
               $("#Next_page").removeClass("next_page");
               $("#Next_page").addClass("next_page_unbind");
            }
            else{
            $("#Next_page").addClass("next_page");
            $("#Next_page").removeClass("next_page_unbind");
            }
            }
            else{$("#Next_page").addClass("next_page");
            $("#Next_page").removeClass("next_page_unbind");}
        });
  } 
   $("#Next_page").click(function(){
       judge();
   });
   $(".num").click(function(){
       judge();
   });
   $(".last_page").click(function(){
   console.log(2387498275)
       judge();
   });
  //上下翻页的操作
  $(".footer").on("click",".next_page",function(event) {
    event.stopPropagation();
    var pagenum = 7;
    var Page = 0;
    var max = $(".num").length - 1;
    if ($(".num").eq(max).hasClass("num_click")) {
      if ($(".handle_detail").is(":visible")) {
        var status = "waiting";
        $.post("GetApplicationNum.api", {
            "pagenum": 7,
            "status": status
          },
          function(data) {
            var num_sum = Math.ceil(data / 7);
            if ($(".num").eq(max).html() < num_sum) {
              var max_now = Number($(".num").eq(max).html()) + 1;
              for (var i = max, j = 0; i >= 0; i--, j++) {
                $(".num").eq(i).html(max_now - j);
                Page = Number($(".num").eq(max).html());
                getApplyContent(Page, pagenum, status);
              }
            } else if ($(".num").eq(max).html() == num_sum) {
              Page = $(".num").eq(max).html();
              $(".num").eq(max).addClass("num_click");
              getApplyContent(Page, pagenum, status);
            }


          });
      } else if ($(".pass_handle_detail").is(":visible")) {
        var status = "ok";
        $.post("GetApplicationNum.api", {
            "pagenum": 7,
            "status": status
          },
          function(data) {
            var num_sum = Math.ceil(data / 7);
            if ($(".num").eq(max).html() < num_sum) {
              var max_now = Number($(".num").eq(max).html()) + 1;
              for (var i = max, j = 0; i >= 0; i--, j++) {
                $(".num").eq(i).html(max_now - j);
                Page = Number($(".num").eq(max).html());
                get_has_pass_ApplyedContent(Page, pagenum, status);
              }
            } else if ($(".num").eq(max).html() == num_sum) {
              Page = $(".num").eq(max).html();
              $(".num").eq(max).addClass("num_click");
              get_has_pass_ApplyedContent(Page, pagenum, status);
            }
          });
      } else if ($(".reject_handle_detail").is(":visible")) {
        var status = "no";
        $.post("GetApplicationNum.api", {
            "pagenum": 7,
            "status": status
          },
          function(data) {
            var num_sum = Math.ceil(data / 7);
            if ($(".num").eq(max).html() < num_sum) {
              var max_now = Number($(".num").eq(max).html()) + 1;
              for (var i = max, j = 0; i >= 0; i--, j++) {
                $(".num").eq(i).html(max_now - j);
                Page = Number($(".num").eq(max).html());
                get_has_reject_ApplyedContent(Page, pagenum, status);
              }
            } else if ($(".num").eq(max).html() == num_sum) {
              Page = $(".num").eq(max).html();
              $(".num").eq(max).addClass("num_click");
              get_has_reject_ApplyedContent(Page, pagenum, status);
            }
          });
      }
    }
    for (var i = 3; i >= 0; i--) {
      if ($(".num").eq(i).hasClass("num_click")) {
        $(".num").removeClass("num_click");
        $(".num").eq(i + 1).addClass("num_click");
        Page = Number($(".num").eq(i).html()) + 1;
        if ($(".handle_detail").is(":visible")) {
          var status = "waiting";
          getApplyContent(Page, pagenum, status);
        } else if ($(".pass_handle_detail").is(":visible")) {
          var status = "ok";
          get_has_pass_ApplyedContent(Page, pagenum, status);
        } else if ($(".reject_handle_detail").is(":visible")) {
          var status = "no";
          get_has_reject_ApplyedContent(Page, pagenum, status);
        }
      }

    }
    if ($(".handling_data_list").length) {
      $(".handling_data_list").remove();

    }
    if ($(".pass_data_list").length) {
      $(".pass_data_list").remove();
    }
    if ($(".reject_data_list").length) {
      $(".reject_data_list").remove();
    }
  });


  $(".last_page").click(function(event) {
    event.stopPropagation();
    var Page = "";
    var pagenum = 7;
    if ($(".num").eq(0).hasClass("num_click") && $(".num").eq(0).html() != 1) {
      for (var i = 0; i <= 4; i++) {
        Page = $(".num").eq(0).html() - 1;
        $(".num").eq(i).html(Number($(".num").eq(i).html()) - 1);

        if ($(".handle_detail").is(":visible")) {
          var status = "waiting";
          getApplyContent(Page, pagenum, status);
        } else if ($(".pass_handle_detail").is(":visible")) {
          var status = "ok";
          get_has_pass_ApplyedContent(Page, pagenum, status);
        } else if ($(".reject_handle_detail").is(":visible")) {
          var status = "no";
          get_has_reject_ApplyedContent(Page, pagenum, status);
        }
      }
    } else {
      for (var i = 1; i <= 4; i++) {
        if ($(".num").eq(i).hasClass("num_click")) {
          $(".num").eq(i).removeClass("num_click");
          $(".num").eq(i - 1).addClass("num_click");
          Page = $(".num").eq(i).html() - 1;

          if ($(".handle_detail").is(":visible")) {
            var status = "waiting";
            getApplyContent(Page, pagenum, status);
          } else if ($(".pass_handle_detail").is(":visible")) {
            var status = "ok";
            get_has_pass_ApplyedContent(Page, pagenum, status);
          } else if ($(".reject_handle_detail").is(":visible")) {
            var status = "no";
            get_has_reject_ApplyedContent(Page, pagenum, status);
          }
        }
      }
    }
    if ($(".num").eq(0).html() != 1) {
      if ($(".handling_data_list").length) {
        $(".handling_data_list").remove();

      }
      if ($(".pass_data_list").length) {
        $(".pass_data_list").remove();
      }
      if ($(".reject_data_list").length) {
        $(".reject_data_list").remove();
      }
    }
  });
  //handle被点击后背景
  $("#pending").click(function() {
    $this = $(this);
    $this.removeClass("first_style").removeClass("tab").addClass("tab_active");
    $('#pass,#reject').removeClass("tab_active").addClass("tab");
  });
  $("#pass").click(function() {
    $this = $(this);
    $this.removeClass("tab").addClass("tab_active");
    $('#reject').removeClass("tab_active").addClass("tab");
    $("#pending").removeClass("first_style").removeClass("tab_active").addClass("tab");
  });
  $("#reject").click(function() {
    $this = $(this);
    $this.removeClass("tab").addClass("tab_active");
    $('#pass').removeClass("tab_active").addClass("tab");
    $("#pending").removeClass("first_style").removeClass("tab_active").addClass("tab");
  });
  // 待处理
  $("#pending").click(function() {
    if ($(".handling_data_list").length) {
      $(".handling_data_list").remove();
    }
    $(".pass_data_page").hide();
    $(".reject_data_page").hide();
    $(".handling_data_page").show();
    $(".handle_detail").show();
    $(".pass_handle_detail").hide();
    $(".reject_handle_detail").hide();
    var page = 1;
    var pagenum = 7;
    var handling_status = "waiting";
    getApplysum(pagenum, handling_status);
    getApplyContent(page, pagenum, handling_status);
  });
  $("#pass").click(function() {
    if ($(".pass_data_list").length) {
      $(".pass_data_list").remove();
    }
    // 
    $(".pass_data_page").show();
    $(".reject_data_page").hide();
    $(".handling_data_page").hide();
    $(".handle_detail").hide();
    $(".pass_handle_detail").show();
    $(".reject_handle_detail").hide();
    var page = 1;
    var pagenum = 7;
    var handling_status = "ok";
    getApplysum(pagenum, handling_status);
    get_has_pass_ApplyedContent(page, pagenum, handling_status);
  });
  $("#reject").click(function() {
    if ($(".reject_data_list").length) {
      $(".reject_data_list").remove();
    }
    $(".pass_data_page").hide();
    $(".reject_data_page").show();
    $(".handling_data_page").hide();
    $(".handle_detail").hide();
    $(".reject_handle_detail").show();
    $(".pass_handle_detail").hide();
    var page = 1;
    var pagenum = 7;
    var handling_status = "no";
    getApplysum(pagenum, handling_status);
    get_has_reject_ApplyedContent(page, pagenum, handling_status);
  });


  //页面选择的变化
  $('#num_list').on('click', '.num', function(event) {
    event.stopPropagation();
    var $this = $(this);
    var Page = $this.html();
    if (Number(Page) < 3) {
      $('.num').removeClass('num_click');
      $this.addClass('num_click');
    }
    var pagenum = 7;
    var status = "";

    if (Number(Page) >= 3) {
      $('.num').removeClass("num_click");

      if ($(".handle_detail").is(":visible")) {
        status = "waiting";
        $.post("GetApplicationNum.api", {
            "pagenum": pagenum,
            "status": status
          },
          function(data) {
            var num_sum = Math.ceil(data / pagenum);
            if (num_sum > 5) {
              if (Page <= num_sum - 2) {
                $(".num").eq(2).addClass("num_click");
                $(".num").eq(2).html(Page);
                for (var i = 1; i < 3; i++) {
                  $(".num").eq(2 - i).html(Page - i);
                  $(".num").eq(2 + i).html(Number(Page) + i)
                }
              } else if (Page == num_sum - 1) {
                $(".num").eq(3).addClass("num_click");
                $(".num").eq(2).html(Number(Page) - 1);
                for (var i = 1; i < 3; i++) {
                  $(".num").eq(2 - i).html(Page - i - 1);
                  $(".num").eq(2 + i).html(Number(Page) + i - 1)
                }
              } else if (Page == num_sum) {
                $(".num").eq(4).addClass("num_click");
              }
            } else if (num_sum <= 5) {
              $('.num').removeClass('num_click');
              $this.addClass('num_click');
            }
          });
      } else if ($(".pass_handle_detail").is(":visible")) {
        status = "ok";
        $.post("GetApplicationNum.api", {
            "pagenum": pagenum,
            "status": status
          },
          function(data) {
            var num_sum = Math.ceil(data / pagenum);
            if (num_sum > 5) {
              if (Page <= num_sum - 2) {
                $(".num").eq(2).addClass("num_click");
                $(".num").eq(2).html(Page);
                for (var i = 1; i < 3; i++) {
                  $(".num").eq(2 - i).html(Page - i);
                  $(".num").eq(2 + i).html(Number(Page) + i)
                }
              } else if (Page == num_sum - 1) {
                $(".num").eq(3).addClass("num_click");
                $(".num").eq(2).html(Number(Page) - 1);
                for (var i = 1; i < 3; i++) {
                  $(".num").eq(2 - i).html(Page - i - 1);
                  $(".num").eq(2 + i).html(Number(Page) + i - 1)
                }
              } else if (Page == num_sum) {
                $(".num").eq(4).addClass("num_click");
              }
            } else if (num_sum <= 5) {
              $('.num').removeClass('num_click');
              $this.addClass('num_click');
            }
          });
      } else if ($(".reject_handle_detail").is(":visible")) {
        status = "no";
        $.post("GetApplicationNum.api", {
            "pagenum": pagenum,
            "status": status
          },
          function(data) {
            var num_sum = Math.ceil(data / pagenum);
            if (num_sum > 5) {
              if (Page <= num_sum - 2) {
                $(".num").eq(2).addClass("num_click");
                $(".num").eq(2).html(Page);
                for (var i = 1; i < 3; i++) {
                  $(".num").eq(2 - i).html(Page - i);
                  $(".num").eq(2 + i).html(Number(Page) + i)
                }
              } else if (Page == num_sum - 1) {
                $(".num").eq(3).addClass("num_click");
                $(".num").eq(2).html(Number(Page) - 1);
                for (var i = 1; i < 3; i++) {
                  $(".num").eq(2 - i).html(Page - i - 1);
                  $(".num").eq(2 + i).html(Number(Page) + i - 1)
                }
              } else if (Page == num_sum) {
                $(".num").eq(4).addClass("num_click");
              }
            } else if (num_sum <= 5) {
              $('.num').removeClass('num_click');
              $this.addClass('num_click');
            }
          });
      }
    }
    if ($(".handle_detail").is(":visible")) {
      status = "waiting";
      getApplyContent(Page, pagenum, status);
    } else if ($(".pass_handle_detail").is(":visible")) {
      status = "ok";
      get_has_pass_ApplyedContent(Page, pagenum, status);
    } else if ($(".reject_handle_detail").is(":visible")) {
      status = "no";
      get_has_reject_ApplyedContent(Page, pagenum, status);
    }
    if ($(".handling_data_list").length) {
      $(".handling_data_list").remove();
    }
    if ($(".pass_data_list").length) {
      $(".pass_data_list").remove();
    }
    if ($(".reject_data_list").length) {
      $(".reject_data_list").remove();
    }
  });
});



// 待处理页面数据的显示
$.post("GetApplicationT.api", {
  "page": 1,
  "pagenum": 1,
  "status": "waiting"
}, function(json) {
  var len = json.length;
  var data_list = $(".pass_list");
  $(".pass_data_page").html('<div class="pass_data_list"></div>');
  $(".pass_data_list").html('<div class="pass_list"></div>');
  var all_data = '';
  for (var i = 0; i < len; i++) {
    var week = json[i]["week"];
    var day = json[i]["day"];
    var time = json[i]["time"];

    // 申请时间对应中文转化
    var day_str = ['一', '二', '三', '四', '五'];

    if (time == "t1") {
      time = "第1~2节";
    } else if (time == "t2") {
      time = "第3~4节";
    } else if (time == "t3") {
      time = "第5~6节";
    } else if (time == "t4") {
      time = "第7~8节";
    }

    var SubjectId = "";
    for (var j = 0; j < all_list.length; j++) {
      if (json[i]["subjectid"] == all_list[j]["subjectid"]) {
        SubjectId = '<div class="pass_EXP">' + all_list[j]["subject"] + '</div>';
      }
    }

    var Comment = "";
    if (json[i]["comment"] == "") {
      Comment = '<div class=".pass_Comment"></div>';
    } else {
      Comment = '<div class="pass_Comment">' + json[i]["comment"] + '</div>';
    }
    all_data += ('<div class="pass_data_row"><div class="pass_user_ID">' + json[i]["userid"] + '</div><div class="pass_user_TIME">第' + week + '周' + ' ' + '周' + day_str[day] + ' ' + time + '</div>' + SubjectId + Comment + '</div>');


  }
  $(".pass_list").html(all_data);
}, 'json')


// 获取所有课程列表
var all_list = new Object;
$.post("GetSubject.api", {}, function(data) {
  var Data = JSON.parse(data);
  all_list = Data;
});
// 首次进入页面获取待处理数据
function first_data() {
  $.post("GetApplicationT.api", {
    "page": 1,
    "pagenum": 7,
    "status": "waiting"
  }, function(json) {

    var len = json.length;
    var data_list = $(".data_list");
    $(".handling_data_page").html('<div class="handling_data_list"></div>');
    $(".handling_data_list").html('<table class="data_list" style="cellspacing:0; cellpadding:0"></table>');
    var all_data = '';
    for (var i = 0; i < len; i++) {
      var week = json[i]["week"];
      var day = json[i]["day"];
      var time = json[i]["time"];
      // 申请时间对应中文转化
      var day_str = ['一', '二', '三', '四', '五'];

      if (time == "t1") {
        time = "第1~2节";
      } else if (time == "t2") {
        time = "第3~4节";
      } else if (time == "t3") {
        time = "第5~6节";
      } else if (time == "t4") {
        time = "第7~8节";
      }

      var SubjectId = "";
      for (var j = 0; j < all_list.length; j++) {
        if (json[i]["subjectid"] == all_list[j]["subjectid"]) {
          SubjectId = '<td class="EXP">' + all_list[j]["subject"] + '</td>';
        }
      }

      var Comment = "";
      if (json[i]["comment"] == "") {
        Comment = '<td class="Comment"></td>';
      } else {
        Comment = '<td class="Comment">' + json[i]["comment"] + '</td>';
      }
      all_data += ('<tr class="handle_data_row"><td class="user_ID">' + json[i]["userid"] + '</td><td class="user_TIME">第' + week + '周' + ' ' + '周' + day_str[day] + ' ' + time + '</td>' + SubjectId + Comment + '<td class="pass_or_reject"><div class="PASS" data-id=' + json[i]["applyid"] + '>同意</div><div class="REJECT" data-id=' + json[i]["applyid"] + '>否决</div></td></tr>');


    }
    $(".data_list").html(all_data);
  }, 'json')

  $.post("GetApplicationNum.api", {
    "pagenum": 7,
    "status": "waiting"
  }, function(data) {
    var num_sum = Math.ceil(data / 7);
    if (num_sum > 5)
      $('.footer').width(56 + 5 * 36);
    else {
      $('.footer').width(56 + num_sum * 36);
    }
    // 需要判断大于一的时候；
    if (data > 7) {
      $(".footer").show();
    } else {
      $(".footer").hide();
    }
    var str = "";
    if (num_sum <= 5) {
      for (var i = 1; i <= num_sum; i++) {
        if (i == 1) {
          str += '<div class="num num_click">' + i + '</div>';
        } else {
          str += '<div class="num selector">' + i + '</div>';
        }
      }
      $("#num_list").html(str);
    } else if (num_sum > 5) {
      for (var i = 1; i <= 5; i++) {
        if (i == 1) {
          str += '<div class="num num_click">' + i + '</div>';
        } else {
          str += '<div class="num selector">' + i + '</div>';
        }
      }
      $("#num_list").html(str);
    }
  });
}

// 获取已处理或已否决
function get_has_pass_ApplyedContent(page, pagenum, status) {
  $.post("GetApplicationT.api", {
    "page": page,
    "pagenum": pagenum,
    "status": status
  }, function(json) {
    var len = json.length;
    var data_list = $(".pass_list");
    $(".pass_data_page").html('<div class="pass_data_list"></div>');
    $(".pass_data_list").html('<table class="pass_list"></table>');
    var all_data = '';
    for (var i = 0; i < len; i++) {
      var week = json[i]["week"];
      var day = json[i]["day"];
      var time = json[i]["time"];

      // 申请时间对应中文转化
      var day_str = ['一', '二', '三', '四', '五'];

      if (time == "t1") {
        time = "第1~2节";
      } else if (time == "t2") {
        time = "第3~4节";
      } else if (time == "t3") {
        time = "第5~6节";
      } else if (time == "t4") {
        time = "第7~8节";
      }

      var SubjectId = "";
      for (var j = 0; j < all_list.length; j++) {
        if (json[i]["subjectid"] == all_list[j]["subjectid"]) {
          SubjectId = '<td class="pass_EXP">' + all_list[j]["subject"] + '</td>';
        }
      }

      var Comment = "";
      if (json[i]["comment"] == "") {
        Comment = '<td class=".pass_Comment"></td>';
      } else {
        Comment = '<td class="pass_Comment">' + json[i]["reply"] + '</td>';
      }
      all_data += ('<tr class="pass_data_row"><td class="pass_user_ID">' + json[i]["userid"] + '</td><td class="pass_user_TIME">第' + week + '周' + ' ' + '周' + day_str[day] + ' ' + time + '</td>' + SubjectId + Comment + '</tr>');


    }
    $(".pass_list").html(all_data);
  }, 'json')
}

function get_has_reject_ApplyedContent(page, pagenum, status) {
  $.post("GetApplicationT.api", {
    "page": page,
    "pagenum": pagenum,
    "status": status
  }, function(json) {
    var len = json.length;
    var data_list = $(".reject_list");
    $(".reject_data_page").html('<div class="reject_data_list"></div>');
    $(".reject_data_list").html('<table class="reject_list"></table>');
    var all_data = '';
    for (var i = 0; i < len; i++) {
      var week = json[i]["week"];
      var day = json[i]["day"];
      var time = json[i]["time"];

      // 申请时间对应中文转化
      var day_str = ['一', '二', '三', '四', '五'];

      if (time == "t1") {
        time = "第1~2节";
      } else if (time == "t2") {
        time = "第3~4节";
      } else if (time == "t3") {
        time = "第5~6节";
      } else if (time == "t4") {
        time = "第7~8节";
      }

      var SubjectId = "";
      for (var j = 0; j < all_list.length; j++) {
        if (json[i]["subjectid"] == all_list[j]["subjectid"]) {
          SubjectId = '<td class="reject_EXP">' + all_list[j]["subject"] + '</td>';
        }
      }

      var Comment = "";
      if (json[i]["comment"] == "") {
        Comment = '<td class=".reject_Comment"></td>';
      } else {
        Comment = '<td class="reject_Comment">' + json[i]["reply"] + '</td>';
      }
      all_data += ('<tr class="reject_data_row"><td class="reject_user_ID">' + json[i]["userid"] + '</td><td class="reject_user_TIME">第' + week + '周' + ' ' + '周' + day_str[day] + ' ' + time + '</td>' + SubjectId + Comment + '</tr>');


    }
    $(".reject_list").html(all_data);
  }, 'json')
}


// 获取待处理申请
function getApplyContent(page, pagenum, status) {
  $.post("GetApplicationT.api", {
    "page": page,
    "pagenum": pagenum,
    "status": "waiting"
  }, function(json) {

    var len = json.length;
    var data_list = $(".data_list");
    $(".handling_data_page").html('<div class="handling_data_list"></div>');
    $(".handling_data_list").html('<table class="data_list" style="cellspacing:0; cellpadding:0"></table>');
    var all_data = '';
    for (var i = 0; i < len; i++) {
      var week = json[i]["week"];
      var day = json[i]["day"];
      var time = json[i]["time"];
      // 申请时间对应中文转化
      var day_str = ['一', '二', '三', '四', '五'];

      if (time == "t1") {
        time = "第1~2节";
      } else if (time == "t2") {
        time = "第3~4节";
      } else if (time == "t3") {
        time = "第5~6节";
      } else if (time == "t4") {
        time = "第7~8节";
      }

      var SubjectId = "";
      for (var j = 0; j < all_list.length; j++) {
        if (json[i]["subjectid"] == all_list[j]["subjectid"]) {
          SubjectId = '<td class="EXP">' + all_list[j]["subject"] + '</td>';
        }
      }

      var Comment = "";
      if (json[i]["comment"] == "") {
        Comment = '<td class="Comment"></td>';
      } else {
        Comment = '<td class="Comment">' + json[i]["comment"] + '</td>';
      }
      all_data += ('<tr class="handle_data_row"><td class="user_ID">' + json[i]["userid"] + '</td><td class="user_TIME">第' + week + '周' + ' ' + '周' + day_str[day] + ' ' + time + '</td>' + SubjectId + Comment + '<td class="pass_or_reject"><div class="PASS" data-id=' + json[i]["applyid"] + '>同意</div><div class="REJECT" data-id=' + json[i]["applyid"] + '>否决</div></td></tr>');


    }
    $(".data_list").html(all_data);
  }, 'json')
}

//分页码数的输出显示
function getApplysum(pagenum, status) {
  var num_sum = "";
  $.post("GetApplicationNum.api", {
    "pagenum": pagenum,
    "status": status
  }, function(data) {
    num_sum = Math.ceil(data / pagenum);
    if (num_sum > 5)
      $('.footer').width(56 + 5 * 37);
    else {
      $('.footer').width(56 + num_sum * 37);
    }
    // 需要判断大于一的时候；
    if (data > 7) {
      $(".footer").show();
    } else {
      $(".footer").hide();
    }
    var str = "";
    if (num_sum <= 5) {
      for (var i = 1; i <= num_sum; i++) {
        if (i == 1) {
          str += '<div class="num num_click">' + i + '</div>';
        } else {
          str += '<div class="num selector">' + i + '</div>';
        }
      }
      $("#num_list").html(str);
    } else if (num_sum > 5) {
      for (var i = 1; i <= 5; i++) {
        if (i == 1) {
          str += '<div class="num num_click">' + i + '</div>';
        } else {
          str += '<div class="num selector">' + i + '</div>';
        }
      }
      $("#num_list").html(str);
    }
  });
  return num_sum;
}