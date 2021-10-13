var express = require('express');
var app = express();

var registroModels = require('../../models/registroModel');
var usuariosModels = require('../../models/usuariosModels');
const cookieParser = require('cookie-parser');
let config = require('../../configs/config');
app.set('llave', config.llave);
app.use(cookieParser())
let jwt = require('jsonwebtoken');

const protectedUser = async (req, res, next) => {
    const token = await req.headers["x-access-token"];

    if (!token) {

        res.json({
            error:true,
            mensaje:"falta token"});

    } else {
        jwt.verify(token, 'pablitoclavounclavito', (err, decoded) => {
            if (err) {
                res.json({
                    error: true,
                    mensaje: "No hay autentificación",
                    id: req.headers["id"],
                    token: token,
                    err
                })
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}



app.post('/', async (req, res) => {
    try {
        let id = req.body.id;
        let categoria = req.body.categoria;
        let valor = req.body.valor;
        let nombre = req.body.nombre;
        let detalle = req.body.detalle;
        let data = await registroModels.newCompra(id, categoria, valor,nombre,detalle);

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
app.get('/modificar/:id',protectedUser, async (req, res) => {
    let id = req.params.id;

    let data = await usuariosModels.getGastoData(id);
    console.log(data)
    if (data != undefined) {
        res.json({
            gasto: data.valor,
            categoria: data.categoria
        })
    } else {
        res.json({
            mensaje: "hubo un problema trayendo los datos"
        })
    }
})
app.post('/actualizar/:id',protectedUser, async (req, res) => {
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