const { createServer, STATUS_CODES } = require('http');
const { Stream } = require('stream');

const Headers = require('./headers');
const Request = require('./request');
const Response = require('./response');
const { internal } = require('./symbols');

async function handle(req, res, fn) {
  const request = new Request(req, {});

  const response = await new Promise(resolve => resolve(fn(request)))
    .then(response => response || new Response(null, { status: 404 }))
    .catch(err => new Response(null, { status: err.status || 500 }));

  res.statusCode = response.status;
  res.statusMessage = response.statusText || STATUS_CODES[response.status];

  const { body } = response[internal];

  // TODO: send 204 when body is null and status not set by user
  if (!body) {
    res.end();
    return;
  }

  const contentType = response.headers.get('content-type');

  if (Buffer.isBuffer(body)) {
    res.setHeader('Content-Type', contentType || 'application/octet-stream');
    res.setHeader('Content-Length', body.length);
    res.end(body);

    return;
  }

  if (body instanceof Stream) {
    res.setHeader('Content-Type', contentType || 'application/octet-stream');
    body.pipe(res);

    return;
  }

  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
}

module.exports = fn => createServer((req, res) => handle(req, res, fn));
module.exports.Headers = Headers;
module.exports.Request = Request;
module.exports.Response = Response;
