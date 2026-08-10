require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CONFIG_PATH = path.join(__dirname, 'config.json');

function readConfig() {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return { url: 'https://example.com', delay: 3, enabled: true };
  }
}

// Serve static landing page
app.use(express.static(path.join(__dirname, 'public')));

// Config API - the landing page calls this to know where/when to redirect
app.get('/api/config', (req, res) => {
  const config = readConfig();
  res.json(config);
});

app.listen(PORT, () => {
  console.log(`Server chal raha hai: http://localhost:${PORT}`);
});
