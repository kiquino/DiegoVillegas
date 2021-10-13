var pool = require('./bd');
var md5 = require('md5');

async function newInquilino(nombre, apellido, email, dni, password, calle, altura, admin) {

    try {

        var query2 = "select * from hogar where calle = ? and altura = ?";
        var rows2 = await pool.query(query2, [calle, altura]);
        var id_domicilio = rows2[0];


    } catch (error) {
        console.log(error);
    }

    let obj = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        documento: dni,
        id_domicilio: id_domicilio.id,
        password: md5(password)
    }

    try {
        var query = "insert into inquilino set ?";
        var newIndividual = await pool.query(query, [obj]);
        newIndividual;
        if (admin == 1) {
            var query4 = "select * from inquilino where documento = ?";
            var newAdmin = await pool.query(query4, [dni]);
            newAdmin[0];
            var new_id_admin = newAdmin[0].id;
            var query3 = "update hogar set id_admin = ? where id = ?";
            var add_admin = await pool.query(query3, [new_id_admin, id_domicilio.id]);
            add_admin;

        }

        return true;
    } catch (err) {
        console.log(err);
    }
}
async function newCompra(id, categoria, valor,nombre,detalle) {
    let obj2 = {
       
        categoria: categoria,
        valor: valor,
        nombre:nombre,
        detalle:detalle,

        // 
    }
    // let obj3 = {
    //     fecha:new Date(),
    //     id_inquilino: id
    // }
  
    try {
        var query = "insert into gastos set ?";
        var insertCompra = await pool.query(query, [obj2]);
        
        insertCompra;
        var query3 = "select id from gastos order by id desc limit 1";
        let searchLastItem = await pool.query(query3);
        let compraID = searchLastItem[0];
        let query2="insert into compra set ?";
        let insertcompra = await pool.query(query2,{ fecha:new Date(),
            id_inquilino: id,id_compra:compraID.id})
            insertcompra;
        return true;
    } catch (error) {
        console.log(error)
    }
}
async function NewServicio(id_domicilio,valor,nombre){
    let obj ={
        nombre:nombre,
        id_domicilio:id_domicilio,
        gasto:valor
       
        
    }
    try {
        let query = "insert into servicios set ?";
        let IngresarServicio = await pool.query(query,[obj])
        IngresarServicio;
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}
module.exports = {
    newInquilino,
    newCompra,
    NewServicio
};