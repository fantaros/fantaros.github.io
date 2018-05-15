$(function() {
    var h = $(window).height();

    $("main").css("height", "" + h + "px");

    function abs(n) {
        var abs = +n;
        if (abs < 0) {
            return -abs;
        } else {
            return abs;
        }
    }

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

    $("#alertDialogContent").css("margin-top", ("" + ((h - 440) / 2)) + "px");

    window.openAlert = function(info, last) {
        var top = getTop();
        $("#alertDialog").attr("style", "top:" + top + "px;");
        //$("main").addClass("mainContentLocked").removeClass("mainContent");
        $("#alertDialog").attr("open", "open").show();

        $("#detailText").text(info || "提交成功");

        if (last == null) {
            last = 10000;
        }

        window.setTimeout(window.closeAlert, last);
    };

    window.closeAlert = function() {
        var top = parseInt($("#alertDialog").css("top"));
        $(".dialogRegion").removeAttr("open").hide();
        //$("main").addClass("mainContent").removeClass("mainContentLocked");
    };

    $("#alertDialogContent").click(window.closeAlert);

    $(".textarea").width($("div.textarea_div").width() - 32);
    $("input.contact").width($("div.contact_div").width() - 32);
});