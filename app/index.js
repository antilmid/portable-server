#!/usr/bin/env node
// @ts-nocheck
const path = require("path");
const express = require("express");
const chalk = require("chalk");
const ip = require("ip");
const proxy = require("express-http-proxy");

// 功能组件引用
const normalizeConfig = require("./features/handleConfig")();

const app = express();
app.use("/", express.static(path.resolve("./", normalizeConfig.staticRoot)));

(normalizeConfig.proxy || []).forEach((proxyConf) => {
  const { target, ...options } = proxyConf;
  app.use(proxy(target, options));
});

app.listen(3000, () => {
  console.log(chalk.green(`服务启动成功:`));
  console.log(
    chalk.green(`http地址: http://localhost:${normalizeConfig.port}`)
  );
  console.log(
    chalk.green(`http地址: http://${ip.address()}:${normalizeConfig.port}`)
  );
});
