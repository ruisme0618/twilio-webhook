const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));  // Voor Twilio form data
app.use(express.json());

app.post('/webhook', (req, res) => {
  console.log('✅ Ontvangen van Twilio:', req.body);

  const message = (req.body.Body || '').toLowerCase();
  let reply = "Sorry, ik begrijp je niet.";

  if (message.includes('reserveren')) {
    reply = "Voor hoeveel personen en welke dag wil je reserveren?";
  } else if (message.includes('openingstijden')) {
    reply = "We zijn dagelijks open van 12:00 tot 22:00.";
  }

  // Belangrijk: geef een JSON response terug met 'reply'
  res.json({ reply });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Webhook server draait op poort ${port}`);
});
