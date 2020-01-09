
var path = new Map();
var everyDayDao = require("../dao/EveryDayDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");


//写入每日一句
function editEveryDay(request,response){
    request.on("data",function(data){
        everyDayDao.insertEveryDay(data.toString().trim(),timeUtil.getNow(),function(result){

            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
        })
    })
}
path.set("/editEveryDay",editEveryDay);

//查询最新的每日一句
function queryEveryDay(request, response) {
    everyDayDao.queryEveryDay(function(result) {
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    });
}
path.set("/queryEveryDay", queryEveryDay);

module.exports.path = path;

