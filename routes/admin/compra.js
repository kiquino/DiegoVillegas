var express = require('express');
var app = express();

const rutaProtegida = express.Router();




app.get('/', function (req, res, next) {
    var logged = Boolean(req.session.nombre);
    var admin = false;
    var grupal = true;


    if (req.session.admin == 1) {
        admin = true;
    }

    res.render('admin/compra', {
        layout: 'admin/layout',
        title: 'Perfil',
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
        logged: logged,
        token: req.session.token,
        grupal: grupal
    });
});

module.exports = app;