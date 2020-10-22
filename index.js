require('dotenv').config();
// const dialogflow = require("dialogflow");
// const dialogflow = require("@google-cloud/dialogflow");

// const ngrok = require('ngrok');
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const app = express();
const port = 5000;

const ChatbotId = "chatbot-pablot-290222";


/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', route);

app.listen(port,()=>{
  console.log("Servidor corriendo en el puerto: "+port);
})
