const createError = require('http-errors');
const debug = require('debug')('app:module-products-controller');
const { ProductsService } = require('./services');
const { Response } = require('../common/response');
const Modelo = require('./models');

module.exports.ProductsController = {
    getProducts: async (req, res) => {
        
        try {
            let products = await ProductsService.getAll();
            Response.success(res, 200, 'Lista de productos', products);
        } catch (error) {
            debug(error);
            Response.error(res);
        }

    },
    getProduct: async (req, res) => {

        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.query;
            const nombre = params.nombre;
            
            let product = await ProductsService.getById(nombre);

            if(!product)
            {
                Response.error(res, new createError.NotFound());
            } else
            {
                Response.success(res, 200, `Producto ${nombre}`, product);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getProductByType: async (req, res) => {

        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.query;
            const tipo = params.tipo;
            
            let product = await ProductsService.getByType(tipo);

            if(!product)
            {
                Response.error(res, new createError.NotFound());
            } else
            {
                Response.success(res, 200, `Producto tipo ${tipo}`, product);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getProductByUbication: async (req, res) => {

        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.query;
            const ubicacion = params.ubicacion;
            
            let product = await ProductsService.getByUbication(ubicacion);

            if(!product)
            {
                Response.error(res, new createError.NotFound());
            } else
            {
                Response.success(res, 200, `Producto ubicado en ${ubicacion}`, product);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createProduct: async (req, res) => {

        try {
            const { body } = req;

            if(!body || Object.keys(body).length === 0)
            {
                Response.error(res, new createError.BadRequest()); // Request erroneo o sin contenido
            } else{
                const product = new Modelo();
                const params = req.body;

                product.nombre = params.nombre;
                product.precio = params.precio;
                product.existencia = params.existencia;
                product.tipo = params.tipo;
                product.clave_provedor = params.clave_provedor;
                product.ubicacion = params.ubicacion;
                product.descripcion = params.descripcion;

                const insertedId = await ProductsService.createProduct(product);
                Response.success(res, 201, 'Producto agregado', insertedId);
            }

        } catch(error){
            debug(error);
            Response.error(res);
        }

    },
    generateReport: async (req, res) => {
        try {
            ProductsService.generateReport('Inventario', res);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateProduct: async (req, res) =>
    {
        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.body;
            const nom = params.nombre;
            const pre = params.precio;
            const exis = params.existencia;
            const vend = params.vendidos;
            const tipo = params.tipo;
            const cp = params.clave_provedor;
            const ubi = params.ubicacion;
            const desc = params.descripcion;

            let newProduct = await ProductsService.updateProduct(nom, pre, exis, vend, tipo, cp, ubi, desc);

            if(!newProduct)
            {
                Response.error(res, new createError[409]);
            } else
            {
                Response.success(res, 200, `Se actualizó el producto ${nom}`, newProduct);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteProduct: async (req, res) =>
    {
        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.body;
            const nombre = params.nombre;

            let productToDelete = await ProductsService.deleteProduct(nombre);

            if(!productToDelete)
            {
                Response.error(res, new createError[409]);
            } else
            {
                if(productToDelete.deletedCount === 1)
                    Response.success(res, 200, `El producto ${nombre} ha sido eliminado`, productToDelete);
                else
                    Response.error(res, new createError[409]);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};