
const shell = require('shelljs');
const config = require('./config')
var webSocketService = require('./webSocketService')

const appPackageSergvice = {}
let log = ''
let logHistory = ''
let isProcess = false

appPackageSergvice.packageUatApp = (req, res) => {
    try {
        let branch = req.body.branch
        console.log(branch)
        if (!isProcess) {
            logHistory = ''
            isProcess = true
            log = shell.cd(config.appRootDirPath)
            //   shell.exit(1);
            log += "start package uat app"
            logHistory += log + '\n\nprocecc is running\n\n'
            // log += shell.exec('./gradlew assembleRelease')
            if (branch) {
                logHistory += '拉取代码：git pull \n'
                shell.exec("git pull ")
                logHistory += '切换分支：git checkout ' + branch + '\n'
                shell.exec("git checkout " + branch)
                // shell.exec("git pull ")
            }
            let childProcess = shell.exec('sh ./uat-package.sh', { async: true }, function (code, stdout, stderr) {
                // console.log('Exit code:', code);
                // console.log('Program output:', stdout);
                // console.log('Program stderr:', stderr);
                isProcess = false;
                // logHistory += stdout
                if (stderr) {
                    logHistory += '\n\n\nerr：=============================>\n' + stderr
                    webSocketService.sendCmd({ dataType: 'packLog', data: '\n\n\nerr：=============================>\n' + stderr })
                }

            });

            childProcess.stdout.on("data", function (data) {
                logHistory += data;
                webSocketService.sendCmd({ dataType: 'packLog', data })
            })

            childProcess.addListener('message', (message, sendHandle) => {
                console.log("message ==========================> ", message)
            })

        } else {
            log = 'Process is running'
        }

    } catch (e) {
        console.error('packageUatApp -->\n', e)
        log = 'packageUatApp -->\n' + e
    }
    res.send({
        msg: log,
        logArray: logHistory
    })
}

appPackageSergvice.getPackageLog = (req, res) => {
    res.send({
        log: logHistory
    })
}

appPackageSergvice.packageProdApp = (req, res) => {
    try {
        let branch = req.body.branch
        console.log(branch)
        if (!isProcess) {
            logHistory = ''
            isProcess = true
            log = shell.cd(config.appRootDirPath)
            //   shell.exit(1);
            log += "start package prod app"
            logHistory += log + '\n\nprocecc is running\n\n'
            // log += shell.exec('./gradlew assembleRelease')
            if (branch) {
                logHistory += '拉取代码：git pull \n'
                shell.exec("git pull ")
                logHistory += '切换分支：git checkout ' + branch + '\n'
                shell.exec("git checkout " + branch)
                // shell.exec("git pull ")
            }
            let childProcess = shell.exec('sh ./prod-package.sh', { async: true }, function (code, stdout, stderr) {
                // console.log('Exit code:', code);
                // console.log('Program output:', stdout);
                // console.log('Program stderr:', stderr);
                isProcess = false;
                // logHistory += stdout
                if (stderr) {
                    logHistory += '\n\n\nerr：=============================>\n' + stderr
                    webSocketService.sendCmd({ dataType: 'packLog', data: '\n\n\nerr：=============================>\n' + stderr })
                }

            });

            childProcess.stdout.on("data", function (data) {
                logHistory += data;
                webSocketService.sendCmd({ dataType: 'packLog', data })
            })

        } else {
            log = 'Process is running'
        }
    } catch (e) {
        console.error('packageUatApp -->\n', e)
        log = 'packageUatApp -->\n' + e
    }
    res.send({
        msg: log,
        logArray: logHistory
    })
}


appPackageSergvice.packageDebugApp = (req, res) => {
    try {
        let branch = req.body.branch
        console.log(branch)
        if (!isProcess) {
            logHistory = ''
            isProcess = true
            log = shell.cd(config.appRootDirPath)
            //   shell.exit(1);
            log += "start package debug app"
            logHistory += log + '\n\nprocecc is running\n\n'
            // log += shell.exec('./gradlew assembleRelease')
            if (branch) {
                logHistory += '拉取代码：git pull \n'
                shell.exec("git pull ")
                logHistory += '切换分支：git checkout ' + branch + '\n'
                shell.exec("git checkout " + branch)
                // shell.exec("git pull ")
            }
            let childProcess = shell.exec('sh ./debug-package.sh', { async: true }, function (code, stdout, stderr) {
                // console.log('Exit code:', code);
                // console.log('Program output:', stdout);
                // console.log('Program stderr:', stderr);
                isProcess = false;
                // logHistory += stdout
                if (stderr) {
                    logHistory += '\n\n\nerr：=============================>\n' + stderr
                    webSocketService.sendCmd({ dataType: 'packLog', data: '\n\n\nerr：=============================>\n' + stderr })
                }

            });

            childProcess.stdout.on("data", function (data) {
                logHistory += data;
                webSocketService.sendCmd({ dataType: 'packLog', data })
            })

            childProcess.addListener('message', (message, sendHandle) => {
                console.log("message ==========================> ", message)
            })

        } else {
            log = 'Process is running'
        }

    } catch (e) {
        console.error('packageDebugApp -->\n', e)
        log = 'packageDebugApp -->\n' + e
    }
    res.send({
        msg: log,
        logArray: logHistory
    })
}




module.exports = appPackageSergvice
