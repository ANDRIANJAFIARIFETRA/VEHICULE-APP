const mysql = require('mysql');

const connexion = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vehicule'
});

connexion.getConnection((err, connect) => {
    if (err) {
        console.log(err);   
    }
})

module.exports = connexion 