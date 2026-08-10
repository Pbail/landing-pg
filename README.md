# Redirect Landing Site + Telegram Bot Control

Ye ek landing page hai jo open hote hi 2-3 second (customizable) mein automatic dusri site par redirect ho jati hai. User chahe to "Continue" button dabakar turant jaa sakta hai. Redirect URL aur timing ko aap Telegram bot se kabhi bhi change kar sakte hain — bina code chhue.

## Files
- `server.js` — Express server jo landing page serve karta hai
- `public/index.html` — Landing page (countdown + Continue button)
- `config.json` — Yahan current URL, delay, aur on/off status save hota hai
- `bot.js` — Telegram bot jo config.json ko update karta hai
- `.env.example` — Apne secrets ke liye template

## Setup Steps

### 1. Dependencies install karein
```bash
npm install
```

### 2. Telegram Bot banayein
1. Telegram par `@BotFather` ko message karein
2. `/newbot` bhejein aur naam set karein
3. Aapko ek **token** milega — usay copy karein

### 3. Apna Chat ID nikalein
1. Telegram par `@userinfobot` ko message karein
2. Wo aapko aapki **chat id** dega

### 4. `.env` file banayein
`.env.example` ko copy karke `.env` naam dein aur values daalein:
```bash
cp .env.example .env
```
```
BOT_TOKEN=apna_bot_token_yahan
ADMIN_CHAT_ID=apni_chat_id_yahan
PORT=3000
```

### 5. Server aur Bot chalayein
Do alag terminal windows mein:
```bash
npm start      # website chalane ke liye
npm run bot    # telegram bot chalane ke liye
```

Production mein hamesha chalte rehne ke liye `pm2` use karein:
```bash
npm install -g pm2
pm2 start server.js --name redirect-site
pm2 start bot.js --name redirect-bot
pm2 save
```

## Telegram Bot Commands
| Command | Kaam |
|---|---|
| `/seturl https://newsite.com` | Redirect URL change karein |
| `/setdelay 2` | Countdown timing set karein (seconds mein) |
| `/stopredirect` | Auto-redirect band karein (sirf Continue button chalega) |
| `/startredirect` | Auto-redirect wapas chalu karein |
| `/status` | Current settings dekhein |

## Hosting
Ye site kisi bhi Node.js hosting par chalegi — jaise **Render**, **Railway**, **VPS (DigitalOcean/AWS)**, ya apna server. Sirf ye dhyan rakhein ke server aur bot dono ek hi jagah chalein taake dono `config.json` ko share kar sakein.

Note: Free/serverless hosting (jaise Vercel) filesystem writes ke liye theek nahi hai — usme `config.json` reset ho sakta hai. Isliye VPS ya Railway/Render jaisi persistent hosting behtar rahegi.
