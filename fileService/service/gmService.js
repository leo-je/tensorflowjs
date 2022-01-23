const gm = require('gm').subClass({ imageMagick: true });
const httpUtils = require('../utils/httpUtils')

async function createImage() {
    let im = gm('./test.jpeg')

    let historyUrl = 'https://www.ipip5.com/today/api.php?type=json'
    let data = await httpUtils.get(historyUrl)
    console.log(data)
    // 问候语
    let text = "早上好,今天是" + data.today;
    im.font("宋体", 60).drawText(100, 100, text);
    // 历史上的今天
    text = '历史上的今天:'
    im.font("宋体", 30).drawText(100, 170, text);
    // todo:文字长度,换行
    text = ''
    if (data && data.result && data.result.length > 2) {
        let length = data.result.length
        for (let i = length - 2; i >= 0; i--) {
            let context = data.result[i]['year'].replace('\n', '') + `年 ` + ln(data.result[i]['title'],20,'        ') + `\n`
            text += context
        }
        console.log(text)
    }
    im.font("宋体", 30).drawText(150, 220, text);

    // 激励语
    // todo:文字长度,换行
    text = '';//`静以修身,俭以养德,非淡泊无以明志,\n非宁静无以致远。
    data = await httpUtils.get('http://api.eei8.cn/say/api.php?encode=json')
    console.log(data)
    if (data) {
        text = ln(data.text, 18)
    }
    im.font("宋体", 40).drawText(960, 700, text);

    im.fill('red').drawLine(930,400,930,1000)

    // 生成图片
    im.write("./test3.jpeg", function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log("create sucess")
        }
    })

}

function ln(text, count, str) {
    let i = 0
    let newText = ''
    for (let char of text) {
        newText += char
        i++
        if (i == count) {
            i = 0
            newText += '\n' + (str || '')
        }
    }
    return newText
}

createImage()