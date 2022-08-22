const { emailAuthUser, emailAuthPass, emailSender } = require("../config");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: emailAuthUser,
//     pass: emailAuthPass,
//   },
// });

// async function sendMail(html, ...recipients, subject) {
//   await transporter.sendMail({
//     from: emailSender,
//     to: recipients,
//     subject,
//     html,
//   });
// }

// module.exports = sendMail;
const nodemailer = require('nodemailer');

const sendMail = async (options)=> {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: emailAuthUser,
            pass: emailAuthPass
        }
    });

    const mailOptions = {
        // from: process.env.EMAIL_USER, sender address
        from: options.from,  // sender address
        to: options.to, // list of receivers
        subject: options.subject, // Subject line
        html: options.message// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if(err)
            console.log(err)
        // else
            // console.log(info);
    })
}



module.exports = sendMail
