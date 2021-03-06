package com.github.dapeng.web.config;

import com.github.dapeng.client.netty.RequestUtils;
import com.github.dapeng.common.Commons;
import com.github.dapeng.common.Resp;
import com.github.dapeng.entity.config.ZkNode;
import com.github.dapeng.entity.monitor.MonitorInstance;
import com.github.dapeng.entity.monitor.MonitorMethod;
import com.github.dapeng.entity.monitor.MonitorService;
import com.github.dapeng.repository.config.ZkNodeRepository;
import com.github.dapeng.util.DateUtil;
import com.github.dapeng.util.InfluxDBUtil;
import com.github.dapeng.util.ZkUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.zookeeper.ZooKeeper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.github.dapeng.openapi.utils.Constants.SERVICE_RUNTIME_PATH;

/**
 * 服务监控
 *
 * @author huyj
 * @Created 2018/6/13 21:40
 */
@RestController
@RequestMapping("/api")
@Transactional(rollbackFor = Exception.class)
public class MonitorController {

    private static final Logger logger = LoggerFactory.getLogger(MonitorController.class);

    @Autowired
    ZkNodeRepository zkNodeRepository;

    /**
     * 获取服务缓存列表
     *
     * @return
     */
    @GetMapping(value = "/serviceList")
    public ResponseEntity<?> serviceList(@RequestParam long id) {
        ZkNode zkNode = zkNodeRepository.findOne(id);
        List<MonitorService> monitorServiceList = new ArrayList<>();
        String zkHost = Objects.isNull(zkNode) ? "127.0.0.1" : zkNode.getZkHost();
        ZooKeeper zooKeeper;
        try {
            zooKeeper = ZkUtil.createZkByHost(zkHost);
        } catch (Exception e) {
            return ResponseEntity.ok(Resp.of(Commons.ERROR_CODE, e.getMessage(), null));
        }
        List<String> services = ZkUtil.getNodeChildren(zooKeeper, SERVICE_RUNTIME_PATH, false);

        logger.info("***services.size() = [{}]", services.size());
        if (!services.isEmpty()) {
            for (String service : services) {

                MonitorService monitorService = new MonitorService(service);
                List<String> instances = ZkUtil.getNodeChildren(zooKeeper, SERVICE_RUNTIME_PATH + "/" + service, false);
                logger.info("***instances.size() = [{}]", instances.size());
                if (!instances.isEmpty()) {
                    List<MonitorInstance> instancesList = new ArrayList<>();
                    for (String instItem : instances) {
                        MonitorInstance monitorInstance = null;
                        try {
                            //获取 实例信息
                            monitorInstance = fillInstanceInfo(instItem, service, zkNode);

                        } catch (Exception e) {
                            logger.error("get fluxdb data ...", e.getMessage(), e);
                            return ResponseEntity.ok(Resp.of(Commons.ERROR_CODE, e.getMessage(), null));
                        }

                        instancesList.add(monitorInstance);
                    }
                    instancesList.sort(Comparator.comparing(MonitorInstance::getCallCount).reversed());
                    monitorService.setInstanceList(instancesList);
                }
                monitorServiceList.add(monitorService);
            }
        }
        ZkUtil.closeZk(zooKeeper);
        return ResponseEntity.ok(Resp.of(Commons.SUCCESS_CODE, "", monitorServiceList));
    }

    /**
     * 获取实例方法调用信息
     *
     * @return
     */
    @GetMapping(value = "/loadMethodInfo")
    public ResponseEntity<?> loadMethodInfo(@RequestParam String instance, @RequestParam String serviceName, @RequestParam Long id) {
        ZkNode zkNode;
        zkNode = zkNodeRepository.findOne(id);
        List<MonitorMethod> methodList;
        try {
            //获得方法实例信息
            methodList = fillInstanceMethodInfo(instance, serviceName, zkNode);
        } catch (Exception e) {
            logger.error("loadMethodInfo:: get fluxdb data ...", e.getMessage(), e);
            return ResponseEntity.ok(Resp.of(Commons.ERROR_CODE, "[loadMethodInfo fail]  :: " + e.getMessage(), null));
        }
        return ResponseEntity.ok(Resp.of(Commons.SUCCESS_CODE, "", methodList));
    }


    /**
     * 获取集群列表
     *
     * @return
     */
    @GetMapping(value = "/loadNodes")
    public ResponseEntity<?> loadNodes() {
        return ResponseEntity.ok(Resp.of(Commons.SUCCESS_CODE, "", zkNodeRepository.findAll()));
    }

    /**
     * 获得服务实例信息
     *
     * @param instance
     * @param serviceName
     * @param zkNode
     * @return
     * @throws Exception
     */
    private MonitorInstance fillInstanceInfo(String instance, String serviceName, ZkNode zkNode) throws Exception {
        long callCount = 0;
        double averageTime = 0;
        long failCount = 0;
        boolean runStatus = false;
        String containerPool = null;
        String containerTask = null;

        String[] instanceArr = instance.split("[:]");
        InfluxDBUtil influxDBUtil = new InfluxDBUtil(zkNode.getInfluxdbUser(), zkNode.getInfluxdbPass(), InfluxDBUtil.getOpenUrl(zkNode), "dapengState");
        String queryStr = "SELECT sum(fail_calls) as failCount,sum(total_calls)  as callCount,sum(i_total_time) as totalTime " +
                "FROM dapeng_service_process " +
                "where service_name = '" + serviceName + "' " +
                "and time >= '" + DateUtil.getInfluxDbDate() + "'" +
                "and server_ip = '" + instanceArr[0] + "'  " +
                "and server_port = '" + instanceArr[1] + "'";
        List<HashMap<String, Object>> hashMaps = influxDBUtil.query(queryStr);
        if (hashMaps != null && !hashMaps.isEmpty()) {
            callCount = ((Double) hashMaps.get(0).get("callCount")).longValue();
            failCount = ((Double) hashMaps.get(0).get("failCount")).longValue();
            double totalTime = (double) hashMaps.get(0).get("totalTime");
            if (callCount > 0) {
                averageTime = totalTime / callCount;
            }
        }

        //  "shutdown / terminating / terminated[false / false / false] -activeCount / poolSize[0 / 6] -waitingTasks / completeTasks / totalTasks[0 / 6 / 6]";
        String containerInfo = RequestUtils.getRemoteServiceEcho(instanceArr[0], Integer.parseInt(instanceArr[1]), serviceName, instanceArr[2]);
        if (StringUtils.isNotBlank(containerInfo)) {
            runStatus = true;
            Pattern pattern = Pattern.compile("terminated\\[(.+?)\\] .* poolSize\\[(.+?)\\] .* totalTasks\\[(.+?)\\]");
            Matcher m = pattern.matcher(containerInfo);
            while (m.find()) {
                containerPool = "[ " + m.group(2) + " ]";
                containerTask = "[ " + m.group(3) + " ]";
            }
        }
        return new MonitorInstance(instance, callCount, new BigDecimal(averageTime).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue(), failCount, containerPool, containerTask, runStatus);
    }


    /**
     * 获得实例方法信息
     *
     * @param instance
     * @param serviceName
     * @param zkNode
     * @return
     * @throws Exception
     */
    private List<MonitorMethod> fillInstanceMethodInfo(String instance, String serviceName, ZkNode zkNode) throws Exception {
        String[] instanceArr = instance.split("[:]");
        InfluxDBUtil influxDBUtil = new InfluxDBUtil(zkNode.getInfluxdbUser(), zkNode.getInfluxdbPass(), InfluxDBUtil.getOpenUrl(zkNode), "dapengState");
        String queryStr = "SELECT sum(fail_calls) as failCount,sum(total_calls) as callCount,sum(i_total_time) as totalTime,max(i_max_time) as maxTime " +
                "FROM dapeng_service_process " +
                "where service_name = '" + serviceName + "' " +
                "and time >= '" + DateUtil.getInfluxDbDate() + "'" +
                "and server_ip = '" + instanceArr[0] + "'  " +
                "and server_port = '" + instanceArr[1] + "' " +
                "GROUP BY method_name";
        List<HashMap<String, Object>> methodMaps = influxDBUtil.query(queryStr);
        List<MonitorMethod> methodList = new ArrayList<>();
        if (methodMaps != null && !methodMaps.isEmpty()) {
            methodMaps.forEach(map -> {
                System.out.println(map);
                long maxTime = ((Double) map.get("maxTime")).longValue();
                double averageTime = 0;
                long callCount = ((Double) map.get("callCount")).longValue();
                long failCount = ((Double) map.get("failCount")).longValue();
                double totalTime = (double) map.get("totalTime");
                String methodName = (String) map.get("method_name");
                if (callCount > 0) {
                    averageTime = totalTime / callCount;
                }
                MonitorMethod monitorMethod = new MonitorMethod(methodName, maxTime, new BigDecimal(averageTime).setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue(), callCount, failCount);
                methodList.add(monitorMethod);
            });
        }

        methodList.sort(Comparator.comparing(MonitorMethod::getCallCount).reversed());
        return methodList;
    }
}

