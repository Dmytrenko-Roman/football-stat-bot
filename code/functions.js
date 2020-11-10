'use strict';

const fetch = require('node-fetch');


function TopScorers(league) {
  return fetch(`https://api.football-data.org/v2/competitions/${league}/scorers`, {
    headers: { 'X-Auth-Token': '831ab788816b4517bdcf099d8cd99312' },
    dataType: 'json',
    type: 'GET',
  })
    .then(response => response.json())
    .then(json => {
      const info = json.scorers;
      for (let i = 0; i < info.length; i++) {
        names[i] = info[i].player.name;
        goals[i] = info[i].numberOfGoals;
      }
      const text = `1. ${names[0]}: ${goals[0]}\n2. ${names[1]}: ${goals[1]}\n3. ${names[2]}: ${goals[2]}\n4. ${names[3]}: ${goals[3]}\n5. ${names[4]}: ${goals[4]}\n6. ${names[5]}: ${goals[5]}\n7. ${names[6]}: ${goals[6]}\n8. ${names[7]}: ${goals[7]}\n9. ${names[8]}: ${goals[8]}\n10. ${names[9]}: ${goals[9]}`;
      bot.sendMessage(chatId, text);
    });
}

module.exports = TopScorers;
