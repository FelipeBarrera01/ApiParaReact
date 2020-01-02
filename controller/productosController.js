const Producto = require('../models/productos');
const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}
const upload = multer(configuracionMulter).single('imagen');
exports.subirArchivo = (req, res, next) =>{
    upload(req, res, function(error){
        if(error){res.json({mensaje: error})}
    });
    return next();
}

exports.nuevoProducto = async (req, res, next) => {
    const producto = new Producto(req.body);
    try {
        if(req.file.filename){
            producto.imagen = req.file.filename
        }
        await producto.save();
        res.json({
            mensaje: 'Se agrego un nuevo producto'
        });
    } catch (error) {
        next();
    }
}
exports.mostrarProductos = async (req, res, next) =>{
    try {
        const productos = await Producto.find({});
        res.json(productos);
    } catch (error) {
        next();
    }
}
exports.mostrarProducto = async (req, res, next) =>{
    const producto = await Producto.findById(req.params.idProducto);
    if(!producto){
        res.json({mensaje: 'Ese producto no existe'});
        return next();
    }
    res.json(producto);
}

exports.actualizarProducto = async (req, res, next) => {
    try {
        let productoAnterior = await Producto.findById(req.params.idProducto);
        let nuevoProducto = req.body;
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }else{
            nuevoProducto = productoAnterior.imagen;    
        }
        let producto = await Producto.findOneAndUpdate({_id: req.params.idProducto}, nuevoProducto,{
            new: true
        })
        res.json(producto);
    } catch (error) {
        next();   
    }
}
exports.eliminarProducto = async (req, res, next) =>{
    try {
       await Producto.findByIdAndDelete({_id: req.params.idProducto}); 
       res.json({mensaje: 'El producto se ha eliminado'});
    } catch (error) {
        next();
    }
}
exports.buscarProducto = async (req, res, next) =>{
    try {
        const {query} = req.params;
        const producto = await Producto.find({nombre: new RegExp(query, 'i')});
        res.json(producto);
    } catch (error) {
        
    }
}