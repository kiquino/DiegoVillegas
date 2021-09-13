var express = require('express');
var app = express();

var registroModels = require('../../models/registroModel');




app.post('/',  async (req, res)=> {
    try {
        let id = req.body.id;
        let categoria = req.body.categoria;
        let valor = req.body.valor;
        let data = await registroModels.newCompra(id, categoria, valor);
       
        if (data) {
            res.json({
                error: false,
                mensaje: "Se ha agregado la compra"
            })
        } else {
            res.json({
                error: true,
                mensaje: "hubo un error con los datos de ingreso"
            })
        }
    } catch (error) {
        res.json({
            mensaje: "hubo un error "+error
        })
    }
});

module.exports = app;