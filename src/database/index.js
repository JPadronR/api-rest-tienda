const { MongoClient } = require('mongodb'); //Obtenemos el cliente de mongoDB desestructurado
const debug = require('debug')('app:module-database');  //Importamos el modulo debug

const { Config } = require('../config/index');  //Importamos el archivo de configuracion desestructurado

var connection = null;

module.exports.Database = (collection) => new Promise(async (resolve, reject) => {
   try {
    if(!connection)
    {
        const client = new MongoClient(Config.mongoUri);
        connection = await client.connect();

        debug("Nueva conexion realizada a la DB");
    }

    const db = connection.db(Config.mongoDbname);
    resolve(db.collection(collection));
    debug("Conexion establecida");

   } catch (error) {

    debug(error);
    
   } 
});

