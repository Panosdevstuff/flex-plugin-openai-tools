#  Twilio Flex Plugin config

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).



# OpenAI



Create account
https://platform.openai.com/account/billing/overview

Get your OpenAI key 
https://platform.openai.com/account/api-keys

Note:
This plugin was tested with a few different OpenAI models but primarily chatgpt4, I recommend chatgpt4 as this is the most capable model to date, at the time of writing (30.03.2024) it is in a limited beta, if you are not part of the BETA and you will  like to use chatgpt4, you need to join the waitlist here https://openai.com/waitlist/gpt-4-api, alternatively you can stil use the plugin with gpt3 or any other supported model.




## Setup

If you dont have a Twilio account please create one https://www.twilio.com/try-twilio 

As this is a flex plugin you will need to create a flex instance, under console go to products and find Flex.


Make sure you have [Node.js](https://nodejs.org) as well as [`npm`](https://npmjs.com). We support Node >= 10.12 (and recommend the _even_ versions of Node). Afterwards, install the dependencies by running `npm install`:
 

 

```bash
Go to the plugin directory i.e cd flex-plugin-openai-tools
```
# If you use npm
```bash
npm install
```
```bash
rename .env.local to .env. and follow the instructions on the file.
```
# Twilio function

Under your console create a new twilio service and function https://console.twilio.com/us1/develop/functions/services this will host the api request to chatgpt 
copy and paste the code from src/function/gpt4.js to your newly created function add the deps and enviromental vars as described on the comments of the file 


Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
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



## Disclaimer Work in Progress :

Please note that the plugin is a work in progress and may contain bugs, errors, or other issues.  No guarantees as to its functionality or suitability for your specific use case.

The program is provided 'as is' and without warranty. Neither the author nor any contributors to the program will be liable for any damages resulting from its use. This software is intended to demonstrate the capabilities of flex and has not been tested live. If you are considering deploying this plugin on your live flex instance, please be aware that it is a work in progress and may have unforeseen issues or bugs. By using this software, you acknowledge that you do so at your own risk and that neither the author nor any contributors to the program are liable for any damages that may result."


Build, deploy and create a new major version of the plugin
 ``` twilio flex:plugins:deploy --major --changelog "Adding initial version " --description "Twilio OpenaAi tools plugin"  ```

 Create a configuration and a release with the new version of the plugin
``` twilio flex:plugins:release ``` (Copy the message that you will get on the prompt)