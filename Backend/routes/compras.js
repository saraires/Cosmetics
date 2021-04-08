"use strict"

const { Router } = require('express');
const { cnn_mysql } = require('../DB/conexion');
const router = Router();

// Obtener todos los productos
router.get('/productos', (req, res) => {
    cnn_mysql.query('SELECT * FROM Producto', (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Se presento un error en la base de datos");
        } else {
            return res.status(200).json(resultset);
        }
    })
});

// Obtener todas las ordenes
router.get('/orden', (req, res) => {
    cnn_mysql.query('SELECT * FROM Orden', (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Se presento un error en la base de datos");
        } else {
            return res.status(200).json(resultset);
        }
    })
});

router.get('/cargar', (req, res) => {

    try {
        const productos = [
            { "id_Producto": "1", "nombre": "Spray hidratante", "precio": "105000", "cantidadDisponible": "140" },
            { "id_Producto": "2", "nombre": "Crema nocturna facial", "precio": "350000", "cantidadDisponible": "200" },
            { "id_Producto": "3", "nombre": "Bálsamo de labios", "precio": "50000", "cantidadDisponible": "250" },
            { "id_Producto": "4", "nombre": "Contorno de ojos", "precio": "154000", "cantidadDisponible": "30" },
            { "id_Producto": "5", "nombre": "Crema para peinar", "precio": "45000", "cantidadDisponible": "80" },
            { "id_Producto": "6", "nombre": "Tónico facial", "precio": "123000", "cantidadDisponible": "120" },
            { "id_Producto": "7", "nombre": "Mascarilla Cotton", "precio": "28000", "cantidadDisponible": "80" },
            { "id_Producto": "8", "nombre": "Tratamiento Anti-edad", "precio": "120000", "cantidadDisponible": "400" },
            { "id_Producto": "9", "nombre": "Pinza depiladora", "precio": "73000", "cantidadDisponible": "130" },
            { "id_Producto": "10", "nombre": "Kit brochas", "precio": "142000", "cantidadDisponible": "20" }]


        for (let i = 0; i < productos.length; i++) {
            cnn_mysql.query('INSERT INTO Producto(id_Producto, nombre, precio, cantidadDisponible) VALUES (?, ?, ?, ?)', [productos[i].id_Producto, productos[i].nombre, productos[i].precio, productos[i].cantidadDisponible]);
        }
        res.json("Se cargaron los datos");
    } catch (e) {
        console.log(e);
        res.status(404).json("no se pudo cargar la informacion");
    }
});

// Eliminar datos de la bd
router.delete("/eliminar-productos", (req, res) => {
    try {
        cnn_mysql.query("DELETE from Producto");
        res.json("Productos eliminados");
    } catch (error) {
        console.error(error.message);
    }
});

// Agregar cada orden
router.post('/agregarOrden', async (req, res) => {
    try {
        const { id_Orden, nombre, subtotal, iva, total, fecha, numeroProductos } = req.body
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO Orden(id_Orden, nombre, subtotal, iva, total, fecha, numeroProductos) VALUES (?, ?, ?, ?, ?, ?, ?)`, [id_Orden, nombre, subtotal, iva, total, fecha, numeroProductos]);

        if (rows.affectedRows > 0) {
            res.json({
                id_Orden: id_Orden,
                nombre: nombre,
                subtotal: subtotal,
                iva: iva,
                total: total,
                fecha: fecha,
                numeroProductos: numeroProductos
            })
        } else {
            res.json({})
        }

    } catch (e) {
        res.status(500).json({ e });
    }
});

module.exports = router;