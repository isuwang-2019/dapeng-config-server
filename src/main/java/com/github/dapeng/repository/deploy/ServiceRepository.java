package com.github.dapeng.repository.deploy;

import com.github.dapeng.entity.deploy.TService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Set;

/**
 * @author with struy.
 * Create by 2018/7/19 18:57
 * email :yq1724555319@gmail.com
 */

public interface ServiceRepository extends JpaRepository<TService, Long>, JpaSpecificationExecutor<TService> {
    List<TService> findTop1ByIdOrderByUpdatedAtDesc(Long id);


    /**
     * 根据服务名查找
     *
     * @param name
     * @return
     */
    List<TService> findByName(String name);

    /**
     * 根据指定状态查询
     *
     * @param status
     * @return
     */
    List<TService> findByDeletedIsOrderByName(Integer status);

    /**
     * 不包含某些id
     * @param ids
     * @return
     */
    List<TService> findAllByIdNotIn(Set<Long> ids);
}
