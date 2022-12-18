const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');
const { ProductsService, UsersService } = require('./services');
const { Response } = require('../common/response');
const Modelo = require('./models');

module.exports.UsersController = {
    getUsers: async (req, res) => {
        
        try {
            let users = await UsersService.getAll();
            Response.success(res, 200, 'Lista de usuarios', users);
        } catch (error) {
            debug(error);
            Response.error(res);
        }

    },
    getUser: async (req, res) => {

        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.query;
            const usuario = params.usuario;

            let user = await UsersService.getById(usuario);

            if(!user)
            {
                Response.error(res, new createError.NotFound());
            } else
            {
                Response.success(res, 200, `Usuario ${usuario}`, user);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    addUser: async (req, res) => {
        
        try {
            const { body } = req;

            if(!body || Object.keys(body).length === 0)
            {
                Response.error(res, new createError.BadRequest()); // Request erroneo o sin contenido
            } else{

                const usuario = new Modelo();
                const params = req.body;

                usuario.nombre = params.nombre;
                usuario.usuario = params.usuario;
                usuario.pass = params.pass;
                usuario.correo = params.correo;

                const insertedId = await UsersService.addUser(usuario);
                Response.success(res, 201, 'Usuario agregado', insertedId);
            }

        } catch(error){
            debug(error);
            Response.error(res);
        }

    },
    /*
    updateProduct: async (req, res) =>
    {
        try {
            const { params : { id } } = req;     // obtener el id del req

            let newProduct = await ProductsService.updateProduct(id);

            if(!newProduct)
            {
                Response.error(res, new createError[409]);
            } else
            {
                Response.success(res, 200, `Se actualizó el producto ${id}`, newProduct);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    */
    deleteUser: async (req, res) =>
    {
        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.body;
            const usuario = params.usuario;

            let userToDelete = await UsersService.deleteUser(usuario);

            if(!userToDelete)
            {
                Response.error(res, new createError[409]);
            } else
            {
                if(userToDelete.deletedCount === 1)
                    Response.success(res, 200, `El usuario ${usuario} ha sido eliminado`, userToDelete);
                else
                    Response.error(res, new createError[409]);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};