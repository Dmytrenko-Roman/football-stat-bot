'use strict';

// Bot settings:

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
  top: '/topscorers',
  pos: '/positions',
  mat: '/matches',
};

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

  // Top scorers:

  if (msgt.substr(0, commands.top.length) === commands.top) {
    const league = funcs.CheckLeague(leagues, msgt, commands.top);
    let text = '';
    funcs.TopScorers(league)
      .then(json => {
        const info = json.scorers;
        for (let i = 0; i < info.length; i++) {
          text += `${i + 1}. ${info[i].player.name}: ${info[i].numberOfGoals}\n`;
        }
        bot.sendMessage(chatId, text);
      });
  }

  // Teams positions:

  if (msgt.substr(0, commands.pos.length) === commands.pos) {
    const league = funcs.CheckLeague(leagues, msgt, commands.pos);
    let text = '';
    funcs.Table(league)
      .then(json => {
        const tablejson = json.standings[0].table;
        for (let k = 0; k < tablejson.length; k++) {
          text += `${tablejson[k].position}. ${tablejson[k].team.name} |W:${tablejson[k].won}|D:${tablejson[k].draw}|L:${tablejson[k].lost}|P:${tablejson[k].points}|\n`;
        }
        bot.sendMessage(chatId, text);
      });
  }

  // Matches:

  if (msgt.substr(0, commands.mat.length) === commands.mat) {
    let text = '';
    funcs.Matches()
      .then(json => {
        const matches = json.matches;
        console.log(matches[0]);
        for (let k = 0; k < matches.length; k++) {
          const compName = matches[k].competition.name;
          const homeTeam = matches[k].homeTeam.name;
          const awayTeam = matches[k].awayTeam.name;
          const score1 = matches[k].score.fullTime.homeTeam;
          const score2 = matches[k].score.fullTime.awayTeam;
          const date = matches[k].utcDate.substr(11, 5);
          if (score1 !== null) text += `${compName}:\n${homeTeam} ${score1}:${score2} ${awayTeam}`;
          text += `${compName}:\n${homeTeam} : ${awayTeam} | ${date} (Greenwich)`;
        }
        bot.sendMessage(chatId, text);
      });
  }
});
