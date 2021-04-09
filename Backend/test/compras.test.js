const request = require('supertest');
const app = require('../index');

describe('Productos', () => {

    // Eliminar datos de la bd
    it('Eliminar los productos', done => {
        request(app)
            .delete('/eliminar-productos')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({ "Productos": "eliminados" });
    });

    // Cargar los productos al iniciar el servidor
    it('Iniciar los productos', done => {

        request(app)
            .get('/cargar')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({ "Se cargaron los datos": "si" })
    });

    // Obtener todos los productos --
    it('Lista de todos los productos en la BD', done => {
        request(app)
            .get('/productos')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(err => {
                if (err) return done(err)
                done();
            })
    });

});

// describe('Ordenes', () => {

// Agregar cada orden
// it("Agregar una orden a la BD", (done) => {

//     const orden = {
//         id_Orden: 7,
//         nombre: "name",
//         subtotal: 100000,
//         iva: 10000,
//         total: 110000,
//         fecha: "2021/04/09",
//         numeroProductos: 15
//     };

//     request(app)
//         .post("/agregarOrden")
//         .send(orden)
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .end(err => {
//             if (err) return done(err)
//             done();
//         })
// });

    // Obtener todas las ordenes
    it('Todas las ordenes en la BD', done => {

        request(app)
            .get('/orden')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

// });