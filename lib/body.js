const { internal } = require('./symbols');

class Body {
  constructor(body) {
    this[internal] = {
      body
    };
  }

  get body() {
    throw new Error('Not supported');
  }

  get bodyUsed() {
    throw new Error('Not supported');
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
    throw new Error('Not supported');
  }

  text() {
    throw new Error('Not supported');
  }
}

module.exports = Body;
