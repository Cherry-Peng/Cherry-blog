var fs = require("fs");

var globalConfig= require("./config");

var controllerSet = [];
var pathMap = new Map();

var file_path = globalConfig["web_path"];
var files = fs.readdirSync(file_path);
for(var i = 0;i < files.length; i++){
    var temp = require("./" + globalConfig["web_path"] + "/" + files[i]);
    if(temp.path){
        for(var [key,value] of temp.path){
            if(pathMap.get(key) == null){
                pathMap.set(key,value);
            }else{
                throw Error("url path异常,url:" + key)
            }
        }
        controllerSet.push(temp);
    }
}

module.exports = pathMap;