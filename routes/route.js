const express = require('express');
const router = express.Router();

const consultar_intent = require('../src/consultar_intent');
const listar_intent = require('../src/listar_intent');
const crear_intent = require('../src/nuevo_intent');

const ChatbotId = "chatbot-pablot-290222";

router.get('/', (req,res)=>{
  console.log("ERROR");
  res.send("ERROR")
})

router.post('/send-msg', (req,res)=>{
  consultar_intent.buscar_intent(ChatbotId, req.body.MSG)
    .then((results) => {
      res.send({Reply: results})
    }) //End of .then(results =>
    .catch((err) => {
      console.error("ERROR:", err);
    }); // End of .catch
})

router.get('/listar-intent', (req,res)=>{
  listar_intent.listar_intent(ChatbotId)
    .then((results) => {
      res.send({Reply: results})
    }) //End of .then(results =>
    .catch((err) => {
      console.error("ERROR:", err);
    }); // End of .catch
})

router.post('/nuevo-intent', (req,res)=>{
  crear_intent.crear_intent(ChatbotId,req.body.respuesta,req.body.pregunta,req.body.nombreIntent )
    .then((results) => {
      res.send({Reply: results})
    }) //End of .then(results =>
    .catch((err) => {
      console.error("ERROR:", err);
    }); // End of .catch
})

module.exports = router;
