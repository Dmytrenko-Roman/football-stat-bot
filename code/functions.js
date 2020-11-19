'use strict';

const fetch = require('node-fetch');

async function TopScorers(league) {
  const response = await fetch(`https://api.football-data.org/v2/competitions/${league}/scorers`, {
    headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
    dataType: 'json',
    type: 'GET',
  })
  const json = response.json;
  return json;
}

async function Table(league) {
  return fetch(`https://api.football-data.org/v2/competitions/${league}/standings`, {
    headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
    dataType: 'json',
    type: 'GET',
  })
    .then(response => response.json());
}

async function Matches() {
  return fetch('https://api.football-data.org/v2/matches', {
    headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
    dataType: 'json',
    type: 'GET',
  })
    .then(response => response.json());
}

function CheckLeague(leagues, text, command) {
  let league = '';
  const t = text.substr(command.length + 1);
  for (const k in leagues) {
    if (leagues[k] === t) league = `${k}`;
  }
  return league;
}

module.exports = { TopScorers, Table, Matches, CheckLeague };
