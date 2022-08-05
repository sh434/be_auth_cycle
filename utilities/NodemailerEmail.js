require('dotenv').config()


const nodemailer = require('nodemailer');

var options = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        //take it from sendgrid (https://app.sendgrid.com) abhardwaj1@kloudrac.com
        // api_key: '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'
       user: process.env.MAIL_USER,
       pass: process.env.MAIL_PASS,
        
    }
}

let mailer = nodemailer.createTransport(options);



// const emailTemplate = (verifyCode) => `<b style="color: green"> ${verifyCode} </b>`;

const sendMailTo = async (emailsArr, link) => {
    var email = {
        to: emailsArr,
        from: 'rinku00003@gmail.com', //registered Email on sendgrid
    //    from:'anilchauhan.src@gmail.com',
        subject: 'verify Account',
        text: 'Account Authentication',
        html: 
       ` <a href=${link}><Button style='color:green'>verify your Account</Button></a> `  };

    const result = new Promise((resolve, reject) => {

        mailer.sendMail(email, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        });

    })

    return await result

}

module.exports = sendMailTo;
