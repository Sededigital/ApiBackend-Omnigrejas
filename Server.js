'Use strict'
const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();
// aplicando a normalização da porta para rodar no servidor local
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const router = express.Router();

