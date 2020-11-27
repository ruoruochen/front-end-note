const chokidar = require('chokidar');
const invokeGit = require("./git-cmd");

/**
 * 监听文件夹
 * @param {*} dir 
 */

module.exports = function(dirPath) {
    chokidar.watch(dirPath, {
        ignored: /(\.git)|(\.idea)|(\.vscode)/
    }).on("all", ((event, path) => {
        // 文件修改同步到github仓库
        invokeGit("push")
    }))
}
const chokidar = require('chokidar');
const invokeGit = require("./git-cmd");

/**
 * 监听文件夹
 * @param {*} dir 
 */

module.exports = function(dirPath) {
    chokidar.watch(dirPath, {
        ignored: /(\.git)|(\.idea)|(\.vscode)/
    }).on("all", ((event, path) => {
        // 文件修改同步到github仓库
        invokeGit("push")
    }))
}
