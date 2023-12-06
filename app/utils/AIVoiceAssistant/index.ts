import { Amplify } from "aws-amplify";

import config from "./config.json";
import { Interactions } from "@aws-amplify/interactions";

// @ts-ignore
Amplify.configure(config);
Amplify.configure({
    ...Amplify.getConfig(),
    Interactions: {
        // @ts-ignore
        LexV2: {
            OrderingAssistant: {
                aliasId: "TestBotAlias",
                botId: "ZHNVRCZB0Z",
                localeId: "en_US",
                region: "ap-southeast-2",
            },
        },
    },
});
// Help users with ordering, placing orders, and making payments. Recommend suitable dishes to users.

// AKIAQQ3X6KAE22XGJFP5
//
// otP+z7C6luayKYZKKak9GUIWkD39XGBrnKyw+mKK

export const sendTest = () => {
    const userInput = "I want to reserve a hotel for tonight";
    (async () => {
        // Provide a bot name and user input
        const response = await Interactions.send({
            botName: "OrderingAssistant",
            message: userInput,
        });

        // Log chatbot response
        console.log(response.message);
    })();
};

sendTest();
