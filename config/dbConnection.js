const mysql = require('mysql')
const util = require('util')
const {DB_DATABASE,DB_HOST,DB_USER,DB_PASSWORD} = require('./constants');


var pool = mysql.createConnection({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})
pool.on(
    "connect",
    function() {
            console.log("@connected to db");
    },
    "end",
    function(err) {
            console.log("@end ", err);
            throw err;
    },
    "close",
    function(err) {
            console.log("@closed ", err);
            throw err;
    },
    "error",
    function(err) {
            console.log("@error ", err);
            throw err;
    }
);

pool.query = util.promisify(pool.query)


module.exports = pool