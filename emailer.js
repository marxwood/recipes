const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'mailserver.tehnicomsolutions.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth:{
    user: 'nodejs@tnation.eu',
    pass: '#nodejs11!'
  }
})

exports.email = (data) => {
  console.log('sending email', data.to, data.subject);

  transporter.sendMail(data, (err, info) => {
    if(err){
      console.log(err)
    }
    else {
      console.log(info);
    }
  })
}
