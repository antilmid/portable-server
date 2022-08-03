#!/usr/bin/env node
// @ts-nocheck
const path = require("path");
const express = require("express");
const ip = require("ip");
const proxy = require("express-http-proxy");
const fs = require('fs');
const https = require('https');



// 功能组件引用
const normalizeConfig = require("./features/handleConfig")();
const logger = require('./features/logger')(normalizeConfig);

const app = express();
normalizeConfig.hookInitExpress(app);
app.use("/", express.static(path.resolve("./", normalizeConfig.staticRoot)));

// 加载代理
(normalizeConfig.proxy || []).forEach((proxyConf) => {
  const { target, ...options } = proxyConf;
  app.use(proxy(target, options));
});

// 判断启动方式
if(normalizeConfig.https) {
  const key = fs.readFileSync(normalizeConfig.https.key || path.resolve(__dirname, './common/localhost.key'), 'utf8');
  const cert = fs.readFileSync(normalizeConfig.https.cert || path.resolve(__dirname, './common/localhost.crt'), 'utf8');
  const httpsServer = https.createServer({key, cert}, app);
  httpsServer.listen(normalizeConfig.port, ()=>{
    logger.success(`服务启动成功:`);
    logger.success(`https地址: https://localhost:${normalizeConfig.port}`);
    logger.success(`https地址: https://${ip.address()}:${normalizeConfig.port}`);
  });
} else {
  app.listen(normalizeConfig.port, () => {
    logger.success(`服务启动成功:`);
    logger.success(`http地址: http://localhost:${normalizeConfig.port}`);
    logger.success(`http地址: http://${ip.address()}:${normalizeConfig.port}`);
    normalizeConfig.hookExpressListen();
  });
}


