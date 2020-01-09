var dbutil = require("./DbUtil");


function insertTagBlogMapping(tagId,blogId,ctime,utime,success){
    var insertSql = "insert into tag_blog_mapping (`tag_id`,`blog_id`,`ctime`,`utime`) values (?,?,?,?)";
    var params = [tagId,blogId,ctime,utime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryByTag(tagId,page,pagesize,success){
    page = + page;
    pagesize = + pagesize;
    var insertSql = "select * from tag_blog_mapping where tag_id = ? order by id desc limit ?,?;";
    var params = [tagId,pagesize*page,pagesize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {

        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;