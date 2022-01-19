const ssh2Service = require('./ssh2Service')

const webSocketService = {

}

webSocketService.app = null;

webSocketService.clients = [];

webSocketService.init = function (app) {
    this.app = app
    this.initRouter()
}

webSocketService.initRouter = function () {
    let _this = this;
    this.app.ws('/api/ws', function (ws, req) {
        console.log("client connect to server successful!");
        _this.clients.push(ws);
        ws.on('message', function (msg) {
            console.log("receive client msg :", msg);
            _this.receiveCmd(msg);
        });
        ws.on("close", function (msg) {
            console.log("client is closed");
            for (var index = 0; index < _this.clients.length; index++) {
                if (_this.clients[index] == this) {
                    _this.clients.splice(index, 1)
                }
            }
        });
    });

    this.app.ws('/api/wsssh', function (ws, req) {
        ssh2Service.createNewServer({
            host:'127.0.0.1',
            username:'shengte',
            password:'1992229',
        },ws)
    });
}

webSocketService.receiveCmd = function (msg) {

}


/**
 * 发送command到client端
 * @param msg 
 * @param cb 
 */
webSocketService.sendCmd = function (msg, cd) {
    let _this = this;
    this.clients.forEach(ws=>{
        if(typeof msg != String){
            ws.send(JSON.stringify(msg))
        }else{
            ws.send(msg)
        }
        
    })
}


module.exports = webSocketService