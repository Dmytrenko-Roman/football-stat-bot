'use strict';

const fetch = require('node-fetch');

async function Func() {
  const response = await fetch('https://api.football-data.org//v2/matches', {
    headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
    dataType: 'json',
    type: 'GET',
  })
  const json = await response.json();
  return json;
}

console.log(Func().then(json => console.log(json)));