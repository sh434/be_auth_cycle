const Sib = require('sib-api-v3-sdk')
require('dotenv').config()
const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.API_KEY

const mailer = new Sib.TransactionalEmailsApi()



const sendMailTo = async (emailsArr, link) => {
    var email = {
        to: emailsArr,
        // from: 'yadavajay900500@gmail.com', //registered Email on sendgrid
       from:'anilchauhan.src@gmail.com',
        subject: 'verify Account',
        textCotent: 'Account Authentication',
        htmlContent: 
       ` <a href=${link}><button style='color:green'>verify your Account</button></a> `  };

    const result = new Promise((resolve, reject) => {

        mailer.sendTransacEmail(email, function (err, res) {
            if (err) {
                reject(err)
            }
            resolve(res)
        });

    })

    return await result

}

module.exports = sendMailTo;
