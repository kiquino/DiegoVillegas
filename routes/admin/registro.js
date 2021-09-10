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


            res.json({
                error: false,
                mensaje: "Se ha registrado EXITOSAMENTE"
            })
        } else {
            res.json({
                error: true,
                mensaje: "Hubo un ERROR en el ingreso"
            })
            // res.render('admin/registro', {
            //     layout: 'admin/layout',
            //     error: true
            // })
        }
    } catch (error) {
        res.json({
            error: true,
            mensaje: "Hubo un ERROR en el ingreso"
        })
    }
})
router.post('/compra',async (req,res)=>{
    try {
        let id= req.body.id;
        let 
    } catch (error) {
        
    }
})

module.exports = router;