const express = require('express');
const app = express();

// 🟩 Nodig om form-data (zoals Twilio stuurt) correct te verwerken
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🟩 Endpoint voor Twilio Studio HTTP Request
app.post('/webhook', (req, res) => {
  // 🛠 Log binnenkomende data om te debuggen
  console.log('✅ Ontvangen van Twilio:', req.body);

  const message = (req.body.Body || '').toLowerCase();
  let reply = "Sorry, ik begrijp je niet.";

  if (message.includes('reserveren')) {
    reply = "Voor hoeveel personen en welke dag wil je reserveren?";
  } else if (message.includes('openingstijden')) {
    reply = "We zijn dagelijks open van 12:00 tot 22:00.";
  }

  // 🟩 Antwoord in JSON-formaat voor Twilio Studio
  res.json({ reply });
});

// 🟩 Zorg dat de server draait op de juiste poort
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`🚀 Webhook server draait op poort ${port}`);
});
