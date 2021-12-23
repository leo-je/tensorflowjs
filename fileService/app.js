const express = require('express')
var webSocketService = require('./webSocketService')
var path = require('path');
const fileInfoService = require('./fileInfoService')
const appPackageSergvice = require('./appPackageSergvice')

const expressWS = require('express-ws')


const app = express()
const port = 80


// 中间件
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'ui/dist')));

app.post('/api/getFileList', function (req, res) {
    fileInfoService.getFileList(req, res);
})

app.post('/api/packageUatApp', express.json(), function (req, res) {
    appPackageSergvice.packageUatApp(req, res);
})


app.post('/api/getPackageLog', function (req, res) {
    appPackageSergvice.getPackageLog(req, res);
})

app.post('/api/packageProdApp', express.json(), function (req, res) {
    appPackageSergvice.packageProdApp(req, res);
})

app.post('/api/packageDebugApp', express.json(), function (req, res) {
    appPackageSergvice.packageDebugApp(req, res);
})

app.get("/api/down/:fileName", (req, res) => {
    fileInfoService.downFile(req, res)
})

app.post("/api/delete/:fileName", (req, res) => {
    fileInfoService.delete(req, res)
})

expressWS(app);
webSocketService.init(app);

app.listen(port, () => {
    console.log(`service app listening at http://0.0.0.0:${port}`)
})