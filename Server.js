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

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    });
}); 
 
app.use('/', route);

server.listen(port);
server.on('error', onError);
// função para debugar a porta
console.log('API rodando na porta ' + port);

