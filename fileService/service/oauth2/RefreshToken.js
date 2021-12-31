const RefreshToken = {}

RefreshToken.saveRefreshToken = function (token, clientId, expires, userId, callback) {
    console.log('RefreshToken.saveRefreshToken', token)
}

RefreshToken.getRefreshToken = function (refreshToken, callback) {
    console.log('RefreshToken.getRefreshToken', refreshToken)

}

module.exports = RefreshToken