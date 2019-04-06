const { Readable } = require('stream');

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

test('get `headers` returns headers', t => {
  const request = new Request();
  request[internal] = { headers: {} };

  t.is(request.headers, request[internal].headers);
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

test('`json` returns body as object', async t => {
  const body = { module: 'vitro' };

  const stream = new Readable();
  stream.push(JSON.stringify(body));
  stream.push(null);

  const request = new Request();
  request[internal] = { body: stream, headers: {} };

  const obj = await request.json();

  t.deepEqual(obj, body);
});

test('`json` with invalid json throws error', async t => {
  const stream = new Readable();
  stream.push('invalid json');
  stream.push(null);

  const request = new Request();
  request[internal] = { body: stream, headers: {} };

  const { vitro, code, message } = await t.throwsAsync(() => request.json());

  t.true(vitro);
  t.is(code, 'VITRO_BODY_JSON_INVALID');
  t.is(message, 'Invalid json');
});

test('`text` returns body as string', async t => {
  const stream = new Readable();
  stream.push('body');
  stream.push(null);

  const request = new Request();
  request[internal] = { body: stream, headers: {} };

  const text = await request.text();

  t.is(text, 'body');
});

test('`text` with body larger than limit throws error', async t => {
  const stream = new Readable();
  stream.push('more than 1b of text');
  stream.push(null);

  const request = new Request();
  request[internal] = { body: stream, headers: {}, limit: '1b' };

  const { vitro, code, message } = await t.throwsAsync(() => request.json());

  t.true(vitro);
  t.is(code, 'VITRO_BODY_EXCEEDED');
  t.is(message, 'Body limit exceeded');
});

test('`text` with invalid body throws error', async t => {
  const request = new Request();
  request[internal] = { body: {}, headers: {} };

  const { vitro, code, message } = await t.throwsAsync(() => request.json());

  t.true(vitro);
  t.is(code, 'VITRO_BODY_INVALID');
  t.is(message, 'Invalid body');
});

test('`Response` extends `Body`', t => {
  t.true(new Request() instanceof Body);
});
