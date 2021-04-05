"use strict"

const mysql = require('mysql2');
require('dotenv').config();

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

conexion.connect(function (err) {
    if (err) {
        console.error('Error de conexion');
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = {
    cnn_mysql: conexion
}