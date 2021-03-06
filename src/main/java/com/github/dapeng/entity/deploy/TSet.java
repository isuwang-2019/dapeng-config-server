package com.github.dapeng.entity.deploy;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
@Table(name = "t_set")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "name")
    private String name;
    @Column(name = "env")
    private String env;
    @Column(name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private java.sql.Timestamp createdAt;
    @Column(name = "updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+08:00")
    private java.sql.Timestamp updatedAt;
    @Column(name = "remark")
    private String remark;
    @Column(name = "network_mtu")
    private String networkMtu;
    @Column(name = "deleted")
    private int deleted;
    @Column(name = "build_host")
    private long buildHost;

    public int getDeleted() {
        return deleted;
    }

    public void setDeleted(int deleted) {
        this.deleted = deleted;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getEnv() {
        return env;
    }

    public void setEnv(String env) {
        this.env = env;
    }


    public java.sql.Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(java.sql.Timestamp createdAt) {
        this.createdAt = createdAt;
    }


    public java.sql.Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(java.sql.Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }


    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getNetworkMtu() {
        return networkMtu;
    }

    public void setNetworkMtu(String networkMtu) {
        this.networkMtu = networkMtu;
    }

    public long getBuildHost() {
        return buildHost;
    }

    public void setBuildHost(long buildHost) {
        this.buildHost = buildHost;
    }

    @Override
    public String toString() {
        return "TSet{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", env='" + env + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                ", remark='" + remark + '\'' +
                ", networkMtu='" + networkMtu + '\'' +
                '}';
    }
}
