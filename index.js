const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/webhook', (req, res) => {
  const body = req.body.Body || req.body.body || '';

  console.log("✅ Ontvangen van Twilio:", req.body);

  let reply = "Sorry, ik begrijp je niet.";
  const message = body.toLowerCase();

  if (message.includes('reserveren')) {
    reply = "Voor hoeveel personen en welke dag wil je reserveren?";
  } else if (message.includes('openingstijden')) {
    reply = "We zijn dagelijks open van 12:00 tot 22:00.";
  }

  res.json({ reply });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook draait op poort ${port}`);
});
