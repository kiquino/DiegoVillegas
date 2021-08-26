var express = require('express');
var router = express();
var registroHogar = require('../../models/registroHogar');

router.get('/', function (req, res, next) {
    res.render('admin/newdir', {
        layout: 'admin/layout'
    });
});
router.post('/', async (req, res, next) => {

    try {
        var calle = req.body.calle;
        var altura = req.body.altura;
        var alquiler = req.body.alquiler;
        var cantidad = req.body.cantidad_personas;


        var data = await registroHogar.newHome(calle, altura, alquiler, cantidad);

        if (data == true) {

            res.redirect('../admin/registro')
        } else {
            res.render('admin/newdir', {
                layout: 'admin/layout',
                error: true
            })
        }
    } catch (error) {

    }

})

module.exports = router