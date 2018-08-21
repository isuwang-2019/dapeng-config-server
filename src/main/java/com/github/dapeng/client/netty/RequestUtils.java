package com.github.dapeng.client.netty;

import com.github.dapeng.core.InvocationContextImpl;
import com.github.dapeng.core.helper.DapengUtil;
import com.github.dapeng.echo.echo_args;
import com.github.dapeng.echo.echo_argsSerializer;
import com.github.dapeng.echo.echo_result;
import com.github.dapeng.echo.echo_resultSerializer;
import com.github.dapeng.metadata.GetServiceMetadata_argsSerializer;
import com.github.dapeng.metadata.GetServiceMetadata_resultSerializer;
import com.github.dapeng.metadata.getServiceMetadata_args;
import com.github.dapeng.metadata.getServiceMetadata_result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 调用远程服务的工具
 *
 * @author huyj
 * @Created 2018/6/11 21:22
 */
public class RequestUtils {
    private static final Logger logger = LoggerFactory.getLogger(RequestUtils.class);

    private static final long TIME_OUT = 500;
    private static final String METADATA_METHOD = "getServiceMetadata";
    private static final String ECHO_METHOD = "echo";


    /**
     * 远程调用 getmetadata 方法
     *
     * @param romoteIp
     * @param remotePort
     * @param serviceName
     * @param version
     * @return
     */
    public static String getRemoteServiceMetadata(String remoteIp, Integer remotePort, String serviceName, String version) {
        InvocationContextImpl.Factory.currentInstance().sessionTid(DapengUtil.generateTid()).callerMid("InnerApiSite");
        SubPool subPool = SubPoolFactory.getSubPool(remoteIp, remotePort);
        getServiceMetadata_result result = null;
        try {
            result = subPool.getConnection().send(serviceName, version, METADATA_METHOD,
                    new getServiceMetadata_args(),
                    new GetServiceMetadata_argsSerializer(),
                    new GetServiceMetadata_resultSerializer(), TIME_OUT);
            return result.getSuccess();
        } catch (Exception e) {
            //e.printStackTrace();
            logger.error("----- service[{}:{}:{}] load metadata failed .. Cause :{} ", serviceName, remoteIp, remotePort, e.getMessage());
            return "";
        }
    }

    /**
     * 远程调用 echo 方法
     *
     * @param romoteIp
     * @param remotePort
     * @param serviceName
     * @param version
     * @return
     */
    public static String getRemoteServiceEcho(String remoteIp, Integer remotePort, String serviceName, String version) {
        InvocationContextImpl.Factory.currentInstance().sessionTid(DapengUtil.generateTid()).callerMid("InnerApiSite");
        SubPool subPool = SubPoolFactory.getSubPool(remoteIp, remotePort);
        echo_result result = null;
        try {
            result = subPool.getConnection().send(serviceName, version, ECHO_METHOD,
                    new echo_args(),
                    new echo_argsSerializer(),
                    new echo_resultSerializer(), TIME_OUT);
            return result.getSuccess();
        } catch (Exception e) {
            logger.error("----- service[{}:{}:{}] get echo failed .. Cause : {}", serviceName, remoteIp, remotePort, e.getMessage());
            return "";
        }
        //return "shutdown / terminating / terminated[false / false / false] -activeCount / poolSize[0 / 6] -waitingTasks / completeTasks / totalTasks[0 / 6 / 6]";
    }
}
