"use strict"

const express = require('express');
const cors = require('cors');
const app = express();

const compras = require('./src/routes/compras');

//Modo de uso de morgan "Middlewares"
app.use(cors());
app.use(express.json());
require('dotenv').config();

//Routes
app.use('/', compras);

app.set('port', 5001);

// Levantamos el servidor
app.listen(app.get('port'), () => {
    console.log(`Aplicación corriendo en el puerto ${app.get('port')}!!`);
});

module.exports = app;