$(function() {
    var mt = ($(window).height() - 456) / 2;
    $("#listDialogContent").css("margin-top", ("" + mt) + "px");

    $("#dialoghref").click(function() {
        $("#headposition").click();
        $("body").css("position", "fixed");
        $("#listDialog").attr("open", "open").show();
    });

    $("#closedialog").click(function() {
        $("#headposition").click();
        $("body").css("position", "static");
        $("#listDialog").removeAttr("open").hide();
    });
});