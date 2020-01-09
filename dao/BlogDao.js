var dbutil = require("./DbUtil");

//写入博客
function insertBlog(title,content,tags,views,ctime,utime,subtitle,img,success){
    var insertSql = "insert into blog (`title`,`content`,`tags`,`views`,`ctime`,`utime`,`subtitle`,`img`) values (?,?,?,?,?,?,?,?)";
    var params = [title,content,tags,views,ctime,utime,subtitle,img];
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


//翻页查询
function queryBlogByPage(page,pageSize,success){
    var insertSql = "select * from blog order by id desc limit ? , ?;";
    var params = [page * pageSize,pageSize];
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

//查询博客数量
function queryBlogCount(success){
    var insertSql = "select count(1) as count from blog;";
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


//更具tagId查询博客数量
function queryBlogCountByTag(tagId,success){
    var insertSql = "select count(1) as count from tag_blog_mapping where tag_id = ? ;";
    var params = [tagId];
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

//根据博客Id查询博客
function queryBlogById(id,success){
    var insertSql = "select * from blog where id = ?";
    var params = [id];
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

//查询所有博客排倒序
function queryAllBlog(success){
    var insertSql = "select * from blog order by id desc";
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

//增加浏览量
function addViews(id,success){
    var insertSql = "Update blog set views = views + 1 where id = ?";
    var params = [id];
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
//查询浏览总量
function queryAllViewsCount(success){
    var insertSql = "select sum(views) from blog";
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

//查询热门博客
function queryHotBlog(size,success){
    var insertSql = "select * from blog order by views desc limit ?";
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


module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
module.exports.queryBlogCountByTag = queryBlogCountByTag;
module.exports.queryAllViewsCount = queryAllViewsCount;