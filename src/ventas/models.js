const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ventaSchema = Schema({
    usuario:{
        type: String,
        require: true
    },
    fecha:{
        type: Date,
        require: true,
        default: Date.now 
    },
    articulo:{
        type: String,
        require: true
    },
    cantidad:{
        type: String,
        require: true
    },
    precioArticulo:{
        type: String,
        require: true
    },
    total:{
        type: String,
        require: true
    },
    tipoPago:{
        type: String,
        require: true
    },
    importe:{
        type: String,
        require: true
    },
    cambio:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Venta', ventaSchema);