const gm = require('gm').subClass({ imageMagick: true });
const httpUtils = require('../utils/httpUtils')

async function createImage() {
    let im = gm('./test.jpeg')

    let historyUrl = 'https://www.ipip5.com/today/api.php?type=json'
    let data = await httpUtils.get(historyUrl)
    console.log(data)
    // 问候语
    let text = getTimeType() + "好,今天是" + data.today;
    im.font("宋体", 60).drawText(100, 100, text);
    // 历史上的今天
    text = '历史上的今天:'
    im.font("宋体", 30).drawText(100, 190, text);
    // todo:文字长度,换行
    text = ''
    if (data && data.result && data.result.length > 2) {
        let length = data.result.length
        for (let i = length - 2; i >= 0; i--) {
            let context = data.result[i]['year'].replace('\n', '') + `年 ` + ln(data.result[i]['title'], 20, '        ') + `\n`
            text += context
        }
        // console.log(text)
    }
    im.font("宋体", 30).drawText(150, 240, text);

    // 激励语
    // todo:文字长度,换行
    text = '';//`静以修身,俭以养德,非淡泊无以明志,\n非宁静无以致远。
    data = await httpUtils.get('http://api.eei8.cn/say/api.php?encode=json')
    console.log(data)
    if (data) {
        text = ln(data.text, 22)
    }
    im.font("宋体", 40).drawText(960, 800, text);

    // 天气
    data = await httpUtils.post('http://www.yiketianqi.com/api?version=v9&appid=23035354&appsecret=8YvlPNrz')
    if (data) {
        // console.log(data)
        text = "城市: " + data.city + "\n"
        data = data.data[0]
        text += '当前气温: ' + data.tem + '℃ 白天温度:' + data.tem1 + '℃ 晚上气温:' + data.tem2 + '℃\n'
        text += '空气指数: ' + data.air + '\n'
        text += '空气等级: ' + data.air_level + '\n'
        text += '空气状况: ' + ln(data.air_tips, 30, '     ') + '\n'
        if (data.alarm && data.alarm.alarm_level) {
            text += '预警: ' + data.alarm.alarm_level + ' '
                + data.alarm.alarm_type + '\n       ' + ln(data.alarm.alarm_content, 30, '      ')
        }
        im.font("宋体", 30).drawText(960, 200, text);
    }
    im.fill('red').drawLine(930, 200, 930, 1000)

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

function getTimeType() {
    now = new Date(), hour = now.getHours()
    if (hour < 6) { return "凌晨"; }
    else if (hour < 9) {
        return "早上";
    } else if (hour < 12) {
        return "上午";
    } else if (hour < 14) {
        return "中午";
    } else if (hour < 17) {
        return "下午";
    } else if (hour < 19) {
        return "傍晚";
    } else if (hour < 22) {
        return "晚上";
    } else {
        return "夜里";
    }
}

createImage()