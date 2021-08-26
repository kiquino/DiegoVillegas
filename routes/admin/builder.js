var express = require('express');
var app = express();

/* GET users listing. */
app.get('/', function (req, res, next) {
    var logged = Boolean(req.session.nombre);
    var admin = false;
    if (req.session.admin == 1) {
        admin = true;
    }
    res.render('admin/builder', {
        layout: 'admin/layout',
        title: 'Bienvenido',
        nombre: req.session.nombre,
        apellido: req.session.apellido,
        documento: req.session.documento,
        email: req.session.email,
        domicilio: req.session.id_domicilio,
        calle: req.session.calle,
        altura: req.session.altura,
        alquiler: req.session.alquiler,
        integrantes: req.session.integrantes,
        admin: admin,
        logged: logged
    });
});

module.exports = app;