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
        


        var data = await registroHogar.newHome(calle, altura, alquiler);

        if (data == true) {

           res.json({
               mensaje:"Se Agregó la dirección"
           })
        } else {
            res.json({
                mensaje:"No se Ingresaron datos correctos"
            })
        }
    } catch (error) {
        res.json({
            mensaje:error
        })
    }

})

module.exports = router