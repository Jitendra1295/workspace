const nodemailer = require('nodemailer');
let testAccount = null
nodemailer.createTestAccount().then(res => {
    testAccount = res;
})
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'frederik.hintz@ethereal.email',
        pass: 'W6qMnbAymnbga2QTx8'
    }

});

const sendNotification = (superAdmin) => {
    console.log("sendNotification::", superAdmin);

    const mailOptions = {
        from: '"Maddison Foo Koch 👻" <frederik.hintz@ethereal.email>', // sender address
        to: `${superAdmin.email}, dev@yopmail.com`, // list of receivers
        html: "<b>Hello world?</b>", // html body
        subject: 'Super Admin Account Created',
        text: `Dear ${superAdmin.name}, your account has been created successfully.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Error sending email:', error);
        }
        console.log('Notification sent:', info.response);
    });
};

module.exports = {
    sendNotification,
};
