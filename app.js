const express = require("express");
const cors = require('cors');

const app = express();

// var server = require('http').createServer(app);
// var io = require('socket.io')(server);

// //for client
// var io = require('socket.io-client');
// // var socket = io.connect('http://ec2-3-110-220-190.ap-south-1.compute.amazonaws.com:3000',
// // {reconnect: true,  reconnectionDelay: 10000});

// var socket = io.connect();

app.enable('trust proxy');

//Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(express.static(__dirname));

global.payloadData = {};

app.use((req, res, next) => {
	console.log("query testing :", req.query);
    console.log("body testing :", req.body);
    if( req.body != null)
    {
    global.payloadData = req.body;
    console.log("01 payload ",global.payloadData)
    }
	next();
},
cors()
);


// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   });


app.get("/", (req, res) => {
    console.log("myapi")
    console.log("02 payloadData ",global.payloadData)
    res.status(200).json({
        result:"data ",
        data:global.payloadData
    })
});

app.get("/events", (req, res) => {
    res.status(200).json({
        result:"events service"
    })
});

app.listen(3000, () => {
    console.log("server is runing on 30002 port")
})



// socket.on('connection', (data) => {
//     console.log('Connected to Socket');
// });

// // Add a connect listener
// socket.on('up', function (socket) {
//     console.log('Connected!');
//     console.log("mydata ",socket)
// });

// io.on("connection",(socket)=>{
//     console.log("User connected ",socket.id);
//     socket.on("up",(data)=>{
//         console.log("socket message ",data);
//     })
// })

