const { exec } = require('child_process');

let ch = exec('cd /Users/shengte/git/ERP-cloud/cloud-office-busi-rn-app && sh ./uat-package.sh');
ch.stdout.on('data',function(data){
    console.log("======================",data)
    console.log("======================")
})
// 使用双引号，这样路径中的空格就不会被解释为多个参数的分隔符。