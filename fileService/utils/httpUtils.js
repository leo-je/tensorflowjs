const axios = require('axios')

const httpUtils = {

}

httpUtils.get = async function (url, data) {
    let body = null
    await new Promise((resolve, reject) => {
        axios.get(url, data).then(res => {
            body = res.data
            resolve(body)
        }).catch((error) => {
            console.error(error)
            reject(error)
        })
    })
    return body;
}

httpUtils.post = async (url, data) => {
    let body = null
    await new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                // console.log(res)
                body = res.data
                resolve(body)
            })
            .catch((error) => {
                console.error(error)
                reject(error)
            })
    })
    return body
}

module.exports = httpUtils