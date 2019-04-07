const test = require('ava');

const Body = require('../lib/body');
const Request = require('../lib/request');
const { internal } = require('../lib/symbols');

test('get `cache` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.cache);

  t.is(err.message, 'Not supported');
});

test('get `credentials` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.credentials);

  t.is(err.message, 'Not supported');
});

test('get `destination` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.destination);

  t.is(err.message, 'Not supported');
});

test('get `integrity` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.integrity);

  t.is(err.message, 'Not supported');
});

test('get `method` returns method', t => {
  const request = new Request();
  request[internal] = { method: 'POST' };

  t.is(request.method, request[internal].method);
});

test('get `mode` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.mode);

  t.is(err.message, 'Not supported');
});

test('get `redirect` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.redirect);

  t.is(err.message, 'Not supported');
});

test('get `referrer` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.referrer);

  t.is(err.message, 'Not supported');
});

test('get `referrerPolicy` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.referrerPolicy);

  t.is(err.message, 'Not supported');
});

test('get `url` returns url', t => {
  const request = new Request();
  request[internal] = { url: 'http://www.example.com' };

  t.is(request.url, request[internal].url);
});

test('`clone` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.clone());

  t.is(err.message, 'Not supported');
});

test('`Response` extends `Body`', t => {
  t.true(new Request() instanceof Body);
});
