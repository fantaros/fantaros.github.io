$(function() {
    var h = $(window).height();
    var timeLeft = 60;
    var counting = false;
    //设定内容区域的高度
    $("main").css("height", "" + h + "px");

    //全真派框体的高度设定为img的高度（其中有个div.vipCode设定为相对定位其高度也会参与计算div.backImageHolder的高度故需要重设div.backImageHolder的高度为背景图的高度）
    $("img.backImage").get(0).onload = function() {
        $("div.backImageHolder").height($("img.backImage").height());
    };


    $("input.focusInput").on("focus", function() {
        //if (/android/i.test(navigator.userAgent)) {
        var self = this;
        window.setTimeout(function() {
            self.scrollIntoView(true);
            $("main.mainContent").css("top", "-200px");
        }, 500);
        //}
    });

    $("input.focusInput").on("blur", function() {
        this.scrollIntoView(true);
        $("main.mainContent").css("top", "0px");
    });

    function startTimeout() {
        var timeText;
        if (timeLeft < 1) {
            counting = false;
            $("#getCaptchaCodeButton").css("letter-spacing", "0px");
            $("#getCaptchaCodeButton").css("font-size", "14px");
            $("#getCaptchaCodeButton").text("　重新获取　");
            $("#getCaptchaCodeButton").removeAttr("disabled");
        } else {
            $("#getCaptchaCodeButton").css("letter-spacing", "5px");
            $("#getCaptchaCodeButton").css("font-size", "14px");
            if (timeLeft < 10) {
                timeText = "0" + timeLeft;
            } else {
                timeText = "" + timeLeft;
            }
            $("#getCaptchaCodeButton").text("　" + timeText + "ｓ　");
            window.setTimeout(startTimeout, 1000);
            timeLeft = timeLeft - 1;
        }

    }

    //获得验证码，当有蒙屏时并不会调用这个方法
    $("#getCaptchaCodeButton").click(function() {
        if (!counting) {
            counting = true;
            timeLeft = 60;
            $("#getCaptchaCodeButton").attr("disabled", "disabled");
            startTimeout();
            console.info("%c获得验证码", "font-size:16px; color:blue;");
            console.debug(h);
        }
    });

    //确定按钮处理，当有蒙屏时并不会调用这个方法
    $("#submitButton").click(function() {
        if ($("#captcha").text() == "") {
            window.openAlert("验证码输入错误", 100000, "images/error.png");
        }
        console.info("%c确定按钮", "font-size:16px; color:green;");
        console.debug(h);
    });

    //计算绝对值
    function abs(n) {
        var abs = +n;
        if (abs < 0) {
            return -abs;
        } else {
            return abs;
        }
    }

    //设置alert对话框的绝对位置
    $("#alertDialogContent").css("margin-top", ("" + ((h - 350) / 2)) + "px");
});