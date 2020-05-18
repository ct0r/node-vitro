#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const arg = require("arg");

const serve = require("../lib");
const { version } = require("../package");

const help = `
Usage: vitro [options] [path]

Options:
  -h, --help        Print usage
  -u, --url         Specify the url the server will listen on
  -v, --version     Print version
`;

const spec = {
  "--help": Boolean,
  "-h": "--help",

  "--url": parseOptions,
  "-u": "--url",

  "--version": Boolean,
  "-v": "--version",
};

let args;
try {
  args = arg(spec);
} catch (err) {
  console.log(err.message);
  process.exit(1);
}

if (args["--help"]) {
  console.log(help);
  process.exit();
}

if (args["--version"]) {
  console.log(version);
  process.exit();
}

args["--url"] = args["--url"] || { port: 3000 };

let [file] = args._;

if (!file) {
  try {
    const packageJson = require(path.resolve(process.cwd(), "package.json"));
    file = packageJson.main || "index.js";
  } catch (err) {
    if (err.code !== "MODULE_NOT_FOUND") {
      console.log(`Could not read "package.json": ${err.message}`);
      process.exit(1);
    }
  }
}

if (!file) {
  console.log("No path specified");
  process.exit(1);
}

if (file[0] !== "/") {
  file = path.resolve(process.cwd(), file);
}

if (!fs.existsSync(file)) {
  console.log(`Could not find "${path.basename(file)}"`);
  process.exit(1);
}

function parseOptions(val) {
  const url = new URL(val);

  if (url.protocol !== "http:") {
    throw new Error(`Invalid protocol: ${url.protocol}`);
  }

  return {
    host: url.hostname,
    port: url.port || 3000,
  };
}

function listen(fn, options) {
  const server = serve(fn);

  server.on("error", (err) => {
    console.error(err.stack);
    process.exit(1);
  });

  server.listen(options, () => {
    const { port } = server.address();
    console.log(`Listening on port ${port}`);
  });
}

async function start(file, args) {
  let fn;

  try {
    fn = await require(file);
  } catch (err) {
    console.log(`Error when importing "${file}": ${err.stack}`);
    process.exit(1);
  }

  if (typeof fn !== "function") {
    console.log(`The "${file}" does not export a function`);
    process.exit(1);
  }

  listen(fn, args["--url"]);
}

start(file, args);
