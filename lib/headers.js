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
    this.__map = {};

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

    const oldValue = this.__map[name];

    this.__map[name] = oldValue ? `${oldValue}, ${value}` : value;
  }

  delete(name) {
    name = normalizeName(name);

    delete this.__map[name];
  }

  *entries() {
    for (const key in this.__map) {
      yield [key, this.__map[key]];
    }
  }

  get(name) {
    name = normalizeName(name);

    return this.__map[name] || null;
  }

  has(name) {
    name = normalizeName(name);

    return this.__map[name] !== undefined;
  }

  *keys() {
    for (const key in this.__map) {
      yield key;
    }
  }

  set(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);

    this.__map[name] = value;
  }

  *values() {
    for (const key in this.__map) {
      yield this.__map[key];
    }
  }

  [Symbol.iterator]() {
    return Object.entries();
  }
}

module.exports = Headers;
