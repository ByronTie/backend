const mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "gtmetrix",
    password: "testpass",
    database: "gtmetrixdb"
});

exports.testConnection = async function(next) {
    con.connect(function (err) {
        if (err) next(err);
    
        console.log("Connected!");
        next();
    });
};

exports.findUser = async function (username, next) {
    try {
        con.connect();

        let sql = `SELECT * FROM users WHERE username = ${username}`;
        
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            return result[0];
        });

        con.end();
    } catch (error) {
        return next(error);
    }
};