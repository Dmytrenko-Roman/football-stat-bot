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
    console.log(matches[0]);
    for (let k = 0; k < matches.length; k++) {
      const compName = matches[k].competition.name;
      const homeTeam = matches[k].homeTeam.name;
      const awayTeam = matches[k].awayTeam.name;
      const score1 = matches[k].score.fullTime.homeTeam;
      const score2 = matches[k].score.fullTime.awayTeam;
      const date = matches[k].utcDate.substr(11, 5);
      
      if (score1 !== null) console.log(`${compName}:\n${homeTeam} ${score1}:${score2} ${awayTeam}`);
      console.log(`${compName}:\n${homeTeam} : ${awayTeam} | ${date} (Greenwich)`);
    }
  });
