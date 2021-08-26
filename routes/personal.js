var express = require('express');
var app = express();

/* GET users listing. */
app.get('/', function (req, res, next) {
    var logged = Boolean(req.session.nombre)
    res.render('personal', {
        title: 'Personal',
        nombre: req.session.nombre,
        apellido: req.session.apellido,
        documento: req.session.documento,
        email: req.session.email,
        domicilio: req.session.id_domicilio,

        logged: logged
    });
});

module.exports = app;