/*  MOSTRAR REPORTES O GUARDAR REGISTROS DE VENTAS QUE HA HECHO UN USUARIO:

        --> SE DEBE DE GUARDAR UN IDENTIFICADOR DEL USUARIO QUE HA HECHO LA VENTA
        --> SE DEBE DE GUARDAR UN IDENTIFICADOR DEL PRODUCTO VENDIDO
        --> GUARDAR CANTIDAD VENDIDA DEL PRODUCTO, Y AFECTAR ESA COLECCION DE ACUERDO A LO SUCEDIDO
        --> ANALISAR SITUACIONES DE ERROR Y RESOLVERLAS

    OPCIONAL:

        --> GENERAR PUNTOS A LOS USUARIOS DE ACUERDO A LOS PRODUCTOS VENDIDOS
*/

const express = require('express');

const { VentasController } = require('./controller');

const router = express.Router();    //Objeto Router para definir rutas especificas

module.exports.Ventas = (app) => {
    router
        .get('/', VentasController.getVentas)  //http://localhost:3000/api/ventas/
        .get('/reportVentas', VentasController.generateReport)
        .get('/getByUser', VentasController.getVentaByUser)
        .get('/getByDate', VentasController.getVentaByDate)
        .get('/getByProduct', VentasController.getVentaByProduct)
        .get('/getByPay', VentasController.getVentaByPay)
        .put('/update', VentasController.updateVenta)
        .delete('/delete', VentasController.deleteVenta)
        .post('/', VentasController.createVenta)

    app.use('/api/ventas', router);

};