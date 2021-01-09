'use strict';

//Functions:
const funcs = require('./functions.js');

// Bot settings:
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const url = process.env.APP_URL || 'https://playerstatbot.herokuapp.com/';

// Bot:
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

// Leagues:
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
    let txt = '';
    funcs.TopScorers(league)
      .then(json => {
        const info = json.scorers;
        for (let i = 0; i < info.length; i++) {
          txt += `${i + 1}. ${info[i].player.name}: ${info[i].numberOfGoals}\n`;
        }
        bot.sendMessage(chatId, txt);
      });
  }
  // Teams positions:
  if (msgt.substr(0, commands.pos.length) === commands.pos) {
    const league = funcs.CheckLeague(leagues, msgt, commands.pos);
    let txt = '';
    funcs.Table(league)
      .then(json => {
        const tablejson = json.standings[0].table;
        for (let k = 0; k < tablejson.length; k++) {
          const team = {
            position: tablejson[k].position,
            name: tablejson[k].team.name,
            won: tablejson[k].won,
            draw: tablejson[k].draw,
            lost: tablejson[k].lost,
            points: tablejson[k].points,
          };
          txt += `${team.position}. ${team.name}` +
          `|W:${team.won}|D:${team.draw}|L:${team.lost}|P:${team.points}|\n`;
        }
        bot.sendMessage(chatId, txt);
      });
  }
  // Matches:
  if (msgt.substr(0, commands.mat.length) === commands.mat) {
    const league = msgt.substr(commands.mat.length + 1, msgt.length);
    let txt = '';
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
              txt += `${match.homeTeam} ${match.score1}` +
              `:${match.score2} ${match.awayTeam}\n`;
            } else {
              txt += `${match.homeTeam} : ${match.awayTeam} | ${match.date}\n`;
            }
          }
        }
        bot.sendMessage(chatId, txt);
      });
  }
  // Information:
  if (msgt.substr(0, commands.info.length) === commands.info) {
    const txt = 'Hello, Im a football statistics bot!' +
    'Commands:\n' +
    '/topscorers - shows the top 10 scorers from the specified league.\n' +
    '/positions - shows the league standings.\n' +
    '/matches - shows matches of the specified league.\n';
    bot.sendMessage(chatId, txt);
  }
});
