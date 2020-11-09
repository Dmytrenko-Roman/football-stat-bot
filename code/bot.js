'use strict';

// Bot settings:

const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api');
const TS = require('./functions.js')

const token = process.env.TOKEN;
const url = process.env.APP_URL || 'https://playerstatbot.herokuapp.com/';

//const bot = new TelegramBot(token, { polling: true });

const bot = new TelegramBot(token, {
  webHook: {
    port: process.env.PORT
  }
});

bot.setWebHook(`${url}/bot${token}`);

// Top scorers;

const names = [];
const goals = [];
const leagues = {
  SA: 'Serie A',
  PL: 'EPL',
  BL1: 'Bundesliga',
  FL1: 'Ligue 1',
  CL: 'Champions league',
  PD: 'La Liga'
};

// Bot functionality:

bot.on('message', msg => {
  const chatId = msg.chat.id;

  // Top scorers:

  if (msg.text.substr(0, 11) === '/topscorers') {
    let league;
    const t = msg.text.substr(12);
    for (const k in leagues) {
      if (leagues[k] === t) league = `${k}`;
    }
    TS(league)
      .then(json => {
        const info = json.scorers;
        for (let i = 0; i < info.length; i++) {
          names[i] = info[i].player.name;
          goals[i] = info[i].numberOfGoals;
        }
        const text = `1. ${names[0]}: ${goals[0]}\n2. ${names[1]}: ${goals[1]}\n3. ${names[2]}: ${goals[2]}\n4. ${names[3]}: ${goals[3]}\n5. ${names[4]}: ${goals[4]}\n6. ${names[5]}: ${goals[5]}\n7. ${names[6]}: ${goals[6]}\n8. ${names[7]}: ${goals[7]}\n9. ${names[8]}: ${goals[8]}\n10. ${names[9]}: ${goals[9]}`;
        bot.sendMessage(chatId, text);
      });
  }

  // Player's stats:
});