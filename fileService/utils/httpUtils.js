const https = require('https')
const http = require('http')
const axios = require('axios')
const { resolve } = require('path')

const httpUtils = {

}

httpUtils.get = async function (url, data) {
    // let body = null
    // if (url.indexOf('https') >= 0) {
    //     await new Promise(resolve => {
    //         https.get(url, function (res) {
    //             res.on('data', d => {
    //                 console.log(typeof d)
    //                 body = JSON.parse(d)
    //                 resolve(body);
    //             })
    //         })
    //     });
    // } else {
    //     await new Promise(resolve => {
    //         http.get(url, function (res) {
    //             res.on('data', d => {
    //                 console.log(typeof d)
    //                 try {
    //                     body = JSON.parse(d)
    //                 } catch (err) {
    //                     console.error(err)
    //                     console.log(d)
    //                     body = JSON.parse(d + '')
    //                 }
    //                 resolve(body);
    //             })
    //         })
    //     });
    // }

    // return body

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