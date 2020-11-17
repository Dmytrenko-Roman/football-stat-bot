'use strict';

const fetch = require('node-fetch');

fetch('https://api.football-data.org//v2/matches', {
  headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
  dataType: 'json',
  type: 'GET',
})
  .then(response => response.json())
  .then(json => {
    const matches = json.matches;
    for (let k = 0; k < matches; k++) {
      console.log(`${matches[k].competition.name}:\n${matches[k].score.homeTeam} ${matches[k].score.fullTime.homeTeam}:${matches[k].score.fullTime.awayTeam} ${matches[k].awayTeam}`);
    }
  });
