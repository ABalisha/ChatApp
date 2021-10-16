const express = require('express')
const app = express();
const server = require('http').createServer(app)
const socketio = require('socket.io')
const path = require('path')
const io = socketio(server)
app.use(express.static(path.join(__dirname, 'views')))
io.on('connection',(socket)=>{
console.log("Socket Connected")
socket.emit('message', 'Welcome to Chat')

// Broadcast When a user connectis
socket.broadcast.emit('message',"A user has connected");

// runs when client disconnections
socket.on('disconnect',()=>{
    io.emit('message',"User has left the chat")
})
socket.on('chatMessage',(message)=>{
    console.log(message)
    io.emit('message',message)
})
})

server.listen(3000, ()=>{console.log("App Running")})