let express = require('express');
let Cookies = require('cookie-parser');

let jwt = require('jsonwebtoken');

let app = express();
let config = require('../../configs/config');
let usuariosmodel = require('../../models/usuariosModels');
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
        var thereData4 = true;
       if (data4 == undefined) {
           thereData4 = false;
       }
        res.json({
            auth: true,
            result: data,
            result_integrante: data2,
            result_domicilio: data3,
            result_gastos:data4,
            haygastos:thereData4
        })
    }

})

module.exports = app;