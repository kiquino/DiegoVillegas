var pool = require('./bd');
var md5 = require('md5');

async function getDniAndPass(dni, pass) {
    try {
        var query = "select * from inquilino where documento = ? and password = ? limit 1";
        var rows = await pool.query(query, [dni, md5(pass)]);
        return rows[0];
    } catch (err) {
        console.log(err);
    }
}
async function getDomicilio(id_domicilio) {
    try {
        var query = "select * from hogar where id = ?";
        var rows = await pool.query(query, [id_domicilio]);
        return rows[0];
    } catch (err) {
        console.log(err);
    }
}
async function getIntegrantes(id_domicilio) {
    try {
        var query = "select nombre,apellido from inquilino where id_domicilio = ?";
        var rows = await pool.query(query, [id_domicilio]);
        return rows;
    } catch (error) {
        console.log(err)
    }
}
module.exports = {
    getDniAndPass,
    getDomicilio,
    getIntegrantes
};