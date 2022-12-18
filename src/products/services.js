const { ObjectId } =require('mongodb');
const { Database } = require('../database/index');
const { ProductsUtils } = require('./utils');
const debug =require('debug')('app: module-products-services');

const COLLECTION = 'products';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ nombre: id });
};

const getByType = async (tipo) => {
    const collection = await Database(COLLECTION);
    return await collection.find({ tipo: tipo }).toArray();
};

const getByUbication = async (ubicacion) => {
    const collection = await Database(COLLECTION);
    return await collection.find({ ubicacion: ubicacion }).toArray();
}

const createProduct = async (producto) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(producto);
    return result.insertedId;
};

const generateReport = async (name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res)
}

const updateProduct = async (nom, pre, exis, vend, tipo, cp, ubi, desc) => {
    const collection = await Database(COLLECTION);
    return await collection.updateOne({nombre: nom}, {$set:
        {
            precio: pre,
            existencia: exis,
            vendidos: vend,
            tipo: tipo,
            clave_provedor: cp,
            ubicacion: ubi,
            descripcion: desc
        }}, {upsert: true}); 
}

const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({nombre: id});
}

module.exports.ProductsService = {
    getAll,
    getById,
    getByType,
    getByUbication,
    createProduct,
    generateReport,
    updateProduct,
    deleteProduct
};