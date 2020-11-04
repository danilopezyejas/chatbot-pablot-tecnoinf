const express = require('express');
const router = express.Router();

const consultar_intent = require('../src/consultar_intent');
const listar_intent = require('../src/listar_intent');
const crear_intent = require('../src/nuevo_intent');
const borrar_intent = require('../src/borrar_intent');
const fetch = require('node-fetch');
const ChatbotId = "chatbot-pablot-290222";
const ServidorDiego = 'http://3e64e7c9f20c.ngrok.io/';

let usuarioPregunton = 0;
let respuesta = "";

router.get('/', (req,res)=>{
  console.log("ERROR GET");
  res.send("ERROR GET");
});
router.post('/ultima', (req,res)=>{
 /* if(this.respuesta == 'Debe iniciar sesion para responder esta pregunta')
    res.status(403).send('Debe iniciar sesion para responder esta pregunta');
  if(this.respuesta == 'A ocurido un error! No se encontro lo solicitado')
    res.status(404).send('A ocurido un error! No se encontro lo solicitado');*/
  res.send({Reply: this.respuesta})
});
//Atiendo los intent que funcionan con webhook
router.post('/contexto', (req,res)=>{
  const body = { id: usuarioPregunton  };
  let acction = req.body.queryResult.intent.displayName;
  console.log(acction);

  //Solo se respondera este tipo de preguntas a usuarios logeados
  if (usuarioPregunton == "0") {
    this.respuesta = 'Debe iniciar sesion para responder esta pregunta';
  }else {
    switch (acction) {
      case "Wiki RPyL":
        
        
        this.respuesta = req.body.queryResult.queryText.split("Wiki RPyL");;
      break;
      case "Materias primer semestre":
      //Si el usuario quere saber a que materias se puede anotar de un semestre distindo al primero
      //se calcula que materias tiene aprobadas y se le responde
      let ingreso = req.body.queryResult.queryText;
        if (ingreso != "primero" || ingreso != "Primer" || ingreso != "1") {
          fetch(ServidorDiego + 'preguntas/FAQcal6',{
                  method: 'POST',
                  body: JSON.stringify(body),
                  headers: { 'Content-Type': 'application/json' }
          })
            .then(res => res.json()) // expecting a json response
            .then(json => this.respuesta = json.Reply );
          break;
        }
      //En caso de que quiera saber del primer semestre dialogflow se encarga de responder
        break;
      case "Cantidad de creditos":
        fetch(ServidorDiego + 'preguntas/FAQcal1',{
                method: 'POST',
                body: JSON.stringify({id:usuarioPregunton}),
                headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json()) // expecting a json response
          .then(json => this.respuesta = json.Reply );
        break;
      case "Creditos restantes":
        fetch(ServidorDiego + 'preguntas/FAQcal2',{
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json()) // expecting a json response
          .then(json => this.respuesta = json.Reply );
        break;
      case "Pasantia":
        fetch(ServidorDiego + 'preguntas/FAQcal3',{
                method: 'POST',
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' }
        })
          .then(res => res.json()) // expecting a json response
          .then(json => this.respuesta = json.Reply );
        break;
      default:
        console.log("ERROR POST");
        this.respuesta = 'A ocurido un error! No se encontro lo solicitado';
        break;
    }
  }
});

router.post('/send-msg', (req,res)=>{
  usuarioPregunton = req.body.id;
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

router.post('/borrar-intent', (req,res)=>{
  borrar_intent.borrar_intent(ChatbotId, req.body.idIntent )
    .then((results) => {
      res.send({Reply: results})
    }) //End of .then(results =>
    .catch((err) => {
      res.status(500).send('A ocurido un error! Con el servidor');
      console.error("ERROR:", err);
    }); // End of .catch
})

module.exports = router;
