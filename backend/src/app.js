const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

console.log("System on port 3333 or process.env.PORT");

module.exports = app;
