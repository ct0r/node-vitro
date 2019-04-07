const Body = require('./body');
const { internal } = require('./symbols');

class Request extends Body {
  constructor(input, { body, headers, method = 'GET' } = {}) {
    super(body, headers);

    this[internal].method = method;
    this[internal].url = input;
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

  clone() {
    throw new Error('Not supported');
  }
}

module.exports = Request;
