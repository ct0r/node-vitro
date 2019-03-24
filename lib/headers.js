const { internal: map } = require('./symbols');

const normalizeValue = value =>
  typeof value === 'string' ? value : String(value);

const normalizeName = name => {
  name = normalizeValue(name);

  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name) || name === '') {
    throw new TypeError('Invalid name');
  }

  return name.toLowerCase();
};

class Headers {
  constructor(init) {
    this[map] = new Map();

    if (!init) return;

    if (typeof init !== 'object') {
      throw new Error(
        'The provided value is not of type "(sequence<sequence<ByteString>> or record<ByteString, ByteString>)"'
      );
    }

    const entries =
      typeof init[Symbol.iterator] === 'function' ? init : Object.entries(init);

    for (const [name, value] of entries) {
      this.append(name, value);
    }
  }

  append(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);

    const oldValue = this[map].get(name);

    this[map].set(name, oldValue ? `${oldValue}, ${value}` : value);
  }

  delete(name) {
    this[map].delete(normalizeName(name));
  }

  entries() {
    return this[map].entries();
  }

  forEach(callback, thisArg) {
    return this[map].forEach(callback, thisArg);
  }

  get(name) {
    name = normalizeName(name);

    return this[map].get(name) || null;
  }

  has(name) {
    name = normalizeName(name);

    return this[map].has(name);
  }

  keys() {
    return this[map].keys();
  }

  set(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);

    this[map].set(name, value);
  }

  values() {
    return this[map].values();
  }
}

module.exports = Headers;
