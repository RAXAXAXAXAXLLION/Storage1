require("socket.io").listen('8888').on('connection',function(socket){socket.on('input',function(e){socket.emit('output',{msg:e.data})})})
