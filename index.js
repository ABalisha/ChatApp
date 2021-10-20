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
app.get("/room/:roomName", (req, res) => {
  const param = req.params.roomName;
  io.on("connection", (socket) => {
    socket.join(param);
    console.log(socket.rooms)
    socket.on('sendMessage',(message) =>{
        console.log(socket)

        io.to(param).emit('SendMessage1',message)
    })
  });
  res.render("room", { param: param });
});
app.get('*',(req,res)=>{
    res.send('Wrong page fella')
})

server.listen(process.env.PORT || 8888,()=>{console.log("App running on port 8888")})
