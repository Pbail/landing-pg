require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

const TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_CHAT_ID; // sirf ye user bot control kar sakega
const CONFIG_PATH = path.join(__dirname, 'config.json');

if (!TOKEN) {
  console.error('BOT_TOKEN .env file mein set karein.');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

function readConfig() {
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
}

function writeConfig(config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function isAuthorized(msg) {
  if (!ADMIN_ID) return true; // agar ADMIN_ID set nahi hai to sabko allow (testing ke liye)
  return String(msg.chat.id) === String(ADMIN_ID);
}

function unauthorizedReply(chatId) {
  bot.sendMessage(chatId, 'Aapko is bot ko control karne ki permission nahi hai.');
}

// /start - help menu
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
`Redirect Control Bot

Commands:
/seturl <link> - naya redirect URL set karein
/setdelay <seconds> - countdown timing set karein (e.g. 2 ya 3)
/stopredirect - auto-redirect band karein (sirf Continue button kaam karega)
/startredirect - auto-redirect wapas chalu karein
/status - current settings dekhein`);
});

// /seturl https://newsite.com
bot.onText(/\/seturl (.+)/, (msg, match) => {
  if (!isAuthorized(msg)) return unauthorizedReply(msg.chat.id);
  const newUrl = match[1].trim();

  if (!/^https?:\/\//i.test(newUrl)) {
    return bot.sendMessage(msg.chat.id, 'URL http:// ya https:// se shuru hona chahiye.');
  }

  const config = readConfig();
  config.url = newUrl;
  writeConfig(config);
  bot.sendMessage(msg.chat.id, `Redirect URL update ho gaya:\n${newUrl}`);
});

// /setdelay 3
bot.onText(/\/setdelay (\d+)/, (msg, match) => {
  if (!isAuthorized(msg)) return unauthorizedReply(msg.chat.id);
  const seconds = parseInt(match[1], 10);

  const config = readConfig();
  config.delay = seconds;
  writeConfig(config);
  bot.sendMessage(msg.chat.id, `Countdown timing set ho gayi: ${seconds} second`);
});

// /stopredirect - auto redirect disable, only manual continue works
bot.onText(/\/stopredirect/, (msg) => {
  if (!isAuthorized(msg)) return unauthorizedReply(msg.chat.id);
  const config = readConfig();
  config.enabled = false;
  writeConfig(config);
  bot.sendMessage(msg.chat.id, 'Auto-redirect band kar diya gaya. Ab sirf Continue button se hi redirect hoga.');
});

// /startredirect - re-enable auto redirect
bot.onText(/\/startredirect/, (msg) => {
  if (!isAuthorized(msg)) return unauthorizedReply(msg.chat.id);
  const config = readConfig();
  config.enabled = true;
  writeConfig(config);
  bot.sendMessage(msg.chat.id, 'Auto-redirect wapas chalu kar diya gaya.');
});

// /status
bot.onText(/\/status/, (msg) => {
  const config = readConfig();
  bot.sendMessage(msg.chat.id,
`Current Settings:
URL: ${config.url}
Delay: ${config.delay} second
Auto-redirect: ${config.enabled ? 'ON' : 'OFF'}`);
});

console.log('Telegram bot chal raha hai...');
