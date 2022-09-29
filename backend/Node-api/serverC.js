const bodyParser = require('body-parser');
const express = require('express');
const http = require('http');
const cors = require('cors');
const axios = require('axios');
const { Dictionary } = require("dictionaryjs");
const { Broker } = require("./rmq/broker");
var broker = Broker.getInstance();
const amqp = require("amqplib/callback_api");

const authentication = require('./middleware/Authentication');

const app = express();

//port  assignment
const microserviceUrl= `http://localhost:3002`;
const port = 3005;

//********* SETTING UP CORS  */
var corsOptions = {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    //THESE ARE THE HEADERS THAT ARE ALLOWED TO BE SENT TO THIS API VIA CORS (WHEN SENDING REQUEST FROM BROWSER)
    allowedHeaders: [
      "authorization",
      "cache-control",
      "expires",
      "if-modified-since",
      "pragma",
      "accept",
      "content-type",
      "idtoken",
    ],
    maxAge: 3600, // Time in seconds
    preflightContinue: false, // Pass the CORS preflight response to the next handler.
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

// Middlewares 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.options("*", cors());
app.use(cors(corsOptions));

// Running app http server
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
//Dictionary
let activeDictionary = new Dictionary();

let authenticatedDict = new Dictionary();


var sockets = []

// socket connection
io.on("connection", (socket) => {
    console.log(`client with id : ${socket.id} connected to apigateway`);
    //add socket to var sockets
    sockets.push(socket.id);
    //add to dictionary
    activeDictionary.set(socket.id, socket);
    console.log("Number of clients Connected: ", activeDictionary.length);
    //sending Message to client
    socket.emit("generateID", socket.id);
    socket.on("disconnect", (socketId) => {
        console.log("Client Disconnected with id: ", socketId);
        //remove disconnected client from dictionary
        activeDictionary.remove(socketId);
        authenticatedDict.remove(socketId);
        console.log("Number of clients connected: ", activeDictionary.length);
         socket.disconnect(true);
    });
});

//routes for further actions to be performed
//route to Authenticate the user
app.get('/home', async(req,res)=>{
    
    res.status(200)
});

 //route to get all object
app.get('/home/:tablename/:socketId', async(req,res)=>{
    const url = microserviceUrl + "/"+req.params.tablename;
    try {
        const result = await axios.get(url);
        res.status(200).json(result.data);
    } catch (error) {
        //const response = new ResponseModel(400,'FAILED','GET',`Unsuccessful`,{});
        res.status(400);
    }
})

//route to post the data into the service
app.post('/:socketId/:serviceName', async(req,res)=>{
    const body = req.body;
    const topicName = req.params.serviceName + "_ADD" 
    const response = broker.PublicMessageToTopic(topicName,body)
    res.send("Success");
})

 //route to edit a particular object
app.put('/:socketId/update/:service/:id', async(req,res)=>{
    const id = parseInt(req.params.id);
    const body = [id,req.body]
    const topicName = req.params.service + "_UPDATE"
    const response = broker.PublicMessageToTopic(topicName,body)
    res.send("Success");
})

//route to delete a particular object 
app.delete('/:socketId/:service/:id', async(req,res)=>{
    const id = parseInt(req.params.id);
    const topicName = req.params.service + "_DELETE";
    const response = broker.PublicMessageToTopic(topicName,id)
    res.send("Success");
})


server.listen(port, ()=>{
    console.log("Gateway Running at port " ,port);
    //listening to the API service to check if the required action is successfully performed 
    broker.listenToServices("API_GATEWAY_SERVICE", (result) => {
        const { message } = result;
        console.log(message);
    });
});

