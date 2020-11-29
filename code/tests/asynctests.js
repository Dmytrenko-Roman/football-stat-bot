'use strict';

console.log('Async tests:');

const fn = require('../functions.js')
const asyncLog = (passed, failed, tests) => {
  setTimeout(() => {
    console.log(`Result: ${tests} tests, ${passed} passsed, ${failed} failed.`)
  }, 1000)
}
const params = ['BL1', 'SA', 'PL', 'FL1', 'PD', 'CL'];

const tests = {
  p: 0,
  f: 0,
  t: 0,
};

for (let i = 0; i < params.length; i++) {
  fn.TopScorers(params[i]).then(json => {
    tests.t++;
    if (json.error) {
      tests.f++;
      console.log(`[TopScorers] Test "${params[i]}" is failed. Reason: ${json.message}`);
    }
      else tests.p++;
  });
  fn.Table(params[i]).then(json => {
    tests.t++;
    if (json.error) {
      tests.f++;
      console.log(`[Table] Test "${params[i]}" is failed. Reason: ${json.message}`);
    }
      else tests.p++;
  });
  fn.Matches(params[i]).then(json => {
    tests.t++;
    if (json.error) {
      tests.f++;
      console.log(`[Matches] Test "${params[i]}" is failed. Reason: ${json.message}`);
    }
      else tests.p++;
  });
}

asyncLog();