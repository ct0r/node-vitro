const { Readable } = require('stream');

const test = require('ava');

const Body = require('../lib/body');
const { internal } = require('../lib/symbols');

test('get `body` returns body', t => {
  const body = new Body();

  const err = t.throws(() => body.body);

  t.is(err.message, 'Not supported');
});

test('get `bodyUsed` throws not supported error', t => {
  const body = new Body();

  const err = t.throws(() => body.bodyUsed);

  t.is(err.message, 'Not supported');
});

test('get `headers` returns headers', t => {
  const request = new Body();
  request[internal] = { headers: {} };

  t.is(request.headers, request[internal].headers);
});

test('`arrayBuffer` throws not supported error', t => {
  const body = new Body();

  const err = t.throws(() => body.arrayBuffer());

  t.is(err.message, 'Not supported');
});

test('`blob` throws not supported error', t => {
  const body = new Body();

  const err = t.throws(() => body.blob());

  t.is(err.message, 'Not supported');
});

test('`formData` throws not supported error', t => {
  const body = new Body();

  const err = t.throws(() => body.formData());

  t.is(err.message, 'Not supported');
});

test('`json` returns body as object', async t => {
  const body = { module: 'vitro' };

  const stream = new Readable();
  stream.push(JSON.stringify(body));
  stream.push(null);

  const request = new Body();
  request[internal] = { body: stream, headers: {} };

  const obj = await request.json();

  t.deepEqual(obj, body);
});

test('`json` with invalid json throws error', async t => {
  const stream = new Readable();
  stream.push('invalid json');
  stream.push(null);

  const request = new Body();
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

  const request = new Body();
  request[internal] = { body: stream, headers: {} };

  const text = await request.text();

  t.is(text, 'body');
});

test('`text` with body larger than limit throws error', async t => {
  const stream = new Readable();
  stream.push('more than 1b of text');
  stream.push(null);

  const request = new Body();
  request[internal] = { body: stream, headers: {}, limit: '1b' };

  const { vitro, code, message } = await t.throwsAsync(() => request.json());

  t.true(vitro);
  t.is(code, 'VITRO_BODY_EXCEEDED');
  t.is(message, 'Body limit exceeded');
});
