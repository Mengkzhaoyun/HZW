GetQueryString = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

$(function() {
    var sPID = GetQueryString("Id");
    $.ajax({
        type: "GET",
        url: "../Rest/Tables/User/PId/" + sPID,
        success: function(data) {

        }
    });
});