'use strict';

const fetch = require('node-fetch');


async function TopScorers(league) {
  const response = await fetch(`https://api.football-data.org/v2/competitions/${league}/scorers`, {
    headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
    dataType: 'json',
    type: 'GET',
  });
  return response();
}

module.exports = { TopScorers };
