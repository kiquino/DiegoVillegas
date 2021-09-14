let express = require('express');
let Cookies = require('cookie-parser');

let jwt = require('jsonwebtoken');

let app = express();
let config = require('../../configs/config');
let usuariosmodel = require('../../models/usuariosModels');
let RegistroModel = require('../../models/registroModel');
const cookieParser = require('cookie-parser');

app.set('llave', config.llave);
app.use(cookieParser())

const protectedUser = async (req, res, next) => {
    const token = await req.headers["x-access-token"];

    if (!token) {

        res.send("falta token");

    } else {
        jwt.verify(token, 'pablitoclavounclavito', (err, decoded) => {
            if (err) {
                res.json({
                    auth: false,
                    mensajeError: "No hay autentificación",
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

app.get('/', protectedUser, async (req, res) => {
    var id = req.headers["id"];

    var data = await usuariosmodel.getProfileinfo(id);
    if (data) {
        var data2 = await usuariosmodel.getIntegrantes(data.id_domicilio);
        var data3 = await usuariosmodel.getDomicilio(data.id_domicilio);
        var data4 = await usuariosmodel.getGastos(id);
        var data5 = await usuariosmodel.getServicios(data.id_domicilio);
        var thereData4 = true;
        var thereData5 = true;
        if (data4 == undefined) {
            thereData4 = false;
        }
        if (data5 == undefined) {
            thereData5 = false;
        }
        res.json({
            auth: true,
            result: data,
            result_integrante: data2,
            result_domicilio: data3,
            result_gastos: data4,
            result_servicios:data5,
            hayservicios:thereData5,
            haygastos: thereData4
        })
    }

})
app.post('/agregarServicio', async (req, res) => {
    let id = req.body.id;
    let valor = req.body.gasto;
    let nombre = req.body.nombre;
    let data = await usuariosmodel.getProfileinfo(id);
    if (data != undefined) {
        let id_domicilio = data.id_domicilio;

        let data2 = await RegistroModel.NewServicio(id_domicilio, valor, nombre);

        if (data2) {
            res.json({
                error: false,
                mensaje: "se ha registrado exitosamente el servicio"
            })
        } else {
            res.json({
                error: true,
                mensaje: "no se ha podido registrar el servicio"
            })
        }


    } else {
        res.json({
            mensaje: "No se encuentra este inquilino"
        })
    }
});
app.get('/modificarServicio/:id', async (req, res) => {
    let id = req.params.id;
    
    let data = await usuariosmodel.getServicioEdit(id);
    if (data != undefined) {
        res.json({
            gasto: data.gasto,
            nombre: data.nombre
        })
    } else {
        res.json({
            
            mensaje: "hubo un problema trayendo los datos"
        })
    }
})
app.post('/actualizarServicio/:id',async(req,res)=>{
    let id = req.params.id;
    let gasto = req.body.gasto;
    let nombre = req.body.nombre;
    let obj ={
        gasto,nombre
    }
    let data = await usuariosmodel.updateServicio(obj,id)
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
});


module.exports = app;