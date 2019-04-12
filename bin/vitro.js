#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const arg = require('arg');

const serve = require('../lib');
const { version } = require('../package');

const help = `
Usage: vitro [options] [path]

Options:
  -h, --help        Print usage
  -H, --host        Specify host on which server will run
  -p, --port        Specify port to listen on (default 3000)
  -v, --version     Print version
`;

const args = arg({
  '--help': Boolean,
  '-h': '--help',

  '--host': String,
  '-H': '--host',

  '--port': Number,
  '-p': '--port',

  '--version': Boolean,
  '-v': '--version'
});

if (args['--help']) {
  console.log(help);
  process.exit();
}

if (args['--version']) {
  console.log(version);
  process.exit();
}

let [file] = args._;

if (!file) {
  try {
    const packageJson = require(path.resolve(process.cwd(), 'package.json'));
    file = packageJson.main || 'index.js';
  } catch (err) {
    if (err.code !== 'MODULE_NOT_FOUND') {
      console.log(`Could not read "package.json": ${err.message}`);
      process.exit(1);
    }
  }
}

if (!file) {
  console.log('No path specified');
  process.exit(1);
}

if (file[0] !== '/') {
  file = path.resolve(process.cwd(), file);
}

if (!fs.existsSync(file)) {
  console.log(`Could not find "${path.basename(file)}"`);
  process.exit(1);
}

(async file => {
  let fn;

  try {
    fn = await require(file);
  } catch (err) {
    console.log(`Error when importing file "${file}": ${err.stack}`);
    process.exit(1);
  }

  if (typeof fn !== 'function') {
    console.log(`The file "${file}" does not export a function`);
    process.exit(1);
  }

  const server = serve(fn);

  server.on('error', err => {
    console.error(err.stack);
    process.exit(1);
  });

  server.listen(
    {
      host: args['--host'],
      port: args['--port']
    },
    () => {
      const port = server.address().port;
      console.log(`Accepting connections on port ${port}`);
    }
  );
})(file);
