/// <reference path="../../plugins/ts-lib/jquerytemplate.d.ts"/>
/// <reference path="../../plugins/ts-lib/jquery.d.ts"/>
/*部署模块ts模版代码*/
var api;
(function (api) {
    var Deploy = /** @class */ (function () {
        function Deploy() {
            this.add = "add";
            this.view = "view";
            this.edit = "edit";
            this.api = new api.Api();
            this.serviceView = 1;
            this.hostView = 2;
        }
        /**
         * 环境集-导出添加/修改/详情模版
         * @param {string} type
         * @param {string} biz
         * @param data
         */
        Deploy.prototype.exportAddDeploySetContext = function (type, biz, data) {
            if (type === void 0) { type = this.add || this.edit || this.view; }
            var c = this;
            return "\n          <div class=\"panel-header window-header\">\n                <div class=\"input-group\">\n                    <p class=\"left-panel-title\">" + (type == c.add ? "添加环境集" : (type == c.edit ? "修改环境集" : (type == c.view ? "环境集详情" : ""))) + "</p>\n                </div>\n            </div>\n            <div class=\"form-horizontal\" style=\"margin-top: 81px;\">\n                  <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u73AF\u5883\u96C6\u540D\u79F0:</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"name\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.name : "") + "\">\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">ENV:</label>\n                        <div class=\"col-sm-9\">\n                            <textarea " + (type == c.view ? "disabled" : "") + " id=\"env-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.env : "") + "</textarea>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u5907\u6CE8:</label>\n                        <div class=\"col-sm-9\">\n                            <textarea " + (type == c.view ? "disabled" : "") + " id=\"remark-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.remark : "") + "</textarea>\n                        </div>\n                    </div>\n                    \n                    " + (type == c.add ? "\n                    <span class=\"input-group-btn panel-button-group text-center\">\n                    <button type=\"button\" class=\"btn btn-success\" onclick=\"saveDeploySet()\">\u4FDD\u5B58</button>\n                    <button type=\"button\" class=\"btn btn-danger\" onclick=\"clearDeploySetInput()\">\u6E05\u7A7A</button>\n                    </span>\n                    " : type == c.edit ? "\n                    <span class=\"input-group-btn panel-button-group text-center\">\n                    <button type=\"button\" class=\"btn btn-success\" onclick=\"editedDeploySet(" + data.id + ")\">\u4FDD\u5B58\u4FEE\u6539</button>\n                    </span>\n                    " : "") + "\n                </div>\n";
        };
        /**
         * 服务-导出添加/修改/详情模版
         * @param {string} type
         * @param {string} biz
         * @param data
         */
        Deploy.prototype.exportAddDeployServiceContext = function (type, biz, data) {
            if (type === void 0) { type = this.add || this.edit || this.view; }
            var c = this;
            return "\n           <div class=\"panel-header window-header\">\n                    <div class=\"input-group\">\n                        <p class=\"left-panel-title\">" + (type == c.add ? "添加服务" : (type == c.edit ? "修改服务" : (type == c.view ? "服务详情" : ""))) + "</p>\n                    </div>\n                </div>\n                <div class=\"form-horizontal\" style=\"margin-top: 81px;\">\n                   <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u670D\u52A1\u540D\u5B57:</label>\n                            <div class=\"col-sm-9\">\n                                <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"name\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.name : "") + "\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u670D\u52A1\u955C\u50CF:</label>\n                            <div class=\"col-sm-9\">\n                                <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"image\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.image : "") + "\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u6807\u7B7E:</label>\n                            <div class=\"col-sm-9\">\n                                <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"labels\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.labels : "") + "\">\n                            </div>\n                        </div>\n                        \n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">ENV:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"env-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.env : "") + "</textarea>\n                            </div>\n                        </div>\n                        \n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">VOLUMES:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"volumes-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.volumes : "") + "</textarea>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">PORTS:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"ports-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.ports : "") + "</textarea>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">composeLabels:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"composeLabels-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.composeLabels : "") + "</textarea>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">dockerExtras:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"dockerExtras-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.dockerExtras : "") + "</textarea>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u5907\u6CE8:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"remark-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.remark : "") + "</textarea>\n                            </div>\n                        </div>\n                         " + (type == c.add ? "\n                         <span class=\"input-group-btn panel-button-group text-center\">\n                        <button type=\"button\" class=\"btn btn-success\" onclick=\"saveDeployService()\">\u4FDD\u5B58</button>\n                        <button type=\"button\" class=\"btn btn-danger\" onclick=\"clearDeployServiceInput()\">\u6E05\u7A7A</button>\n                        </span>\n                         " : type == c.edit ? "\n                         <span class=\"input-group-btn panel-button-group text-center\">\n                    <button type=\"button\" class=\"btn btn-success\" onclick=\"editedDeployService(" + data.id + ")\">\u4FDD\u5B58\u4FEE\u6539</button>\n                    </span>\n                         " : "") + "\n                </div>\n            \n            ";
        };
        /**
         * 节点-导出添加/修改/详情模版
         * @param {string} type
         * @param {string} biz
         * @param data
         */
        Deploy.prototype.exportAddDeployHostContext = function (type, biz, data) {
            if (type === void 0) { type = this.add || this.edit || this.view; }
            var c = this;
            return "\n           <div class=\"panel-header window-header\">\n                    <div class=\"input-group\">\n                        <p class=\"left-panel-title\">" + (type == c.add ? "添加节点" : (type == c.edit ? "修改节点" : (type == c.view ? "节点详情" : ""))) + "</p>\n                    </div>\n                </div>\n                <div class=\"form-horizontal\" style=\"margin-top: 81px;\">\n                    <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u8282\u70B9\u540D\u79F0:</label>\n                            <div class=\"col-sm-9\">\n                                <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"name\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.name : "") + "\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">IP\u5730\u5740:</label>\n                            <div class=\"col-sm-9\">\n                                <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"ip\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.ip : "") + "\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u6807\u7B7E:</label>\n                            <div class=\"col-sm-9\">\n                                <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"labels\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.labels : "") + "\">\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u6240\u5C5E\u73AF\u5883\u96C6:</label>\n                            <div class=\"col-sm-9\">\n                               <select " + (type == c.view ? "disabled" : "") + " id=\"setSelect\" class=\"col-sm-2 form-control\">\n                                 \n                                </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u662F\u5426\u5916\u90E8\u673A\u5668:</label>\n                            <div class=\"col-sm-9\">\n                               <select " + (type == c.view ? "disabled" : "") + " id=\"extraSelect\" class=\"col-sm-2 form-control\">\n                                  <option value=\"0\" " + (type != c.add ? (data.extra == 0 ? "selected" : "") : "") + ">\u662F</option>\n                                  <option value=\"1\" " + (type != c.add ? (data.extra == 1 ? "selected" : "") : "") + ">\u5426</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">ENV:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"env-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.env : "") + "</textarea>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u5907\u6CE8:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"remark-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.remark : "") + "</textarea>\n                            </div>\n                        </div>\n                        " + (type == c.add ? "\n                        <span class=\"input-group-btn panel-button-group text-center\">\n                        <button type=\"button\" class=\"btn btn-success\" onclick=\"saveDeployHost()\">\u4FDD\u5B58</button>\n                        <button type=\"button\" class=\"btn btn-danger\" onclick=\"clearDeployHostInput()\">\u6E05\u7A7A</button>\n                        </span>\n                        " : type == c.edit ? "\n                        <span class=\"input-group-btn panel-button-group text-center\">\n                    <button type=\"button\" class=\"btn btn-success\" onclick=\"editedDeployHost(" + data.id + ")\">\u4FDD\u5B58\u4FEE\u6539</button>\n                    </span>\n                        " : "") + "\n                       \n                </div>\n            \n            ";
        };
        /**
         * 部署单元-导出添加/修改/详情模版
         * @param {string} type
         * @param {string} biz
         * @param data
         */
        Deploy.prototype.exportAddDeployUnitContext = function (type, biz, data) {
            if (type === void 0) { type = this.add || this.edit || this.view; }
            var c = this;
            return "\n           <div class=\"panel-header window-header\">\n                    <div class=\"input-group\">\n                        <p class=\"left-panel-title\">" + (type == c.add ? "添加部署单元" : (type == c.edit ? "修改部署单元" : (type == c.view ? "部署单元详情" : ""))) + "</p>\n                    </div>\n                </div>\n                <div class=\"form-horizontal\" style=\"margin-top: 81px;\">\n                    <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u53D1\u5E03TAG:</label>\n                            <div class=\"col-sm-9\">\n                                <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"gitTag\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.gitTag : "") + "\">\n                            </div>\n                        </div>\n                        \n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u6240\u5C5E\u73AF\u5883\u96C6:</label>\n                            <div class=\"col-sm-9\">\n                               <select " + (type == c.view ? "disabled" : "") + " id=\"setSelect\" onchange=\"addUnitSetChanged(this)\" class=\"col-sm-2 form-control\">\n          \n                                </select>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u6240\u5C5E\u4E3B\u673A:</label>\n                            <div class=\"col-sm-9\">\n                               <select " + (type == c.view ? "disabled" : "") + " onchange=\"addUnitHostChanged(this)\" id=\"hostSelect\" class=\"col-sm-2 form-control\">\n                                </select>\n                            </div>\n                        </div>\n                        \n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u6240\u5C5E\u670D\u52A1:</label>\n                            <div class=\"col-sm-9\">\n                               <select " + (type == c.view ? "disabled" : "") + " onchange=\"addUnitServiceChanged(this)\" id=\"serviceSelect\" class=\"col-sm-2 form-control\">\n                                </select>\n                            </div>\n                        </div>\n                        \n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">\u955C\u50CFTAG:</label>\n                            <div class=\"col-sm-9\">\n                                <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"imageTag\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.imageTag : "") + "\">\n                            </div>\n                        </div>\n                       \n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">ENV:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"env-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.env : "") + "</textarea>\n                            </div>\n                        </div>\n                      \n                  \n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">VOLUMES:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"volumes-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.volumes : "") + "</textarea>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">PORTS:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"ports-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.ports : "") + "</textarea>\n                            </div>\n                        </div>\n                        <div class=\"form-group\">\n                            <label class=\"col-sm-2 control-label\">dockerExtras:</label>\n                            <div class=\"col-sm-9\">\n                                <textarea " + (type == c.view ? "disabled" : "") + " id=\"dockerExtras-area\" class=\"form-control\" rows=\"10\">" + (type != c.add ? data.dockerExtras : "") + "</textarea>\n                            </div>\n                        </div>\n                        " + (type == c.add ? "\n                        <span class=\"input-group-btn panel-button-group text-center\">\n                        <button type=\"button\" class=\"btn btn-success\" onclick=\"saveDeployUnit()\">\u4FDD\u5B58</button>\n                        <button type=\"button\" class=\"btn btn-danger\" onclick=\"clearDeployUnitInput()\">\u6E05\u7A7A</button>\n                        </span>\n                        " : type == c.edit ? "\n                        <span class=\"input-group-btn panel-button-group text-center\">\n                    <button type=\"button\" class=\"btn btn-success\" onclick=\"editedDeployUnit(" + data.id + ")\">\u4FDD\u5B58\u4FEE\u6539</button>\n                    </span>\n                        " : "") + "\n                </div>\n            \n            ";
        };
        /**
         * 环境集操作栏
         * @param value
         * @param row
         */
        Deploy.prototype.exportDeploySetActionContext = function (value, row) {
            return "<span class=\"link-button-table\">\n            <a href=\"javascript:void(0)\" title=\"\u8BE6\u60C5\"  onclick=\"viewDeploySetEditByID(" + value + ",'view')\"><span class=\"glyphicon glyphicon-eye-open\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u4FEE\u6539\"  onclick=\"viewDeploySetEditByID(" + value + ",'edit')\"><span class=\"glyphicon glyphicon-edit\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u5220\u9664\"  onclick=\"delDeploySet(" + value + ")\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n            </span>";
        };
        /**
         * 节点操作栏
         * @param value
         * @param row
         */
        Deploy.prototype.exportDeployHostActionContext = function (value, row) {
            return "<span class=\"link-button-table\">\n            <a href=\"javascript:void(0)\" title=\"\u8BE6\u60C5\"  onclick=\"viewDeployHostOrEditByID(" + value + ",'view')\"><span class=\"glyphicon glyphicon-eye-open\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u4FEE\u6539\"  onclick=\"viewDeployHostOrEditByID(" + value + ",'edit')\"><span class=\"glyphicon glyphicon-edit\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u5220\u9664\"  onclick=\"delDeployHost(" + value + ")\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n            </span>";
        };
        /**
         * 服务操作栏
         * @param value
         * @param row
         */
        Deploy.prototype.exportDeployServiceActionContext = function (value, row) {
            return "<span class=\"link-button-table\">\n            <a href=\"javascript:void(0)\" title=\"\u8BE6\u60C5\"  onclick=\"viewDeployServiceOrEditByID(" + value + ",'view')\"><span class=\"glyphicon glyphicon-eye-open\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u4FEE\u6539\"  onclick=\"viewDeployServiceOrEditByID(" + value + ",'edit')\"><span class=\"glyphicon glyphicon-edit\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u5220\u9664\"  onclick=\"delDeployService(" + value + ")\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n            </span>";
        };
        /**
         * 部署单元操作栏
         * @param value
         * @param row
         */
        Deploy.prototype.exportDeployUnitActionContext = function (value, row) {
            return "<span class=\"link-button-table\">\n            <a href=\"javascript:void(0)\" title=\"\u8BE6\u60C5\"  onclick=\"viewDeployUnitOrEditByID(" + value + ",'view')\"><span class=\"glyphicon glyphicon-eye-open\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u4FEE\u6539\"  onclick=\"viewDeployUnitOrEditByID(" + value + ",'edit')\"><span class=\"glyphicon glyphicon-edit\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u5220\u9664\"  onclick=\"delDeployUnit(" + value + ")\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n            </span>";
        };
        /**
         * 服务/主机视图
         */
        Deploy.prototype.deployViewChange = function (viewType, data) {
            var dep = this;
            var view = "";
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var em = data_1[_i];
                view += "\n            <div class=\"col-sm-6 col-xs-12\">\n                <div class=\"panel panel-default panel-box\">\n                    <div class=\"panel-heading\"><p style=\"text-align: center\">" + (viewType == dep.serviceView ? em.serviceName : em.hostName + ':[' + em.hostIp + ']') + "</p>\n                    </div>\n                    <div class=\"panel-body\" style=\"overflow-y: auto;max-height: 400px\">\n                         " + dep.serviceViewSubHost(viewType, viewType == dep.serviceView ? em.deploySubHostVos : em.deploySubServiceVos) + "\n                    </div>\n                </div>\n            </div>\n            ";
            }
            return view;
        };
        Deploy.prototype.serviceViewSubHost = function (viewType, sub) {
            var dep = this;
            var subView = "";
            for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                var em = sub_1[_i];
                subView += "<div class=\"row\" style=\"border-bottom: 1px solid gainsboro;padding: 10px 0;\">\n                            <div class=\"col-sm-3 col-xs-12\">\n                                <p >" + (viewType == dep.serviceView ? em.hostName : em.serviceName) + "</p>\n                                " + (viewType == dep.serviceView ? "<p >" + em.hostIp + "</p>" : "") + "\n                                <p >\u9700\u8981\u66F4\u65B0\uFF1A" + (em.needUpdate ? "<span style=\"color: #00AA00\">\u662F</span>" : "\u5426") + "</p>\n                            </div>\n                            <div class=\"col-sm-6 col-xs-12\">\n                                <p>\u914D\u7F6E\u66F4\u65B0\u65F6\u95F4:" + em.configUpdateBy + "</p>\n                                <p>\u4E3B\u673A\u670D\u52A1\u65F6\u95F4:" + em.deployTime + "</p>\n                                <p>\u670D\u52A1\u72B6\u6001:" + (em.serviceStatus == 1 ? "<span style=\"color: #00AA00\">\u8FD0\u884C\u4E2D</span>" : "停止") + "</p>\n                            </div>\n                            <div class=\"col-sm-3 col-xs-12\">\n                                <p ><a href=\"#\" style=\"color: #1E9FFF\" onclick=\"updateService(" + em.unitId + ")\">\u5347\u7EA7</a></p>\n                                <p ><a href=\"#\" style=\"color: #1E9FFF\" onclick=\"stopService(" + em.unitId + ")\">\u505C\u6B62</a></p>\n                                <p ><a href=\"#\" style=\"color: #1E9FFF\" onclick=\"restartService(" + em.unitId + ")\">\u91CD\u542F</a></p>\n                            </div>\n                        </div>\n            ";
            }
            return subView;
        };
        /**
         * 预览yaml
         * @returns {string}
         */
        Deploy.prototype.viewDeployYamlContext = function (compose) {
            return "\n                <div class=\"panel-header window-header\">\n                    <div class=\"input-group\">\n                        <p class=\"left-panel-title\">\u9884\u89C8\u90E8\u7F72yaml[" + compose.name + "]</p>\n                    </div>\n                </div>\n                \n  <div style=\"margin: 81px 0 60px 0\">\n  <pre>\n        <p>services:</p>\n        <p style=\"padding-left: 2em\">" + compose.name + ":</p>\n        <p style=\"padding-left: 4em\">image: " + compose.image + "</p>\n        <p style=\"padding-left: 4em\">container_name: " + compose.name + "</p>\n        <p style=\"padding-left: 4em\">" + compose.dockerExtras + "</p>\n        <p style=\"padding-left: 4em\">environment:</p>\n        <p style=\"padding-left: 6em\">" + compose.env + "</p>\n        <p style=\"padding-left: 4em\">extra_hosts:</p>\n        <p style=\"padding-left: 6em\">" + compose.extraHosts + "</p>\n        <p style=\"padding-left: 4em\">ports:</p>\n        <p style=\"padding-left: 6em\">" + compose.ports + "</p>\n        <p style=\"padding-left: 4em\">volumes:</p>\n        <p style=\"padding-left: 6em\">" + compose.volumes + "</p>\n        <p style=\"padding-left: 4em\">labels:</p>\n        <p style=\"padding-left: 6em\">" + compose.composeLabels + "</p>\n        </pre>\n</div>\n<div style=\"position: fixed;bottom: 0;background-color: #fff;border-top: 1px solid #ccc;left: 10px;right: 10px;padding: 10px; 0\" >\n<span class=\"input-group-btn panel-button-group text-center\">\n                        <button type=\"button\" class=\"btn btn-success\" onclick=\"execServiceUpdate()\">\u786E\u8BA4\u5347\u7EA7</button>\n                        <button type=\"button\" class=\"btn btn-danger\" onclick=\"cancelServiceUpdate()\">\u53D6\u6D88\u5347\u7EA7</button>\n                        </span>\n</div>\n            ";
        };
        return Deploy;
    }());
    api.Deploy = Deploy;
})(api || (api = {}));
