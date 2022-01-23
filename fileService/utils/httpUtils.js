const https = require('https')
const http = require('http')
const httpUtils = {

}

httpUtils.get = async function (url, data) {
    let body = null
    if (url.indexOf('https') >= 0) {
        await new Promise(resolve => {
            https.get(url, function (res) {
                res.on('data', d => {
                    console.log(typeof d)
                    body = JSON.parse(d)
                    resolve(body);
                })
            })
        });
    } else {
        await new Promise(resolve => {
            http.get(url, function (res) {
                res.on('data', d => {
                    console.log(typeof d)
                    body = JSON.parse(d)
                    resolve(body);
                })
            })
        });
    }

    return body
}

module.exports = httpUtils