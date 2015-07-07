'use strict';

/* deps:mocha */
var assert = require('assert');
var regex = require('./');

function unc(str) {
  return regex().test(str);
}

describe('UNC path regex', function () {
  it('should return true for UNC paths', function () {
    assert.equal(unc('\\/foo/bar'), true);
    assert.equal(unc('\\\\foo/bar'), true);
    assert.equal(unc('\\\\foo\\admin$'), true);
    assert.equal(unc('\\\\foo\\admin$\\system32'), true);
    assert.equal(unc('\\\\foo\\temp'), true);
    assert.equal(unc('\\\\/foo/bar'), true);
    assert.equal(unc('\\\\\\/foo/bar'), true);
  });

  it('should return false for non-UNC paths', function () {
    assert.equal(unc('/foo/bar'), false);
    assert.equal(unc('/'), false);
    assert.equal(unc('/foo'), false);
    assert.equal(unc('/foo/'), false);
    assert.equal(unc('c:'), false);
    assert.equal(unc('c:.'), false);
    assert.equal(unc('c:./'), false);
    assert.equal(unc('c:./file'), false);
    assert.equal(unc('c:/'), false);
    assert.equal(unc('c:/file'), false);
  });
});
