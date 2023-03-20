const express=require("express");
const app=express();
const port=3000;
const http=require("http").createServer(app);
http.listen(port,(req,res)=>{
    console.log("listening at port");
})
app.use(express.static(__dirname +'/public'));
app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

//attach app to the http module for socket.io
const io=require("socket.io")(http)
//create a new connection from the server side
io.on("connection",(socket)=>{
    socket.on("message",(msg)=>{
       socket.broadcast.emit('message',msg)
    }
    )
console.log("connected");
})
