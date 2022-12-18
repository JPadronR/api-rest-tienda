const express = require('express');

const { ProductsController } = require('./controller');

const router = express.Router();    //Objeto Router para definir rutas especificas

module.exports.Products = (app) => {
    router
        .get('/', ProductsController.getProducts)  //http://localhost:3000/api/products/
        .get('/report', ProductsController.generateReport)  //http://localhost:3000/api/products/report
        .get('/getByName', ProductsController.getProduct)  //http://localhost:3000/api/products/getByName?nombre=Arduino
        .get('/getByType', ProductsController.getProductByType) //http://localhost:3000/api/products/getByType?tipo=MCU
        .get('/getByUbication', ProductsController.getProductByUbication)   //http://localhost:3000/api/products/getByUbication?ubicacion=CAP-A
        .put('/update', ProductsController.updateProduct)   //http://localhost:3000/api/products/update
        .delete('/delete', ProductsController.deleteProduct)    //http://localhost:3000/api/products/delete
        .post('/', ProductsController.createProduct)

    app.use('/api/products', router);

};