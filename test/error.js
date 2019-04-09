const test = require('ava');

const createError = require('../lib/error');

test('createError sets error fields', t => {
  const status = 204;
  const message = 'some error message';
  const original = new Error();

  const err = createError(status, message, original);

  t.is(err.status, status);
  t.is(err.message, message);
  t.is(err.original, original);
});
