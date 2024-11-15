'use server'
var nodemailer = require('nodemailer');

export const handleMail = async (subject: string, html: string) => {

  var transporter = await nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  // transporter.verify(function(error, success) {
  //   if (error) {
  //     console.log('Connection error:', error);
  //   } else {
  //     console.log('Server is ready to take our messages');
  //   }
  // });

  var mailOptions = {
    from: `harrygraphics.in <${process.env.EMAIL_ID}>`,
    // to: 'harrygraphics21@gmail.com',
    to: 'vikramparashar24@gmail.com',
    subject: subject,
    html: html
  };

  try {
    // Send the email and wait for the result
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return {
      success: true,
      msg: "Message Sent"
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      msg: "Failed to send. Try again later."
    }
  }
}
