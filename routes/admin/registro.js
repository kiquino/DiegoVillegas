var express = require('express');
var router = express();
var registroModels = require('./../../models/registroModel');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/registro', {
        layout: 'admin/layout'
    });
});
router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.render('admin/login', {
        layout: 'admin/layout'
    });
})
router.post('/', async (req, res, next) => {

    try {
        var dni = req.body.dni;
        var nombre = req.body.nombre;
        var apellido = req.body.apellido;
        var email = req.body.email;
        var password = req.body.password;
        var calle = req.body.calle;
        var altura = req.body.altura;
        var admin = req.body.admin;
        var data = await registroModels.newInquilino(nombre, apellido, email, dni, password, calle, altura, admin);
        if (data) {


            res.redirect('../admin/login');
        } else {
            res.render('admin/registro', {
                layout: 'admin/layout',
                error: true
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;