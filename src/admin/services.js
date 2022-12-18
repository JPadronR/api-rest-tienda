const { ObjectId } =require('mongodb');
const { Database } = require('../database/index');
const debug =require('debug')('app: module-admin-services');

const COLLECTION = 'admin';

const getAll = async (user, pass) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ usuario: user });
};

const validar = async (user, pass) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ usuario: user })
}

const updateAdmin = async (admin, pass) => {
    const collection = await Database(COLLECTION);
    return await collection.updateOne({usuario: admin}, {$set: {usuario: admin, pass: pass}});
}

module.exports.AdminService = {
    getAll,
    validar,
    updateAdmin
};