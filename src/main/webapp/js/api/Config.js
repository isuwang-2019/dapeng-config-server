/// <reference path="../../plugins/ts-lib/jquerytemplate.d.ts"/>
/// <reference path="../../plugins/ts-lib/jquery.d.ts"/>
var api;
(function (api) {
    var Config = /** @class */ (function () {
        function Config() {
            //
            this.add = "add";
            this.view = "view";
            this.edit = "edit";
            this.real = "real";
        }
        // 导出添加配置页面内容
        Config.prototype.exportAddConfigContext = function (type, biz, data) {
            if (type === void 0) { type = this.add || this.edit || this.view || this.real; }
            var c = this;
            // language=HTML
            return "\n                <div class=\"panel-header window-header\">\n                    <div class=\"input-group\">\n                        <p class=\"left-panel-title\">" + (type == c.add ? "添加配置" : (type == c.edit ? "修改配置" : (type == c.view ? "配置详情" : (type == c.real ? "实时配置" : "")))) + "</p>\n                    </div>\n                </div>\n                <div class=\"form-horizontal\" style=\"margin-top: 81px;\">\n                " + (type != c.add && type != c.real ? "\n                <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u66F4\u65B0\u65F6\u95F4:</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" " + (type != c.add ? "disabled" : "") + " class=\"form-control\" value=\"" + data.updatedAt + "\"/>\n                        </div>\n                    </div>\n                " : "") + " \n               \n              \n                    <div class=\"form-group\">" + ("\n                    <label class=\"col-sm-2 control-label\">" + (type == c.add ? "服务名(全限定名):" : "服务名:") + "</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" " + (type != c.add ? "disabled" : "") + " class=\"form-control\" id=\"service-name\" value=\"" + (type != c.add ? data.serviceName : "") + "\"/>\n                   \n                        </div>") + "\n                    </div>\n                    " + (type != c.real ?
                "\n                <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u8D85\u65F6\u914D\u7F6E:</label>\n                        <!--\u8D85\u65F6\u914D\u7F6E-->\n                        <div class=\"col-sm-9\">\n                            <textarea " + (type == c.view ? "disabled" : "") + " id=\"timeout-config-area\" class=\"col-sm-2 form-control\" rows=\"5\">" + (type != c.add ? data.timeoutConfig : "") + "</textarea>\n                              <div class=\"advance-format-item\">\n                                <p class=\"advance-format-title\" onclick=\"toggleBlock(this)\" ><span class=\"glyphicon glyphicon-question-sign\"></span></p>\n                                <div class=\"advance-format-content\">\n                                  <pre>\n\u8D85\u65F6\u914D\u7F6E\uFF1A\n1.\u5168\u5C40\u914D\u7F6E\u5728/soa/config/services\u8282\u70B9data\u4E0A\n2.\u5177\u4F53\u670D\u52A1\u7684\u914D\u7F6E\u5728/soa/config/services/{serviceName}\u4E0A\n\n\u683C\u5F0F\uFF1A\n\u5168\u5C40\uFF1Atimeout/800ms\n\u670D\u52A1\uFF1Atimeout/700ms,createSupplier:100ms,modifySupplier:200ms;\n                                  </pre>\n                                </div>\n                              </div>\n                        </div>\n                    </div>\n                "
                : "") + "\n                   \n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">" + (type == c.real ? "超时/" : "") + "\u8D1F\u8F7D\u5747\u8861:</label>\n                        <!--\u8D1F\u8F7D\u5747\u8861\u914D\u7F6E-->\n                        <div class=\"col-sm-9\">\n                            <textarea " + (type == c.view || type == c.real ? "disabled" : "") + " id=\"loadbalance-config-area\" class=\"col-sm-2 form-control\" rows=\"5\">" + (type != c.add ? (type == c.real ? data.timeoutBalanceConfig : data.loadbalanceConfig) : "") + "</textarea>\n                              <div class=\"advance-format-item\">\n                                <p class=\"advance-format-title\" onclick=\"toggleBlock(this)\" ><span class=\"glyphicon glyphicon-question-sign\"></span></p>\n                                <div class=\"advance-format-content\">\n                                  <pre>\n\u8D1F\u8F7D\u5747\u8861\u914D\u7F6E\uFF1A\n1.\u5168\u5C40\u914D\u7F6E\u5728/soa/config/services\u8282\u70B9data\u4E0A\n2.\u5177\u4F53\u670D\u52A1\u7684\u914D\u7F6E\u5728/soa/config/services/{serviceName}\u4E0A\n\n\u683C\u5F0F\uFF1A\n\u53EF\u9009\u7B56\u7565\uFF1ARandom/RoundRobin/LeastActive/ConsistentHash\n\u5168\u5C40\uFF1Aloadbalance/LeastActive\n\u670D\u52A1\uFF1Aloadbalance/LeastActive,createSupplier:Random,modifySupplier:RoundRobin;\n                                  </pre>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <!--\u8DEF\u7531\u914D\u7F6E-->\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u8DEF\u7531\u914D\u7F6E:</label>\n                        <div class=\"col-sm-9\">\n                            <textarea " + (type == c.view || type == c.real ? "disabled" : "") + " id=\"router-config-area\" class=\"form-control\" rows=\"5\">" + (type != c.add ? data.routerConfig : "") + "</textarea>\n                              <div class=\"advance-format-item\">\n                                <p class=\"advance-format-title\" onclick=\"toggleBlock(this)\" ><span class=\"glyphicon glyphicon-question-sign\"></span></p>\n                                <div class=\"advance-format-content\">\n                                  <pre>\n\u8DEF\u7531\u914D\u7F6E\uFF1A\n1.\u8DEF\u7531\u914D\u7F6E\u5728/soa/config/routes/{serviceName}\u8282\u70B9data\u4E0A\n\n\u8BE6\u7EC6\u6587\u6863\uFF1A\nhttps://github.com/dapeng-soa/dapeng-soa/wiki/Dapeng-Routing\n                                  </pre>\n                                </div>\n                              </div>\n                        </div>\n                    </div>\n                    <!--\u9650\u6D41\u914D\u7F6E-->\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u9650\u6D41\u914D\u7F6E:</label>\n                        <div class=\"col-sm-9\">\n                            <textarea " + (type == c.view || type == c.real ? "disabled" : "") + " id=\"freq-config-area\" class=\"form-control\" rows=\"7\">" + (type != c.add ? data.freqConfig : "") + "</textarea>\n                              <div class=\"advance-format-item\">\n                                <p class=\"advance-format-title\" onclick=\"toggleBlock(this)\" ><span class=\"glyphicon glyphicon-question-sign\"></span></p>\n                                <div class=\"advance-format-content\">\n                                  <pre>\n\u9650\u6D41\u914D\u7F6E\uFF1A\n1.\u9650\u6D41\u914D\u7F6E\u5728/soa/config/freq/{serviceName}\u8282\u70B9data\u4E0A\n\n\u683C\u5F0F\uFF1A\n[rule1]\nmatch_app = com.foo.service1 #\u670D\u52A1\nrule_type = callerIp # \u5BF9\u6BCF\u4E2A\u8BF7\u6C42\u7AEFIP\nmin_interval = 60,600  # \u6BCF\u5206\u949F\u8BF7\u6C42\u6570\u4E0D\u591A\u4F59600\nmid_interval = 3600,10000 # \u6BCF\u5C0F\u65F6\u8BF7\u6C42\u6570\u4E0D\u8D85\u8FC71\u4E07\nmax_interval = 86400,80000 # \u6BCF\u5929\u8BF7\u6C42\u4E66\u4E0D\u8D85\u8FC78\u4E07\n\n\u8303\u4F8B\uFF1A\n[customerUserIds]\nmatch_app = com.github.dapeng.hello.service.HelloService\nrule_type = userId\nmin_interval = 60,10\nmid_interval = 3600,1000\nmax_interval = 86400,80000\n\n[customerUserIds]\nmatch_app = com.github.dapeng.hello.service.HelloService\nrule_type = userId[1,3,5]\nmin_interval = 60,10\nmid_interval = 3600,10000\nmax_interval = 86400,80000\n        \n[customerUserIps]\nmatch_app = com.github.dapeng.hello.service.HelloService\nrule_type = userIp[192.168.2.1,192.168.35.36,192.162.25.3]\nmin_interval = 60,10\nmid_interval = 3600,10000\nmax_interval = 86400,80000\n\n\u8BF4\u660E\uFF1A\n1.app \u8BBE\u5B9A\u4E86\u6BCF\u4E2A app \u5BF9\u5E94\u7684\u4E09\u4E2A\u7EDF\u8BA1\u5468\u671F\uFF1Amin, mid, max\u3002\u5355\u4F4D\u4E3A\u79D2\u3002 \u5FC5\u987B\u6EE1\u8DB3 max = N * min, mid = M * min\n2.rule_type \u662F\u9650\u6D41\u7684key\u7C7B\u578B\uFF0C\u76EE\u524D\u652F\u6301\uFF1A\n* all \u5BF9\u8FD9\u4E2A\u670D\u52A1\u9650\u6D41\n* callerIp \u6309callerIp\u9650\u6D41\u3002\n* callerMid \u6309 callMid \u9650\u6D41\u3002 \u7531\u4E8EcallerMid \u662F\u5B57\u7B26\u4E32\uFF0C\u5B9E\u9645\u6309\u7167\u5176 hashCode \u8FDB\u884C\u9650\u6D41\u3002\uFF08\u5177\u6709\u76F8\u540C\u7684hashCode\u7684callerMid\u88AB\u5F52\u4E00\u5904\u7406\uFF09\n* userIp \u6309 userIp \u8FDB\u884C\u9650\u6D41\n* userId \u6309 userId \u8FDB\u884C\u9650\u6D41\n3.\u5BF9\u6BCF\u4E00\u4E2A\u670D\u52A1\uFF0C\u53EF\u4EE5\u914D\u7F6E\u591A\u4E2Arule\uFF0C\u4F8B\u5982\uFF0C\u53EF\u4EE5\u6309\u7167 callerIp \u8FDB\u884C\u9650\u6D41\uFF0C\u53EF\u4EE5\u6309\u7167 callerMid \u8FDB\u884C\u9650\u6D41\uFF0C\u4E5F\u53EF\u4EE5\u540C\u65F6\u8FDB\u884C\u9650\u6D41\u3002\n4.\u652F\u6301\u52A8\u6001\u7684\u66F4\u65B0\u9650\u6D41\u89C4\u5219\u3002\n\n\u8BE6\u7EC6\u6587\u6863\uFF1A\nhttps://github.com/dapeng-soa/dapeng-soa/wiki/DapengFreqControl\n                                  </pre>\n                                </div>\n                              </div>\n                        </div>\n                    </div>\n                    \n                    " + (type != c.real ? "\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u5907\u6CE8:</label>\n                        <div class=\"col-sm-9\">\n                            <textarea " + (type == c.view ? "disabled" : "") + " id=\"remark-area\" class=\"form-control\" rows=\"7\">" + (type != c.add ? data.remark : "") + "</textarea>\n                        </div>\n                    </div>\n                    " : "") + "\n                    " + (type == c.add ? "\n                        <span class=\"input-group-btn panel-button-group text-center\">\n                    <button type=\"button\" class=\"btn btn-success\" onclick=\"saveconfig()\">\u4FDD\u5B58\u914D\u7F6E</button>\n                    <button type=\"button\" class=\"btn btn-danger\" onclick=\"clearConfigInput()\">\u6E05\u7A7A\u914D\u7F6E</button>\n                    </span>\n                    " : (type == c.edit ? "\n                        <span class=\"input-group-btn panel-button-group text-center\">\n                    <button type=\"button\" class=\"btn btn-success\" onclick=\"editedConfig(data.id)\">\u4FDD\u5B58\u4FEE\u6539</button>\n                    </span>\n                    " : "")) + "\n                </div>\n                \n                \n            ";
        };
        /**
         * 发布历史
         * @param serviceName
         * @returns {string}
         */
        Config.prototype.exportPublishHistoryContext = function (serviceName) {
            // html
            return "\n            <div class=\"panel-header window-header\">\n                    <div class=\"input-group\">\n                        <p class=\"left-panel-title\">\u53D1\u5E03\u5386\u53F2<small>" + serviceName + "</small></p>\n                    </div>\n                </div>\n                \n                <ul class=\"layui-timeline\" id=\"publishHistory\" style=\"margin-top: 81px;\">\n                  \n                </ul>\n             \n            ";
        };
        //表格操作模版
        Config.prototype.exportConfigTableActionContext = function (id, row) {
            return "<span class=\"link-button-table\">\n            " + (row.status != 3 ? "<a href=\"javascript:void(0)\" title=\"\u53D1\u5E03\" onclick=\"publishConfig(" + id + ")\"><span class=\"glyphicon glyphicon-send\"></span></a>" : "") + "\n            <a href=\"javascript:void(0)\" title=\"\u4FEE\u6539\"  onclick=\"viewOrEditByID(" + id + ",'edit')\"><span class=\"glyphicon glyphicon-edit\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u53D1\u5E03\u5386\u53F2\"  onclick=\"viewHistory(" + id + ",'" + row.serviceName + "')\"><span class=\"glyphicon glyphicon-time\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u5B9E\u65F6\u914D\u7F6E\"  onclick=\"viewRealConfig('" + row.serviceName + "')\"><span class=\"glyphicon glyphicon-cloud\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u8BE6\u60C5\"  onclick=\"viewOrEditByID(" + id + ",'view')\"><span class=\"glyphicon glyphicon-eye-open\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u5220\u9664\"  onclick=\"delConfig(" + id + ")\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n            </span>";
        };
        //导出添加/修改/apikey信息
        Config.prototype.exportAddApiKeyContext = function (type, biz, data) {
            if (type === void 0) { type = this.add || this.edit || this.view; }
            var c = this;
            return "\n                <div class=\"panel-header window-header\">\n                    <div class=\"input-group\">\n                        <p class=\"left-panel-title\">" + (type == c.add ? "添加ApiKey" : (type == c.edit ? "修改ApiKey" : (type == c.view ? "ApiKey详情" : ""))) + "</p>\n                    </div>\n                </div>\n                <div class=\"form-horizontal\" style=\"margin-top: 81px;\">\n               " + (type != c.add ? " <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u66F4\u65B0\u65F6\u95F4:</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" " + (type != c.add ? "disabled" : "") + " class=\"form-control\" value=\"" + data.updatedAt + "\"/>\n                        </div>\n                    </div>" : "") + "\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">ApiKey:</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" " + (type != c.add ? "disabled" : "") + " id=\"authApikey\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.apiKey : "") + "\"/>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u5BC6\u7801:</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"authPassWord\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.password : "") + "\"/>\n                            <div class=\"advance-format-item\">\n                                <p class=\"advance-format-title\" onclick=\"toggleBlock(this)\" ><span class=\"glyphicon glyphicon-question-sign\"></span></p>\n                                <div class=\"advance-format-content\">\n                                  <pre>\n\u6CE8:\u5BC6\u7801\u5FC5\u987B\u7B49\u4E8E12\u4F4D\n                                  </pre>\n                                </div>\n                              </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u8D85\u65F6\u65F6\u95F4(\u79D2):</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"authTimeout\" class=\"col-sm-2 form-control\" value=\"" + (type != c.add ? data.timeout : "") + "\"/>\n                            <div class=\"advance-format-item\">\n                                <p class=\"advance-format-title\" onclick=\"toggleBlock(this)\" ><span class=\"glyphicon glyphicon-question-sign\"></span></p>\n                                <div class=\"advance-format-content\">\n                                  <pre>\n\u6CE8:\u8D85\u65F6\u65F6\u95F4\u5355\u4F4D[\u79D2],\u9ED8\u8BA4\u4E3A60s\n\u8F93\u5165\u503C\u5E94\u5F53\u5927\u4E8E\u7B49\u4E8E60\u79D2,\u5982\u679C\u8F93\u5165\u5C0F\u4E8E60\u79D2\u5C06\u4F7F\u7528\u9ED8\u8BA4\u503C\n                                  </pre>\n                                </div>\n                              </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u9A8C\u8BC1\u8D85\u65F6\u65F6\u95F4:</label>\n                        <div class=\"col-sm-9\">\n                            <select " + (type == c.view ? "disabled" : "") + " id=\"authValidated\" class=\"col-sm-2 form-control\">\n                              <option value=\"0\" " + (type != c.add ? (data.validated == 0 ? "selected" : "") : "") + ">\u662F</option>\n                              <option value=\"1\" " + (type != c.add ? (data.validated == 1 ? "selected" : "") : "") + ">\u5426</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u4E1A\u52A1:</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\"  " + (type == c.view ? "disabled" : "") + " id=\"authBiz\" class=\"form-control\" value=\"" + (type != c.add ? data.biz : "") + "\" />\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">ip\u89C4\u5219:</label>\n                        <div class=\"col-sm-9\">\n                            <textarea " + (type == c.view ? "disabled" : "") + " id=authIps class=\"form-control\" rows=\"5\">" + (type != c.add ? data.ips : "") + "</textarea>\n                            <div class=\"advance-format-item\">\n                                <p class=\"advance-format-title\" onclick=\"toggleBlock(this)\" ><span class=\"glyphicon glyphicon-question-sign\"></span></p>\n                                <div class=\"advance-format-content\">\n                                  <pre>\n\u6CE8:\n\u5355\u4E2Aip: 127.0.0.1\n\u591A\u4E2Aip: 127.0.0.1,127.0.0.2\n\u63A9\u7801: 10.0.0.5/24\n\u9ED8\u8BA4(\u4E0D\u9650\u5236ip): *\n                                  </pre>\n                                </div>\n                              </div>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u5907\u6CE8:</label>\n                        <div class=\"col-sm-9\">\n                            <textarea " + (type == c.view ? "disabled" : "") + " id=\"notes\" class=\"form-control\" rows=\"5\">" + (type != c.add ? data.notes : "") + "</textarea>\n                        </div>\n                    </div>\n                    " + (type == c.add ? "\n                    <span class=\"input-group-btn panel-button-group text-center\">\n                    <button type=\"button\" class=\"btn btn-success\" onclick=\"saveApiKey()\">\u4FDD\u5B58</button>\n                    <button type=\"button\" class=\"btn btn-danger\" onclick=\"clearApiKeyInput()\">\u6E05\u7A7A</button>\n                    </span>" : "") + "\n                    \n                    " + (type == c.edit ? "\n                     <span class=\"input-group-btn panel-button-group text-center\">\n                    <button type=\"button\" class=\"btn btn-success\" onclick=\"editedApiKey(" + data.id + ")\">\u4FDD\u5B58\u4FEE\u6539</button>\n                    </span>\n                    " : "") + "\n                    </div>\n                    \n            ";
        };
        //ApiKey表格操作模版
        Config.prototype.exportApiKeyTableActionContext = function (id, row) {
            return "<span class=\"link-button-table\">\n            <a href=\"javascript:void(0)\" title=\"\u4FEE\u6539\"  onclick=\"viewApiKeyOrEditByID(" + id + ",'edit')\"><span class=\"glyphicon glyphicon-edit\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u7981\u7528\"  onclick=\"delApiKey(" + id + ")\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n            </span>";
        };
        //导出添加/修改/集群信息
        Config.prototype.exportAddClusterContext = function (type, biz, data) {
            if (type === void 0) { type = this.add || this.edit || this.view; }
            var c = this;
            return "\n            <div class=\"panel-header window-header\">\n                    <div class=\"input-group\">\n                        <p class=\"left-panel-title\">" + (type == c.add ? "添加集群" : (type == c.edit ? "修改集群" : (type == c.view ? "集群详情" : ""))) + "</p>\n                    </div>\n                </div>\n                <div class=\"form-horizontal\" style=\"margin-top: 81px;\">\n               " + (type != c.add ? " <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u66F4\u65B0\u65F6\u95F4:</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" " + (type != c.add ? "disabled" : "") + " class=\"form-control\" value=\"" + data.updatedAt + "\"/>\n                        </div>\n                    </div>" : "") + "\n               <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">zookeeper\u96C6\u7FA4:</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"zookeeperHost\" class=\"col-sm-2 form-control\">" + (type != c.add ? data.zkHost : "") + "</input>\n                            <div class=\"advance-format-item\">\n                                <p class=\"advance-format-title\" onclick=\"toggleBlock(this)\" ><span class=\"glyphicon glyphicon-question-sign\"></span></p>\n                                <div class=\"advance-format-content\">\n                                  <pre>\n\u5982:127.0.0.1\u6216127.0.0.1:2181\n\u96C6\u7FA4:127.0.0.1:2181,127.0.0.2:2181,127.0.0.3:2181\n                                  </pre>\n                                </div>\n                              </div>\n                        </div>\n                       \n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">\u63CF\u8FF0:</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\" " + (type == c.view ? "disabled" : "") + " id=\"remark\" class=\"col-sm-2 form-control\">" + (type != c.add ? data.remark : "") + "</input>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">influxdb\u4E3B\u673A\u5730\u5740:</label>\n                        <div class=\"col-sm-9\">\n                            <input type=\"text\"  " + (type == c.view ? "disabled" : "") + " id=\"influxdbHost\" class=\"form-control\" >" + (type != c.add ? data.influxdbHost : "") + "</input>\n                            <div class=\"advance-format-item\">\n                                <p class=\"advance-format-title\" onclick=\"toggleBlock(this)\" ><span class=\"glyphicon glyphicon-question-sign\"></span></p>\n                                <div class=\"advance-format-content\">\n                                  <pre>\ninfluxdb\u4E3A\u76D1\u63A7\u6570\u636E\u5730\u5740,\u9ED8\u8BA4\u7AEF\u53E3\u4E3A8086\n\u53EA\u9700\u5199host:127.0.0.1\n                                  </pre>\n                                </div>\n                              </div>\n                        </div>\n                        \n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">influxdb\u7528\u6237\u540D:</label>\n                        <div class=\"col-sm-9\">\n                            <input " + (type == c.view ? "disabled" : "") + " id=\"influxdbUser\" class=\"form-control\">" + (type != c.add ? data.influxdbUser : "") + "</input>\n                        </div>\n                    </div>\n                    <div class=\"form-group\">\n                        <label class=\"col-sm-2 control-label\">influxdb\u5BC6\u7801:</label>\n                        <div class=\"col-sm-9\">\n                            <input " + (type == c.view ? "disabled" : "") + " id=\"influxdbPass\" class=\"form-control\" >" + (type != c.add ? data.influxdbPass : "") + "</input>\n                        </div>\n                    </div>\n                    " + (type == c.add ? "\n                    <span class=\"input-group-btn panel-button-group text-center\">\n                    <button type=\"button\" class=\"btn btn-success\" onclick=\"saveCluster()\">\u4FDD\u5B58</button>\n                    <button type=\"button\" class=\"btn btn-danger\" onclick=\"clearClusterInput()\">\u6E05\u7A7A</button>\n                    </span>" : "") + "\n                    </div>\n                    \n            ";
        };
        //集群列表表格操作模版
        Config.prototype.exportClustersTableActionContext = function (id, row) {
            return "<span class=\"link-button-table\">\n            <a href=\"javascript:void(0)\" title=\"\u4FEE\u6539\"  onclick=\"viewClusterOrEditByID(" + id + ",'edit')\"><span class=\"glyphicon glyphicon-edit\"></span></a>\n            <a href=\"javascript:void(0)\" title=\"\u5220\u9664\"  onclick=\"delCluster(" + id + ")\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n            </span>";
        };
        return Config;
    }());
    api.Config = Config;
})(api || (api = {}));
