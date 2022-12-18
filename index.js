const express = require('express'); //Importamos Express
const cors = require('cors');
const debug = require('debug')('app:main'); //Importamos Debug
const { Config } = require('./src/config/index');   //Importamos el archivo principal de configuracion
const { Products } = require('./src/products/index');
const { usersApi } = require('./src/users/index');
const { IndexAPI, notFoundAPI } = require('./src/index/index');
const { Ventas } = require('./src/ventas');
const { adminApi } = require('./src/admin');

const app = express();
app.use(cors());
app.use(express.json());    //Habilitamos para recibir datos

// modulos
IndexAPI(app);      // SIEMPRE PONER AL INICIO ESTA CONFIGURACION DE RUTA
Products(app);
usersApi(app);
Ventas(app);
adminApi(app);
notFoundAPI(app);   // SIEMPRE PONER AL FINAL ESTA CONFIGURACION DE RUTA

app.listen(Config.port, () => {
    debug(`Servidor escuchando en http://localhost:${Config.port}`);
});