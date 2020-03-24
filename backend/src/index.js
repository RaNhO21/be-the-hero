const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);

console.log("System on port 3333");
app.listen(3333);