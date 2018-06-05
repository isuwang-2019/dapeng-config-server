package com.github.dapeng.web;

import com.github.dapeng.common.CommonRepose;
import com.github.dapeng.dto.ConfigInfoDto;
import com.github.dapeng.entity.ConfigInfo;
import com.github.dapeng.openapi.cache.ZookeeperClient;
import com.github.dapeng.openapi.utils.Constants;
import com.github.dapeng.repository.ConfigInfoRepository;
import com.github.dapeng.util.ZkUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.github.dapeng.common.ConfigStatusEnum;
import com.github.dapeng.common.Commons;

/**
 * @author with struy.
 * Create by 2018/5/31 00:17
 * email :yq1724555319@gmail.com
 */
@RestController
@RequestMapping("/api")
@Transactional(rollbackFor = Throwable.class)
public class ConfigRestController {

    @Autowired
    ConfigInfoRepository repository;

    /**
     * 添加配置
     */
    @PostMapping(value = "/config/add")
    public ResponseEntity<?> addConfig(@RequestBody ConfigInfoDto configInfoDto) {
        if (configInfoDto.getServiceName().isEmpty()) return ResponseEntity
                .ok(CommonRepose.of(Commons.SUCCESS_CODE, Commons.SERVICE_ISEMPTY_MSG));
        // 校验呢配置规则？
        try {
            saveConfig(configInfoDto,ConfigStatusEnum.PASS.key());
            return ResponseEntity
                    .ok(CommonRepose.of(Commons.SUCCESS_CODE, Commons.SAVE_SUCCESS_MSG));
        }catch (Exception e){
            return ResponseEntity
                    .ok(CommonRepose.of(Commons.ERROR_CODE, e.getMessage()));
        }

    }

    /**
     * 删除配置信息
     *
     * @param id
     * @return
     */
    @PostMapping(value = "/config/delete/{id}")
    public ResponseEntity<?> delConfig(@PathVariable Long id) {
        ConfigInfo configInfo = repository.getOne(id);
        // 失效
        configInfo.setStatus(ConfigStatusEnum.FAILURE.key());
        return ResponseEntity
                .ok(CommonRepose.of(Commons.SUCCESS_CODE, Commons.DEL_SUCCESS_MSG));
    }

    /**
     * 修改配置信息
     * 1.修改配置信息,将新的修改保存为新的记录
     * 2.上一条记录将不做任何改动,相当记录流水信息
     *
     * @param id
     * @return
     */
    @PostMapping(value = "/config/edit/{id}")
    public ResponseEntity<?> editConfig(@PathVariable Long id, @RequestBody ConfigInfoDto configInfoDto) {
        try {
            saveConfig(configInfoDto,ConfigStatusEnum.PASS.key());
            return ResponseEntity
                    .ok(CommonRepose.of(Commons.SUCCESS_CODE, Commons.SAVE_SUCCESS_MSG));
        }catch (Exception e){
            return ResponseEntity
                    .ok(CommonRepose.of(Commons.ERROR_CODE, e.getMessage()));
        }
    }

    /**
     * 修改配置并发布
     * 0.修改历史配置为审核通过状态
     * 1.保存修改配置为新配置
     * 2.发布配置(当前提交新增的配置)
     * 3.发布的配置是当前配置
     *
     * @param id
     * @return
     */
    @PostMapping(value = "/config/editAndPublish/{id}")
    public ResponseEntity<?> editAndPublish(@PathVariable Long id, @RequestBody ConfigInfoDto configInfoDto) {
        try {

            // 0.修改历史配置为审核通过状态
            List<ConfigInfo> configInfos = repository.findByServiceName(configInfoDto.getServiceName());
            configInfos.forEach(c -> {
                c.setStatus(ConfigStatusEnum.PASS.key());
            });
            // 1.保存修改配置为新配置,并且状态为已发布

            saveConfigAndPublish(configInfoDto,ConfigStatusEnum.PUBLISHED.key());
            // 2.发布当前提交修改的配置
            processPublish(configInfoDto);

            return ResponseEntity
                    .ok(CommonRepose.of(Commons.SUCCESS_CODE, Commons.EDITED_PUBLISH_SUCCESS_MSG));
        }catch (Exception e){
            return ResponseEntity
                    .ok(CommonRepose.of(Commons.ERROR_CODE, e.getMessage()));
        }
    }

    /**
     * 获取单个详情配置
     */
    @GetMapping(value = "/config/{id}")
    public ResponseEntity<?> findOne(@PathVariable Long id) {
        Optional<ConfigInfo> configInfo = repository.findById(id);
        if (configInfo.isPresent()) {
            return ResponseEntity
                    .ok(CommonRepose.of(Commons.SUCCESS_CODE, configInfo));
        } else {
            return ResponseEntity
                    .ok(CommonRepose.of(Commons.ERROR_CODE, Commons.DATA_NOTFOUND_MSG));
        }
    }

    /**
     * 分页获取配置信息
     *
     * @param
     * @return
     */
    @GetMapping(value = "/configs")
    public ResponseEntity<?> getConfig(@RequestParam int page,
                                       @RequestParam int rows,
                                       @RequestParam(required = false) String sort,
                                       @RequestParam(required = false) String sortOrder,
                                       @RequestParam(required = false) String keyword) {
        if (page <= 0) return ResponseEntity
                .ok(CommonRepose.of(Commons.SUCCESS_CODE, Commons.PAGENO_ERROR_MSG));
        PageRequest pageRequest = PageRequest
                .of(page - 1, rows,
                        new Sort("desc".toUpperCase().equals(sortOrder.toUpperCase()) ? Sort.Direction.DESC : Sort.Direction.ASC,
                                null == sort ? "updatedAt" : sort));

        Page<ConfigInfo> infos = repository.findAllByServiceNameLikeOrVersionLike('%' + keyword + '%', '%' + keyword + '%', pageRequest);
        return ResponseEntity
                .ok(CommonRepose.of(Commons.SUCCESS_CODE, infos));
    }

    /**
     * 发布配置信息
     */
    @PostMapping(value = "/config/publish/{id}")
    public ResponseEntity<?> publishConfig(@PathVariable Long id) {
        return publish(id);
    }


    /**
     * 回滚配置
     */
    @PostMapping(value = "/config/rollback/{id}")
    public ResponseEntity<?> rollbackConfig(@PathVariable Long id) {
        // 回滚：：==> 重置为发布状态 ==> 更新
        return ResponseEntity.ok(CommonRepose.of(Commons.SUCCESS_CODE, Commons.ROLLBACK_SUCCESS_MSG));
    }


    /**
     * 通过dto信息保存配置信息
     *
     * @param configInfoDto
     */
    private ConfigInfo saveConfig(ConfigInfoDto configInfoDto,int status) {
        ConfigInfo configInfo = new ConfigInfo();
        configInfo.setServiceName(configInfoDto.getServiceName());
        configInfo.setStatus(status);
        configInfo.setVersion(UUID.randomUUID().toString());
        configInfo.setFreqConfig(configInfoDto.getFreqConfig());
        configInfo.setRouterConfig(configInfoDto.getRouterConfig());
        configInfo.setTimeoutConfig(configInfoDto.getTimeoutConfig());
        configInfo.setLoadbalanceConfig(configInfoDto.getLoadbalanceConfig());

        return repository.saveAndFlush(configInfo);
    }


    /**
     * 通过dto信息保存配置信息
     *
     * @param configInfoDto
     */
    private ConfigInfo saveConfigAndPublish(ConfigInfoDto configInfoDto,int status) {
        ConfigInfo configInfo = new ConfigInfo();
        configInfo.setServiceName(configInfoDto.getServiceName());
        configInfo.setStatus(status);
        configInfo.setVersion(UUID.randomUUID().toString());
        configInfo.setFreqConfig(configInfoDto.getFreqConfig());
        configInfo.setRouterConfig(configInfoDto.getRouterConfig());
        configInfo.setTimeoutConfig(configInfoDto.getTimeoutConfig());
        configInfo.setLoadbalanceConfig(configInfoDto.getLoadbalanceConfig());
        Long now = System.currentTimeMillis();
        configInfo.setUpdatedAt(new Timestamp(now));
        configInfo.setPublishedAt(new Timestamp(now));
        configInfo.setUpdatedBy(0);
        configInfo.setPublishedBy(0);

        return repository.saveAndFlush(configInfo);
    }

    /**
     * 发布逻辑
     */
    private ResponseEntity<?> publish(Long id) {
        // 将配置发布到对应的zk节点data或者node
        Optional<ConfigInfo> config = repository.findById(id);
        if (config.isPresent()) {
            ConfigInfo ci = config.get();
            if (ci.getStatus() == ConfigStatusEnum.PUBLISHED.key()) {
                return ResponseEntity
                        .ok(CommonRepose.of(Commons.SUCCESS_CODE, Commons.CONFIG_PUBLISHED_MSG));
            }

            // 更新历史发布为初始状态
            List<ConfigInfo> configInfos = repository.findByServiceName(ci.getServiceName());
            configInfos.forEach(c -> {
                if (c.getId() != ci.getId()) {
                    c.setStatus(ConfigStatusEnum.PASS.key());
                }
                //repository.saveAndFlush(c);
            });

            ConfigInfoDto cid = new ConfigInfoDto();
            cid.setServiceName(ci.getServiceName());
            cid.setFreqConfig(ci.getFreqConfig());
            cid.setLoadbalanceConfig(ci.getLoadbalanceConfig());
            cid.setTimeoutConfig(cid.getTimeoutConfig());
            cid.setRouterConfig(cid.getRouterConfig());

            processPublish(cid);
            // 已发布
            ci.setStatus(ConfigStatusEnum.PUBLISHED.key());
            Long now = System.currentTimeMillis();
            ci.setUpdatedAt(new Timestamp(now));
            ci.setPublishedAt(new Timestamp(now));
            ci.setUpdatedBy(0);
            ci.setPublishedBy(0);
            return ResponseEntity
                    .ok(CommonRepose.of(Commons.SUCCESS_CODE, Commons.PUBLISH_SUCCESS_MSG));
        } else {
            return ResponseEntity
                    .ok(CommonRepose.of(Commons.SUCCESS_CODE, Commons.DATA_NOTFOUND_MSG));
        }
    }

    private void processPublish(ConfigInfoDto cid){
        ZookeeperClient zk = ZkUtil.getCurrInstance();
        String service = cid.getServiceName();
        // 超时，负载均衡
        zk.createData(Constants.SERVICE_RUNTIME_PATH + "/" + service, cid.getTimeoutConfig() + cid.getLoadbalanceConfig());
        // 路由
        zk.createData(Constants.CONFIG_ROUTER_PATH + "/" + service, cid.getRouterConfig());
        // 限流
        zk.createData(Constants.CONFIG_FREQ_PATH + "/" + service, cid.getFreqConfig());
    }
}
