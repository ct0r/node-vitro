const test = require('ava');

const createError = require('../lib/error');

test('createError sets error fields', t => {
  const code = 'CODE';
  const message = 'some error message';
  const original = new Error();

  const err = createError(code, message, original);

  t.is(err.code, code);
  t.is(err.message, message);
  t.is(err.original, original);
});
