$(function() {
    var h = $(window).height();

    $("#listDialogContent").css("margin-top", ("" + ((h - 456) / 2)) + "px");
    $("#imgDialogContent").css("margin-top", ("" + ((h - 544) / 2)) + "px");

    $("#dialoghref").click(function() {
        var top = document.body.scrollTop;
        $("#listDialog").attr("style", "top:" + top + "px;");
        $("body").attr("style", "top: -" + top + "px; position: fixed;");
        $("#listDialog").attr("open", "open").show();
    });

    $(".imgFocus").click(function() {
        var top = document.body.scrollTop;
        $("#imgDialog").attr("style", "top:" + top + "px;");
        $("#imgSrcControl").attr("src", $(this).attr("src"));
        $("body").attr("style", "top: -" + top + "px; position: fixed;");
        $("#imgDialog").attr("open", "open").show();
    });

    $(".closedialogbutton").click(function() {
        var top = parseInt($("body").css("top"));
        $("body").attr("style", "top: 0px; position: static;");
        $(".dialogRegion").removeAttr("open").hide();
        window.scrollTo(0, top);
    });

    $("#imgDialogContent").click(function() {
        var top = parseInt($("body").css("top"));
        $("body").attr("style", "top: 0px; position: static;");
        $(".dialogRegion").removeAttr("open").hide();
        window.scrollTo(0, top);
    });
});