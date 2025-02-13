"use strict";

const app = require('./source/app');  // Corrigido o caminho para acessar o app.js
const debug = require('debug')('nodestr:server');
const http = require('http');

// Normalização da porta
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Criação do servidor HTTP
const server = http.createServer(app);

// Inicia o servidor
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

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
        case 'EACCES':
            console.error(`${bind} requer privilégios elevados`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} já está em uso`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Função para logar a inicialização com debug
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
    console.log(`🚀 API rodando na porta ${port}`);
}
