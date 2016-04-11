/**
 * Created by chen on 16/4/5.
 */
var http = require('http');
var URL = require('url');
var NEWS = {
    1:'first news',
    2:'second news',
    3:'third news'
};
function getNews(id){
    return NEWS[id]||'no such news';
}
var server = http.createServer(function(req,res){
    function send(html){
        res.writeHead(200,{
            'content-type':'text/html;charset=utf-8'
        });
        res.end(html);
    }
    var p = URL.parse(req.url,true);
    if(p.pathname === '/'){
        send('<ul>'+
            '<li><a href="/news?type=1&id=1">news 1</a></li>'+
            '<li><a href="/news?type=2&id=2">news 2</a></li>'+
            '<li><a href="/news?type=3&id=3">news 3</a></li>'+
        '</ul>');
    } else if(p.pathname === '/news'&&p.query.type==='1' && p.query.id==='1'){
        send(getNews(1));
    } else if(p.pathname === '/news'&&p.query.type==='2' && p.query.id==='2'){
        send(getNews(2));
    } else if(p.pathname === '/news'&&p.query.type==='3' && p.query.id==='3'){
        send(getNews(3));
    } else{
        send('<h1>no such news!</h1>');
    }
});
server.listen(3000);