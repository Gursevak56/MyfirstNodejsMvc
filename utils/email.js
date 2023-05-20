const nodemailer = require('nodemailer');
const sendmail = (option)=>{
    const transporter = nodemailer.createTransport({
        host:process.env.EMAIL_HOST,
        port:process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASSWORD
        }
    })
    const options = {
        from:'cineflex supports<support@gmail.com>',
        to:option.email,
        subject:option.subject,
        text:option.message
    }
    transporter.sendMail(options);
}
module.exports =sendmail;
