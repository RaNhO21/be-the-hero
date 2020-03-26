const express = require("express");
const crypto = require("crypto");
const connection = require('./database/connection');
const ongControllers = require('./controllers/ongControllers');
const incidentControllers= require('./controllers/incidentControllers');
const profileControllers = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/ongs', ongControllers.create);
routes.get('/ongs', ongControllers.getAll);

routes.post('/incidents', incidentControllers.create);
routes.get('/incidents', incidentControllers.getAll);
routes.delete('/incidents/:id', incidentControllers.deleteOne);

routes.get('/profile', profileControllers.listIncidents);

routes.post('/sessions', sessionController.createSession);

module.exports = routes;
