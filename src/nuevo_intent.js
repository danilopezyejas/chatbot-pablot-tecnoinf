'use strict';
const dialogflow = require("@google-cloud/dialogflow");
const intentsClient = new dialogflow.IntentsClient();

module.exports = {
  crear_intent: async function (projectId, respuesta, preguntas, nombreIntent) {
    // La ruta para identificar al agente que posee la intención creada.
    const agentPath = intentsClient.agentPath(projectId);
    const trainingPhrases = [];
    // console.log(preguntas);
    // preguntas.forEach(pregunta => {
    //   const part = {
    //     text: pregunta,
    //   };
      // Aquí creamos una nueva frase de entrenamiento para cada parte proporcionada.
      const trainingPhrase = {
        type: 'EXAMPLE',
        parts: [preguntas],
      };
      trainingPhrases.push(trainingPhrase);
    // });
    const messageText = {
      text: respuesta,
    };
    const message = {
      text: messageText,
    };
    const intent = {
      displayName: nombreIntent,
      trainingPhrases: trainingPhrases,
      messages: [message],
    };
    const createIntentRequest = {
      parent: agentPath,
      intent: intent,
    };
    // Create the intent
    const [response] = await intentsClient.createIntent(createIntentRequest);
    return `Intent ${response.name} created`;
  }//Fin de la funcion
}//Fin exports
