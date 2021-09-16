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
async function getGastos(id_inquilino) {
    try {
        var query = "select * from gastos where id_individuo = ?";
        var row = await pool.query(query, [id_inquilino]);
        return row;
    } catch (error) {
        console.log(error);
    }
}
async function getGasto(id) {
    try {
        var query = "select gasto,categoria,fecha from gastos where id = ?";
        var row = await pool.query(query, [id]);
        return row[0];
    } catch (error) {
        console.log(error);
    }
}
async function getServicios(id_domicilio) {
    try {
        let query = "select * from servicios where id_domicilio =?";
        let TraerServicios = await pool.query(query, [id_domicilio]);
        return TraerServicios;
    } catch (error) {
        console.log(error);
    }
}
async function getServicioEdit(id) {
    try {
        let query = "SELECT * FROM servicios WHERE id=?";
        let row = await pool.query(query, [id]);
        
        return row[0];
        
    } catch (error) {
        console.log(error);
    }
}
async function getIntegrantes(id_domicilio) {
    try {
        var query = "select nombre,apellido,id,email from inquilino where id_domicilio = ?";
        var rows = await pool.query(query, [id_domicilio]);
        return rows;
    } catch (error) {
        console.log(err)
    }
}
async function UpdateGasto(obj, id) {
    try {
        var actualizar = "update gastos set ? where id=?";
        var row = await pool.query(actualizar, [obj, id])
        row;
        return true;
    } catch (error) {
console.log(error)
    }
}
async function updateServicio(obj,id){
    try {
        let actualizar = "update servicios set ? where id=?";
        var row = await pool.query(actualizar,[obj,id])
        row;
        return true;
    } catch (error) {
        console.log(error)
    }
}
async function DeleteCompra(id){
    try {
        let borrar ="delete from gastos where id=?"
        let row = await pool.query(borrar,id)
        row;
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}
async function DeleteServicio(id){
    try {
        let borrar = "delete from servicios where id =?";
        let row = await pool.query(borrar,id);
        row;
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}
async function contactoGet(id){
    try {
        let consulta = "select nombre,apellido,email from inquilino where id = ?";
        let row = await pool.query(consulta,id);
        return row[0];
    } catch (error) {
        console.log(error);
    }
}
module.exports = {
    getDniAndPass,
    getDomicilio,
    getIntegrantes,
    getEmailPassword,
    getProfileinfo,
    getGastos,
    getGasto,
    UpdateGasto,
    getServicios,
    getServicioEdit,
    updateServicio,
    DeleteCompra,
    DeleteServicio,
    contactoGet
};