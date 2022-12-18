const { ObjectId } =require('mongodb');
const { Database } = require('../database/index');
const { ProductsUtils } = require('./utils');
const debug =require('debug')('app: module-ventas-services');

const COLLECTION = 'ventas';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getByUser = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.find({ usuario: id }).toArray();
};

const getByDate = async (date) => {
    const collection = await Database(COLLECTION);
    return await collection.find({ fecha: date }).toArray();
}

const getByProduct = async (articulo) => {
    const collection = await Database(COLLECTION);
    return await collection.find({ articulo: articulo }).toArray();
}

const getByPay = async (pago) => {
    const collection = await Database(COLLECTION);
    return await collection.find({ tipoPago: pago }).toArray();
}

const createVenta = async (producto) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(producto);
    return result.insertedId;
};

const generateReport = async (name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res)
}

const updateVenta = async (id, user, fecha, arti, cant, pre, total, pago, imp, camb) => {
    const collection = await Database(COLLECTION);
    return await collection.updateOne({_id: ObjectId(id)}, {$set:
        {
            usuario: user,
            fecha: fecha,
            articulo: arti,
            cantidad: cant,
            precioArticulo: pre,
            total: total,
            tipoPago: pago,
            importe: imp,
            cambio: camb
        }}, {upsert: true}); 
}

const deleteVenta = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({_id: ObjectId(id)});
}

module.exports.VentasService = {
    getAll,
    getByUser,
    getByDate,
    getByProduct,
    getByPay,
    createVenta,
    generateReport,
    updateVenta,
    deleteVenta
};