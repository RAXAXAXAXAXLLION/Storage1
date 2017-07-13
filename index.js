require("socket.io").listen(require('http').createServer(function(req,res){
res.writeHead(200,{"Content-Type":"text/html"})
require("fs").readFile('slave.htm',(err,data)=>{res.end(data)})
})).on('connection',function(socket){socket.on('input',function(e){socket.emit('output',{msg:e.data})})})
