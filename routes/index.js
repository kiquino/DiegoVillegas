var express = require('express');
var router = express();

/* GET home page. */
router.get('/', function (req, res, next) {
  var logged = Boolean(req.session.nombre)
  res.render('index', {
    title: 'Administracion',
    logged: logged,
    nombre: req.session.nombre

  });
});

module.exports = router;