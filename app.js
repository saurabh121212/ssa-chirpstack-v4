const express = require("express");
const cors = require('cors');

const app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.enable('trust proxy');

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(express.static(__dirname));

app.use((req, res, next) => {
	console.log("query:", req.query);
  console.log("body:", req.body);
	next();
},
cors()
);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

app.get("/events", (req, res) => {
    res.status(200).json({
        result:"events service"
    })
});

server.listen(3000, () => {
    console.log("server is runing on 3000 port")
})




io.on("connection",(socket)=>{
    console.log("User connected ",socket.id);
    socket.on("up",(data)=>{
        console.log("socket message ",data);
    })
})
