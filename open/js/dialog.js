$(function() {
    var h = $(window).height();

    function abs(n) {
        var abs = +n;
        if (abs < 0) {
            return -abs;
        } else {
            return abs;
        }
    }

    function getTop(){
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

    $("#listDialogContent").css("margin-top", ("" + ((h - 456) / 2)) + "px");
    $("#imgDialogContent").css("margin-top", ("" + ((h - 544) / 2)) + "px");

    $("#dialoghref").click(function() {
        var top = getTop();
        $("#listDialog").attr("style", "top:" + top + "px;");
        $("body").attr("style", "top: -" + top + "px; position: fixed;");
        $("#listDialog").attr("open", "open").show();
    });

    $(".imgFocus").click(function() {
        var top = getTop();
        $("#imgDialog").attr("style", "top:" + top + "px;");
        $("#imgSrcControl").attr("src", $(this).attr("src"));
        $("body").attr("style", "top: -" + top + "px; position: fixed;");
        $("#imgDialog").attr("open", "open").show();
    });

    $(".closedialogbutton").click(function() {
        var top = parseInt($("body").css("top"));
        $("body").attr("style", "top: 0px; position: static;");
        $(".dialogRegion").removeAttr("open").hide();
        window.scrollTo(0, abs(top));
    });

    $("#imgDialogContent").click(function() {
        var top = parseInt($("body").css("top"));
        $("body").attr("style", "top: 0px; position: static;");
        $(".dialogRegion").removeAttr("open").hide();
        window.scrollTo(0, abs(top));
    });
});