'use strict';

console.log('Async tests:');

{
  const fn = require('../functions.js');

  const tests = [
    ['PL', 'Top scorers (async): PL'],
    ['PD', 'Top scorers (async): PD'],
  ];

  const AsyncConsoleLog = () => {
    setTimeout(() => console.log(`Result: ${obj.t} tests, ${obj.p} passed, ${obj.f} failed`), 500);
  }

  const obj = {
    p: 0,
    f: 0,
    t: 0,
  };

  for (const test of tests) {
    const [par, name] = test;
    obj.t++;
      fn.TopScorers(par).then(json => {
        try {
          const info = json.scorers;
          let text = '';
          for (let i = 0; i < info.length; i++) {
            text += `${i + 1}. ${info[i].player.name}: ${info[i].numberOfGoals}\n`;
          }
          obj.p++;
          return text;
        } catch (err) {
          console.log(name, err);
          obj.f++;
        }
      });
  }
  AsyncConsoleLog();
}
