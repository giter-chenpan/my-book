'use strict';
/**
 * 生产环境配置文件
 */
var config = {
    env: 'production', //环境名称
    port: 3000,         //服务端口号
    mongodb_config: {
        //mongodb数据库配置
    }
};
module.exports = config;
