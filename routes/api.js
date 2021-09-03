let express = require('express');
let router = express.Router();

let usuarioModels = require('../models/usuariosModels');
router.get('/newlogin', async function (req, res, next) {
   
    let usuariosModels = await usuarioModels.getEmailPassword();

    res.json(usuariosModels);
})


module.exports = router;