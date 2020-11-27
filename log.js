const log4js = require('log4js');

log4js.configure({
    appenders: {
        file: {
            type: 'file',
            filename: 'logs/app.log',
            layout: {
                type: 'pattern',
                pattern: '%r %p - %m',
            }
        }
    },
    categories: {
        default: {
            appenders: ['file'],
            level: 'debug'
        }
    }
})

module.exports = log4js.getLogger()
