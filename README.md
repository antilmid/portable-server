# Portable-server文档
---

## 一、Portable-server能做什么
  - 快捷简单启动一个静态资源服务
  - 支持https和http服务
  - 暴露几乎所有接口，可配置的服务器模式
  - 转发和代理的集成

  **总而言之，Portable-server是一个快捷方便的搭建测试服务器和测试环境的服务工具**
  
  **⚠️**需要注意，Portable-server的目标是希望快速启动一个服务，所以并没有性能上的优化和健壮性，只适合测试服务的搭建，不能用于生产环境。


## 二、使用
```bash
npm install -g portable-server
pserver
```

启动服务前，确保当前目录有`pserver.config.js`配置文件

## 三、pserver.config.js配置

### 3.1 staticRoot
  - 类型：`string`
  - 描述：静态服务目录
  - 默认值：`"./"`


### 3.2 port
  - 类型：`number`
  - 描述：服务端口
  - 默认值：`3000`

### 3.3 proxy
  - 类型：`proxyConf[]`
  - 描述：转发和代理的相关配置
  - 默认值：`[]`

  **proxyConf**
  ```js
  {
     target: '',  // 转发目标服务器Host
     ...options // express-http-proxy options
  }
  ```
  除了target字段之外，其他全部继承express-http-proxy的option类型，里面的具体设置可以参考: [https://github.com/villadora/express-http-proxy](https://github.com/villadora/express-http-proxy)


### 3.4 https
  - 类型：`boolean | {key?: string, cert?: string}`
  - 描述：https服务设置
  - 默认值：`false`

### 3.5 dontInfo
  - 类型：`boolean`
  - 描述：是否不需要控制台信息
  - 默认值：`false`

### 3.6 hookInitExpress
  - 类型：`(expressApp:Express)=>void`
  - 描述：钩子函数，初始化Express
  - 默认值：`(expressApp)=>{}`

### 3.7 hookExpressListen
  - 类型：`()=>void`
  - 描述：钩子函数，服务器listen
  - 默认值：`()=>{}`