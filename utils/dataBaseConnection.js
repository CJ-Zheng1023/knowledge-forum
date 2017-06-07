var mysql = require('promise-mysql');
var dbConfig = require('../config.js').dbConfig;
var pool = mysql.createPool({
    database:dbConfig.mysql_database,
    host:dbConfig.mysql_host,
    port:dbConfig.mysql_port,
    user:dbConfig.mysql_user,
    password:dbConfig.mysql_password,
    connectionLimit:dbConfig.mysql_connectionLimit
});
function getSqlConnection() {
    return pool.getConnection().disposer(function(connection) {
        pool.releaseConnection(connection);
    });
}
module.exports = getSqlConnection;