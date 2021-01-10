'use strict';

const fetch = require('node-fetch');

const TopScorers = (league) => fetch(`https://api.football-data.org/v2/competitions/${league}/scorers`, {
  headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
  dataType: 'json',
  type: 'GET',
})
  .then(response => response.json());

const Table = (league) => fetch(`https://api.football-data.org/v2/competitions/${league}/standings`, {
  headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
  dataType: 'json',
  type: 'GET',
})
  .then(response => response.json());

const Matches = () => fetch('https://api.football-data.org/v2/matches', {
  headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
  dataType: 'json',
  type: 'GET',
})
  .then(response => response.json());

const CheckLeague = (leagues, text, command) => {
  let league = '';
  const t = text.substr(command.length + 1);
  for (const k in leagues) {
    if (leagues[k] === t) league = `${k}`;
  }
  return league;
};

const Time = (text) => {
  const cut = text.substr(0, 2);
  const cutend = text.substr(2, 4);
  const newtime = (+cut + 2).toString() + cutend;
  return newtime;
};

module.exports = { TopScorers, Table, Matches, CheckLeague, Time };
