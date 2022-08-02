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
  ]
};

module.exports = function () {
  const execPath = path.resolve("./");
  let externalConfig = {};
  try {
    externalConfig = require(`${execPath}/pserver.config.js`) || {};
  } catch (error) {
    console.log(chalk.yellow("未找到pserver.config.js文件，服务采用默认文件"));
  }

  // 检查和格式化config
  const normalizeConfig = {
    ...defaultConfig
  };
  Object.entries(externalConfig).forEach(([keyname, value])=> {
    if(defaultConfig.hasOwnProperty(keyname)) {
      normalizeConfig[keyname] = value;
    } else {
      console.log(chalk.red(`[warning] config配置中不存在${keyname}属性`));
    }
  });

  return new Proxy(normalizeConfig, {
    ...Reflect,
    set: () => false
  });
};
