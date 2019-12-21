const express = require('express');
const router = express.Router();

const clienteController = require('../controller/clienteController');
const productosController = require('../controller/productosController');
const pedidosController = require('../controller/pedidosController');
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
    router.delete('/productos/:idProducto', productosController.eliminarProducto);
    router.post('/pedidos', pedidosController.nuevoPedido);
    router.get('/pedidos', pedidosController.mostrarPedidos);
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido);
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido);
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido);
    return router;
}