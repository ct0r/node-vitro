const { Stream } = require('stream');

const getRawBody = require('raw-body');
const contentType = require('content-type');

const Headers = require('./headers');
const createError = require('./error');
const { internal } = require('./symbols');

class Body {
  constructor(body, headers) {
    headers = headers == null ? new Headers() : new Headers(headers);

    if (body == null) {
      body = '';
    } else if (body instanceof Stream) {
    } else if (typeof body === 'string') {
    } else if (Buffer.isBuffer(body)) {
    } else {
      body = body.toString();
    }

    if (typeof body === 'string') {
      headers.set('content-type', 'text/plain;charset=utf-8');
    }

    this[internal] = {
      body,
      headers
    };
  }

  get body() {
    throw new Error('Not supported');
  }

  get bodyUsed() {
    throw new Error('Not supported');
  }

  get headers() {
    return this[internal].headers;
  }

  arrayBuffer() {
    throw new Error('Not supported');
  }

  blob() {
    throw new Error('Not supported');
  }

  formData() {
    throw new Error('Not supported');
  }

  json(options) {
    return this.text(options).then(text => {
      try {
        return JSON.parse(text);
      } catch (err) {
        throw createError(400, 'Invalid json', err);
      }
    });
  }

  text() {
    const { body } = this[internal];

    if (typeof body === 'string') return body;

    if (body instanceof Stream) {
      const limit = '1mb';
      const type = this[internal].headers['content-type'] || 'text/plain';
      const length = this[internal].headers['content-length'];
      const encoding = contentType.parse(type).parameters.charset;

      return getRawBody(this[internal].body, { limit, length, encoding })
        .then(body => body.toString(encoding))
        .catch(err => {
          throw err.type === 'entity.too.large'
            ? createError(413, `Body limit exceeded`, err)
            : createError(400, 'Invalid body', err);
        });
    }
  }
}

module.exports = Body;
