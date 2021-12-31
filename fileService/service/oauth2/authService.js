const AuthCode = require('./AuthCode')
const AccessToken = require('./AccessToken')
const RefreshToken = require('./RefreshToken')
const Users = require('./Users')
const Client = require('./Client')

const authService = {}


// node-oauth2-server API
// AuthCode
authService.getAuthCode = AuthCode.getAuthCode
authService.saveAuthCode = AuthCode.saveAuthCode
authService.saveAuthorizationCode = AuthCode.saveAuthorizationCode

// AccessToken
authService.getAccessToken = AccessToken.getAccessToken
authService.saveAccessToken = AccessToken.saveAccessToken

// RefreshToken
authService.saveRefreshToken = RefreshToken.saveRefreshToken
authService.getRefreshToken = RefreshToken.getRefreshToken

// 
authService.getUser = Users.getUser
authService.getClient = Client.getClient
authService.grantTypeAllowed = Client.grantTypeAllowed;
module.exports = authService