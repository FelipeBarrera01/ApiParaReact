const Clientes = require('../models/clientes');

exports.nuevoCliente = async (req, res, next) =>{
    const cliente = new Clientes(req.body);
    try {
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'});
    } catch (error) {
        next();   
    }
}

exports.mostrarClientes = async (req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch (error) {
        next();
    }
}

exports.mostrarCliente = async (req, res, next) =>{
    const cliente = await Clientes.findById(req.params.idCliente);

    if(!cliente){
        res.json({mensaje: 'Ese cliente no existe'});
        return next();
    }
    res.json(cliente);
}
exports.actualizarCliente = async (req, res, next) =>{
    try {
        const cliente = await Clientes.findOneAndUpdate({_id: req.params.idCliente},req.body, {new: true});
        res.json(cliente);
    } catch (error) {
        next();
    }
}
exports.eliminarCliente = async (req, res, next) => {
    try {
        await Clientes.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'El cliente se ha eliminado'});
        } catch (error) {
        next();
    }
}