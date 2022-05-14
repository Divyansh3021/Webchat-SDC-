const express = require("express");
const http = require('http');
const path = require("path");
const socketio = require('socket.io')
const formatMessages = require("./utlis/messages")
const {userjoin, userLeaves, getRoomUsers, getCurrentUser} = require("./utlis/users")

const app = express();
const server = http.createServer(app)
const io = socketio(server)

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

const botname = "Chatbot"

//Run when client connects
io.on("connection" , socket => {
    socket.on('joinroom', ({username, room}) => {

        const user = userjoin(socket.id, username, room);

        socket.join(user.room)
    //Welcome current user
    socket.emit("message",formatMessages(botname, "Welcome to Webchat"))

    //Broadcast when a user connects
    socket.broadcast.to(user.room).emit("message",formatMessages(botname, `${user.username} has joined the chat`, "left"));

    //Send useers and room info
    io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
    })
    })

    // console.log("New WS connection")
    //Listen for messages
    socket.on("chatMessage", (msg)=>{
        const user = getCurrentUser(socket.id);
        // console.log(msg)
        io.to(user.room).emit("message",formatMessages(user.username, msg, "right"))
    })

     //Runs when client disconnects
     socket.on("disconnect", ()=>{

        const user = userLeaves(socket.id)
         
         if (user){
            io.to(user.room).emit('message',formatMessages(botname, `${user.username} has left the chat`));

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    });

})

const PORT = 3000 || process.env.PORT;

server.listen(PORT, ()=>{ console.log(`Server running on port ${PORT}`)});