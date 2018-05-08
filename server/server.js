const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server);
io.on('connection', (socket)=>{
    console.log('New user connected');
    socket.on('createMessage',(message) => {
         io.emit('newMessage',{
             from:message.from,
             text:message.text,
             created_at: new Date().getTime(),

         });

        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     created_at: new Date().getTime(),
        // });
    });

    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to chat app',
        created_at: new Date().getTime(),
    });

    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New User Connected',
        created_at: new Date().getTime(),
    });
    socket.on('disconnect',()=>{
        console.log('Connection close');
      });

});



app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Server started on port`);
}); 