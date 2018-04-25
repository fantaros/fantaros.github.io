$(function () {

    //计算滚动轴顶部的y坐标
    function getTop() {
        var top1 = document.body.scrollTop;
        var top2 = document.documentElement.scrollTop;

        if (top1 == top2) {
            return top1;
        } else if (top1 > top2) {
            return top1;
        } else {
            return top2;
        }
    }
    
    //打开alert框
    window.openAlert = function (info, last, imgsrc) {
        var top = getTop();
        //alert框的顶部位置
        $("#alertDialog").attr("style", "top:" + top + "px;");
        //锁定滚动
        $("main").addClass("mainContentLocked").removeClass("mainContent");
        //默认图片路径设置
        if (imgsrc == null) {
            imgsrc = "images/binded.png";
        }
        //设置提示框图片位置
        $("#alertDetailImage").attr("src", imgsrc);
        //默认信息是 操作成功
        $("#alertDetailText").text(info || "操作成功");
        //显示alert框
        $("#alertDialog").attr("open", "open").show();

        //默认10秒关闭
        if (last == null) {
            last = 10000;
        }

        //定时若干秒后关闭alert框
        window.setTimeout(window.closeAlert, last);
    };

    //关闭alert框
    window.closeAlert = function () {
        //获得alert框的顶部位置
        var top = parseInt($("#alertDialog").css("top"));
        //隐藏alert框
        $(".dialogRegion").removeAttr("open").hide();
        //解锁滚动
        $("main").addClass("mainContent").removeClass("mainContentLocked");
    };

    //默认点击alert框内部使alert框消失
    $("#alertDialogContent").click(window.closeAlert);

});