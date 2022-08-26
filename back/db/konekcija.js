const { createPool } = require('mysql');
const pool = createPool({
    host:"localhost",
    user:"root",
    password:"",
    database: "servisne_knjizice",
    connectionLimit: 10
});

exports.pool = pool;
