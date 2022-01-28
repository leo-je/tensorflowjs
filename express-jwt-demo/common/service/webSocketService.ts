import { Application } from 'express-ws';
import * as WebSocket from 'ws'
export class WebSocketService {
    app: Application = null;
    clients: WebSocket[] = [];
    constructor(app: Application) {
        let _this = this;
        this.app = app
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
                    if (_this.clients[index] == ws) {
                        _this.clients.splice(index, 1)
                    }
                }
            });
        });
    }

    receiveCmd = function (msg) {
        console.log(msg)
    }

    /**
     * 发送command到client端
     * @param msg 
     * @param cb 
     */
    sendCmd = function (msg: string | string[] | object, cd?: any) {
        let _this = this;
        this.clients.forEach(ws => {
            let _msg = msg;
            if (typeof msg != 'string') {
                _msg = JSON.stringify(_msg)
            }
            ws.send(_msg)
        })
    }


}