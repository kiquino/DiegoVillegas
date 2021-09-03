var express = require('express');

var bodyParser = require('body-parser');
var config = require('../configs/config');
var jwt = require('jsonwebtoken')
var router = express();
const rutaProtegida = express.Router();

router.set('llave', config.llave);

router.use(bodyParser.urlencoded({
  extended: true
}));

router.use(bodyParser.json());

router.listen(3001, () => {
  console.log('Servidor iniciado en el puerto 3001')
});


/* GET home page. */
router.get('/', function (req, res, next) {
  var logged = Boolean(req.session.nombre)

  res.render('index', {
    title: 'Administracion',
    logged: logged,
    nombre: req.session.nombre

  });
});






rutaProtegida.use((req, res, next) => {
  const token = req.headers['access-token'];
  if (token) {
    jwt.verify(token, router.get('llave'), (err, decoded) => {
      if (err) {
        return res.json({
          mensaje: 'Token inválido'
        });
      } else {
        res.send({
          mensaje: 'token no proveida.'
        });
      }
    })
  }
})


module.exports = router;