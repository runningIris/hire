const assert = require('assert');
const { parseError } = require('../lib/index.js');

const fixtureStack = `TypeError: Error raised
  at bar http://192.168.31.8:8000/c.js:2:9
  at foo http://192.168.31.8:8000/b.js:4:15
  at calc http://192.168.31.8:8000/a.js:4:3
  at <anonymous>:1:11
  at http://192.168.31.8:8000/a.js:22:3
`;

const fixtureFirefoxStack = `
  bar@http://192.168.31.8:8000/c.js:2:9
  foo@http://192.168.31.8:8000/b.js:4:15
  calc@http://192.168.31.8:8000/a.js:4:3
  <anonymous>:1:11
  http://192.168.31.8:8000/a.js:22:3
`;

describe('浏览器生成的错误解析', function() {
  it('Chrome 浏览器', function() {
    const err = new Error('hello chrome error');
    err.stack = fixtureStack;
    assert.deepEqual(parseError(err), {
      message: err.message,
      stack: [
        {
          filename: 'http://192.168.31.8:8000/c.js',
          line: 2,
          column: 9
        },
        {
          filename: 'http://192.168.31.8:8000/b.js',
          line: 4,
          column: 15
        },
        {
          filename: 'http://192.168.31.8:8000/a.js',
          line: 4,
          column: 3
        },
        {
          filename: 'http://192.168.31.8:8000/a.js',
          line: 22,
          column: 3
        }
      ]
    })
  });
  it('Firefox 浏览器', function() {
    const err = new Error('hello firefox error');
    err.stack = fixtureFirefoxStack;
    assert.deepEqual(parseError(err), {
      message: err.message,
      stack: [
        {
          filename: 'http://192.168.31.8:8000/c.js',
          line: 2,
          column: 9
        },
        {
          filename: 'http://192.168.31.8:8000/b.js',
          line: 4,
          column: 15
        },
        {
          filename: 'http://192.168.31.8:8000/a.js',
          line: 4,
          column: 3
        },
        {
          filename: 'http://192.168.31.8:8000/a.js',
          line: 22,
          column: 3
        }
      ]
    })
  });
});
