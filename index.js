var express = require("express");

var history = require("connect-history-api-fallback");

var globalConfig = require("./config");

var loader = require("./loader");

var app = new express();

app.all("*",function(req,res,next){
   res.header('Access-Control-Allow-Origin', '*');
   next()
})
app.use(history())

app.use(express.static("./page/"));

app.post("/editEveryDay",loader.get("/editEveryDay"));
app.get("/queryEveryDay",loader.get("/queryEveryDay"));
app.post("/editBlog",loader.get("/editBlog"));
app.get("/queryBLogByPage",loader.get("/queryBLogByPage"));
app.get("/queryBlogCount",loader.get("/queryBlogCount"));
app.get("/queryBlogById",loader.get("/queryBlogById"));
app.get("/addComment",loader.get("/addComment"));
app.get("/queryRandomCode",loader.get("/queryRandomCode"));
app.get("/queryCommentsByBlodId",loader.get("/queryCommentsByBlodId"));
app.get("/queryCommentsCountByBlogId",loader.get("/queryCommentsCountByBlogId"));
app.get("/queryAllBlog",loader.get("/queryAllBlog"));
app.get("/queryRandomTags",loader.get("/queryRandomTags"));
app.get("/queryHotBlog",loader.get("/queryHotBlog"));
app.get("/queryNewComments",loader.get("/queryNewComments"));
app.get("/queryByTag",loader.get("/queryByTag"));
app.get("/queryBlogCountByTag",loader.get("/queryBlogCountByTag"));
app.get("/queryAllCommentsCount",loader.get("/queryAllCommentsCount"));
app.get("/queryAllViewsCount",loader.get("/queryAllViewsCount"));

app.listen(globalConfig.port,function(){
   console.log("服务已启动")
});