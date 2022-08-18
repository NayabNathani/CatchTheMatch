"use strict"
const nodemailer = require("nodemailer")

const {verifyEmailTemplate} = require("./MailTemplates/verify/verify")
const {
  resetPasswordEmail,
} = require("./MailTemplates/reset-password/reset-password")

// async..await is not allowed in global scope, must use a wrapper
let successConsole = (type) => {
  console.log("Message sent: %s", type.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

const mail = async (purpose, data) => {
  // create reusable transporter object using the default SMTP transport
  // console.log(purpose, data)
  let transporter = nodemailer.createTransport({
    Service: 'Gmail',
    host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    auth: {
      user: "nayabnathani22@gmail.com",
      pass: "03313999101",
     },
  })

  switch (purpose) {
    case "verify":
      console.log(data.email,'email in mail')
      let verifyEmailResult = await transporter
        .sendMail({
          from: "nayabnathani22@gmail.com", // sender address
          // to: "acc@gmail.com", // list of receivers
          to: data.email, // list of receivers
          subject: "Welcome", // Subject line
          text: "ACOCOUNT VERIFICATION", // plain text body
          html: verifyEmailTemplate(data), // html body
        })
        // .then((type) => {
        //   successConsole(type)
        //   return type
        // }).catch(e=>{
        //   return e;
        // })
      return verifyEmailResult && verifyEmailResult.accepted.length > 0 ? "success" : "failed"
    case "resetPasswordLink":
      let resetPasswordResult = await transporter
        .sendMail({
          from: "nayabnathani22@gmail.com", // sender address
          to: data.email, // list of receivers
          subject: "RESET PASSWORD", // Subject line
          text: "reset your account password", // plain text body
          html: resetPasswordEmail(data), // html body
        })
        .then((type) => {
          successConsole(type)
          return type
        })
      return resetPasswordResult.accepted.length > 0 ? "success" : "failed"

    default:
      break
  }
}

module.exports = {mail}
