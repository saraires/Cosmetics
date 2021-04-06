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

router.get('/orden', (req, res) => {
    cnn_mysql.query('SELECT * FROM Orden', (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Se presento un error en la base de datos");
        } else {
            return res.json(resultset);
        }
    })
});

router.post('/agregarOrden', async (req, res) => {
    try {
        const {
            id_Orden,
            nombre,
            subtotal,
            iva,
            total
        } = req.body
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO Orden(id_Orden, nombre, subtotal, iva, total) VALUES (?, ?, ?, ?, ?)`, [id_Orden, nombre, subtotal, iva, total]);

        if (rows.affectedRows > 0) {
            res.json({
                id_Orden: id_Orden,
                nombre: nombre,
                subtotal: subtotal,
                iva: iva,
                total: total
            })
        } else {
            res.json({})
        }
    } catch (e) {
        res.status(500).json({errorCode : e.errno, message: "Error en el servidor"});
    }
});

module.exports = router;