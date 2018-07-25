$(document).ready(function () {
    initSetList();
    setTimeout(function () {
        checkService();
    },100);
});
var deploy = new api.Deploy();
var util = new api.Api();

/**
 * 初始化set
 * @constructor
 */
initSetList = function (id) {
    var curl = basePath + "/api/deploy-sets";
    util.$get(curl, function (res) {
        if (res.code === SUCCESS_CODE) {
            var html = "";
            for (var i = 0; i < res.context.length; i++) {
                var seled = "";
                if (i === 0) {
                    seled = "selected"
                }
                if (id !== undefined && id !== "") {
                    seled = res.context[i].id === id ? "selected" : "";
                }
                html += '<option '+seled+' value="' + res.context[i].id + '">' + res.context[i].name + '</option>';
            }
            $("#setSelect").html(html).selectpicker('refresh');
        }
    });
};

/**
 * 初始化服务
 * @constructor
 */
initServiceList = function (id) {
    var curl = basePath + "/api/deploy-services";
    $.get(curl, function (res) {
        if (res.code === SUCCESS_CODE) {
            var html = "";
            for (var i = 0; i < res.context.length; i++) {
                var seled = "";
                if (id !== undefined && id !== "") {
                    seled = res.context[i].id === id ? "selected" : "";
                }
                html += '<option '+seled+' value="' + res.context[i].id + '">' + res.context[i].name + '</option>';
            }
            $("#serviceSelect").html(html).selectpicker('refresh');
        }
    }, "json");
};

initHostList = function (id) {
    var setSelected = $("#setSelect").find("option:selected").val();
    var curl = basePath + "/api/deploy-hosts/" + setSelected;
    $.get(curl, function (res) {
        if (res.code === SUCCESS_CODE) {
            var html = "";
            for (var i = 0; i < res.context.length; i++) {
                var seled = "";
                if (id !== undefined && id !== "") {
                    seled = res.context[i].id === id ? "selected" : "";
                }
                html += '<option seled value="' + res.context[i].id + '">' + res.context[i].name + '</option>';
            }
            $("#hostSelect").html(html).selectpicker('refresh');
        }
    }, "json");
};

// 环境集改变
execSetChanged = function (obj) {
    var selected = Number($(obj).find("option:selected").val());
    checkService();
};
// 视图类型变更
execViewTypeChanged = function (obj) {
    var selected = Number($(obj).find("option:selected").val());
    if (selected === 1) {
        $("#viewTypeLabel").html("服务：");
        $("#viewTypeSelect").html(
            '<select id="serviceSelect" data-live-search="true" class="selectpicker form-control" onchange="execServiceChanged()" >\n' +
            '</select>'
        );
        // 初始化服务
        initServiceList();
        // 切换至服务视图
        checkService();
    } else {
        $("#viewTypeLabel").html("主机：");
        $("#viewTypeSelect").html(
            '<select id="hostSelect" data-live-search="true" class="selectpicker form-control" onchange="execHostChanged()" >\n' +
            '</select>'
        );
        // 初始化主机
        initHostList();
        // 切换至主机视图
        checkService();
    }

};


// 服务视图服务选择
execServiceChanged = function () {
    console.log("execServiceChanged");
};

// 主机视图主机选择
execHostChanged = function () {
    console.log("execHostChanged");
};

// updateService
updateService = function (setId,hostId,serviceId) {
    // 获取yaml内容
    var url = basePath +"/api/deploy-unit/process-envs";
    var req = {
      setId:setId,
      hostId:hostId,
      serviceId:serviceId
    };
    util.get(url,req,function (res) {
        console.log(res);
        if (res.code ===SUCCESS_CODE){
            // 导出弹窗内容模版
            var context = deploy.viewDeployYamlContext(res.context.yamlService);
            initModelContext(context);
        }
    });
};
// checkService
checkService = function () {
    var url = basePath + "/api/deploy/checkRealService?setId="+$("#setSelect").find("option:selected").val();
    util.$get(url, function (res) {
        console.log(res);
        // 展示视图（默认服务视图）
        var context = deploy.deployViewChange("serviceView",res.context);
        $("#deployMain").html(context);
    })
};

// stopService
stopService = function (setId,hostId,serviceId) {
    var url = basePath + "/api/deploy/stopRealService";
    util.$get(url, function (res) {
        layer.msg(res.msg);
    })
};

// restartService
restartService = function (setId,hostId,serviceId) {
    var url = basePath + "/api/deploy/restartRealService";
    util.$get(url, function (res) {
        layer.msg(res.msg);
    })
};

/**
 * 执行升级
 */
execServiceUpdate = function(){
    var url = basePath + "/api/deploy/stopRealService";
    util.$get(url, function (res) {
        layer.msg(res.msg);
        if (res.code === SUCCESS_CODE) {
            closeModel();
        }
    });
};

cancelServiceUpdate  =function () {
    layer.msg("取消升级");
    closeModel();
};


