$(document).ready(function() {

    function hashCode(str) {
        var hash = 0;
        if (str.length == 0) return hash;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }

    var animating = false,
        submitPhase1 = 1100,
        submitPhase2 = 400,
        logoutPhase1 = 800,
        $login = $(".login"),
        $app = $(".app");

    $("#gotoact").click(function(e) {
        if (animating) return;
        animating = true;
        var that = this,
            gotoact, code, name;
        /*ripple($(that), e);
        $(that).addClass("processing");
        setTimeout(function() {
            $(that).addClass("success");
            setTimeout(function() {
                $app.show();
                $app.css("top");
                $app.addClass("active");
            }, submitPhase2 - 70);
            setTimeout(function() {
                $login.hide();
                $login.addClass("inactive");
                animating = false;
                $(that).removeClass("success processing");
            }, submitPhase2);
        }, submitPhase1);*/
        gotoact = document.getElementById("gotoact");
        if ($("#gotoact").text() == "您输入了错误的活动代码无法进入活动！") {
            $("#gotoact").text("参与活动");
        }
        code = $("#code").val();
        name = $("#name").val();
        if (code != null && code != "" && code == hashCode(name)) {
            window.location.href = "https://hd.faisco.cn/16082306/8h7rhXxHbJI2clmzRrccsw/load.html?style=0&t=" + 10000 * Math.random();
        } else {
            alert("您输入了错误的活动代码无法进入活动！");
        }
    });

    $(document).on("click", ".app__logout", function(e) {
        if (animating) return;
        $(".ripple").remove();
        animating = true;
        var that = this;
        $(that).addClass("clicked");
        setTimeout(function() {
            $app.removeClass("active");
            $login.show();
            $login.css("top");
            $login.removeClass("inactive");
        }, logoutPhase1 - 120);
        setTimeout(function() {
            $app.hide();
            animating = false;
            $(that).removeClass("clicked");
        }, logoutPhase1);
    });

});