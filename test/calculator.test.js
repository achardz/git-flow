'use strict';

const assert = require('assert');
const calc = require('../src/calculator');

assert.strictEqual(calc.add(2, 3), 5, 'add');
assert.strictEqual(calc.subtract(5, 2), 3, 'subtract');

console.log('All tests passed');
