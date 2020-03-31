const express = require("express");
const crypto = require("crypto");
const { celebrate, Segments, Joi } = require('celebrate');
const ongControllers = require('./controllers/ongControllers');
const incidentControllers= require('./controllers/incidentControllers');
const profileControllers = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.string().min(10).max(11).required(),
        city: Joi.string().required(),
        uf: Joi.string().length(2).required()
    })
}), ongControllers.create);

routes.get('/ongs', ongControllers.getAll);

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number()
    })
}), incidentControllers.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
    })
}), incidentControllers.getAll);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), incidentControllers.deleteOne);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), profileControllers.listIncidents);

routes.post('/sessions', sessionController.createSession);

module.exports = routes;
