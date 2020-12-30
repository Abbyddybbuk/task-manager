const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = 'SG.rN6Qei0gitVfZm6IBpw.Fwh7xShonaShonaShonaShonaDuCpf0vYd_it3YI'

sgMail.setApiKey(sendgridAPIKey)

sgMail.send({
    to: 'abhijeet.abap@gmail.com',
    from: 'abhijeet.abap@gmail.com',
    subject: 'This is my first mail via Sendgrid',
    text: 'Sending this mail; This is part of my Node.js learning'
})