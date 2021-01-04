const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'abhijeet.abap@gmail.com',
        subject: 'Thanks for joining in my App!',
        text: `Welcome come to the app ${name}. Hope you will enjoy this experience`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'abhijeet.abap@gmail.com',
        subject: 'I am sad that you are leaving us',
        text: `Please tell us ${name} what could have stopped you from leaving us`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}