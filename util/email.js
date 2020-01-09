var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({

    service: 'qq',

    port: 465, // SMTP 端口

    secureConnection: true, // 使用 SSL

    auth: {

        user: '3029901331@qq.com',//发邮件邮箱

        pass: 'swydiehozbxpdeii'//此处不是qq密码是

    }

});



function sendMail(email,parentName,bidId,comment,time){

    var html = "";


    if(bidId == -1){
        html = `<h2>${parentName}回复了你</h2><p>${comment}</p><div><a href="https://cherrypeng.com/blogdetail/${bidId}">[回复]</a></div><p>${dateObj}</p>`
    }
    else {
        html = `<h2>${parentName}回复了你</h2><p>${comment}</p><div><a href="https://cherrypeng.com/about}">[回复]</a></div><p>${dateObj}</p>`
    }

    var date = new Date(time*1000)
    var year = date.getFullYear()
    var month = date.getMonth()+1
    var day = date.getDate()
    var dateObj = year + "-" + month + "-" + day;

    var mailOptions = {

        from: '3029901331@qq.com', // 发件地址

        to: email, // 收件列表

        subject: "在Cherry博客的评论收到新的回复", // 标题

        html: html

    };

    transporter.sendMail(mailOptions, function(error, info){

        if(error){

            return console.log(error);

        }

        console.log('Message sent: ' + info.response);

    });

}
module.exports=sendMail;



