'use strict';

// Bot settings:

const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api');
const topScorers = require('./functions.js');

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
    topScorers(league);
  }

  // Player's stats:
});
