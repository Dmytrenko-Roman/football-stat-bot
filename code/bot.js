'use strict';

// Bot settings:

const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api');

const token = '?'; //process.env.TOKEN 
//const url = process.env.APP_URL || 'https://playerstatbot.herokuapp.com/';

const bot = new TelegramBot(token, {polling: true});

/*const bot = new TelegramBot(token, {
  webHook: {
    port: process.env.PORT
  }
});

bot.setWebHook(`${url}/bot${token}`); */

// Bot functionality:

const buttons = {
  leagues: {
    epl: 'EPL',
    bundes: 'BUNDESLIGA',
    seriea: 'SERIE A',
    ligue1: 'LIGUE 1',
    laliga: 'LA LIGA',
  }
};

const kb = {
  leagues: [
    [buttons.leagues.epl, buttons.leagues.bundes],
    [buttons.leagues.seriea, buttons.leagues.ligue1],
    [buttons.leagues.laliga]
  ]
};

bot.on('message', msg => {
  const chatId = msg.chat.id;
  console.log('Working', msg.from.first_name);
    if (msg.text = kb.leagues[1][0]) {
      fetch('https://api.football-data.org/v2/competitions/SA/scorers', {
        headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
        dataType: 'json',
        type: 'GET',
      })
        .then(res => res.json())
        .then(json => {
          const info = json.scorers;
          const names = [];
          const goals = [];
          for (let i = 0; i < info.length; i++) {
            names[i] = info[i].player.name;
            goals[i] = info[i].numberOfGoals;
          }
          const text = `1. ${names[0]}: ${goals[0]}\n2. ${names[1]}: ${goals[1]}\n3. ${names[2]}: ${goals[2]}\n4. ${names[3]}: ${goals[3]}\n5. ${names[4]}: ${goals[4]}\n6. ${names[5]}: ${goals[5]}\n7. ${names[6]}: ${goals[6]}\n8. ${names[7]}: ${goals[7]}\n9. ${names[8]}: ${goals[8]}\n10. ${names[9]}: ${goals[9]}`;
          bot.sendMessage(chatId, text);
      });
    }
});

bot.onText(/\/topscorers/, msg => {
  const text = `Hello, ${msg.from.first_name}`;
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, text, {
    reply_markup: {
      keyboard: kb.leagues,
    }
  });
});