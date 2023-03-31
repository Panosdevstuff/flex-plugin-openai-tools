const Button = require("@twilio-paste/core").Button;

import React, { useState } from 'react';
import { fetchOpenAIResponse } from "../../function/fetchOpenAIResponse";

export default function(props) {
  const {
    isFromMe,
    source: {
      state: {
        attributes: { sentiment,summarizedText },
      },
    },
  } = props.message;

  const [summaryEnabled, setSummaryEnabled] =  useState(process.env. REACT_APP_SUMMARIZE_ENABLED === "true");
  const [summaryThreshold, setSummaryThreshold] = useState(process.env.REACT_APP_SUMMARIZE_WORD_LIMIT || 200);
console.log("summaryThreshold"+summaryThreshold);
  
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    const button = document.querySelector('button');
    if (button) {
      button.disabled = disabled;
    }
  }, [disabled]);
  

  const callApi = async (messageBody, messageSid) => {
    try {
      const summary = await fetchOpenAIResponse(messageBody, 'summary');
     
      
      const newSummaryText = "Summary (AI):"+summary;
  //alert (newSummaryText);
      // Add the summarized text to the message attributes

  
      props.message.source.state.attributes.summarizedText = newSummaryText;

      // Disable the button after a successful API call
      setDisabled(true);
 
    } catch (error) {
      console.error('Error summarizing message:', error);
    }
  };

  const addSummaryToMessage = () => {
    //get the contents of the message
    console.log("MESSAGE", props.message)
    console.log("MESSAGE BODY", props.message?.source?.state?.body)

    const messageBody = props.message?.source?.state?.body;
    const messageSid = props.message?.source?.state?.sid;
  
    if (messageBody) {
      callApi(messageBody, messageSid);
    }
  };


  return (
    summaryEnabled === true && !isFromMe && props.message?.source?.state?.body.length >Number(summaryThreshold)  && (
      <Button onClick={addSummaryToMessage} variant="primary" disabled={disabled}>AI Summary  </Button>
    )
  ) || null;
};
