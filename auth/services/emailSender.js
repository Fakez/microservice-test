const nodemailer = require('nodemailer');
const config = require('../utils/config')

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: config.MAIL_USER,
        pass: config.MAIL_PASS
    }
});

const sendMail = (emailTo, token, expirationTime) => {

    const options = {
        from: config.MAIL_USER,
        to: emailTo,
        subject: 'Your GPTW Test API validation token',
        html: `<p><b>Your GPTW Test API validation token is:</b></p>
               <p>${token}</p>
               <p>Your token expires in <b>${expirationTime / 60} minutes.</b></p>
               `
    }
    console.log('mail');
    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(`Sent: ${info.response}`);
    });
}

module.exports = {
    sendMail
}