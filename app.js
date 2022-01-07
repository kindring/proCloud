/*
 * @Description: 软件入口
 * @Autor: kindring
 * @Date: 2022-01-07 11:36:00
 * @LastEditors: kindring
 * @LastEditTime: 2022-01-07 16:19:29
 * @LastDescript: 
 */
const path = require('path');

const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');


const serverConfig = require('./configs/server.json');
const router = require('./router/router_index.js');
const log = require('./logger').logger('app', 'info');
const app = express();


// 配置模板位置
app.set('views', './views');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// 配置session
app.use(
    session({
        secret: 'kindring',
        name: 'session', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie: { maxAge: 1800000 }, //过期时间半小时
        keys: ['owner'],
        resave: false,
        saveUninitialized: true,
    })
);

app.listen(serverConfig.port, serverConfig.host, () => {
    log.warn(`服务启动 server is running to @http://${serverConfig.host}:${serverConfig.port}`);
});