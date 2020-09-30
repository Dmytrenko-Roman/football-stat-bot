'use strict';

let result = {};
const fetch = require('node-fetch');

fetch('https://api.football-data.org/v2/competitions/SA/scorers', {
  headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
  dataType: 'json',
  type: 'GET',
})
  .then(res => res.json())
  .then(json => {
    const name = json.scorers[0].player.name;
    const goals = json.scorers[0].numberOfGoals;
    console.log(name, goals);
  });
