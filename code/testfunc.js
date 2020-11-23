'use strict';

const fetch = require('node-fetch');

const leaguesM = {
  L1: ['Ligue 1', 'Ligue 1:\n'],
  PL: ['Premier League', 'EPL:\n'],
  BL: ['Bundesliga', 'Bundesliga:\n'],
  SA: ['Serie A', 'Serie A:\n'],
  LL: ['Primera Division', 'La Liga:\n'],
};

fetch('https://api.football-data.org//v2/matches', {
  headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
  dataType: 'json',
  type: 'GET',
})
  .then(response => response.json())
  .then(json => {
    const matches = json.matches;
    for (let k = 0; k < matches.length; k++) {
      const compName = matches[k].competition.name;
      const homeTeam = matches[k].homeTeam.name;
      const awayTeam = matches[k].awayTeam.name;
      const score1 = matches[k].score.fullTime.homeTeam;
      const score2 = matches[k].score.fullTime.awayTeam;
      const date = matches[k].utcDate.substr(11, 5);
      for (const key in leaguesM) {
        if (compName === leaguesM[key][0]) {
          if (score1 !== null) leaguesM[key][1] += `${homeTeam} ${score1}:${score2} ${awayTeam}\n`;
          leaguesM[key][1] += `${homeTeam} : ${awayTeam} | ${date} (Greenwich)\n`;
        }
      }
    }
    const text = leaguesM.L1[1] + leaguesM.PL[1] + leaguesM.BL[1] + leaguesM.SA[1] + leaguesM.LL[1];
    console.log(text);
  });


