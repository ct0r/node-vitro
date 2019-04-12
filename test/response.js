const { STATUS_CODES } = require('http');

const test = require('ava');

const Body = require('../lib/body');
const Response = require('../lib/response');
const { internal } = require('../lib/symbols');

test('get `ok` with succesful status returns true', t => {
  const response = new Response();
  response[internal] = { status: 200 };

  Object.keys(STATUS_CODES).forEach(key => {
    const status = parseInt(key);
    const response = new Response();
    response[internal] = { status };

    t.deepEqual(
      { status, ok: response.ok },
      { status, ok: status > 199 && status < 300 }
    );
  });
});

test('get `redirected` throws not supported error', t => {
  const response = new Response();

  const err = t.throws(() => response.redirected);

  t.is(err.message, 'Not supported');
});

test('get `status` returns status', t => {
  const response = new Response();
  response[internal] = { status: 200 };

  t.is(response.status, response[internal].status);
});

test('get `statusText` returns statusText', t => {
  const response = new Response();
  response[internal] = { statusText: 'OK' };

  t.is(response.statusText, response[internal].statusText);
});

test('get `type` throws not supported error', t => {
  const response = new Response();

  const err = t.throws(() => response.type);

  t.is(err.message, 'Not supported');
});

test('get `url` throws not supported error', t => {
  const response = new Response();

  const err = t.throws(() => response.url);

  t.is(err.message, 'Not supported');
});

test('`clone` throws not supported error', t => {
  const response = new Response();

  const err = t.throws(() => response.clone());

  t.is(err.message, 'Not supported');
});

test('`error` throws not supported error', t => {
  const response = new Response();

  const err = t.throws(() => response.error());

  t.is(err.message, 'Not supported');
});

test('`redirect` throws not supported error', t => {
  const response = new Response();

  const err = t.throws(() => response.redirect('http://www.example.com', 302));

  t.is(err.message, 'Not supported');
});

test('`Response` extends `Body`', t => {
  t.true(new Response() instanceof Body);
});