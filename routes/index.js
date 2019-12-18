const express = require('express');
const router = express.Router();

const clienteController = require('../controller/clienteController');
module.exports = function(){
    router.post('/clientes', clienteController.nuevoCliente);
    router.get('/clientes', clienteController.mostrarClientes);
    router.get('clientes/:idCliente', clienteController.mostrarCliente);
    return router;
}