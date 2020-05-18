const { Readable } = require("stream");

const test = require("ava");
const fetch = require("node-fetch");
const listen = require("test-listen");

const vitro = require("../lib");
const { Response } = vitro;

const getUrl = (fn) => listen(vitro(fn));

test("`handle` sets request body`", async (t) => {
  const fn = async (req) => {
    t.is(await req.text(), "A martini. Shaken, not stirred.");
  };

  const url = await getUrl(fn);
  await fetch(url, { method: "POST", body: "A martini. Shaken, not stirred." });
});

test("`handle` sets request headers`", async (t) => {
  const fn = ({ headers }) => t.is(headers.get("cache-control"), "no-cache");

  const url = await getUrl(fn);
  await fetch(url, { headers: { "cache-control": "no-cache" } });
});

test("`handle` sets request method`", async (t) => {
  const fn = ({ method }) => t.is(method, "POST");

  const url = await getUrl(fn);
  await fetch(url, { method: "POST" });
});

test("`handle` sends given status", async (t) => {
  const fn = () => new Response(null, { status: 204 });

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.status, 204);
});

test("`handle` sends default status", async (t) => {
  const fn = () => new Response("A martini. Shaken, not stirred.");

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.status, 200);
});

test("`handle` with empty body and default status sends 204", async (t) => {
  const fn = () => new Response(null);

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.status, 204);
});

test("`handle` with empty body and custom status sends given status", async (t) => {
  const fn = () => new Response(null, { status: 200 });

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.status, 200);
});

test("`handle` sends given status text", async (t) => {
  const fn = () => new Response(null, { statusText: "Hasta la vista, baby" });

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.statusText, "Hasta la vista, baby");
});

test("`handle` sends default status text", async (t) => {
  const fn = () => new Response(null);

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.statusText, "OK");
});

test("`handle` sends default body", async (t) => {
  const fn = () => new Response();

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(await res.text(), "");
});

test("`handle` sends buffer body", async (t) => {
  const buffer = Buffer.from("A martini. Shaken, not stirred.");
  const fn = () => new Response(buffer);

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.headers.get("content-type"), "application/octet-stream");
  t.is(res.headers.get("content-length"), "31");
  t.is(await res.text(), "A martini. Shaken, not stirred.");
});

test("`handle` sends stream body", async (t) => {
  const stream = new Readable();
  stream.push("A martini. Shaken, not stirred.");
  stream.push(null);

  const fn = () => new Response(stream);

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.headers.get("content-type"), "application/octet-stream");
  t.is(await res.text(), "A martini. Shaken, not stirred.");
});

test("`handle` sends string body", async (t) => {
  const fn = () => new Response("A martini. Shaken, not stirred.");

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.headers.get("content-type"), "text/plain;charset=utf-8");
  t.is(res.headers.get("content-length"), "31");
  t.is(await res.text(), "A martini. Shaken, not stirred.");
});

test("`handle` sets non Response type as body", async (t) => {
  const fn = () => "A martini. Shaken, not stirred.";

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.headers.get("content-type"), "text/plain;charset=utf-8");
  t.is(res.headers.get("content-length"), "31");
  t.is(await res.text(), "A martini. Shaken, not stirred.");
});

test("`handle` with error thrown by fn sends 500", async (t) => {
  const fn = () => {
    throw new Error();
  };

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.status, 500);
});

test("`handle` with rejected promise returned by fn sends 500", async (t) => {
  const fn = () => Promise.reject(new Error());

  const url = await getUrl(fn);
  const res = await fetch(url);

  t.is(res.status, 500);
});

test("exports Request, Response and Headers classes", (t) => {
  t.true(typeof require("../lib/headers") === "function");
  t.true(typeof require("../lib/request") === "function");
  t.true(typeof require("../lib/response") === "function");
});
