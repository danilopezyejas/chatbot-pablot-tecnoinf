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

router.get('/send-msg', (req,res)=>{
  // consultar_intent.buscar_intent(ChatbotId, req.body.MSG)
  consultar_intent.buscar_intent(ChatbotId, req.query.nombre)
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

router.get('/nuevo-intent', (req,res)=>{
  crear_intent.crear_intent(ChatbotId,req.query.respuesta,req.query.pregunta,req.query.nombreIntent )
    .then((results) => {
      res.send({Reply: results})
    }) //End of .then(results =>
    .catch((err) => {
      console.error("ERROR:", err);
    }); // End of .catch
})

module.exports = router;
