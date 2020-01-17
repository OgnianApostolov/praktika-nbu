const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const notifyAppointmentEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ognian.apostolov@gmail.com',
        subject: 'new appointment',
        text: `Lorem ipsum`
    });
};

module.exports = {
    notifyAppointmentEmail
};