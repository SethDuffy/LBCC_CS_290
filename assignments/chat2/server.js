const express = require("express");
const socketio = require("socket.io");
const app = express();
const server = app.listen(3000);
const io = socketio(server);
const path = require("path");
const randomWords = require('random-words');

let users = {};

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, "/index.html"));
});


io.sockets.on("connection", (socket) => {
    users[socket.id] = randomWords({exactly:1, wordsPerString:3, separator: '-'});
    


    socket.on("chatRoom", (room) => {
        socket.join(room);
        socket.broadcast.in(room).emit("new user", users[socket.id] + " new user has joined");
    });



    socket.on("new message", (data) => {
        io.sockets.in("chatRoom").emit('news', users[socket.id] + ": "+ data);
    });

});



console.log(`server started on port ${server}`);