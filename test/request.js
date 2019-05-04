const { Readable } = require('stream');

const test = require('ava');

const Headers = require('../lib/headers');
const Request = require('../lib/request');

test('get `body` returns req', t => {
  const req = {};
  const request = new Request(req, {});

  t.is(request.body, req);
});

test('get `bodyUsed` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.bodyUsed);

  t.is(err.message, 'Not supported');
});

test('get `cache` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.cache);

  t.is(err.message, 'Not supported');
});

test('get `credentials` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.credentials);

  t.is(err.message, 'Not supported');
});

test('get `destination` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.destination);

  t.is(err.message, 'Not supported');
});

test('get `headers` returns headers', t => {
  const headers = { 'accept-encoding': 'deflate' };
  const request = new Request({ headers }, {});

  t.deepEqual(Object.fromEntries(request.headers), {
    'accept-encoding': 'deflate'
  });
});

test('get `integrity` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.integrity);

  t.is(err.message, 'Not supported');
});

test('get `method` returns method', t => {
  const method = 'POST';
  const request = new Request({ method }, {});

  t.is(request.method, method);
});

test('get `mode` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.mode);

  t.is(err.message, 'Not supported');
});

test('get `redirect` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.redirect);

  t.is(err.message, 'Not supported');
});

test('get `referrer` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.referrer);

  t.is(err.message, 'Not supported');
});

test('get `referrerPolicy` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.referrerPolicy);

  t.is(err.message, 'Not supported');
});

test('get `url` returns url', t => {
  const url = '/ct0r/vitro';
  const request = new Request({ url }, {});

  t.is(request.url, `http://vitro${url}`);
});

test('`arrayBuffer` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.arrayBuffer());

  t.is(err.message, 'Not supported');
});

test('`blob` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.blob());

  t.is(err.message, 'Not supported');
});

test('`clone` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.clone());

  t.is(err.message, 'Not supported');
});

test('`formData` throws not supported error', t => {
  const request = new Request({}, {});

  const err = t.throws(() => request.formData());

  t.is(err.message, 'Not supported');
});

test('`json` returns body as object', async t => {
  const req = new Readable();
  req.push(JSON.stringify({ module: 'vitro' }));
  req.push(null);

  const request = new Request(req, {});

  const obj = await request.json();

  t.deepEqual(obj, { module: 'vitro' });
});

test('`json` with invalid json throws error', async t => {
  const req = new Readable();
  req.push('invalid json');
  req.push(null);

  const request = new Request(req, {});

  const { status, message } = await t.throwsAsync(() => request.json());

  t.is(status, 400);
  t.is(message, 'Invalid json');
});

test('`text` returns body as string', async t => {
  const req = new Readable();
  req.push('body');
  req.push(null);

  const request = new Request(req, {});

  const text = await request.text();

  t.is(text, 'body');
});

test('`text` with body larger than limit throws error', async t => {
  const req = new Readable();
  req.push(new Array(50000).fill('0123456789').join('01234567890'));
  req.push(null);

  const request = new Request(req, { limit: '1b' });

  const { status, message } = await t.throwsAsync(() => request.text());

  t.is(status, 413);
  t.is(message, 'Body limit exceeded');
});
