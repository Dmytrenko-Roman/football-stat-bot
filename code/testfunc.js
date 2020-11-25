'use strict';

const fetch = require('node-fetch');

fetch('https://api.football-data.org/v2/players/44', {
  headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
  dataType: 'json',
  type: 'GET',
})
  .then(response => response.json())
  .then(json => {
    console.log(json);
  });


