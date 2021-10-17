const express = require('express')
const app = express()
const server = require('http').createServer(app)
const socketio = require('socket.io')
const path = require('path')
const io = socketio(server)
app.get('/index.html',(req,res)=>{
    res.sendFile(__dirname + '/views/index.html')
    io.on('connection', socket=>
    {
        console.log(socket.id)
        socket.on('messageFront',(message,room)=>{
            if(room === ''){
                socket.broadcast.emit('response',message)
            }
            else
            {
                socket.to(room).emit('response',message)
            }
        })
        // Joining a custom room multiple people 
        socket.on('join-room',room=>{
            socket.join(room)
        })
        io.emit("message","A new user has been connected ")

    })
})


server.listen(3000,()=>{console.log("App running on port 3000")})