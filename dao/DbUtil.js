var mysql = require("mysql");


// function createConnection(){
//     var connection = mysql.createConnection({
//         host:"127.0.0.1",
//         port:"3306",
//         user:"root",
//         password:"lan774774",
//         database:"my_blog"
//     })
//     return connection;
// }


function createConnection(){
    var connection = mysql.createConnection({
        host:"47.97.25.166",
        port:"3306",
        user:"Cherry",
        password:"lan774949",
        database:"blog_db"
    })
    return connection;
}


// function createConnection(){
//     var connection = mysql.createConnection({
//         host:"qdm694721242.my3w.com",
//         port:"3306",
//         user:"qdm694721242",
//         password:"Lan774774",
//         database:"qdm694721242_db"
//     })
//     return connection;
// }

module.exports.createConnection = createConnection;