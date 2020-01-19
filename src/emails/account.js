const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ognian.apostolov@gmail.com',
        subject: 'Welcome to Dentists',
        text: `Welcome to the app, ${name}. Let me know how you get along with the platform.`
    });
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ognian.apostolov@gmail.com',
        subject: 'Thank you for using the Dentists Platform',
        text: `Hey ${name},\nThank you for using our platform.\nWe hope to see you again!\nWe'd appreciate it, if you would give us some constructive criticism so we can improve our platfrom.\n\nKind regards,\nDentists`
    });
}

const sendConfirmationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ognian.apostolov@gmail.com',
        subject: 'Welcome to Dentists',
        text: `Welcome to the app, ${name}. Please follow the link to confirm your account: localhost:3000/users/confirm/${email}`
    });
}

const sendPasswordResetEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ognian.apostolov@gmail.com',
        subject: 'Welcome to Dentists',
        text: `localhost:3000/reset-password/${email}`
    });
}

const sendResetPasswordEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ognian.apostolov@gmail.com',
        subject: 'Welcome to Dentists',
        text: `Your password was successfully reset!`
    });
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail,
    sendConfirmationEmail,
    sendPasswordResetEmail,
    sendResetPasswordEmail
};