# Newsletter server (local)

This project includes a small local newsletter server you can run to receive subscription notifications and persist subscribers.

1. Install dependencies (if not already done):

```powershell
npm install
```

2. Install server dependencies (express + nodemailer):

```powershell
npm install express nodemailer dotenv body-parser
```

3. Copy `.env.example` to `.env` and set `OWNER_EMAIL` and SMTP variables if you want emails sent when someone subscribes.

4. Run the server:

```powershell
npm run start:newsletter-server
```

5. Point your frontend `VITE_NEWSLETTER_ENDPOINT` to `http://localhost:4000/subscribe` (or set it in `.env` for Vite):

```
VITE_NEWSLETTER_ENDPOINT=http://localhost:4000/subscribe
```

The server provides:
- POST /subscribe  - accepts { email } and stores locally in `server/subscribers.json`. If `OWNER_EMAIL` and SMTP are configured, it will send a notification to the owner.
- GET /subscribers - lists stored subscribers.
