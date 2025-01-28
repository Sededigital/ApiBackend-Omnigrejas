"use strict";

const http = require('http');
const debug = require('debug')('nodestr:server');
const express = require('express');

const app = express();

// Normalização da porta
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

// Definição de rotas
app.get('/', (req, res) => {
    res.status(200).send({
        title: "Omnigrejas API",
        version: "0.0.1"
    });
});

// Inicia o servidor
server.listen(port);
server.on('error', onError);
server.on('listening', () => {
    debug(`API rodando na porta ${port}`);
    console.log(`API rodando na porta ${port}`);
});

// Função para normalizar a porta
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val; 
    }
    if (port >= 0) {
        return port; 
    }
    return false;
}

// Função para tratar erros do servidor
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    switch (error.code) {
        //erro de permissão
        case 'EACCES':
            console.error(`${bind} requer privilégios elevados`);
            process.exit(1);
            break;
        //erro de porta em uso
        case 'EADDRINUSE':
            console.error(`${bind} já está em uso`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// funcção para debug	
function onListening() {    
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}


