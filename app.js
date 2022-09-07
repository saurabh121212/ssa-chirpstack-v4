const express = require("express");
const cors = require('cors');

const app = express();

// var server = require('http').createServer(app);
// var io = require('socket.io')(server);

//for client
var io = require('socket.io-client');
// var socket = io.connect('http://ec2-3-110-220-190.ap-south-1.compute.amazonaws.com:3000',
// {reconnect: true,  reconnectionDelay: 10000});

var socket = io.connect();

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



// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   });


app.get("/", (req, res) => {
    res.status(200).json({
        result:"data "
    })
});

app.get("/events", (req, res) => {
    res.status(200).json({
        result:"events service"
    })
});

app.listen(3000, () => {
    console.log("server is runing on 3000 port")
})


socket.on('connect', (data) => {
    console.log('Connected to Socket');
});

// Add a connect listener
socket.on('up', function (socket) {
    console.log('Connected!');
    console.log("mydata ",socket)
});

// io.on("connection",(socket)=>{
//     console.log("User connected ",socket.id);
//     socket.on("up",(data)=>{
//         console.log("socket message ",data);
//     })
// })
