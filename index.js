require('dotenv').config();
const dialogflow = require("dialogflow");
// const dialogflow = require("@google-cloud/dialogflow");
const uuid = require("uuid");
const ngrok = require('ngrok');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

const ChatbotId = "chatbot-pablot-290222";
const sessionId = uuid.v4();

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
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.post('/send-msg',(req,res)=>{
  runSample(ChatbotId, req.body.MSG)
    .then((results) => {
      res.send({Reply: results})
    }) //End of .then(results =>
    .catch((err) => {
      console.error("ERROR:", err);
    }); // End of .catch
})

app.listen(port,()=>{
  console.log("Servidor corriendo en el puerto: "+port);
})
