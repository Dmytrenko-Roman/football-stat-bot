'use strict';

console.log('Async tests:');

const fn = require('../functions.js')

const params = ['BL1', 'SA', 'PL', 'CL', 'FL1', 'PD'];


for (let i = 0; i < params.length; i++) {
  fn.TopScorers(params[i]).then(json => {
    if (json.error) console.log(`[TopScorers] Test "${params[i]}" is failed. Reason: ${json.message}`);
      else console.log(`[TopScorers] Test "${params[i]}" is passed.`);
  });
}
