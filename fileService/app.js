const express = require('express')
const oauthserver = require('express-oauth-server');
var webSocketService = require('./service/webSocketService')
var path = require('path');
const fileInfoService = require('./service/fileInfoService')
const appPackageSergvice = require('./service/appPackageSergvice')

const authService = require('./service/oauth2/authService')
var memorystore = require('./model');
const expressWS = require('express-ws')
var util = require('util');


const app = express()
const port = 3002

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
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// ################## oauth2 start ####################################

app.oauth = new oauthserver({
    model: memorystore,
    grants: ['password', 'authorization_code', 'refresh_token']
});

// Post token.
app.post('/oauth/token', app.oauth.token());

// Get authorization.
app.get('/oauth/authorize', function (req, res) {
    // Redirect anonymous users to login page.
    if (!req.app.locals.user) {
        return res.redirect(util.format('/login?redirect=%s&client_id=%s&redirect_uri=%s', req.path, req.query.client_id, req.query.redirect_uri));
    }

    return render('authorize', {
        client_id: req.query.client_id,
        redirect_uri: req.query.redirect_uri
    });
});

// Post authorization.
app.post('/oauth/authorize', function (req, res) {
    // Redirect anonymous users to login page.
    if (!req.app.locals.user) {
        return res.redirect(util.format('/login?client_id=%s&redirect_uri=%s', req.query.client_id, req.query.redirect_uri));
    }

    return app.oauth.authorize();
});

// Post login.
app.post('/oauth/login', function (req, res) {
    // @TODO: Insert your own login mechanism.
    console.log(req.body)
    if (req.body.username !== 'admin') {
        return render('login', {
            redirect: req.body.redirect,
            client_id: req.body.client_id,
            redirect_uri: req.body.redirect_uri
        });
    }

    // Successful logins should send the user back to /oauth/authorize.
    var path = req.body.redirect || '';

    return res.redirect(util.format('/%s?client_id=%s&redirect_uri=%s', path, req.query.client_id, req.query.redirect_uri));
});

// Get secret.
app.get('/secret', app.oauth.authenticate(), function (req, res) {
    // Will require a valid access_token.
    res.send('Secret area');
});

// ################## oauth2 end ####################################



/* authenticate protect the resource api (client side should provide token) */
app.get('/api/v1/*', app.oauth.authenticate());
app.post('/api/v1/*', app.oauth.authenticate());


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

app.post("/api/cancelPackageApp", (req, res) => {
    appPackageSergvice.cancelPackageApp(req, res)
})

expressWS(app);
webSocketService.init(app);

app.listen(port, () => {
    console.log(`service app listening at http://0.0.0.0:${port}`)
})