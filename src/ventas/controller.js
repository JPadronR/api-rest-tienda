const createError = require('http-errors');
const debug = require('debug')('app:module-ventas-controller');
const { VentasService } = require('./services');
const { Response } = require('../common/response');
const Modelo = require('./models');

module.exports.VentasController = {
    getVentas: async (req, res) => {
        
        try {
            let ventas = await VentasService.getAll();
            Response.success(res, 200, 'Lista de ventas', ventas);
        } catch (error) {
            debug(error);
            Response.error(res);
        }

    },
    getVentaByUser: async (req, res) => {

        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.query;
            const user = params.usuario;

            let venta = await VentasService.getByUser(user);

            if(!venta)
            {
                Response.error(res, new createError.NotFound());
            } else
            {
                Response.success(res, 200, `Ventas hechas por ${user}`, venta);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getVentaByDate: async (req, res) => {

        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.query;
            const fecha = params.fecha;

            let venta = await VentasService.getByDate(fecha);

            if(!venta)
            {
                Response.error(res, new createError.NotFound());
            } else
            {
                Response.success(res, 200, `Ventas hechas el ${fecha}`, venta);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getVentaByProduct: async (req, res) => {

        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.query;
            const art = params.articulo;

            let venta = await VentasService.getByProduct(art);

            if(!venta)
            {
                Response.error(res, new createError.NotFound());
            } else
            {
                Response.success(res, 200, `Ventas de ${art}`, venta);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getVentaByPay: async (req, res) => {

        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.query;
            const pago = params.tipoPago;

            let venta = await VentasService.getByPay(pago);

            if(!venta)
            {
                Response.error(res, new createError.NotFound());
            } else
            {
                Response.success(res, 200, `Ventas con ${pago}`, venta);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createVenta: async (req, res) => {
        
        try {
            const { body } = req;

            if(!body || Object.keys(body).length === 0)
            {
                Response.error(res, new createError.BadRequest()); // Request erroneo o sin contenido
            } else{
                const venta = new Modelo();
                const params = req.body;

                venta.usuario = params.usuario;
                venta.fecha = params.fecha;
                venta.articulo = params.articulo;
                venta.cantidad = params.cantidad;
                venta.precioArticulo = params.precioArticulo;
                venta.total = params.total;
                venta.tipoPago = params.tipoPago;
                venta.importe = params.importe;
                venta.cambio = params.cambio;

                const insertedVenta = await VentasService.createVenta(venta);
                Response.success(res, 201, 'Venta generada', insertedVenta);
            }

        } catch(error){
            debug(error);
            Response.error(res);
        }

    },
    generateReport: async (req, res) => {
        try {
            VentasService.generateReport('Reporte ventas', res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateVenta: async (req, res) =>
    {
        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.body;
            const id = params._id;
            const user = params.usuario;
            const fecha = params.fecha;
            const art = params.articulo;
            const cant = params.cantidad;
            const pre = params.precioArticulo;
            const total = params.total;
            const pago = params.tipoPago;
            const imp = params.importe;
            const camb = params.cambio;

            let newVenta = await VentasService.updateVenta(id, user, fecha, art, cant, pre, total, pago, imp, camb);

            if(!newVenta)
            {
                Response.error(res, new createError[409]);
            } else
            {
                Response.success(res, 200, `Se actualizó la venta ${id}`, newVenta);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteVenta: async (req, res) =>
    {
        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.body;
            const id = params._id;

            let ventaToDelete = await VentasService.deleteVenta(id);

            if(!ventaToDelete)
            {
                Response.error(res, new createError[409]);
            } else
            {
                if(ventaToDelete.deletedCount === 1)
                    Response.success(res, 200, `La venta ${id} ha sido eliminada`, ventaToDelete);
                else
                    Response.error(res, new createError[409]);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};