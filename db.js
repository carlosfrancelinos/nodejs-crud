const mysql = require('mysql');
const connection = mysql.createConnection({
    host        :'mysql.malgaxe.com',
    port        :3306,
    user        :'malgaxe003_add1',
    password    :'Ch@tolin060',
    database    :'malgaxe03'
});

connection.connect(function(err){
    if(err) return console.log(err);
    console.log('conectou no MySQL!')
})

function findAll(callback) {
    connection.query('SELECT * FROM clientes;', callback);
}

function insert(customer, callback){
    const sql = "INSERT INTO clientes(nome,idade,uf) VALUES (?,?,?);";
    connection.query(sql
        , [customer.nome, customer.idade, customer.uf]
        , callback);
}

function findOne(id, callback){
    const sql = "SELECT * FROM clientes WHERE id=?";
    connection.query(sql,[id],callback);
}

function update(id, customer, callback){
    const sql = "UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?";
    connection.query(sql
        , [customer.nome, customer.idade, customer.uf, id]
        , callback);
}

function deleteOne(id, callback){
    connection.query('DELETE FROM clientes WHERE id=?;', [id], callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne }
