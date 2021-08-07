"use strict"; // https://www.w3schools.com/js/js_strict.asp

// pkg
const express = require("express"),
      cors = require('cors'),
      app = express(),
      ms = require("ms"),
      fs = require("fs"),
      port = Number(1111), // you can change this
      helmet = require("helmet"),
      compression = require('compression');

let corsOpt = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['X-CSRF-Token', 'X-Requested-With', 'Accept', 'Accept-Version', 'Content-Length', 'Content-MD5', 'Content-Type', 'Date', 'X-Api-Version'],
  optionsSuccessStatus: 204
};

let locale = __dirname + "/files", // file that will be served into public.
    assets = __dirname + "/assets"; // normal assets such as index.html or else.

// normal configuration
app.use(helmet());

// cors
app.use(cors(corsOpt));

// compress the file, always compress it, no matter what
app.use(compression());

// usually return favicon.ico, use "res.status(204).end()" if you want to.
app.get('/favicon.ico', (req, res) => res.status(200).sendFile(assets + "/favicon.ico"));

// dont let any robots crawl this thing
app.get('/robots.txt', (req, res) => res.sendFile(assets + "/robots.txt"));

// example: https://cdn.blob-project.com/
app.get("/", (req, res) => res.status(200).send("OK"));

// Router/Files
app.use('/files', require('./router/files'));

// ready to be served.
app.listen(port, () => console.log(`Started on PORT: ${port}`)); // PORT = 1111 (default, you can change it)
