const express = require('express');
const twilio = require('twilio');
const app = express();

console.log('Webhook server is alive');

app.use(express.urlencoded({ extended: true })); // Voor x-www-form-urlencoded data van Twilio

app.post('/webhook', (req, res) => {
  console.log('✅ Ontvangen van Twilio:', req.body);

  const message = (req.body.Body || '').toLowerCase();
  let reply = "Sorry, ik begrijp je niet.";

  if (message.includes('reserveren')) {
    reply = "Voor hoeveel personen en welke dag wil je reserveren?";
  } else if (message.includes('openingstijden')) {
    reply = "We zijn dagelijks open van 12:00 tot 22:00.";
  }

  // ➤ Verstuur TwiML-response naar Twilio
  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(reply);
  res.type('text/xml');
  res.send(twiml.toString());
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook server draait op poort ${port}`);
});
