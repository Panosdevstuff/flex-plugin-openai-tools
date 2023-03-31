
import React from 'react';
import { FlexPlugin } from '@twilio/flex-plugin';


import * as Flex from '@twilio/flex-ui';
import CustomTaskList from './components/CustomTaskList/CustomTaskList';
import { CustomizationProvider } from "@twilio-paste/core/customization";
import SummaryButton from "./components/SummaryButton/SummaryButton";
import Summary from "./components/AiSummary/Summary";

import Sentiment from "./components/AiSentiment/Sentiment";
import Suggestion from "./components/AiSuggestion/Suggestion";




const PLUGIN_NAME = 'OpenAiSuggestPlugin';

export default class OpenAiSuggestPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  async init(flex, manager) {
   

    flex.ViewCollection.Content.add(
      <flex.View name="my-custom-page" key="my-custom-page-key">
        <div>My custom page</div>
      </flex.View>
    );

    flex.setProviders({
      PasteThemeProvider: CustomizationProvider,
    });


    flex.MessageInputV2.Content.add(<Sentiment key="Sentimet" size={10}></Sentiment>);

    flex.MessageInputActions.Content.add(<Suggestion key="Suggestion" session={manager.store.getState().flex.session} ></Suggestion>);
    
 
    flex.MessageBubble.Content.add(<SummaryButton key="button-in-bubble"></SummaryButton>);
    flex.MessageBubble.Content.add(<Summary key="summary-in-bubble"></Summary>);

    flex.AgentDesktopView.Panel1.Content.add(<CustomTaskList key="MessageBubbleButtonPlugin-component" />, options);



  }
}
