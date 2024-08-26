'use server'
import { z } from 'zod'
var nodemailer = require('nodemailer');

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string()
    .email('Invalid email address'),
  message: z.string().min(1, 'Message cannot be empty')
});

export const handleMail = async (prevState: any, formData: FormData) => {
  // console.log(process.env.EMAIL_ID)
  // return

  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message')
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { name, email, message } = validatedFields.data

  var transporter = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
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
    to: process.env.EMAIL_TO,
    subject: `Query from ${email}`,
    html: `<h3>Name: ${name}</h2>
           <h3>Email: ${email}</h2>
           <p><b>Message:</b> ${message}</p>
    `
  };

  try {
    // Send the email and wait for the result
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return {
      sent: 'Email Sent',
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      sent: 'Could not send email. Try again later.',
    };
  }
}
