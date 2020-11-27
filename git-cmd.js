const git = require('simple-git');
const toast = require("./toast"); // toast时一个消息提示插件，可有可无，所有的信息都会落在日志里,设置自启动后，消息提示不会生效
const { dirPath, branch, commitMessage, remote } = require("./config.json");
const logger = require('./log'); // 落日志

/**
 * 初始化git
 */
let gitEntity = git(dirPath)

/**
 * git提交，要先更新在提交
 */
function gitPush() {
    gitPull().then(() => {
        logger.info("开始提交到github");
        gitEntity
            .add('./*')
            .commit(commitMessage)
            .push([remote, branch])
            .then(() => {
                logger.info(`Push to ${branch} success`);
            })
            .catch(err => {
                logger.error(`Push to ${branch} error`);
                logger.error(err);
                toast(`Push to ${branch} error`);
            })

    })
}

/**
 * git更新
 */
function gitPull() {
    logger.info("开始从github更新");
    return gitEntity
        .pull(remote, branch)
        .then(() => {
            logger.info(`Pull to ${branch} success`);
        })
        .catch(err => {
            logger.error(`Pull to ${branch} error`);
            logger.error(err);
            toast(`Pull to ${branch} error`);
        });
}

/**
 * 延时执行函数, 延迟3秒
 */
const delayMethod = function (type) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            gitCmd[type]();
            clearTimeout(timer);
        }, 3000)
    }
};

const gitCmd = {
    push: gitPush,
    pull: gitPull,
    delayInvoke: {
        push: delayMethod("push"),
        pull: delayMethod("pull")
    }
}


module.exports = function (type, immediately) {
    if (immediately) {
        return gitCmd[type]();
    } else {
        gitCmd.delayInvoke[type]();
    }
}
