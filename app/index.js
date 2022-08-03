#!/usr/bin/env node
// @ts-nocheck
const path = require("path");
const express = require("express");
const ip = require("ip");
const proxy = require("express-http-proxy");



// 功能组件引用
const normalizeConfig = require("./features/handleConfig")();
const logger = require('./features/logger')(normalizeConfig);

const app = express();
normalizeConfig.hookInitExpress(app);
app.use("/", express.static(path.resolve("./", normalizeConfig.staticRoot)));

(normalizeConfig.proxy || []).forEach((proxyConf) => {
  const { target, ...options } = proxyConf;
  app.use(proxy(target, options));
});

app.listen(3000, () => {
  logger.success(`服务启动成功:`);
  logger.success(`http地址: http://localhost:${normalizeConfig.port}`);
  logger.success(`http地址: http://${ip.address()}:${normalizeConfig.port}`);
  normalizeConfig.hookExpressListen();
});
