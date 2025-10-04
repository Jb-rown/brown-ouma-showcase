const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.NEWSLETTER_PORT || 4000;
const STORAGE = path.join(__dirname, 'subscribers.json');

app.use(bodyParser.json());
app.use(cors());

function loadSubs() {
  try { return JSON.parse(fs.readFileSync(STORAGE, 'utf8')); } catch { return []; }
}
function saveSubs(list) {
  fs.writeFileSync(STORAGE, JSON.stringify(list, null, 2));
}

app.post('/subscribe', async (req, res) => {
  const { email } = req.body || {};
  if (!email || typeof email !== 'string' || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: 'invalid email' });
  }

  const subs = loadSubs();
  if (subs.find(s => s.email.toLowerCase() === email.toLowerCase())) {
    return res.status(200).json({ ok: true, message: 'already subscribed' });
  }

  const subscriber = { email, date: new Date().toISOString() };
  subs.push(subscriber);
  saveSubs(subs);

  // send notification email to owner (if configured)
  const owner = process.env.OWNER_EMAIL;
  if (owner && process.env.SMTP_HOST) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'no-reply@example.com',
        to: owner,
        subject: `New newsletter subscriber: ${email}`,
        text: `A new subscriber registered: ${email}\n\nTotal subscribers: ${subs.length}`,
      });
    } catch (err) {
      console.error('Failed to send notification email', err);
    }
  }

  return res.status(201).json({ ok: true });
});

app.get('/subscribers', (req, res) => {
  res.json(loadSubs());
});

app.listen(PORT, () => console.log(`Newsletter server listening on http://localhost:${PORT}`));
