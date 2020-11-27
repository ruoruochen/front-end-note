const invokeGit = require("./git-cmd");
const toast = require("./toast");
const logger = require("./log");
const watch = require("./watchFile");
const { dirPath } = require("./config.json");

logger.info('服务启动成功');
toast("nodejsUploadMarkdown初始化成功");

// 程序加载 ---- 更新文件
invokeGit("pull", true).then(() => {
    watch(dirPath);
    logger.info("监听文件");
    toast("markdwon笔记初始化更新完成，开始监听文件自动同步");
});
