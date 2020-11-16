'use strict';

console.log('Tests:');

const assert = require('assert').strict;

{
  const fn = require('../functions.js');

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
    [leagues, '/positions Bundesliga', '/positions', 'BL11', 'Positions: Bundesliga'],
    [leagues, '/positions Serie A', '/positions', 'SA1', 'Positions: Serie A'],
    [leagues, '/positions Ligue 1', '/positions', 'FL11', 'Positions: Ligue 1'],
    [leagues, '/positions EPL', '/positions', 'PL1', 'Positions: EPL'],
    [leagues, '/topscorers La Liga', '/topscorers', 'PD1', 'Topscorers: La Liga'],
    [leagues, '/topscorers Bundesliga', '/topscorers', 'BL11', 'Topscorers: Bundesliga'],
    [leagues, '/topscorers Serie A', '/topscorers', 'SA1', 'Topscorers: Serie A'],
    [leagues, '/topscorers Ligue 1', '/topscorers', 'FL11', 'Topscorers: Ligue 1'],
    [leagues, '/topscorers Champions league', '/topscorers', 'CL1', 'Topscorers: Champions league'],
    [leagues, '/topscorers EPL', '/topscorers', 'PL1', 'Topscorers: EPL'],
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
      obj.f++;
      throw Error(err);
    }
  }
  console.log(`Result: ${obj.t} tests, ${obj.p} passed, ${obj.f} failed`);
}
