const request = require('supertest');

const app = require('../index');

// Obtener todos los productos
it('Lista de todos los productos en la BD', done => {
    request(app)
        .get('/productos')
        .expect('Content-Type', /json/)
        .expect(200, done);
});

// // Obtener todas las ordenes
// it('La pe')