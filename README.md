# Twilio flex plugin openai tools

We will demonstrate the Flex-OpenAI plugin I created  with three powerful use cases that enable businesses to leverage OpenAI’s capabilities and enhance their own customer service. 

1. 	AI Responses – provide the ability for agents to generate AI-powered responses to customer inquiries in real-time. This tool leverages OpenAI's natural language processing capabilities to generate helpful responses to customer queries.
2. 	AI Summary – provides the ability to summarize text that exceeds a user-defined character limit. This can be helpful for agents who must read through a lengthy and occasionally complicated message, and should enable them to understand the message's main points before responding. 
3. 	AI Sentiment Analysis : This function analyzes a message's sentiment, enabling agents to estimate the emotional state of a client from their messages. It enables agents to react accordingly in circumstances where the client is upset or frustrated.  Each feature within the plugin can be enabled or disabled accordingly 

## Demo (gif)


![openai480](https://user-images.githubusercontent.com/108264826/231243969-a38d9233-d3a7-4120-948a-d50a6bd2001e.gif)

#  Twilio Flex Plugin config

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).





# OpenAI



[Create account](https://platform.openai.com/account/billing/overview)



[Get your OpenAI key](https://platform.openai.com/account/api-keys)

Note:
This plugin was tested with a few different OpenAI models but primarily chatgpt4, I recommend chatgpt4 as this is the most capable model to date, at the time of writing (30.03.2024) it is in a limited beta, if you are not part of the BETA and you wi  like to use chatgpt4, you need to [join the waitlist](  https://openai.com/waitlist/gpt-4-api), alternatively you can stil use the plugin with gpt3 or any other supported model.




# Twilio account

If you dont have a Twilio account please  [create one](https://www.twilio.com/try-twilio)

As this is a flex plugin you will need to create a flex instance best to do this upon creation by selecting flex as the product that you wil like to use,if you miss the step under console go to console then products and find Flex.


First, we need to clone the Flex plugin and do some work with the CLI.

Clone the OpenAI tools Flex plugin from the Github repository using the command: 


```bash git clone https://github.com/Panosdevstuff/flex-plugin-openai-tools. ```

# Software


Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) 


Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:
 
# Twilio function

Under your console create a new twilio  [service and function]( https://console.twilio.com/us1/develop/functions/services) this will host the api request to chatgpt 
copy and paste the code from src/function/gpt4.js to your newly created function add the deps and enviromental vars as described on the comments of the file 


# Env setup and install


```bash
Go to the plugin directory i.e cd flex-plugin-openai-tools
```


```bash
npm install
```
```bash
rename .env.local to .env. and follow the instructions on the file.
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex
```
Login to twilio cli from your shell 
```bash
twilio login 
```

Use a profile
```bash
twilio profiles:use yourprofilename
```

use twilio ``` flex:plugins:start ``` (inside your plugin dir) to test the plugin locally.


## Disclaimer Work in Progress : ##

Please note that the plugin is a work in progress and may contain bugs, errors, or other issues.  No guarantees as to its functionality or suitability for your specific use case.

The program is provided 'as is' and without warranty. Neither the author nor any contributors to the program will be liable for any damages resulting from its use. This software is intended to demonstrate the capabilities of flex and has not been tested live. If you are considering deploying this plugin on your live flex instance, please be aware that it is a work in progress and may have unforeseen issues or bugs. By using this software, you acknowledge that you do so at your own risk and that neither the author nor any contributors to the program are liable for any damages that may result."


### Build, deploy and create a new major version of the plugin ###
 ``` twilio flex:plugins:deploy --major --changelog "Adding initial version " --description "Twilio OpenaAi tools plugin"  ```

 Create a configuration and a release with the new version of the plugin
``` twilio flex:plugins:release ``` (Copy the message that you will get on the prompt)

# Testing #

### Sentiment analysis ###
To test the sentiment analysis: when a discussion is ongoing between an agent and a customer, click on the Analyze Sentiment button. A textbox will appear with the sentiment and an emoji

<img width="357" alt="image" src="https://user-images.githubusercontent.com/108264826/230463269-d222f27a-e061-40ce-8d58-8175705922ff.png">


### Suggested response ###
To Test the suggestion function: upon receiving a message from the user, click on the Suggest Response button: 

<img width="349" alt="image" src="https://user-images.githubusercontent.com/108264826/230463872-b16aea10-0e60-49b2-a747-7a7a858675b5.png">

### Summary ###
To test the summary function as a user, type a long message (bigger than the defined threshold in the `conf` file)  to the conversation window, then click on the AI Summary button. A summary of the message will be displayed using OpenaAi’s GTP model:

<img width="372" alt="image" src="https://user-images.githubusercontent.com/108264826/230464059-bb0cf9a0-183a-4bda-96f8-89ff0c01b385.png">

Video 





