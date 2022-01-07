/*
 * @Description: websocket,相关的业务逻辑入口
 * @Autor: kindring
 * @Date: 2022-01-07 14:53:17
 * @LastEditors: kindring
 * @LastEditTime: 2022-01-07 15:16:41
 * @LastDescript: 
 */
const expressWs = require('express-ws');
const routerFileLoad = require('./wsbsocketRouter/fileLoad');
const log = require('./logger').logger('app', 'info');

const wsClients = {};
const events = {};
let nextId = 0;


// 初始化并且注册websocket
function initWs() {
    expressWs(app);
    app.wsClients = wsClients;
    app.ws('/', (ws, req) => {
        console.log('connection')
        let id = roomJoin(ws);
        // 客户端端口连接
        monitorEvent('register', routerFileLoad.register);
        ws.on('message', function(json) {
            // 内部监听信息,全部使用json进行连接 event to data;
            try {
                json = JSON.parse(json);
                metchEvent(json.event, json.data, ws);
            } catch (error) {
                log.warn(`解析socket的JSON数据失败${json}`);
            }
        });
        // 客户端端口连接
        ws.onclose = (d) => {
            log.warn(`解析socket的JSON数据失败${json}`);
            rmClient(id);
            // 广播当前服务器连接客户端数据
            let nowClients = Object.values(wsClients).filter(val => val).map(val => {
                return {
                    id: val.id,
                    type: val.type,
                }
            })
            broadcast('clientChange', nowClients)
        };
    })
}








// 注册事件
function monitorEvent(event, callback) {
    events[event] = events[event] || [];
    events.push(callback);
}

// 匹配注册到的事件
function metchEvent(event, params, ws) {
    try {
        events[event].forEach(fn => {
            fn(ws, params);
        });
    } catch (error) {

    }

}

function roomJoin(ws) {
    let id = nextId;
    wsClients[id] = {
        id: id,
        ws: ws,
        name: ''
    };
    nextId++;
    return id;
}

function findClient(id) {
    return wsClients[id];
}

function rmClient(id) {
    wsClients[id] = null;
}

/**
 * 广播给所有客户端信息
 * @param {string} event 要发送的事件
 * @param {string} msg 要发送的消息
 */
function broadcast(event, msg) {
    Object.keys(wsClients).forEach(val => {
        let item = wsClients[val];
        if (item) {
            item.ws.msend(event, msg);
        }
    })
}