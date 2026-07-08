'use strict';

/**
 * A tiny calculator. Each release/feature/hotfix in this repo adds to or
 * fixes one of these functions so the Git Flow history has something real
 * to show.
 */

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };
