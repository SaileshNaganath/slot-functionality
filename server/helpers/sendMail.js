const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true, 
  auth: {
    user: "sailesh0609@gmail.com",
    pass: "iljdxgpnjzvzyfxr",
  },
});


async function sendMail(subject,text,html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Test MAIL 👻" <sailesh0609@gmail.com>', // sender address
    to: "saileshnaganath@gmail.com", // list of receivers
    subject,
    text,
    html
  });

}

sendMail().catch(console.error);


module.exports = {sendMail}