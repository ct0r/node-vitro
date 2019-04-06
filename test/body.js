const test = require('ava');

const Body = require('../lib/body');

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

test('`json` throws not supported error', t => {
  const body = new Body();

  const err = t.throws(() => body.json());

  t.is(err.message, 'Not supported');
});

test('`text` throws not supported error', t => {
  const body = new Body();

  const err = t.throws(() => body.text());

  t.is(err.message, 'Not supported');
});
