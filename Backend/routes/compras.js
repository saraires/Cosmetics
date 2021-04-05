"use strict"

const { Router } = require('express');
const { cnn_mysql } = require('../DB/conexion');
const router = Router();

router.get('/productos', (req, res) => {
    cnn_mysql.query('SELECT * FROM Producto', (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Se presento un error en la base de datos");
        } else {
            return res.json(resultset);
        }
    })
});

module.exports = router;