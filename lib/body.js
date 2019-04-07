const { Stream } = require('stream');

const getRawBody = require('raw-body');
const contentType = require('content-type');

const Headers = require('./headers');
const createError = require('./error');
const { internal } = require('./symbols');

class Body {
  constructor(body = '', headers = new Headers()) {
    this[internal] = {};

    this[internal].headers =
      headers instanceof Headers ? headers : new Headers(headers);

    if (!(body instanceof Stream) && typeof body !== 'string')
      body = body.toString();

    if (typeof body === 'string') {
      this.headers.set('content-type', 'text/plain;charset=UTF-8');
    }

    this[internal].body = body;
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

  json() {
    return this.text().then(text => {
      try {
        return JSON.parse(text);
      } catch (err) {
        throw createError('VITRO_BODY_JSON_INVALID', 'Invalid json', err);
      }
    });
  }

  text() {
    const { body } = this[internal];

    if (typeof body === 'string') return body;

    if (body instanceof Stream) {
      const limit = this[internal].limit;
      const type = this[internal].headers['content-type'] || 'text/plain';
      const length = this[internal].headers['content-length'];
      const encoding = contentType.parse(type).parameters.charset;

      return getRawBody(this[internal].body, { limit, length, encoding })
        .then(body => body.toString(encoding))
        .catch(err => {
          throw err.type === 'entity.too.large'
            ? createError('VITRO_BODY_EXCEEDED', `Body limit exceeded`, err)
            : createError('VITRO_BODY_INVALID', 'Invalid body', err);
        });
    }
  }
}

module.exports = Body;
