const express = require('express');
const createError = require('http-errors');

const { Response } = require('../common/response');

module.exports.IndexAPI = (app) => {
    const router = express.Router();

    router.get("/", (req, res) => {
        const menu = {
            products: `https://${req.headers.host}/api/products`,
            users: `https://${req.headers.host}/api/users`,
            ventas: `https://${req.headers.host}/api/ventas`
        }

        Response.success(res, 200, "API - GESTIÓN", menu)
    })

    app.use('/', router);
}

module.exports.notFoundAPI = (app) => {
    const router = express.Router();

    router.all("*", (req, res) => {
        Response.error(res, new createError[404]);
    })

    app.use("/", router);
}