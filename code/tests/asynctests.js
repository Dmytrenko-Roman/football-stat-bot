'use strict';

console.log('Async tests:');

const fn = require('../functions.js');

const params = ['BL1', 'SA', 'PL', 'FL1', 'PD', 'CL'];

for (let i = 0; i < params.length; i++) {
  fn.TopScorers(params[i]).then(json => {
    if (json.error) throw `[TopScorers] Test "${params[i]}" is failed. Reason: ${json.message}`;
    else console.log(`[TopScorers] Test "${params[i]}" is passed.`);
  });
  fn.Table(params[i]).then(json => {
    if (json.error) throw `[Table] Test "${params[i]}" is failed. Reason: ${json.message}`;
    else console.log(`[Table] Test "${params[i]}" is passed.`);
  });
  fn.Matches(params[i]).then(json => {
    if (json.error) throw `[Matches] Test "${params[i]}" is failed. Reason: ${json.message}`;
    else console.log(`[Matches] Test "${params[i]}" is passed.`);
  });
}
