package com.github.dapeng.web;

import com.github.dapeng.entity.build.TServiceBuildRecords;
import com.github.dapeng.repository.build.ServiceBuildRecordsRepository;
import com.github.dapeng.repository.deploy.HostRepository;
import com.github.dapeng.repository.deploy.ServiceRepository;
import com.github.dapeng.web.system.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * @author with struy.
 * Create by 2018/5/29 14:46
 * email :yq1724555319@gmail.com
 */

@Controller
@Transactional(rollbackFor = Throwable.class)
public class PageController {

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    HostRepository hostRepository;

    @Autowired
    ServiceBuildRecordsRepository buildRecordsRepository;

    /**
     * 首页
     *
     * @return
     */
    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("tagName", "index");
        return "redirect:me";
    }

    /**
     * 登录
     *
     * @return
     */
    @GetMapping(value = "/login")
    public String login() {
        return "security_login";
    }

    /**
     * 服务监控
     *
     * @return
     */
    @GetMapping(value = "/monitor")
    public String monitor(Model model) {
        model.addAttribute("tagName", "monitor");
        return "page/monitor";
    }

    @GetMapping(value = "/system/account")
    public String systemAccount(Model model) {
        model.addAttribute("tagName", "system-account");
        model.addAttribute("sideName", "system-account");
        return "page/system-account";
    }

    @GetMapping(value = "/system/log")
    public String systemLog(Model model) {
        model.addAttribute("tagName", "system-log");
        model.addAttribute("sideName", "system-log");
        return "page/system-log";
    }

    @GetMapping(value = "/system/menus")
    public String systemMenus(Model model) {
        model.addAttribute("tagName", "system-menus");
        model.addAttribute("sideName", "system-menus");
        return "page/system-menus";
    }

    @GetMapping(value = "/me")
    public String accountMe(Model model) {
        /*UserDetails user = userDetailsService.loadUserByUsername(SecurityUtil.me());*/
        /*model.addAttribute("me", user);*/
        return "page/system-me";
    }


    /**
     * 配置管理
     *
     * @return
     */
    @GetMapping(value = "/config")
    public String config(Model model) {
        model.addAttribute("tagName", "config");
        return "redirect:config/service";
    }

    /**
     * 集群管理
     *
     * @return
     */
    @GetMapping(value = "/config/clusters")
    public String clusters(Model model) {
        model.addAttribute("tagName", "clusters");
        model.addAttribute("sideName", "clusters");
        return "page/clusters";
    }

    /**
     * 配置管理-服务管理
     *
     * @return
     */
    @GetMapping(value = "/config/service")
    public String service(Model model) {
        model.addAttribute("tagName", "config");
        model.addAttribute("sideName", "config-service");
        return "page/config-service";
    }

    /**
     * 配置管理-白名单管理
     *
     * @return
     */
    @GetMapping(value = "/config/whitelist")
    public String whitelist(Model model) {
        model.addAttribute("tagName", "config");
        model.addAttribute("sideName", "config-whitelist");
        return "page/config-whitelist";
    }

    /**
     * 配置管理-白名单管理
     *
     * @return
     */
    @GetMapping(value = "/config/apikey")
    public String apikey(Model model) {
        model.addAttribute("tagName", "config");
        model.addAttribute("sideName", "config-apikey");
        return "page/config-apikey";
    }


    /**
     * 配置管理-路由配置
     *
     * @return
     */
    @GetMapping(value = "/config/route")
    public String route(Model model) {
        model.addAttribute("tagName", "config");
        model.addAttribute("sideName", "config-route");
        return "page/config-route";
    }

    /**
     * 服务注册实例
     *
     * @return
     */
    @GetMapping(value = "/config/runtime")
    public String runtimeList(Model model) {
        model.addAttribute("tagName", "config");
        model.addAttribute("sideName", "config-runtime");
        return "page/runtime-list";
    }

    /**
     * 发布部署
     *
     * @return
     */
    @GetMapping(value = "/deploy")
    public String deploy(Model model) {
        model.addAttribute("tagName", "deploy");
        return "redirect:deploy/exec";
    }

    /**
     * 文件管理
     *
     * @return
     */
    @GetMapping(value = "/deploy/files")
    public String deployFiles(Model model) {
        model.addAttribute("tagName", "deploy-files");
        model.addAttribute("sideName", "deploy-files");
        return "page/deploy-files";
    }

    /**
     * 网络管理
     *
     * @return
     */
    @GetMapping(value = "/deploy/network")
    public String deployNetwork(Model model) {
        model.addAttribute("tagName", "deploy-network");
        model.addAttribute("sideName", "deploy-network");
        return "page/deploy-network";
    }

    /**
     * 环境集管理
     *
     * @return
     */
    @GetMapping(value = "/deploy/set")
    public String deploySet(Model model) {
        model.addAttribute("tagName", "deploy-set");
        model.addAttribute("sideName", "deploy-set");
        return "page/deploy-set";
    }

    /**
     * 节点信息管理
     *
     * @return
     */
    @GetMapping(value = "/deploy/host")
    public String deployHost(Model model) {
        model.addAttribute("tagName", "deploy-host");
        model.addAttribute("sideName", "deploy-host");
        return "page/deploy-host";
    }

    /**
     * 服务信息管理
     *
     * @return
     */
    @GetMapping(value = "/deploy/service")
    public String deployService(Model model) {
        model.addAttribute("tagName", "deploy-service");
        model.addAttribute("sideName", "deploy-service");
        return "page/deploy-service";
    }

    /**
     * 部署单元管理
     *
     * @return
     */
    @GetMapping(value = "/deploy/unit")
    public String deployUnit(Model model) {
        model.addAttribute("tagName", "deploy-unit");
        model.addAttribute("sideName", "deploy-unit");
        return "page/deploy-unit";
    }

    /**
     * 执行发布
     *
     * @return
     */
    @GetMapping(value = "/deploy/exec")
    public String deployExec(Model model) {
        model.addAttribute("tagName", "deploy-exec");
        model.addAttribute("sideName", "deploy-exec");
        return "page/deploy-exec";
    }

    /**
     * 发布升级日志
     *
     * @return
     */
    @GetMapping(value = "/deploy/journal")
    public String deployLog(Model model) {
        model.addAttribute("tagName", "deploy-journal");
        model.addAttribute("sideName", "deploy-journal");
        return "page/deploy-journal";
    }

    @GetMapping(value = "/build")
    public String build(Model model) {
        model.addAttribute("tagName", "deploy");
        return "redirect:build/exec";
    }

    /**
     * buildViews host -> tasks 构建主机
     * current 当前选定构建主机
     *
     * @param model
     * @return
     */
    @GetMapping(value = "/build/exec")
    public String buildExec(Model model) {
        model.addAttribute("tagName", "build-exec");
        model.addAttribute("sideName", "build-exec");
        return "page/build-exec";
    }

    @GetMapping(value = "/build/console/{id}")
    public String buildConsole(Model model, @PathVariable Long id) {
        model.addAttribute("tagName", "build-exec");
        model.addAttribute("sideName", "build-exec");
        TServiceBuildRecords one = buildRecordsRepository.findOne(id);
        model.addAttribute("currentConsole", one);
        return "page/build-console";
    }

    @GetMapping(value = "/container/terminal")
    public String containerTerminal(Model model) {
        model.addAttribute("tagName", "deploy-exec");
        model.addAttribute("sideName", "deploy-exec");
        return "page/container-terminal";
    }
}
