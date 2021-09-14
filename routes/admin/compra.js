var express = require('express');
var app = express();

var registroModels = require('../../models/registroModel');
var usuariosModels = require('../../models/usuariosModels');




app.post('/', async (req, res) => {
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
            mensaje: "hubo un error " + error
        })
    }
});
app.get('/modificar/:id', async (req, res) => {
    let id = req.params.id;

    let data = await usuariosModels.getGasto(id);
    if (data != undefined) {
        res.json({
            gasto: data.gasto,
            categoria: data.categoria
        })
    } else {
        res.json({
            mensaje: "hubo un problema trayendo los datos"
        })
    }
})
app.post('/actualizar/:id', async (req, res) => {
    let id = req.params.id;
    let gasto = req.body.gasto;
    let categoria = req.body.categoria;
    let obj = {
        gasto,
        categoria
    }

    let data = await usuariosModels.UpdateGasto(obj, id);
    if (data) {
        res.json({
            mensaje: "se ha actualizado el Gasto",
            error: false
        })
    } else {
        res.json({
            mensaje: "hubo un error actualizando el Gasto",
            error: true
        })
    }
})

module.exports = app;