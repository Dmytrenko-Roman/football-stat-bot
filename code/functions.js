'use strict';

const fetch = require('node-fetch');

function TopScorers(league) {
  return fetch(`https://api.football-data.org/v2/competitions/${league}/scorers`, {
    headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
    dataType: 'json',
    type: 'GET',
  })
    .then(response => response.json());
}

//console.log(TopScorers('SA'));

module.exports = TopScorers;
