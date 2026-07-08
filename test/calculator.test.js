'use strict';

const assert = require('assert');
const calc = require('../src/calculator');

assert.strictEqual(calc.add(2, 3), 5, 'add');
assert.strictEqual(calc.subtract(5, 2), 3, 'subtract');
assert.strictEqual(calc.multiply(4, 3), 12, 'multiply');
assert.strictEqual(calc.add('2', 3), 5, 'add coerces strings (hotfix 1.1.1)');

console.log('All tests passed');
