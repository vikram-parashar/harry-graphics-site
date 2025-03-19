'use server'
var { SendMailClient } = require("zeptomail");

export const handleMail = async (subject: string, html: string) => {

  const url = "api.zeptomail.in/";
  const token = process.env.ZEPTOMAIL_TOKEN;

  let client = new SendMailClient({ url, token });

  try {
    await client.sendMail({
      "from":
      {
        "address": "noreply@harrygraphics.in",
        "name": "Harishankar Parashar",
      },
      "to":
        [
          {
            "email_address":
            {
              "address": "harrygraphics21@gmail.com",
            }
          }
        ],
      "subject": subject,
      "htmlbody": html,
    })
    return { success: true, msg: "Message Sent" }
  } catch (e: any) {
    return { success: false, msg: "Failed to send. Try again later." }
  }
}
