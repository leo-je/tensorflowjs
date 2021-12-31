
const AccessToken = {}


AccessToken.getAccessToken = function (bearerToken, callback) {
    console.log('AccessToken.getAccessToken', bearerToken)
};

AccessToken.saveAccessToken = function (token, clientId, expires, userId, callback) {
    console.log('AccessToken.saveAccessToken', token)
}

module.exports = AccessToken