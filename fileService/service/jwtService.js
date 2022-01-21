var jwt = require('jsonwebtoken');

const jwtService = {}
jwtService.secret = "hahaha"
jwtService.loginPath = '/oauth/login'
// 生成token
jwtService.generateToken = function (user) {
    let _this = this;
    return jwt.sign({
        userInfo: user,
        foo: 'bar',
    }, _this.secret, {
        expiresIn: '1d' // 1天 https://github.com/zeit/ms
    });
}

jwtService.enableVerify = function (app, userService) {
    let _this = this;
    app.use(function (req, res, next) {
        console.log("path verify ----> path: " + req.path)
        let upgrade = req.headers.upgrade
        // 放行websocket 和 登陆接口
        if ((upgrade && upgrade === 'websocket') || _this.loginPath === req.path) {
            next()
        } else if (!req.headers.hasOwnProperty('token')) {
            res.status(401)
            res.json({
                code: "-9999",
                message: 'token不存在或已过期'
            });
        } else if (req.headers.hasOwnProperty('token')) {
            jwt.verify(req.headers.token, _this.secret, function (err, decoded) {
                if (err) {
                    res.status(401)
                    res.json({
                        code: "-9999",
                        message: 'token不存在或已过期'
                    });
                } else {
                    next();
                }
            });
        } else {
            next();
        }
    });

    // 登陆接口
    app.post(_this.loginPath, (req, res) => {
        console.log(req.body)
        let user = userService.getUserByUsername(req.body.username)
        if (req.body.password != user.password) {
            res.send({
                msg: 'login fail',
                code: "-9999"
            })
        } else {
            res.send({
                msg: 'login secuss',
                code: "0000",
                token: _this.generateToken({ username: user.username })
            })
        }
    })
}

module.exports = jwtService