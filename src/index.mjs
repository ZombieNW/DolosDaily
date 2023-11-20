//Libs
import { LLM } from "llama-node";
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";
import { getRandomItemFromFile, makeDirectorySafeString, storeVariableInSubdirectory } from '../lib/lib.js';
import fs from "fs";
import path from "path";

//Important Functions
const llama = new LLM(LLamaCpp);
const model = path.resolve(process.cwd(), "models/airoboros-13b-gpt4.ggmlv3.q4_0.bin");
await llama.load({
    modelPath: model,
    enableLogging: false,
    nCtx: 1024,
    seed: 0,
    f16Kv: false,
    logitsAll: false,
    vocabOnly: false,
    useMlock: false,
    embedding: false,
    useMmap: true,
    nGpuLayers: 0
});

//Important Variables
const randomTopic = getRandomItemFromFile("src/topics.json");
const prompt = `
Generate me a totally random fake news parody article that sounds really concerning and would make people wanna click. 
Do not include fake news in the title.
Make the title the first line of text and put the article after that.
Make it about this topic:
${randomTopic}

Modern Context in case its helpful for the topic:
The year is 2023.
The current president is Mr. Joe Biden and the vice president is Ms. Kamala Harris.
Use realistic fake names.
Use a variety of sources not just ones from New York and California.

Title:`;

const run = async () => {
    const abortController = new AbortController();
    var currentOutput = "";

    //Configure Llama
    await llama.createCompletion({
        nThreads: 4,
        nTokPredict: 2048,
        topK: 40,
        topP: 0.1,
        temp: 0.9,
        repeatPenalty: 1,
        prompt,
    }, (response) => {
        currentOutput += response.token;
        process.stdout.write(response.token);
    });

    //Split every part of the article by two line breaks
    var articleSplit = currentOutput.split('\n\n');

    //Get the title of the article
    const articleTitle = articleSplit[0].replace("\n", "").replace("\"", "").replace("\\\"", "");
    const dirSafeTitle = makeDirectorySafeString(articleTitle);

    //Prep article content
    var articleContent = currentOutput.replace("<end>", "").replace("Article:\n", "").replace(articleSplit[0], "").replace("John", getRandomItemFromFile("src/firstNames.json")).replace("Jane", getRandomItemFromFile("src/firstNames.json")).replace("Smith", getRandomItemFromFile("src/lastNames.json")).replace("Doe", getRandomItemFromFile("src/lastNames.json")).trim();

    //Store article to markdown
    storeVariableInSubdirectory(articleContent, dirSafeTitle, 'article.md');

    //Store and prep additional article information
    const datajson = {
        "title": articleTitle,
        "date": new Date()
    }
    storeVariableInSubdirectory(JSON.stringify(datajson), dirSafeTitle, 'articledata.json');
}
  
run();