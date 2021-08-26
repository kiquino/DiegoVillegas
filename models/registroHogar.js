var pool = require('./bd');


async function newHome(calle, altura, alquiler, cantidad) {
    let obj = {
        calle: calle.toUpperCase(),
        altura: altura,
        alquiler: alquiler,
        cantidad_integrantes: cantidad

    }
    try {
        var query = "insert into hogar set ?";
        var rows = await pool.query(query, [obj]);
        rows;
        return true;
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    newHome
};