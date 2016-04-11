/**
 * Created by chen on 16/4/5.
 */
var http = require('http');
var server = http.createServer(function(req,res){
 console.log(req.method);
 console.log(req.url);
 console.log(req.headers);
 res.setHeader("x",'1');
 res.statusCode = 404;
 res.writeHead(404,{
  'x':'2'
 });
 res.end('hello world');
});
server.listen(3000);