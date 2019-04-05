const Body = require('./body');
const Headers = require('./headers');
const { internal } = require('./symbols');

class Response extends Body {
  constructor(body, { headers, status = 200, statusText = '' } = {}) {
    super(body);

    this[internal].headers =
      headers instanceof Headers ? headers : new Headers(headers);
    this[internal].status = status;
    this[internal].statusText = statusText;
  }

  get headers() {
    return this[internal].headers;
  }

  get ok() {
    return this[internal].status > 199 && this[internal].status < 300;
  }

  get redirected() {
    throw new Error('Not supported');
  }

  get status() {
    return this[internal].status;
  }

  get statusText() {
    return this[internal].statusText;
  }

  get type() {
    throw new Error('Not supported');
  }

  get url() {
    throw new Error('Not supported');
  }

  clone() {
    throw new Error('Not supported');
  }

  error() {
    throw new Error('Not supported');
  }

  redirect(url, status) {
    throw new Error('Not supported');
  }
}

module.exports = Response;
