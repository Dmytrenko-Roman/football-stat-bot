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
    [leagues, '/positions La Liga', '/positions', 'PD', 'Positions: La Liga'],
  ];

  const obj = {
    p: 0,
    f: 0,
    t: 0,
  };

  for (const test of tests) {
    const [par1, par2, par3, expected, name] = test;
    const result = fn.CheckLeague(par1, par2, par3);
    obj.t++;
    try {
      assert.strictEqual(result, expected, `Error in test "${name}"`);
      obj.p++;
    } catch (err) {
      console.log(err);
      obj.f++;
    }
  }
  console.log(`Result: ${obj.t} tests, ${obj.p} passed, ${obj.f} failed`);
}
