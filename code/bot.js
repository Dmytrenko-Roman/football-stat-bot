'use strict';

// Bot settings:

// const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;
const url = process.env.APP_URL || 'https://playerstatbot.herokuapp.com/';

const bot = new TelegramBot(token, {
  webHook: {
    port: process.env.PORT
  }
});

bot.setWebHook(`${url}/bot${token}`);

// Bot functionality:

const buttons = {
  leagues: {
    epl: 'EPL',
    bundes: 'BUNDESLIGA',
    seriea: 'SERIE A',
    ligue1: 'LIGUE 1',
    laliga: 'LA LIGA',  
  }
}

const kb = {
  leagues: [
    [buttons.leagues.epl, buttons.leagues.bundes],
    [buttons.leagues.seriea, buttons.leagues.ligue1],
    [buttons.leagues.laliga]
  ]
}

bot.on('message', msg => {
  console.log('Working', msg.from.first_name);
  switch (msg.text) {

  }
})

bot.onText(/\/topscorers/, msg => {
  const text = `Hello, ${msg.from.first_name}`;
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, text, {
    reply_markup: {
      keyboard: kb.leagues,
    }
  })
});


/* fetch('https://api.football-data.org/v2/competitions/SA/scorers', {
  headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
  dataType: 'json',
  type: 'GET',
  })
    .then(res => res.json())
    .then(json => {
      const name = json.scorers[0].player.name;
      const goals = json.scorers[0].numberOfGoals;
      bot.sendMessage(chatId, `${name}: ${goals}`);
    }); */