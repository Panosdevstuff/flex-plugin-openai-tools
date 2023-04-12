import React, { useState, useEffect } from 'react';
import * as Flex from "@twilio/flex-ui";
import {Button} from '@twilio-paste/core/button';
import {Label} from '@twilio-paste/core/label';
import {TextArea} from '@twilio-paste/core/textarea';
import { Separator } from "@twilio-paste/core";
import { fetchOpenAIResponse } from "../../function/fetchOpenAIResponse";
import {Spinner} from '@twilio-paste/core/spinner';

const Sentiment = ({ }) => {

  const [sentimentResult, setSentimentResult] = useState("");
  const [sentimentEnabled, setSentimentEnabled] = useState(process.env.REACT_APP_SENTIMENT_ENABLED === "true");
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    Flex.Manager.getInstance().store.subscribe(() => {
      const conversation = Object.values(window.Twilio.Flex.Manager.getInstance().store.getState().flex.chat.conversations)[0];
      console.log("conversation: ", conversation); 

      if (conversation && conversation.messages) {
        const messages = conversation.messages;

        let newTranscript = "";
        messages.forEach((message) => {
          if (message.isFromMe) {
            newTranscript += "agent: " + message.source.body + "\n";
          } else {
            newTranscript += "customer: " + message.source.body + "\n";
          }
        });
        setTranscript(newTranscript);
      } else {
        return null;
      }
    });
  }, []);

  const handleSentimentClick = async () => {

    if (sentimentEnabled == false) {

      return;


    } else {


      try {
        setIsLoading(true);
        let sentimentResult = await fetchOpenAIResponse(transcript, 'sentiment');


        if (sentimentResult == '431') {
          try {
            setIsLoading(true);

            let someothervar = transcript.slice(-300);

            let sentimentResult = await fetchOpenAIResponse(someothervar, 'sentiment');
            setSentimentResult(sentimentResult.trim());
          } catch (error) {

            console.error(error);
            alert("Sorry, there was an error analyzing the sentiment.");
          } finally {
            setIsLoading(false);
          }

        } else {
          setSentimentResult(sentimentResult.trim());
        }


      } catch (error) {
        console.error(error);
        alert("Sorry, there was an error analyzing the sentiment.");
      } finally {
        setIsLoading(false);
      }


    }
  };

  return (
    <div>

      <div>
        {sentimentEnabled == true && (
          <>
            <Separator orientation="horizontal" verticalSpacing="space50" />
            {sentimentResult !== "" && (
              <>
                <Label htmlFor="message" required>Sentiment analysis </Label>
                <TextArea value={sentimentResult} id="message" name="message" readOnly />
              </>
            )}

            <Button variant="primary" disabled={isLoading} size="small" onClick={handleSentimentClick}>AI Sentiment analysis  {isLoading && <Spinner decorative={false} title="Loading" />}</Button>
            <Separator orientation="horizontal" verticalSpacing="space50" />
          </>
        )}
      </div>
    </div>
  );
};


export default Sentiment;
