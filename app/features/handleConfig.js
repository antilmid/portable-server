const path = require("path");
const chalk = require("chalk");


const defaultConfig = {
  staticRoot: "./", // 静态服务目录
  port: 3000, // 服务端口
  proxy: [
    // {
    //   target: '',  // 转发前缀
    //   ...options // express-http-proxy options
    // }
  ],
  https: false, // htpps是否开启
  dontInfo: false, // 是否需要控制台信息
  hookInitExpress: (expressApp) => { // 钩子函数，初始化Express

  },
  hookExpressListen: () => { //  钩子函数，服务器listen
    
  }
};

module.exports = function () {
  const execPath = path.resolve("./");
  let externalConfig = {};
  const loggerTemp = require('./logger')({dontInfo: false});
  try {
    externalConfig = require(`${execPath}/pserver.config.js`) || {};
  } catch (error) {
    loggerTemp.error("未找到pserver.config.js文件，服务采用默认文件");
  }

  const logger = require('./logger')({dontInfo: externalConfig.dontInfo || false});

  // 检查和格式化config
  const normalizeConfig = {
    ...defaultConfig
  };
  Object.entries(externalConfig).forEach(([keyname, value])=> {
    if(defaultConfig.hasOwnProperty(keyname)) {
      normalizeConfig[keyname] = value;
    } else {
      logger.warning(`config配置中不存在${keyname}属性`);
    }
  });

  return new Proxy(normalizeConfig, {
    ...Reflect,
    set: () => false
  });
};
