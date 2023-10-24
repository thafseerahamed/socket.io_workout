const { Server } = require("socket.io")

const io = new Server(3000, {
    cors: true
});

const users = {}

io.on("connection", socket => {

    socket.on("new-user",(name) =>{
        users[socket.id] = name;
        socket.broadcast.emit("user-connected",name)
    })

    socket.on("send-chat-message", message => {
        socket.broadcast.emit("chat-message", {name:users[socket.id],message});
    })

    socket.on("disconnect", () => {
        
        socket.broadcast.emit("user-disconnected",users[socket.id])
        delete users[socket.id]
    })
})