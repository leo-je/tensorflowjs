const AuthCode = {}

AuthCode.getAuthCode = function (authCode, callback) {
    console.log('AuthCode.getAuthCode', authCode)
}

AuthCode.saveAuthCode = function (code, clientId, expires, userId, callback) {
    console.log('AuthCode.saveAuthCode', code)
}

AuthCode.saveAuthorizationCode= function (code, clientId, expires, userId, callback) {
    console.log('AuthCode.saveAuthorizationCode', code)
}
module.exports = AuthCode