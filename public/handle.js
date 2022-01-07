/*
 * @Description: promise操作函数
 * @Autor: kindring
 * @Date: 2021-12-14 15:19:56
 * @LastEditors: kindring
 * @LastEditTime: 2022-01-07 15:35:30
 * @LastDescript: 
 */
function handle(promise) {
    return new Promise(resolve => {
        promise.then(val => {
            resolve([null, val])
        }).catch(err => {
            resolve([err])
        })
    })
}

module.exports = handle;