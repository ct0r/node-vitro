const getRawBody = require('raw-body');
const contentType = require('content-type');

const Headers = require('./headers');
const createError = require('./error');
const { internal } = require('./symbols');

class Request {
  constructor(
    input,
    { body, headers = new Headers(), method = 'GET' } = {},
    { limit } = {}
  ) {
    headers = headers instanceof Headers ? headers : new Headers(headers);

    headers = this[internal] = {
      body,
      headers,
      method,
      url: input,
      limit
    };
  }

  get body() {
    return this[internal].body;
  }

  get bodyUsed() {
    throw new Error('Not supported');
  }

  get cache() {
    throw new Error('Not supported');
  }

  get credentials() {
    throw new Error('Not supported');
  }

  get destination() {
    throw new Error('Not supported');
  }

  get headers() {
    return this[internal].headers;
  }

  get integrity() {
    throw new Error('Not supported');
  }

  get method() {
    return this[internal].method;
  }

  get mode() {
    throw new Error('Not supported');
  }

  get redirect() {
    throw new Error('Not supported');
  }

  get referrer() {
    throw new Error('Not supported');
  }

  get referrerPolicy() {
    throw new Error('Not supported');
  }

  get url() {
    return this[internal].url;
  }

  arrayBuffer() {
    throw new Error('Not supported');
  }

  blob() {
    throw new Error('Not supported');
  }

  clone() {
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

module.exports = Request;
