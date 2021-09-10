var pool = require('./bd');
var md5 = require('md5');

async function getDniAndPass(dni, pass) {
    try {
        var query = "select id,nombre,id_domicilio from inquilino where documento = ? and password = ? limit 1";
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
async function getEmailPassword() {
    try {
        var query = "select * from inquilino ";
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        throw error;
    }

}
async function getProfileinfo(id_inquilino) {
    try {
        var query = "select nombre,apellido,email,id_domicilio,admin from inquilino where id = ?";
        var row = await pool.query(query, [id_inquilino]);
        return row[0];
    } catch (error) {
        console.log(error);
    }
}
async function getGastos(id_inquilino){
    try {
        var query = "select gasto,categoria,fecha from gastos where id_individuo = ?";
        var row = await pool.query(query,[id_inquilino]);
        return row;
    } catch (error) {
        console.log(error);
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
    getIntegrantes,
    getEmailPassword,
    getProfileinfo,
    getGastos
};