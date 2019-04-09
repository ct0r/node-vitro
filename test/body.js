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
  const stream = new Readable();
  stream.push(JSON.stringify({ module: 'vitro' }));
  stream.push(null);

  const body = new Body();
  body[internal] = { body: stream, headers: {} };

  const obj = await body.json();

  t.deepEqual(obj, { module: 'vitro' });
});

test('`json` with invalid json throws error', async t => {
  const stream = new Readable();
  stream.push('invalid json');
  stream.push(null);

  const body = new Body();
  body[internal] = { body: stream, headers: {} };

  const { status, message } = await t.throwsAsync(() => body.json());

  t.is(status, 400);
  t.is(message, 'Invalid json');
});

test('`text` returns body as string', async t => {
  const stream = new Readable();
  stream.push('body');
  stream.push(null);

  const body = new Body();
  body[internal] = { body: stream, headers: {} };

  const text = await body.text();

  t.is(text, 'body');
});

test('`text` with body larger than limit throws error', async t => {
  const stream = new Readable();
  stream.push(new Array(50000).fill('0123456789').join('01234567890'));
  stream.push(null);

  const body = new Body();
  body[internal] = { body: stream, headers: {}, limit: '1b' };

  const { status, message } = await t.throwsAsync(() => body.text());

  t.is(status, 413);
  t.is(message, 'Body limit exceeded');
});
