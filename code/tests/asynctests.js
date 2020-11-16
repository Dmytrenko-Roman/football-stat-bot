'use strict';

console.log('Async tests:');

{
  const fn = require('../functions.js');

  const testsTopScorers = [
    ['PL', 'Top scorers (async): PL |'],
    ['PD', 'Top scorers (async): PD |'],
    ['BL1', 'Top scorers (async): BL1 |'],
    ['FL1', 'Top scorers (async): FL1 |'],
    ['CL', 'Top scorers (async): CL |'],
    ['SA', 'Top scorers (async): SA |'],
  ];

  const testsTable = [
    ['PL', 'Table (async): PL |'],
    ['PD', 'Table (async): PD |'],
    ['BL1', 'Table (async): BL1 |'],
    ['FL1', 'Table (async): FL1 |'],
    ['SA', 'Table (async): SA |'],
  ]

  const AsyncConsoleLog = () => {
    setTimeout(() => console.log(`Result: ${obj.t} tests, ${obj.p} passed, ${obj.f} failed`), 2000);
  }

  const obj = {
    p: 0,
    f: 0,
    t: 0,
  };

  for (const test of testsTopScorers) {
    const [par, name] = test;
      fn.TopScorers(par).then(json => {
        try {
          obj.t++;
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

  /*for (const test2 of testsTable) {
    const [par, name] = test2;
      fn.Table(par).then(json => {
        try {
          obj.t++;
          let text = '';
          const tablejson = json.standings[0].table;
          for (let k = 0; k < tablejson.length; k++) {
            text += `${tablejson[k].position}. ${tablejson[k].team.name} |W:${tablejson[k].won}|D:${tablejson[k].draw}|L:${tablejson[k].lost}|P:${tablejson[k].points}|\n`;
          }
          obj.p++;
          return text;
        } catch (err) {
          console.log(name, err);
          obj.f++;
        }
      });
  } */

  AsyncConsoleLog();
}
