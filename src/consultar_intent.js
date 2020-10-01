async function runSample(projectId, msg) {

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: "es",
      },
    }, // End queryInput:
  }; // End const request

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);

  const result = responses[0].queryResult;

  // console.log(result['fulfillmentText']);
  const fulfillmentTextReply = result.fulfillmentText;

  // if (result.intent) {
  //   console.log(`  Intent: ${result.intent.displayName}`);
  // } else {
  //   console.log(`  No intent matched.`);
  // }

  return result['fulfillmentText'];

} // End of this function: async function runSample
