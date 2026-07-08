'use strict';

/**
 * A tiny calculator. Each release/feature/hotfix in this repo adds to or
 * fixes one of these functions so the Git Flow history has something real
 * to show.
 */

function add(a, b) {
  // Hotfix: coerce inputs so add("2", 3) returns 5, not "23".
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b * 1;
}

module.exports = { add, subtract, multiply };
