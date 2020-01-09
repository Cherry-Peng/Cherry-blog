
var path = new Map();
var url = require("url");
var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tadBlogMappingDao = require("../dao/TadBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");

var path = new Map();

//根据博客id查询博客
function queryBlogById(request,response) {
    var params = url.parse(request.url,true).query;
    blogDao.queryBlogById(parseInt(params.bid),function(result){

        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
        blogDao.addViews(params.bid,function(result){

        });
    })
}
path.set("/queryBlogById",queryBlogById);

//翻页查询
function queryBLogByPage(request,response) {
    var params = url.parse(request.url,true).query;
    blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function(result){
        for (var i = 0;i < result.length;i ++){
            result[i].content = result[i].content.replace(/<img[\w\W]*>/,"")
        }

        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryBLogByPage",queryBLogByPage);

//查询博客数量
function queryBlogCount(request,response){
    blogDao.queryBlogCount(function(result){
        
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryBlogCount",queryBlogCount);

//根据tag查询博客数量
function queryBlogCountByTag(request,response){
    var params = url.parse(request.url,true).query;
    blogDao.queryBlogCountByTag(params.tagId,function(result){
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryBlogCountByTag",queryBlogCountByTag);

//查询浏览总量

function queryAllViewsCount(request,response){
    blogDao.queryAllViewsCount(function(result){
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

path.set("/queryAllViewsCount",queryAllViewsCount);

//写入博客
function editBlog(request,response){
    var params = url.parse(request.url,true).query;
    request.on("data",function(data){
        blogDao.insertBlog(params.title,JSON.parse(data).content,params.tags,0,timeUtil.getNow(),timeUtil.getNow(),params.subtitle,JSON.parse(data).img,function(result){
            
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
            //
            var blogId = result.insertId;
            var tagList = params.tags.split(",");
            for (var i = 0;i < tagList.length;i ++){
                if(tagList[i] == ""){
                    continue;
                }
                queryTag(tagList[i],blogId)
            }
        })
    })
}
path.set('/editBlog',editBlog);

//根据tag查询博客
function queryTag(tag,blogId){
    tagsDao.queryTag(tag,function(result){
        if(result == null || result.length == 0){
            insertTag(tag,blogId);
        }else{
            insertTagBlogMapping(result[0].id,blogId);
        }
    })
}

function insertTag(tag,blogId) {
    tagsDao.insertTags(tag,timeUtil.getNow(),timeUtil.getNow(),function(result){
        insertTagBlogMapping(result.insertId,blogId);
    })
}

function insertTagBlogMapping(tagId,blogId){
    tadBlogMappingDao.insertTagBlogMapping(tagId,blogId,timeUtil.getNow(),timeUtil.getNow(),function(result){})
}


//查询所有博客
function queryAllBlog(request,response){
    blogDao.queryAllBlog(function (result) {
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryAllBlog",queryAllBlog);

//查找浏览最多的博客
function queryHotBlog(request,response){
    blogDao.queryHotBlog(5,function (result) {
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}

path.set("/queryHotBlog",queryHotBlog);
module.exports.path = path;