const express = require('express');
const twilio = require('twilio');
const MessagingResponse = twilio.twiml.MessagingResponse;

const app = express();
app.use(express.urlencoded({ extended: true })); // Twilio stuurt form data

app.post('/webhook', (req, res) => {
  const message = (req.body.Body || '').toLowerCase();

  let reply = "Sorry, ik begrijp je niet.";

  if (message.includes('reserveren')) {
    reply = "Voor hoeveel personen en welke dag wil je reserveren?";
  } else if (message.includes('openingstijden')) {
    reply = "We zijn dagelijks open van 12:00 tot 22:00.";
  }

  const twiml = new MessagingResponse();
  twiml.message(reply);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook server draait op poort ${port}`);
});
