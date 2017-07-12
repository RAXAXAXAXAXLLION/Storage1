require("socket.io").listen('8888').on('connection',function(socket){socket.on('i_msg',function(e){socket.emit('o_msg',{msg:e.data})})})
