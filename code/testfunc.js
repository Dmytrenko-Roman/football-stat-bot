'use strict';

const fetch = require('node-fetch');

fetch(`https://api.football-data.org/v2/competitions/PL/standings`, {
    headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
    dataType: 'json',
    type: 'GET',
  })
    .then(response => response.json())
    .then(json => {
      let array = []
      const table = json.standings[0].table;
      for (let k = 0; k < table.length; k++) {
        console.log(`${table[k].position}. ${table[k].team.name} |W:${table[k].won}|D:${table[k].draw}|L:${table[k].lost}|`)
        array.push(k);
      }
      console.log(array.length);
    });