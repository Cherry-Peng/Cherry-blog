
var path = new Map();
var url = require("url");
var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tadBlogMappingDao = require("../dao/TadBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");

var path = new Map();

//查询标签并打乱
function queryRandomTags(request, response) {
    tagsDao.queryAllTag(function (result) {
        result.sort(function () {
            return Math.random() > 0.5 ? true : false;
        })
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end()
    })
}
path.set("/queryRandomTags", queryRandomTags);

//根据tagId查询博客
function queryByTag(request, response) {
    var params = url.parse(request.url, true).query;
    tadBlogMappingDao.queryByTag(params.tag,params.page,params.pagesize, function (result) {
        if (result == null || result.length == 0) {
            response.write(respUtil.writeResult("success", "查询成功", result));
            response.end()
        } else {
            var blogList = [];

            for (var i = 0; i < result.length; i++) {

                blogDao.queryBlogById(result[i].blog_id, function (result) {
                    for (var i = 0; i < result.length; i++) {
                        result[i].content = result[i].content.replace(/<img[\w\W]*>/, "")
                    }
                    blogList.push(result[0]);
                })
            }

            setTimeout(()=>{
                response.write(respUtil.writeResult("success","查询成功",blogList));
                response.end()
            },1000)
        }

    })
}
path.set("/queryByTag", queryByTag);



module.exports.path = path;