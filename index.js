// required modules
const { readFileSync } = require("fs");
const { createServer } = require("http");
const http = require('http');
const { Server } = require("socket.io");
var socketIO = require("socket.io");
var path = require('path');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('view engine', 'ejs');

// setting route
app.use('/public', express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname+"/index.html"));
})

var server = http.Server(app);
server.listen(3000);

const io = socketIO(server);
var  pendulumnList = [];

// on socket connection
io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    // Channel 'status' to send ('Restart') and receive ('Stop') message to/from the client 
    socket.on('status', function(data){
        console.log(data);
        if(data.message === "STOP"){
            var restartMessage=setInterval(sendRestart, 5000);
            function sendRestart()
            {
                socket.emit('status', {"message": "RESTART"});
                clearInterval(restartMessage);
            }
        }
    });

    // Channel 'fromClient' for getting the pendulum data in json format and store it in an array
    socket.on('fromClient',function(data){
   
        // console.log( 'ON: fromClient');
        // pendulumnList.push(data);
        pendulumnList = data;
        // socket.emit('fromServer', { message: 'Received message! Returning message!!' });
        // socket.emit('fromServer', pendulumnList);
        // console.log( 'EMIT: fromServers');
        pendulumnList.sort(dynamicSort("point"));

        // sorting based on x-axis point position
        if(pendulumnList.length == 1){
            pendulumnList[0].leftNeighbor = 0;
            pendulumnList[0].rightNeighbor = 0;
        }else{
            for(var i = 0; i < pendulumnList.length; i++){
                if( i == 0){
                    pendulumnList[i].leftNeighbor = 0;
                    pendulumnList[i].rightNeighbor = pendulumnList[i+1].point;
                } else if(i + 1 == pendulumnList.length){
                    pendulumnList[i].leftNeighbor = pendulumnList[i-1].point;
                    pendulumnList[i].rightNeighbor = 0;
                } else {
                    pendulumnList[i].leftNeighbor = pendulumnList[i-1].point;
                    pendulumnList[i].rightNeighbor = pendulumnList[i+1].point;
                }
            }
        }

        // send the sorted array back to the client
        if(pendulumnList.length > 0){
            socket.emit('pendulumnList', pendulumnList);
        }
        // console.log(pendulumnList);
    });

    // On 'disconnect' log the message along with reason of disconnection
    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    // sorting function 
    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
});

