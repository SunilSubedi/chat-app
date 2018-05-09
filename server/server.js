const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

var {generateMessage} = require('./utlis/message');
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);

var io = socketIO(server);
io.on('connection', (socket)=>{
    console.log('New user connected');
    socket.on('createMessage',(message) => {
         io.emit('newMessage',generateMessage(message.from,message.text));

        // socket.broadcast.emit('newMessage',{
        //     from:message.from,
        //     text:message.text,
        //     created_at: new Date().getTime(),
        // });
    });

    socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Connected'));
    socket.on('disconnect',()=>{
        console.log('Connection close');
      });

});



app.use(express.static(publicPath));
server.listen(port, () => {
    console.log(`Server started on port`);
}); 