package com.github.dapeng.web;

import com.github.dapeng.common.Resp;
import com.github.dapeng.dto.UnitDto;
import com.github.dapeng.entity.deploy.TDeployUnit;
import com.github.dapeng.repository.deploy.DeployUnitRepository;
import com.github.dapeng.repository.deploy.HostRepository;
import com.github.dapeng.repository.deploy.ServiceRepository;
import com.github.dapeng.repository.deploy.SetRepository;
import com.github.dapeng.util.DateUtil;
import com.github.dapeng.util.DeployCheck;
import com.github.dapeng.vo.UnitVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static com.github.dapeng.common.Commons.*;
import static com.github.dapeng.util.NullUtil.isEmpty;

/**
 * @author with struy.
 * Create by 2018/7/19 16:14
 * email :yq1724555319@gmail.com
 */
@RestController
@RequestMapping("/api")
@Transactional(rollbackFor = Throwable.class)
public class DeployUnitRestController {

    private static Logger LOGGER = LoggerFactory.getLogger(DeployUnitRestController.class);

    @Autowired
    SetRepository setRepository;
    @Autowired
    HostRepository hostRepository;
    @Autowired
    ServiceRepository serviceRepository;
    @Autowired
    DeployUnitRepository unitRepository;

    /**
     * @return 部署单元
     */
    @GetMapping("/deploy-units")
    public ResponseEntity<?> deployUnits() {
        List<TDeployUnit> units = unitRepository.findAll();
        List<UnitVo> unitVos = units.stream().map(u -> {
            UnitVo vo = new UnitVo();
            vo.setId(u.getId());
            vo.setSetId(u.getSetId());
            vo.setSetName(setRepository.getOne(u.getSetId()).getName());
            vo.setHostId(u.getHostId());
            vo.setHostName(hostRepository.getOne(u.getHostId()).getName());
            vo.setServiceId(u.getServiceId());
            vo.setServiceName(serviceRepository.getOne(u.getServiceId()).getName());
            vo.setCreatedAt(u.getCreatedAt());
            vo.setDockerExtras(u.getDockerExtras());
            vo.setEnv(u.getEnv());
            vo.setGitTag(u.getGitTag());
            vo.setImageTag(u.getImageTag());
            vo.setPorts(u.getPorts());
            vo.setUpdatedAt(u.getUpdatedAt());
            vo.setVolumes(u.getVolumes());
            return vo;
        }).collect(Collectors.toList());
        return ResponseEntity
                .ok(Resp.of(SUCCESS_CODE, LOADED_DATA, unitVos));
    }

    /**
     * 根据Id获取当前部署单元信息
     *
     * @return
     */
    @GetMapping("/deploy-unit/{id}")
    public ResponseEntity<?> deployUnitById(@PathVariable long id) {
        TDeployUnit unit = unitRepository.findOne(id);
        return ResponseEntity
                .ok(Resp.of(SUCCESS_CODE, LOADED_DATA, unit));
    }

    /**
     * 获取所有的发布tag
     *
     * @return
     */
    @GetMapping("/deploy-tags")
    public ResponseEntity<?> deployTags() {
        List<TDeployUnit> units = unitRepository.findAll();
        List<String> gitTags = units
                .stream()
                .map(TDeployUnit::getGitTag)
                .distinct()
                .collect(Collectors.toList());
        return ResponseEntity
                .ok(Resp.of(SUCCESS_CODE, LOADED_DATA, gitTags));
    }

    /**
     * 添加部署单元
     *
     * @param unitDto
     * @return
     */
    @PostMapping("/deploy-unit/add")
    public ResponseEntity<?> addUnit(@RequestBody UnitDto unitDto) {
        if (isEmpty(unitDto.getSetId())
                || isEmpty(unitDto.getHostId())
                || isEmpty(unitDto.getServiceId())
                || isEmpty(unitDto.getGitTag())
                || isEmpty(unitDto.getImageTag())) {
            return ResponseEntity
                    .ok(Resp.of(ERROR_CODE, SAVE_ERROR_MSG));
        }
        try {
            DeployCheck.hasChinese(unitDto.getGitTag(), "发布tag");
            DeployCheck.hasChinese(unitDto.getImageTag(), "镜像tag");
            TDeployUnit unit = new TDeployUnit();
            unit.setGitTag(unitDto.getGitTag());
            unit.setImageTag(unitDto.getImageTag());
            unit.setHostId(unitDto.getHostId());
            unit.setServiceId(unitDto.getServiceId());
            unit.setSetId(unitDto.getSetId());
            unit.setEnv(unitDto.getEnv());
            unit.setPorts(unitDto.getPorts());
            unit.setVolumes(unitDto.getVolumes());
            unit.setDockerExtras(unitDto.getDockerExtras());
            unit.setCreatedAt(DateUtil.now());
            unit.setUpdatedAt(DateUtil.now());

            unitRepository.save(unit);
            return ResponseEntity
                    .ok(Resp.of(SUCCESS_CODE, SAVE_SUCCESS_MSG));
        } catch (Exception e) {
            return ResponseEntity
                    .ok(Resp.of(ERROR_CODE, e.getMessage()));
        }
    }

    /**
     * 修改
     *
     * @param id
     * @param unitDto
     * @return
     */
    @PostMapping(value = "/deploy-unit/edit/{id}")
    public ResponseEntity<?> updateSet(@PathVariable Long id, @RequestBody UnitDto unitDto) {
        try {
            if (isEmpty(unitDto.getSetId())
                    || isEmpty(unitDto.getHostId())
                    || isEmpty(unitDto.getServiceId())
                    || isEmpty(unitDto.getGitTag())
                    || isEmpty(unitDto.getImageTag())) {
                return ResponseEntity
                        .ok(Resp.of(ERROR_CODE, SAVE_ERROR_MSG));
            }
            DeployCheck.hasChinese(unitDto.getGitTag(), "发布tag");
            DeployCheck.hasChinese(unitDto.getImageTag(), "镜像tag");
            TDeployUnit unit = unitRepository.getOne(id);
            unit.setGitTag(unitDto.getGitTag());
            unit.setImageTag(unitDto.getImageTag());
            unit.setHostId(unitDto.getHostId());
            unit.setServiceId(unitDto.getServiceId());
            unit.setSetId(unitDto.getSetId());
            unit.setEnv(unitDto.getEnv());
            unit.setPorts(unitDto.getPorts());
            unit.setVolumes(unitDto.getVolumes());
            unit.setDockerExtras(unitDto.getDockerExtras());
            unit.setUpdatedAt(DateUtil.now());
            unitRepository.save(unit);
            return ResponseEntity
                    .ok(Resp.of(SUCCESS_CODE, COMMON_SUCCESS_MSG));
        } catch (Exception e) {
            return ResponseEntity
                    .ok(Resp.of(ERROR_CODE, COMMON_ERRO_MSG));
        }
    }
}
