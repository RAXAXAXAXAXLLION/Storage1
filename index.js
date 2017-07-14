require("socket.io").listen(require('http').createServer(function(req,res){
res.writeHead(200,{"Content-Type":"text/html"})
require("fs").readFile('slave.htm',(err,data)=>{res.end(data)})
}).listen('80'.function(){console.log("Server listening.")})
).on('connection',function(socket){socket.id=Math.random()
socket.on('input',function(e){for(socket.id in socket){
socket.emit('output',{msg:e.data})
}})})
