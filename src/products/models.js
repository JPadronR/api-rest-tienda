const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const productSchema = Schema({
    nombre:{
        type: String,
        require: true
    },
    precio:{
        type: String,
        require: true
    },
    existencia:{
        type: String,
        require: true
    },
    vendidos:{
        type: String,
        require: true,
        default: "0"
    },
    tipo:{
        type: String,
        require: true
    },/*
    clave:{
        type: String,
        require: true
    },*/
    clave_provedor:{
        type: String,
        require: true
    },
    ubicacion:{
        type: String,
        require: true
    },
    descripcion:{
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Producto', productSchema);