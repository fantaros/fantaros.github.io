$(function() {
    var ready = sessionStorage.ready,
        id, code;

    function getParameter(paramName) {
        var reg = new RegExp('(^|&)' + paramName + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }

    if (ready === "true") {
        //分享者逻辑
    } else {
        //其他人看到的
        id = getParameter("id");
        code = getParameter("code");
        window.location.href = "index.html?id=" + id + "&code=" + code;
    }

});