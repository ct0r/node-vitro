const test = require('ava');

const Headers = require('../lib/headers');
const { internal: map } = require('../lib/symbols');

test('`new` without init creates empty headers', t => {
  const headers = new Headers();

  t.is(headers[map].size, 0);
});

test('`new` with init as object creates headers', t => {
  const headers = new Headers({ 'Accept-Encoding': 'deflate' });

  t.is(headers[map].get('accept-encoding'), 'deflate');
});

test('`new` with init as iterable creates headers', t => {
  const headers = new Headers([['Accept-Encoding', 'deflate']]);

  t.is(headers[map].get('accept-encoding'), 'deflate');
});

test('`append` with new name adds new entry', t => {
  const headers = new Headers();

  const result = headers.append('Accept-Encoding', 'deflate');

  t.is(result, undefined);
  t.is(headers[map].get('accept-encoding'), 'deflate');
});

test('`append` with existing name appends given value onto the end', t => {
  const headers = new Headers();
  headers[map].set('accept-encoding', 'deflate');

  const result = headers.append('Accept-Encoding', 'gzip');

  t.is(result, undefined);
  t.is(headers[map].get('accept-encoding'), 'deflate, gzip');
});

test('`append` with invalid name throws error', t => {
  const headers = new Headers();

  const error = t.throws(() => headers.append('👎', ''), TypeError);

  t.is(error.message, 'Invalid name');
});

test('`append` converts value to string', t => {
  const headers = new Headers();

  const result = headers.append('Content-Length', 321);

  t.is(result, undefined);
  t.is(headers[map].get('content-length'), '321');
});

test('`delete` removes element with given name', t => {
  const headers = new Headers();
  headers[map].set('accept-encoding', 'deflate');

  const result = headers.delete('Accept-Encoding');

  t.is(result, undefined);
  t.false(headers[map].has('accept-encoding'));
});

test('`delete` with invalid name throws error', t => {
  const headers = new Headers();

  const error = t.throws(() => headers.delete('👎'), TypeError);

  t.is(error.message, 'Invalid name');
});

test('`entries` returns entry iterator', t => {
  const headers = new Headers();
  headers[map].set('accept-encoding', 'deflate');

  const iterator = headers.entries()[Symbol.iterator]();
  const value = iterator.next().value;
  const done = iterator.next().done;

  t.deepEqual(value, ['accept-encoding', 'deflate']);
  t.true(done);
});

test('`get` with existing name returns value', t => {
  const headers = new Headers();
  headers[map].set('accept-encoding', 'deflate');

  const result = headers.get('Accept-Encoding');

  t.is(result, 'deflate');
});

test('`get` with non-existing name returns null', t => {
  const headers = new Headers();

  const result = headers.get('Accept-Encoding');

  t.is(result, null);
});

test('`get` with invalid name throws error', t => {
  const headers = new Headers();

  const error = t.throws(() => headers.get('👎'), TypeError);

  t.is(error.message, 'Invalid name');
});

test('`has` with existing name returns true', t => {
  const headers = new Headers();
  headers[map].set('accept-encoding', 'deflate');

  const result = headers.has('Accept-Encoding');

  t.true(result);
});

test('`has` with non-existing name returns false', t => {
  const headers = new Headers();

  const result = headers.has('Accept-Encoding');

  t.false(result);
});

test('`has` with invalid name throws error', t => {
  const headers = new Headers();

  const error = t.throws(() => headers.has('👎'), TypeError);

  t.is(error.message, 'Invalid name');
});

test('`keys` returns key iterator', t => {
  const headers = new Headers();
  headers[map].set('accept-encoding', 'deflate');

  const iterator = headers.keys()[Symbol.iterator]();
  const value = iterator.next().value;
  const done = iterator.next().done;

  t.deepEqual(value, 'accept-encoding');
  t.true(done);
});

test('`set` with non-existing name adds a new entry', t => {
  const headers = new Headers();

  const result = headers.set('Accept-Encoding', 'deflate');

  t.is(result, undefined);
  t.is(headers[map].get('accept-encoding'), 'deflate');
});

test('`set` with existing name sets a new value', t => {
  const headers = new Headers();
  headers[map].set('accept-encoding', 'deflate');

  const result = headers.set('Accept-Encoding', 'gzip');

  t.is(result, undefined);
  t.is(headers[map].get('accept-encoding'), 'gzip');
});

test('`set` converts value to string', t => {
  const headers = new Headers();

  const result = headers.set('Content-Length', 321);

  t.is(result, undefined);
  t.is(headers[map].get('content-length'), '321');
});

test('`set` with invalid name throws error', t => {
  const headers = new Headers();

  const error = t.throws(() => headers.set('👎', ''), TypeError);

  t.is(error.message, 'Invalid name');
});

test('`values` returns value iterator', t => {
  const headers = new Headers();
  headers[map].set('accept-encoding', 'deflate');

  const iterator = headers.values()[Symbol.iterator]();
  const value = iterator.next().value;
  const done = iterator.next().done;

  t.deepEqual(value, 'deflate');
  t.true(done);
});
