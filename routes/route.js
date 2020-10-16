const express = require('express');
const router = express.Router();

const consultar_intent = require('../src/consultar_intent');
const listar_intent = require('../src/listar_intent');
const crear_intent = require('../src/nuevo_intent');

const ChatbotId = "chatbot-pablot-290222";

router.get('/', (req,res)=>{
  console.log("ERROR GET");
  res.send("ERROR GET");
});

router.post('/', (req,res)=>{
  // console.log(req.body.queryResult.intent.displayName);
  let acction = req.body.queryResult.intent.displayName;
  console.log(acction);
  switch (acction) {
    case "suma":
      let num1 = parseFloat(req.body.queryResult.parameters.num1);
      let num2 = parseFloat(req.body.queryResult.parameters.num2);
      let sum = num1 + num2;
      response = num1 + " + " + num2 + " es " + sum;
      res.json({
          "fulfillmentText": response
      });
      break;
    case "Materias primer semestre":
      if (req.body.queryResult.intent.name.includes("3e6c0259-37f6-47e9-a99e-4499d9c31dbf")
          && req.body.queryResult.queryText.includes("segundo")) {
        res.json({
            "fulfillmentText": "Otro semestre"
        });    //Esto tiene que devolver Diego
        // res.redirect('http://google.com'); //redireccionar a la aplicacion de Diego
      }
      break;
    default:
      console.log("ERROR POST");
      res.send("ERROR POST");
      break;
  }
});

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
