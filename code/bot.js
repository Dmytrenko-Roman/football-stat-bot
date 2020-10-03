'use strict';

const TelegramBot = require('node-telegram-bot-api');

const token = 'YOUR_TELEGRAM_BOT_TOKEN';

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

'use strict';

/* const fetch = require('node-fetch');

let name;
let goals;

fetch('https://api.football-data.org/v2/competitions/SA/scorers', {
  headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
  dataType: 'json',
  type: 'GET',
})
  .then(res => res.json())
  .then(json => {
    name = json.scorers[0].player.name;
    goals = json.scorers[0].numberOfGoals;
  });

console.log(name, goals); */