const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');
const { AdminService } = require('./services');
const { Response } = require('../common/response');

module.exports.AdminController = {
    getUsers: async (req, res) => {
        
        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.query;
            const usuario = params.usuario;

            let user = await AdminService.getAll(usuario);

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
    validar: async (req, res) => {
        try {
            const params = req.body;
            const admin = params.usuario;
            const pass = params.pass;

            let user = await AdminService.validar(admin, pass);

            if(!user)
            {
                Response.error(res, new createError.NotFound());
            } else
            {
                Response.success(res, 200, `Administrador ${admin}`, user);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateAdmin: async (req, res) =>
    {
        try {
            //const { params : { id } } = req;     // obtener el id del req

            const params = req.body;
            const admin = params.usuario;
            const pass = params.pass;

            let actualizar = await AdminService.updateAdmin(admin, pass);

            if(!actualizar)
            {
                Response.error(res, new createError[409]);
            } else
            {
                if(actualizar.matchedCount === 1)
                    Response.success(res, 200, 'Se actualizó la información' , actualizar);
                else
                    Response.error(res, new createError[406]);
            }

        } catch (error) {
            debug(error);
            Response.error(res);
        }
    }
};