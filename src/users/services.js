const { ObjectId } =require('mongodb');
const { Database } = require('../database/index');
const debug =require('debug')('app: module-users-services');

const COLLECTION = 'users';

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
};

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.findOne({ usuario: id });
};

const addUser = async (user) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(user);
    return result.insertedId;
};

/*const updateUser = async (user, pass) => {
    const collection = await Database(COLLECTION);
    return await collection.updateOne({usuario: user}, {$set:
        {
            usuario: user,
            pass: pass
        }}, {upsert: true}); 
}*/

const deleteUser = async (id) => {
    const collection = await Database(COLLECTION);
    return await collection.deleteOne({usuario: id});
};

module.exports.UsersService = {
    getAll,
    getById,
    addUser,
    deleteUser
};