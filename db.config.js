const mysql = require('mysql');

// créer ici la connexion mysql

const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_mysql_crud_db'
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Base de données connectée avec succès!');
})

module.exports = dbConn;