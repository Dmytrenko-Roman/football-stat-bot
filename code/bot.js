'use strict';

// Bot settings:

const TelegramBot = require('node-telegram-bot-api');
const funcs = require('./functions.js');

const token = process.env.TOKEN;
const url = process.env.APP_URL || 'https://playerstatbot.herokuapp.com/';

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
  info: '/info',
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
    const league = msgt.substr(commands.mat.length + 1, msgt.length);
    let text = '';
    funcs.Matches()
      .then(json => {
        const matches = json.matches;
        for (let k = 0; k < matches.length; k++) {
          const match = {
            compName: matches[k].competition.name,
            homeTeam: matches[k].homeTeam.name,
            awayTeam: matches[k].awayTeam.name,
            score1: matches[k].score.fullTime.homeTeam,
            score2: matches[k].score.fullTime.awayTeam,
            date: funcs.Time(matches[k].utcDate.substr(11, 5)),
          };
          if (match.compName === league) {
            if (match.score1 !== null) {
              text += `${match.homeTeam} ${match.score1}:${match.score2} ${match.awayTeam}\n`;
            } else {
              text += `${match.homeTeam} : ${match.awayTeam} | ${match.date}\n`;
            }
          }
        }
        bot.sendMessage(chatId, text);
      });
  }

  // Information:

  if (msgt.substr(0, commands.info.length) === commands.info) {
    const text = `Hello, I'm a football statistics bot!\nI will help you find out information regarding the statistics of players and teams from the top 5 championships.`;
    bot.sendMessage(chatId, text);
  }
});
