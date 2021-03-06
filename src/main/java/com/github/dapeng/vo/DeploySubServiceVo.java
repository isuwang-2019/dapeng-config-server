package com.github.dapeng.vo;

/**
 * @author with struy.
 * Create by 2018/7/25 20:41
 * email :yq1724555319@gmail.com
 * 主机实例下服务
 */

public class DeploySubServiceVo {
    private long setId;
    private long serviceId;
    private long unitId;
    private String serviceName;
    private boolean needUpdate = true;
    private int serviceStatus = 0;
    private Long deployTime;
    private Long configUpdateBy;
    private String containerName;

    public long getSetId() {
        return setId;
    }

    public void setSetId(long setId) {
        this.setId = setId;
    }

    public long getServiceId() {
        return serviceId;
    }

    public void setServiceId(long serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public boolean isNeedUpdate() {
        return needUpdate;
    }

    public void setNeedUpdate(boolean needUpdate) {
        this.needUpdate = needUpdate;
    }

    public int getServiceStatus() {
        return serviceStatus;
    }

    public void setServiceStatus(int serviceStatus) {
        this.serviceStatus = serviceStatus;
    }

    public Long getDeployTime() {
        return deployTime;
    }

    public void setDeployTime(Long deployTime) {
        this.deployTime = deployTime;
    }

    public Long getConfigUpdateBy() {
        return configUpdateBy;
    }

    public void setConfigUpdateBy(Long configUpdateBy) {
        this.configUpdateBy = configUpdateBy;
    }

    public long getUnitId() {
        return unitId;
    }

    public void setUnitId(long unitId) {
        this.unitId = unitId;
    }

    public String getContainerName() {
        return containerName;
    }

    public void setContainerName(String containerName) {
        this.containerName = containerName;
    }
}
