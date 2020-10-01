'use strict';
const dialogflow = require("@google-cloud/dialogflow");
const intentsClient = new dialogflow.IntentsClient();

async function createIntent(projectId, respuesta, preguntas, nombreIntent) {
  // Construct request

  // The path to identify the agent that owns the created intent.
  const agentPath = intentsClient.agentPath(projectId);

  const trainingPhrases = [];

  preguntas.forEach(pregunta => {
    const part = {
      text: pregunta,
    };

    // Here we create a new training phrase for each provided part.
    const trainingPhrase = {
      type: 'EXAMPLE',
      parts: [part],
    };

    trainingPhrases.push(trainingPhrase);
  });

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
  console.log(`Intent ${response.name} created`);
}

createIntent();

// [END dialogflow_create_intent]
}
