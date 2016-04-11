/**
 * Created by chen on 16/4/5.
 */
var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

app.set('view engine','ejs');
app.set('views',__dirname);

function serveStatic(root,indexPage){
    return function(req,res,next){
        // req.originalUrl = req.baseUrl + req.path
        // /public/style.css = /public + /style.css
        console.log("req.originalUrl = "+req.originalUrl +", req.baseUrl= "+req.baseUrl +", req.path= "+req.path);
        console.log("root = "+root);
        var stat = fs.lstatSync("."+req.originalUrl);
        if(stat.isDirectory()){//是文件夹
//            console.log('hi');
            res.render(req.baseUrl.slice(1) + indexPage);
        }else {//是文件
            var file = req.originalUrl.slice(req.baseUrl.length + 1);
//            console.log(file);
            file = path.resolve(root,file);
            fs.exists(file,function(exists){
                if(exists){
                    var file_ext = path.extname(file);
                    if(file_ext === ".css"){
                        res.writeHead(200,{"Content-Type":"text/css"});
                    }else if(file_ext === ".js"){
                        res.writeHead(200,{"Content-Type":"application/javascript"});
                    } else if(file_ext === ".jpeg" || file_ext === ".jpg"){
                        res.writeHead(200,{"Content-Type":"image/jpeg"});
                    } else if(file_ext === ".txt"){
                        res.writeHead(200,{"Content-Type":"text/plain"});
                    }
                    var stream = fs.createReadStream(file);
                //    res.writeHead(200,{"Content-Type":"text/plain"});
                    stream.pipe(res);
                }else{
                    next();
                }
            });
        }
    };
}

//可以通过带有 “/public” 前缀的地址来访问 public 目录下面的文件
app.use('/public',
    serveStatic(__dirname + "/public","/index.ejs"),
    function(req,res){
    res.render('views/error.ejs',{
        message:"该文件不存在。"
    })});
//app.use('/public',express.static(__dirname + "/public"));

function getNewsList(){
    var list = [];//文章列表
    for(var i=0; i<5; i++){
        list.push(getNewsById(i+1));
    }
    return list;
}

function getNewsById(id){
    return{
        id:id,
        title:'第'+id+'篇新闻标题',
        content:'第'+id+'篇新闻内容'
    };
}

app.get('/',function(req,res){
    res.render('views/index.ejs',{
        list:getNewsList()
    });
});

app.get('/news/:id',function(req,res){
    res.render('views/news.ejs',{
        news:getNewsById(req.params.id)
    });
});

app.listen(3001);