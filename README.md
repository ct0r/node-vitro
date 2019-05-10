# vitro

[![Version](https://img.shields.io/npm/v/vitro.svg?style=flat-square)](https://www.npmjs.com/package/vitro)
[![Build](https://img.shields.io/circleci/project/github/ct0r/vitro/master.svg?style=flat-square)](https://circleci.com/gh/ct0r/vitro)
[![Coverage](https://img.shields.io/codeclimate/coverage/ct0r/vitro.svg?style=flat-square)](https://codeclimate.com/github/ct0r/vitro)
[![License](https://img.shields.io/github/license/ct0r/vitro.svg?style=flat-square)](https://github.com/ct0r/vitro/blob/master/LICENSE)

Experimental [Fetch API] based web framework.

[fetch api]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## Motivation

Today's development of web applications with offline support via [Service Workers][sw] is not so far from standard REST API development, so why we still use frameworks like express, koa etc? Can we replace them by standardized [Request]/[Response] and share more code between frontend and backend. Can awful parts like validation be written once as a standalone middleware and used in REST API server and also in browser within [Service Worker][sw]? We can use one language on a server and in a browser, that's great, but maybe it's time to want more. It's time to have one API ;-)

Inspired by great packages [micro], [koa] and [node-fetch].

## Installation

```
npm install vitro
```

## Usage

### CLI

Create an `index.js` file and export a function that accepts [Request] object and returns imported [Response] object (supports promises).

```js
const { Response } = require('vitro');

module.exports = request => new Response('Welcome to server, Fetch API!');
```

Add to you `package.json`:

```json
{
  "main": "index.js",
  "scripts": {
    "start": "vitro"
  }
}
```

Start server with:

```
npm start
```

Go to http://localhost:3000

Use `vitro --help` for more info.

### Programatic use

```js
const vitro = require('vitro')

const server = vitro(request => 'Welcome to server, Fetch API!')

server.listen(3000)
```

Go to http://localhost:3000


[sw]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[request]: https://developer.mozilla.org/en-US/docs/Web/API/Request
[response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[micro]: https://github.com/zeit/micro
[koa]: https://github.com/koajs/koa
[node-fetch]: https://github.com/bitinn/node-fetch
