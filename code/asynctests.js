'use strict';

{
  const fn = require('./functions.js');

  const tests = [
    ['PL1', 'Top scorers (async): PL'],
    ['PD', 'Top scorers (async): PD']
  ];

  const obj = {
    p: 0,
    f: 0,
    t: 0,
  };

  for (const test of tests) {
    const [par, name] = test;
    obj.t++;
    try {
      fn.TopScorers(par).then(json => {
        console.log(name);
        const info = json.scorers;
        let text = '';
        for (let i = 0; i < info.length; i++) {
          text += `${i + 1}. ${info[i].player.name}: ${info[i].numberOfGoals}\n`;
        }
        console.log(text);
        obj.p++;
      });
    } catch (err) {
      console.log(err);
      obj.f++;
    }
  }
  console.log(`Result: ${obj.t} tests, ${obj.p} passed, ${obj.f} failed`);
}
