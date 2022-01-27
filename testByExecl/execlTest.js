const xlsx = require('node-xlsx')
const httpUtils = require('../utils/httpUtils')
const fs = require('fs');

//readdir为读取该文件夹下的文件


let path = `/Users/shengte/git/tensorflowjs/fileService/test/test.xlsx`;
console.log(path);
//表格解析
let sheetList = xlsx.parse(path);
let apiTest = []
//对数据进行处理
sheetList.forEach((sheet) => {
    let commUrl = ''
    let commMethod = ''
    sheet.data.forEach((row, rowIndex) => {
        if (sheet.data[rowIndex][0] == '序号') return;
        commUrl = sheet.data[rowIndex][1] || commUrl || sheet.data[rowIndex][1]
        commMethod = sheet.data[rowIndex][2] || commMethod || sheet.data[rowIndex][2]
        let api = {}
        api.index = sheet.data[rowIndex][0];
        api.url = commUrl;
        api.method = commMethod;
        api.param = sheet.data[rowIndex][3];
        api.value = sheet.data[rowIndex][4];
        apiTest.push(api)

    })
    // console.log(sheet);
})

apiTest.forEach(async api => {
    if (api.method.toLowerCase() === 'get') {
        let data = api.param
        if (typeof data === 'string') {
            data = JSON.parse(data)
        }
        let re = await httpUtils.get(api.url, { params: data })
        if (re != api.value) {
            console.log(`${api.index} - 不符合预期结果:${api.value}     返回:${re}`)
        } else {
            console.log(`${api.index} - 符合预期结果:${api.value}       返回:${re}`)
        }
    }

    if (api.method.toLowerCase() === 'post') {
        let data = api.param
        if (typeof data === 'string') {
            data = JSON.parse(data)
        }
        let re = await httpUtils.post(api.url, { params: data })
        if (re != api.value) {
            console.log(`${api.index} - 不符合预期结果:${api.value}     返回:${re}`)
        } else {
            console.log(`${api.index} - 符合预期结果:${api.value}       返回:${re}`)
        }
    }


})

