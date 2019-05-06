const { Stream } = require('stream');

const Headers = require('./headers');

class Response {
  constructor(body, { headers, status, statusText } = {}) {
    if (body == null) {
      body = '';
    } else if (body instanceof Stream) {
    } else if (typeof body === 'string') {
    } else if (Buffer.isBuffer(body)) {
    } else {
      body = body.toString();
    }

    this.__body = body;

    this.__headers = headers ? new Headers(headers) : null;

    if (typeof body === 'string' && !this.headers.has('content-type')) {
      this.__headers.set('content-type', 'text/plain;charset=utf-8');
    }

    this.__status = status;
    this.__statusText = statusText;
  }

  get body() {
    throw new Error('Not supported');
  }

  get bodyUsed() {
    throw new Error('Not supported');
  }

  get headers() {
    return this.__headers || (this.__headers = new Headers());
  }

  get ok() {
    return this.status > 199 && this.status < 300;
  }

  get redirected() {
    throw new Error('Not supported');
  }

  get status() {
    return this.__status || 200;
  }

  get statusText() {
    return this.__statusText || '';
  }

  get type() {
    throw new Error('Not supported');
  }

  get url() {
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

  error() {
    throw new Error('Not supported');
  }

  formData() {
    throw new Error('Not supported');
  }

  json() {
    throw new Error('Not supported');
  }

  redirect(url, status) {
    throw new Error('Not supported');
  }

  text() {
    throw new Error('Not supported');
  }
}

module.exports = Response;
