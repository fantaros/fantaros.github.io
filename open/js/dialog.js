$(function() {
    var h = $(window).height();

    $("#listDialogContent").css("margin-top", ("" + ((h - 456) / 2)) + "px");
    $("#imgDialogContent").css("margin-top", ("" + ((h - 544) / 2)) + "px");

    $("#dialoghref").click(function() {
        //$("#headposition").click();
        var top = document.body.scrollTop;
        $("#listDialog").attr("style", "top:" + top + "px;");
        $("body").attr("style", "top: -" + top + "px; position: fixed;");
        //document.documentElement.scrollTop = top;
        $("#listDialog").attr("open", "open").show();
    });

    $(".imgFocus").click(function() {
        //$("#headposition").click();
        var top = document.body.scrollTop;
        $("#imgDialog").attr("style", "top:" + top + "px;");
        $("#imgSrcControl").attr("src", $(this).attr("src"));
        $("body").attr("style", "top: -" + top + "px; position: fixed;");
        //document.documentElement.scrollTop = top;
        $("#imgDialog").attr("open", "open").show();
    });

    $(".closedialogbutton").click(function() {
        //$("#headposition").click();
        var top = parseInt($("body").css("top"));
        $("body").attr("style", "top: 0px; position: static;");
        $(".dialogRegion").removeAttr("open").hide();
        //document.body.scrollTo(0, top);
        document.body.scrollTop = top;
    });

    $("#imgDialogContent").click(function() {
        //$("#headposition").click();
        var top = parseInt($("body").css("top"));
        $("body").attr("style", "top: 0px; position: static;");
        $(".dialogRegion").removeAttr("open").hide();
        //document.body.scrollTo(0, top);
        document.body.scrollTop = top;
    });
});