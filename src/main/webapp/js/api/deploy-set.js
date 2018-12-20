$(document).ready(function () {
    InitDeploySets();
});
var deploy = new api.Deploy();
var bsTable = {};

function InitDeploySets() {
    //记录页面bootstrap-table全局变量$table，方便应用
    var queryUrl = basePath + '/api/deploy-sets';
    var table = new BSTable("deploy-set-table", queryUrl, setColumns());
    table.onDblClickRow = function (row) {
        viewDeploySetEditByID(row.id, VIEW)
    };
    table.responseHandler = function (res) {
        return {
            total: res.context == null ? 0 : res.context.totalElements,
            rows: res.context.content
        };
    };
    table.init();
    bsTable = table;
}

setColumns = function () {
    return [{
        checkbox: false,
        visible: false//是否显示复选框
    }, {
        field: 'id',
        title: '#',
        formatter: indexFormatter

    }, {
        field: 'name',
        title: '环境集',
        sortable: true
    }, /* {
        field: 'networkMtu',
        title: 'networkMtu'
    },*/ {
        field: 'remark',
        title: '备注'
    }, {
        field: 'createdAt',
        title: '添加时间',
        sortable: true
    }, {
        field: 'updatedAt',
        title: '修改时间',
        sortable: true
    }, {
        field: 'id',
        title: '操作',
        width: 160,
        align: 'center',
        valign: 'middle',
        formatter: deploySetActionFormatter
    }]
};

/**
 * @return {string}
 */
deploySetActionFormatter = function (value, row, index) {
    return deploy.exportDeploySetActionContext(value, row);
};

/**
 * 添加环境变量
 * @param setId
 * @param op
 */
openAddSubEnvBySetId = function (setId, op) {
    var url = basePath + "/api/deploy-set/sub-env/" + setId;
    $.get(url, function (res) {
        if (res.code === SUCCESS_CODE) {
            var context = deploy.exportAddSubEnvBySetIdContext("add", setId, res.context);
            initModelContext(context, function () {
                bsTable.refresh();
            });
            $(".selectpicker").selectpicker('refresh');
        }
    }, "json");
};

/**
 * 保存环境集中的服务配置
 */
saveSubEnvs = function (setId) {
    var selectedService = $("#sub-from-container").find("select.data-service-select").find("option:selected");
    var subEnvs = $("#sub-from-container").find("textarea.data-env-textarea");
    var opsIds = $("#sub-from-container").find("input.data-ops-id");
    var subEnv = [];
    $.each(selectedService, function (index, em) {
        subEnv.push({
            serviceId: $(em).val(),
            env: $(subEnvs[index]).val(),
            id: $(opsIds[index]).val() === undefined ? 0 : $(opsIds[index]).val(),
            setId: setId
        });
    });
    for (s in subEnv) {
        if (Number(subEnv[s].serviceId) === 0) {
            layer.msg("存在未选择服务的配置，请检查");
            return;
        }
    }
    var url = basePath + "/api/deploy-set/sub-env/add";
    var settings = {
        type: "post",
        url: url,
        data: JSON.stringify({subEnv: subEnv}),
        dataType: "json",
        contentType: "application/json"
    };
    $.ajax(settings).done(function (res) {
        layer.msg(res.msg);
        if (res.code === SUCCESS_CODE) {
            closeModel();
        }
    });

};

openAddDeploySetModle = function () {
    // 导出弹窗内容模版
    var context = deploy.exportAddDeploySetContext("add");
    // 初始化弹窗
    initModelContext(context, function () {
        bsTable.refresh();
    });
    addCopySetSelectInit();
};

addCopySetSelectInit = function () {
    var curl = basePath + "/api/deploy-sets?sort=name&order=asc";
    var ss = new BzSelect(curl, "addCopySetSelect", "id", "name");
    ss.responseHandler = function (res) {
        return res.context.content
    };
    ss.init();
};

/**
 * 保存
 */
saveDeploySet = function () {
    var url = basePath + "/api/deploy-set/add";
    var settings = {
        type: "post",
        url: url,
        data: JSON.stringify(processDeploySetData()),
        dataType: "json",
        contentType: "application/json"
    };
    $.ajax(settings).done(function (res) {
        layer.msg(res.msg);
        if (res.code === SUCCESS_CODE) {
            closeModel();
        }
    });
};

addSubFromBySet = function (setId) {
    var url = basePath + "/api/deploy-set/filter-services/" + setId;
    $.get(url, function (res) {
        if (res.code === SUCCESS_CODE) {
            var ops = res.context;
            var context = deploy.exportAddSubEnvContext(ADD, ops);
        }
        $("#sub-from-container").append(context);
        $(".selectpicker").selectpicker('refresh');
        $(".from-group-item-rm").bind("click", function (eo) {
            $(this).parent().remove();
        });
    }, "json");
};


/**
 * 清空配置
 */
clearDeploySetInput = function () {
    bodyAbs();
    layer.confirm('将清空当前所有输入？', {
        btn: ['确认', '取消']
    }, function () {
        $("textarea.form-control").val("");
        layer.msg("已清空");
    }, function () {
        layer.msg("取消清空");
    });
};

processDeploySetData = function () {
    var name = $("#name").val();
    var env = $("#env-area").val();
    var networkMtu = $("#networkMtu").val();
    var remark = $("#remark-area").val();
    var setBuildHost = $("#setBuildHost").find("option:selected").val();
    return {
        name: name,
        env: env,
        networkMtu: networkMtu,
        remark: remark,
        buildHost: setBuildHost
    }
};

/**
 * 修改
 * @param id
 * @param op
 */
viewDeploySetEditByID = function (id, op) {
    var url = basePath + "/api/deploy-set/" + id;
    $.get(url, function (res) {
        // 导出弹窗内容模版
        var context = deploy.exportAddDeploySetContext(op, "", res.context);
        // 初始化弹窗
        initModelContext(context, function () {
            bsTable.refresh()
        });
        initSetBuildHosts(id, res.context.buildHost);
    }, "json");
};

initSetBuildHosts = function (setId, selected) {
    var curl = basePath + "/api/deploy-hosts?sort=name&order=asc&setId=" + setId;
    var ss = new BzSelect(curl, "setBuildHost", "id", "name");
    ss.responseHandler = function (res) {
        return res.context.content
    };
    ss.v_selected = selected;
    ss.refresh = true;
    ss.init();
};

/**
 * 修改
 * @param id
 */
editedDeploySet = function (id) {
    var url = basePath + "/api/deploy-set/edit/" + id;

    var settings = {
        type: "post",
        url: url,
        data: JSON.stringify(processDeploySetData()),
        dataType: "json",
        contentType: "application/json"
    };
    $.ajax(settings).done(function (res) {
        layer.msg(res.msg);
        if (res.code === SUCCESS_CODE) {
            closeModel();
        }
    });
};

delDeploySet = function (id) {
    bodyAbs();
    layer.confirm('确定删除？', {
        btn: ['确认', '取消']
    }, function () {
        var url = basePath + "/api/deploy-set/del/" + id;
        $.post(url, function (res) {
            layer.msg(res.msg);
            bsTable.refresh();
        }, "json");
        rmBodyAbs();
    }, function () {
        layer.msg("未做任何改动");
        rmBodyAbs();
    });
};


/**
 * copy set
 * @param obj
 */
copySetChange = function () {
    var ed = $("#addCopySetSelect").find("option:selected").val();
    if (Number(ed) !== undefined && Number(ed) !== 0) {
        var url = basePath + "/api/deploy-set/" + ed;
        $.get(url, function (res) {
            $("#name").val(res.context.name);
            $("#env-area").val(res.context.env);
            $("#networkMtu").val(res.context.networkMtu);
            $("#remark-area").val(res.context.remark);
        }, "json");
    }
};


