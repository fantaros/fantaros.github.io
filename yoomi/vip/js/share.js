$(function() {

    function getParameter(paramName) {
        var reg = new RegExp('(^|&)' + paramName + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    $("button.shareButton").click(function() {
        var loc = window.location.href;
        sessionStorage.ready = "true";
        if (/micromessenger/i.test(navigator.userAgent)) {
            window.location.href = "wx.html?from=" + loc;
        } else {
            window.location.href = "uc.html?from=" + loc;
        }
    });

    /*$("main.detailContent").click(function() {
        var from = getParameter("from");
        if (from != null) {
            window.location.href = from;
        } else {
            window.location.href = "index.html";
        }
    });*/

});