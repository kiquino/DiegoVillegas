var express = require('express');
var router = express();
var usuariosmodel = require('./../../models/usuariosModels');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'admin/layout'
    });
});
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
})
router.post('/', async (req, res, next) => {

    try {
        var dni = req.body.dni;
        var password = req.body.password;
        var elements = [];
        var data = await usuariosmodel.getDniAndPass(dni, password);

        if (data != undefined) {
            var dataHogar = await usuariosmodel.getDomicilio(data.id_domicilio);
            var dataIntegrantes = await usuariosmodel.getIntegrantes(data.id_domicilio);
            req.session.nombre = data.nombre;
            req.session.apellido = data.apellido;
            req.session.documento = data.documento;
            req.session.id_domicilio = dataHogar.id;
            req.session.email = data.email;
            req.session.admin = data.admin;
            req.session.calle = dataHogar.calle;
            req.session.altura = dataHogar.altura;
            req.session.alquiler = dataHogar.alquiler;
            dataIntegrantes.forEach(element => {
                elements.push(element.nombre + "-" + element.apellido)

            });
            req.session.integrantes = elements;

            logged = true;
            res.redirect('/admin/builder');
        } else {
            res.render('admin/login', {
                layout: 'admin/layout',
                error: true
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;