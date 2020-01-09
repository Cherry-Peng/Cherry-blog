var dbutil = require("./DbUtil");

//写入评论
function isertComment(blogId,parent,parentName,userName,email,comments,ctime,utime,success){
    var insertSql = "insert into comments (`blog_id`, `parent`,`parent_name`, `user_name`, `email`, `comments`, `ctime`, `utime`) values (?, ?, ?, ?, ?, ?, ?,?)";
    var params = [blogId, parent,parentName, userName, email, comments, ctime, utime];
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

function queryCommentsByParentId(parent,success){
    var insertSql = "select * from comments where parent = ?";
    var params = [parent];
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

function queryCommentsByBlodId(blogId,success){
    var insertSql = "select * from comments where blog_id = ?";
    var params = [blogId];
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

function queryCommentsCountByBlogId(blogId,success){
    var insertSql = "select count(1) as count from comments where blog_id = ?";
    var params = [blogId];
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



function queryAllCommentsCount(success){
    var insertSql = "select count(1) as count from comments";
    var params = [];
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

function queryNewComments(size,success){
    var insertSql = "select * from comments order by id desc limit ?;";
    var params = [size];
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


module.exports.isertComment=isertComment;
module.exports.queryCommentsByBlodId=queryCommentsByBlodId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.queryNewComments = queryNewComments;
module.exports.queryCommentsByParentId=queryCommentsByParentId;
module.exports.queryAllCommentsCount=queryAllCommentsCount;
