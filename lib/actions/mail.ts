'use server'
var { SendMailClient } = require("zeptomail");

export const handleMail = async (subject: string, html: string) => {
  if (process.env.NEXT_PUBLIC_APP_URL?.includes("localhost")) {
    return { success: true, msg: "Message Sent in Dev" }
  }

  const url = "api.zeptomail.in/";
  const token = process.env.ZEPTOMAIL_TOKEN;

  let client = new SendMailClient({ url, token });

  try {
    await client.sendMail({
      "from":
      {
        "address": "noreply@harrygraphics.in",
        "name": "Harry Graphics",
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
    console.log(e);
    return { success: false, msg: "Failed to send. Try again later." }
  }
}
