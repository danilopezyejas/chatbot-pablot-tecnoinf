const express = require('express');
const router = express.Router();

const consultar_intent = require('../src/consultar_intent');
const listar_intent = require('../src/listar_intent');
const crear_intent = require('../src/nuevo_intent');
const fetch = require('node-fetch');
const ChatbotId = "chatbot-pablot-290222";
const ServidorDiego = 'http://localhost:8080/';

let usuarioPregunton = 0;
let respuesta = ""; 
router.get('/', (req,res)=>{
  console.log("ERROR GET");
  res.send("ERROR GET");
});
router.post('/ultima', (req,res)=>{
  res.send({Reply: this.respuesta})
});
//Atiendo los intent que funcionan con webhook
router.post('/contexto', (req,res)=>{
  let acction = req.body.queryResult.intent.displayName;
  console.log(acction);
  //Solo se respondera este tipo de preguntas a usuarios logeados
  if (usuarioPregunton == "0") {
    this.respuesta = 'Debe iniciar sesion para responder esta pregunta';
   // res.status(403).send('Debe iniciar sesion para responder esta pregunta');
  }else {
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
      //Si el usuario quere saber a que materias se puede anotar de un semestre distindo al primero
      //se calcula que materias tiene aprobadas y se le responde
        if (!req.body.queryResult.queryText.includes("primero")) {
          res.redirect(ServidorDiego + 'preguntas/FAQcal6'); //redireccionar a la aplicacion de Diego
        }
      //En caso de que quiera saber del primer semestre dialogflow se encarga de responder
        break;
      case "Cantidad de creditos":
        res.redirect(ServidorDiego + 'preguntas/FAQcal1'); //redireccionar a la aplicacion de Diego
        break;
      case "Creditos restantes":
        const body = { id: usuarioPregunton };
        fetch(ServidorDiego + 'preguntas/FAQcal2',{ method: 'POST', body: JSON.stringify(body),headers: { 'Content-Type': 'application/json' } })
      .then(res => res.json()) // expecting a json response
      .then(json => 
        this.respuesta = json.Reply 
        );

       // res.redirect(ServidorDiego + 'preguntas/FAQcal2/'+usuarioPregunton); //redireccionar a la aplicacion de Diego
        break;
      case "Pasantia":
        res.redirect(ServidorDiego + 'preguntas/FAQcal3'); //redireccionar a la aplicacion de Diego
        break;
      default:
        console.log("ERROR POST");
        res.status(404).send('A ocurido un error! No se encontro lo solicitado');
        break;
    }
  }
});

router.post('/send-msg', (req,res)=>{
  
  usuarioPregunton = req.body.id;
  console.log("pregunta");
  consultar_intent.buscar_intent(ChatbotId, req.body.MSG)
    .then((results) => {
      res.send({Reply: results})
    }) //End of .then(results =>
    .catch((err) => {
      res.status(500).send('A ocurido un error! Con el servidor');
      console.error("ERROR:", err);
    }); // End of .catch
})

router.get('/listar-intent', (req,res)=>{
  listar_intent.listar_intent(ChatbotId)
    .then((results) => {
      res.send({Reply: results})
    }) //End of .then(results =>
    .catch((err) => {
      res.status(500).send('A ocurido un error! Con el servidor');
      console.error("ERROR:", err);
    }); // End of .catch
})

router.post('/nuevo-intent', (req,res)=>{
  crear_intent.crear_intent(ChatbotId,req.body.respuesta,req.body.pregunta,req.body.nombreIntent )
    .then((results) => {
      res.send({Reply: results})
    }) //End of .then(results =>
    .catch((err) => {
      res.status(500).send('A ocurido un error! Con el servidor');
      console.error("ERROR:", err);
    }); // End of .catch
})

module.exports = router;
