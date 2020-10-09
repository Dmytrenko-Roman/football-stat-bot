'use strict';

const fetch = require('node-fetch');

fetch('https://api.football-data.org/v2/competitions/SA/scorers', {
  headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
  dataType: 'json',
  type: 'GET',
})
  .then(res => res.json())
  .then(json => {
    const info = json.scorers;
    for (let i = 0; i < info.length; i++) {
      let name = info[i].player.name;
      let goals = info[i].numberOfGoals;
      console.log(name, goals);
    }
  });
