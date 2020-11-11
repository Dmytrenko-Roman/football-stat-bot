'use strict';

// Bot settings:

//const fetch = require('node-fetch');
const TelegramBot = require('node-telegram-bot-api');
const funcs = require('./functions.js');

const token = process.env.TOKEN;
const url = process.env.APP_URL || 'https://playerstatbot.herokuapp.com/';

//const bot = new TelegramBot(token, { polling: true });

const bot = new TelegramBot(token, {
  webHook: {
    port: process.env.PORT
  }
});

bot.setWebHook(`${url}/bot${token}`);

// Commands:
const commands = {
  ts: '/topscorers',
  ps: '/positions',
}

// Top scorers:

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
  const msgt = msg.text;

  if (msgt.substr(0, commands.ts.length) === commands.ts) {
    const a = funcs.CheckLeague(leagues, msgt, commands.ts);
    funcs.TopScorers(a)
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

  // Teams positions:

  if (msgt.substr(0, commands.ps.length) === commands.ps) {
    const b = funcs.CheckLeague(leagues, msgt, commands.ps);
    funcs.TeamPositions(b)
    .then(json => {
      const table = json.standings[0].table;
      for (let k = 0; k < table.length; k++) {
        bot.sendMessage(chatId, `${table[k].position}. ${table[k].team.name} |W:${table[k].won}|D:${table[k].draw}|L:${table[k].lost}|`)
      }
    });
  }
});
