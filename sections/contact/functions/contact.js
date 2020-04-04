require("dotenv").config();
exports.handler = (event, _context, callback) => {
  console.log({ event });
  console.log({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });
  const data = JSON.parse(event.body);
  const mailgun = require("mailgun-js");
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  });
  const email = {
    from: `Bartek <bartek@sandboxfd69a96e486e458a880d876916ab626c.mailgun.org >`,
    to: `${data.name} <${data.email}>`,
    subject: data.subject,
    text: data.content,
  };
  mg.messages().send(email, (error, body) => {
    console.log(body);
    callback(error, {
      statusCode: 200,
      body: JSON.stringify({ boo: "faar" }),
    });
  });
};
