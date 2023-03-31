import React, { useState } from 'react';
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
    Flex.Manager.getInstance().store.subscribe(() => {
        const conversation = Object.values(window.Twilio.Flex.Manager.getInstance().store.getState().flex.chat.conversations)[0];
        console.log("conversation: ", conversation); 
        const messages = conversation.messages;
        
    //might be a better way to get the whole body ? need to check ??
        let newTranscript = "";
        messages.forEach((message) => {
          if (message.isFromMe) {
            newTranscript += "agent: " + message.source.body + "\n";
          } else {
            newTranscript += "customer: " + message.source.body + "\n";
          }
        });
        setTranscript(newTranscript);
    
    
        
      });


      const handleSentimentClick = async () => {
   
        if (sentimentEnabled==false) {
    
          return;
    
    
        }
        else
         {
         
    
        try {
          
           let sentimentResult= await fetchOpenAIResponse(transcript, 'sentiment');
           setIsLoading(true);
    
          //temporary hack to handle long transcripts , need to switch to post requests or cut down the length to more vars
          if (sentimentResult=='431')
          {
            try {
              setIsLoading(true);
    
           //   alert ("i am here");
              let someothervar = transcript.slice(-300);
             // alert ("i am the transcript"+someothervar);
              let sentimentResult= await fetchOpenAIResponse(someothervar, 'sentiment');
              setSentimentResult (sentimentResult.trim());
            }
            catch (error)
            {
              
                console.error(error);
                alert("Sorry, there was an error analyzing the sentiment.");
            }
            finally {
              setIsLoading(false); // set the loading state back to false
            }
    
          }
          else{
            setSentimentResult (sentimentResult.trim());
          }
          
       
        } catch (error) {
          console.error(error);
          alert("Sorry, there was an error analyzing the sentiment.");
        }
        finally {
          setIsLoading(false); // set the loading state back to false
        }
     
    
      }
      };

     return (
        <div>
       
          <div>
        {sentimentEnabled==true && (
        <>
          <Separator orientation="horizontal" verticalSpacing="space50" />
          {sentimentResult !== "" && (
            <>
             <Label htmlFor="message" required>Sentiment analysis </Label>
            <TextArea value={sentimentResult} id="message" name="message" readOnly />
          </>
          )}
      
        
          <Button variant="primary" disabled={isLoading} size="small" onClick={handleSentimentClick}>AI Sentiment analysis  {isLoading &&  <Spinner decorative={false} title="Loading" /> }</Button>
          <Separator orientation="horizontal" verticalSpacing="space50" />
        </>
      )}
    </div>
        </div>
      );
    };

    
    



    export default Sentiment;
