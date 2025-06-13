const express = require('express');
const twilio = require('twilio');
const app = express();

console.log('Webhook server is alive');

app.use(express.urlencoded({ extended: true })); // Parse x-www-form-urlencoded van Twilio

app.post('/webhook', (req, res) => {
  // Debug logging van de body, kan object zijn of string
  console.log('✅ Ontvangen van Twilio:', req.body);

  let message = '';

  if (typeof req.body === 'object' && req.body.Body) {
    message = req.body.Body.toLowerCase();
  } else if (typeof req.body === 'string') {
    // fallback: probeer Body eruit te halen als raw string (optioneel)
    const match = req.body.match(/Body=(.*)/);
    if (match) {
      message = decodeURIComponent(match[1]).toLowerCase();
    }
  }

  let reply = "Sorry, ik begrijp je niet.";

  if (message.includes('reserveren')) {
    reply = "Voor hoeveel personen en welke dag wil je reserveren?";
  } else if (message.includes('openingstijden')) {
    reply = "We zijn dagelijks open van 12:00 tot 22:00.";
  }

  const twiml = new twilio.twiml.MessagingResponse();
  twiml.message(reply);

  res.type('text/xml');
  res.send(twiml.toString());
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook server draait op poort ${port}`);
});
