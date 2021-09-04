let express = require('express');

let jwt = require('jsonwebtoken');

let app = express();
let config = require('../../configs/config');
let usuariosmodel = require('../../models/usuariosModels');


app.set('llave', config.llave);

app.get('/', (req, res) => {
    if (req.session.user) {
        res.json({
            loggedIn: true,
            user: req.session.user
        })
    } else {
        res.send({
            loggedIn: false
        })
    }
})

app.post('/', async (req, res, next) => {
    var dni = req.body.dni;
    var password = req.body.password;

    var data = await usuariosmodel.getDniAndPass(dni, password);
    if (data) {
        var data2 = await usuariosmodel.getDomicilio(data.id_domicilio);
        var data3 = await usuariosmodel.getIntegrantes(data.id_domicilio);
        const payload = {
            check: true
        };
        const token = jwt.sign(payload, app.get('llave'), {
            expiresIn: 1440,
        });
        req.session.user = data;
        res.json({
            auth: true,
            token: token,
            result: data,
            result2: data2,
            result3: data3
        })

        // const payload = {
        //     check: true
        // };
        // const token = jwt.sign(payload, app.get('llave'), {
        //     expiresIn: 1440
        // });
        // res.json({

        //     token: token
        // });
    } else {
        res.json({
            mensaje: "dni o contraseña no existen"
        })
    }
})

module.exports = app;