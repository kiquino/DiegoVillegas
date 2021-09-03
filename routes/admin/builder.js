var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('../../configs/config')


app.set('llave', config.llave);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


const rutasProtegidas = express.Router();

rutasProtegidas.use((req, res, next) => {

    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, app.get('llave'), (err, decoded) => {
            if (err) {
                return res.json({
                    mensaje: 'Token inválido'
                });
            } else {
                req.decoded = decoded;
                next();

            }
        })
    } else {
        res.send({
            mensaje: 'Token no proveída.'
        });
    }
})
// rutasProtegidas.use((req, res, next) => {
//     const token = req.headers['access-token'];

//     if (token) {
//         jwt.verify(token, app.get('llave'), (err, decoded) => {
//             if (err) {
//                 return res.json({
//                     mensaje: 'Token inválida'
//                 });
//             } else {
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
//         res.send({
//             mensaje: 'Token no proveída.'
//         });
//     }
// });

/* GET users listing. */
app.get('/', (req, res, next) => {
    var logged = Boolean(req.session.nombre);
    var admin = false;



    if (req.session.admin == 1) {
        admin = true;
    }
    const datos = [{
        nombre: req.session.nombre,
        apellido: req.session.apellido,
        documento: req.session.documento,
        email: req.session.email,
        domicilio: req.session.id_domicilio,
        calle: req.session.calle,
        altura: req.session.altura,
        alquiler: req.session.alquiler,
        integrantes: req.session.integrantes,
        admin: admin,
        logged: logged,
        token: req.session.token
    }]

    res.render('admin/builder', {
        layout: 'admin/layout',
        title: 'Bienvenido',
        nombre: req.session.nombre,
        apellido: req.session.apellido,
        documento: req.session.documento,
        email: req.session.email,
        domicilio: req.session.id_domicilio,
        calle: req.session.calle,
        altura: req.session.altura,
        alquiler: req.session.alquiler,
        integrantes: req.session.integrantes,
        admin: admin,
        logged: logged,
        token: req.session.token

    });
    // res.json(datos);
});



module.exports = app;