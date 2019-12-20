const express = require('express');
const router = express.Router();

const clienteController = require('../controller/clienteController');
const productosController = require('../controller/productosController');
module.exports = function(){
    router.post('/clientes', clienteController.nuevoCliente);
    router.get('/clientes', clienteController.mostrarClientes);
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);
    router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto);
    router.get('/productos', productosController.mostrarProductos);
    router.get('/productos/:idProducto', productosController.mostrarProducto);
    router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto);
    return router;
}