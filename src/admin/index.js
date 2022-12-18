const express = require('express');

const { AdminController } = require('./controller');

const router = express.Router();    //Objeto Router para definir rutas especificas

module.exports.adminApi = (app) => {
    router
        .post('/autenticate', AdminController.validar)  //http://localhost:3000/api/products/
        .put('/update', AdminController.updateAdmin)

    app.use('/api/admin', router);

};