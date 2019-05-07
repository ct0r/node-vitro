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
    this._map = {};

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

    const oldValue = this._map[name];

    this._map[name] = oldValue ? `${oldValue}, ${value}` : value;
  }

  delete(name) {
    name = normalizeName(name);

    delete this._map[name];
  }

  *entries() {
    for (const key in this._map) {
      yield [key, this._map[key]];
    }
  }

  get(name) {
    name = normalizeName(name);

    return this._map[name] || null;
  }

  has(name) {
    name = normalizeName(name);

    return this._map[name] !== undefined;
  }

  *keys() {
    for (const key in this._map) {
      yield key;
    }
  }

  set(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);

    this._map[name] = value;
  }

  *values() {
    for (const key in this._map) {
      yield this._map[key];
    }
  }

  [Symbol.iterator]() {
    return this.entries();
  }
}

module.exports = Headers;
