const { Readable } = require('stream');

const test = require('ava');

const Request = require('../lib/request');
const { internal } = require('../lib/symbols');

test('`body` returns body', t => {
  const request = new Request();
  request[internal] = { body: {} };

  t.is(request.body, request[internal].body);
});

test('`headers` returns headers', t => {
  const request = new Request();
  request[internal] = { headers: {} };

  t.is(request.headers, request[internal].headers);
});

test('`method` returns method', t => {
  const request = new Request();
  request[internal] = { method: 'POST' };

  t.is(request.method, request[internal].method);
});

test('`url` returns url', t => {
  const request = new Request();
  request[internal] = { url: 'https://github.com/ct0r/vitro' };

  t.is(request.url, request[internal].url);
});

test('`text` returns body as text', async t => {
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

  const { vitro, code, message } = await t.throwsAsync(_ => request.json());

  t.true(vitro);
  t.is(code, 'VITRO_BODY_EXCEEDED');
  t.is(message, 'Body limit exceeded');
});

test('`text` with invalid body throws error', async t => {
  const request = new Request();
  request[internal] = { body: {}, headers: {} };

  const { vitro, code, message } = await t.throwsAsync(_ => request.json());

  t.true(vitro);
  t.is(code, 'VITRO_BODY_INVALID');
  t.is(message, 'Invalid body');
});

test('`json` returns body as object', async t => {
  const body = { repository: 'ct0r/vitro' };

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

  const { vitro, code, message } = await t.throwsAsync(_ => request.json());

  t.true(vitro);
  t.is(code, 'VITRO_BODY_JSON_INVALID');
  t.is(message, 'Invalid json');
});

test('`bodyUsed` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.bodyUsed);

  t.is(err.message, 'Not supported');
});

test('`cache` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.cache);

  t.is(err.message, 'Not supported');
});

test('`credentials` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.credentials);

  t.is(err.message, 'Not supported');
});

test('`destination` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.destination);

  t.is(err.message, 'Not supported');
});

test('`integrity` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.integrity);

  t.is(err.message, 'Not supported');
});

test('`mode` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.mode);

  t.is(err.message, 'Not supported');
});

test('`redirect` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.redirect);

  t.is(err.message, 'Not supported');
});

test('`referrer` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.referrer);

  t.is(err.message, 'Not supported');
});

test('`referrerPolicy` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.referrerPolicy);

  t.is(err.message, 'Not supported');
});

test('`arrayBuffer` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.arrayBuffer());

  t.is(err.message, 'Not supported');
});

test('`blob` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.blob());

  t.is(err.message, 'Not supported');
});

test('`clone` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.clone());

  t.is(err.message, 'Not supported');
});

test('`formData` throws not supported error', t => {
  const request = new Request();

  const err = t.throws(() => request.formData());

  t.is(err.message, 'Not supported');
});
