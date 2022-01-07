/*
 * @Description: 图片转换
 * @Autor: kindring
 * @Date: 2022-01-07 11:44:32
 * @LastEditors: kindring
 * @LastEditTime: 2022-01-07 15:58:25
 * @LastDescript: 
 */
const fs = require('fs');
const path = require('path')
const handle = require('../public/handle');
// 读取目录下的文件
function loadDirs(url) {
    return new Promise((resolve, reject) => {
        fs.readdir(url, function(err, files) {
            if (err) {
                reject(err)
                return
            }
            resolve(files)
        })
    })

}


async function main() {
    let [err, files] = await handle(loadDirs(path.join(__dirname, '../static/')))
    console.log(files);
}
main()