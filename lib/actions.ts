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

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_ID,
      pass:  process.env.EMAIL_PASSOWORD,
    }
  });

  var mailOptions = {
    from: 'vikramparashar24@gmail.com',
    to: 'work.majorvicky@gmail.com',
    subject: `Query from ${email}`,
    html: `<h3>Name: ${name}</h2>
           <h3>Email: ${email}</h2>
           <p><b>Message:</b> ${message}</p>
    `
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
        return {
          sent:'Email Sent'
        }
    }
  });
}
