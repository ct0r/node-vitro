const getRawBody = require('raw-body');
const contentType = require('content-type');

const Headers = require('./headers');
const createError = require('./error');

module.exports = class Request {
  constructor(req, { limit }) {
    this._req = req;
    this._limit = limit;
    this._headers = null;
  }

  get body() {
    return this._req;
  }

  get headers() {
    if (!this._headers) {
      this._headers = Object.create(Headers.prototype);
      this._headers._map = this._req.headers;
    }

    return this._headers;
  }

  get method() {
    return this._req.method;
  }

  get url() {
    // TODO: find out how to keep it compatible with URL constructor
    return `http://vitro${this._req.url}`;
  }

  json() {
    return this.text().then(text => {
      try {
        return JSON.parse(text);
      } catch (err) {
        throw createError(400, 'Invalid json', err);
      }
    });
  }

  text() {
    const limit = this._limit;
    const headers = this.headers;

    const type = headers['content-type'] || 'text/plain';
    const length = headers['content-length'];
    const encoding = contentType.parse(type).parameters.charset;

    return getRawBody(this._req, { limit, length, encoding })
      .then(buf => buf.toString(encoding))
      .catch(err => {
        throw err.type === 'entity.too.large'
          ? createError(413, `Body limit exceeded`, err)
          : createError(400, 'Invalid body', err);
      });
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

  get integrity() {
    throw new Error('Not supported');
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
};
