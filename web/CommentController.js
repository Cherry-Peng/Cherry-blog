
var sendMail = require("../util/email");
var url = require("url");
var captcha = require("svg-captcha");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tadBlogMappingDao = require("../dao/TadBlogMappingDao");
var commentDao = require = require("../dao/CommentDao");


var path = new Map();

//写入留言
function addComment(request, response) {
    var params = url.parse(request.url, true).query;
    commentDao.isertComment(parseInt(params.bid), parseInt(params.parent),params.parentName, params.userName, params.email, params.content, timeUtil.getNow(), timeUtil.getNow(), function (result) {
        if(parseInt(params.parent) != -1){
            commentDao.queryCommentsByParentId(parseInt(params.parent),function (result) {
                sendMail(result[0].email,result[0].user_name,params.bid,params.content,timeUtil.getNow())
            })
    }
        response.write(respUtil.writeResult("success", "评论成功", null));
        response.end();
    });
}
path.set("/addComment", addComment);

//创建验证码
function queryRandomCode(request,response){
    var img = captcha.create({fontSize:50,width:100,height:34});
    response.write(respUtil.writeResult("success","OK",img));
    response.end();
}
path.set("/queryRandomCode",queryRandomCode);

//根据文章id找到评论
function queryCommentsByBlodId(request,response){
    var params = url.parse(request.url,true).query;
    commentDao.queryCommentsByBlodId(parseInt(params.bid),function(result){

        response.write(respUtil.writeResult("success","OK",result));
        response.end();
    })
}
path.set("/queryCommentsByBlodId",queryCommentsByBlodId);

//根据博客查询评论数量
function queryCommentsCountByBlogId(request,response){
    var params = url.parse(request.url,true).query;
    commentDao.queryCommentsCountByBlogId(params.id,function (result) {

        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryCommentsCountByBlogId",queryCommentsCountByBlogId);

//查询所有评论数量
function queryAllCommentsCount(request,response){
    commentDao.queryAllCommentsCount(function (result) {

        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryAllCommentsCount",queryAllCommentsCount);

//查询最新评论
function queryNewComments(request,response){
    commentDao.queryNewComments(5,function (result) {

        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryNewComments",queryNewComments)

module.exports.path=path;