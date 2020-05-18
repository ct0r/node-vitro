const { STATUS_CODES } = require("http");

const test = require("ava");

const Response = require("../lib/response");

test("get `ok` with succesful status returns true", (t) => {
  Object.keys(STATUS_CODES).forEach((key) => {
    const status = parseInt(key);
    const response = new Response(null, { status });

    t.deepEqual(
      { status, ok: response.ok },
      { status, ok: status > 199 && status < 300 }
    );
  });
});

test("get `redirected` throws not supported error", (t) => {
  const response = new Response();

  const err = t.throws(() => response.redirected);

  t.is(err.message, "Not supported");
});

test("get `status` returns status", (t) => {
  const response = new Response(null, { status: 500 });

  t.is(response.status, 500);
});

test("get `statusText` returns statusText", (t) => {
  const response = new Response(null, { statusText: "Custom status text" });

  t.is(response.statusText, "Custom status text");
});

test("get `type` throws not supported error", (t) => {
  const response = new Response();

  const err = t.throws(() => response.type);

  t.is(err.message, "Not supported");
});

test("get `url` throws not supported error", (t) => {
  const response = new Response();

  const err = t.throws(() => response.url);

  t.is(err.message, "Not supported");
});

test("`clone` throws not supported error", (t) => {
  const response = new Response();

  const err = t.throws(() => response.clone());

  t.is(err.message, "Not supported");
});

test("`error` throws not supported error", (t) => {
  const response = new Response();

  const err = t.throws(() => response.error());

  t.is(err.message, "Not supported");
});

test("`redirect` throws not supported error", (t) => {
  const response = new Response();

  const err = t.throws(() => response.redirect("http://www.example.com", 302));

  t.is(err.message, "Not supported");
});
