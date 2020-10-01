'use strict';

const assert = require('assert').strict;

{
  const fn = require('./code.js');

  const tests = [
  ];

  const obj = {
    p: 0,
    f: 0,
    t: 0,
  };

  for (const test of tests) {
    const [par, expected, name] = test;
    const result = fn(par);
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