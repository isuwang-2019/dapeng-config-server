var $$ = new api.Api();
var changePwd = function () {
    var userName = $("#userName").val();
    var oldPwd = $("#oldPwd").val();
    var newPwd = $("#newPwd").val();
    var confirmNewPwd = $("#confirmNewPwd").val();

    var url = basePath + "/api/change-pwd";
    $$.post(url, JSON.stringify({
        userName: userName,
        oldPwd: oldPwd,
        newPwd: newPwd,
        confirmPwd: confirmNewPwd
    }), function (res) {
        layer.msg(res.msg);
        console.log(res);
    }, "application/json")
};
