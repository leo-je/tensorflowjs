import { Express } from 'express'
import express from 'express'
import { WebSocketService } from './common/service/webSocketService'
import path from 'path'
import { JwtService } from './common/service/jwtService';
import { UserService } from './common/service/userService';
import cookieparser from 'cookie-parser'
import { config } from './config'

import expressWS from 'express-ws';

const app: Express = express()
const port = config.app.port
const hostname = config.app.hostname

app.use(cookieparser());
let wsApp = expressWS(app).app;
let webSocketService = new WebSocketService(wsApp);

// 中间件
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'ui/dist')));

app.options('*', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization,X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

new JwtService().enableVerify(app, new UserService());

app.post('/api/getFileList', function (req, res) {
    console.log("")
})

app.listen(port,hostname, () => {
    console.log(`service app listening at http://0.0.0.0:${port}`)
})