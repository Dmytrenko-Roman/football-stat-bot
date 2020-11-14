'use strict';

const assert = require('assert').strict;

{
  const fn = require('./functions.js');

  const leagues = {
    SA: 'Serie A',
    PL: 'EPL',
    BL1: 'Bundesliga',
    FL1: 'Ligue 1',
    CL: 'Champions league',
    PD: 'La Liga'
  };

  const tests = [
    ['PLs', 'Top scorers (async): PL'],
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
      console.log(name);
      fn.TopScorers(par).then(json => {
        const info = json.scorers;
        let text = '';
        for (let i = 0; i < info.length; i++) {
          text += `${i + 1}. ${info[i].player.name}: ${info[i].numberOfGoals}\n`;
        }
        console.log(text);
      });
      obj.p++;
    } catch (err) {
      console.log(err);
      obj.f++;
    }
  }
  console.log(`Result: ${obj.t} tests, ${obj.p} passed, ${obj.f} failed`);
}
