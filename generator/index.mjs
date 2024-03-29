//Libs
import * as lib from "./lib.mjs";
import fs from "fs";
import path from "path";
import { LLM } from "llama-node";
import { LLamaCpp } from "llama-node/dist/llm/llama-cpp.js";
const llama = new LLM(LLamaCpp);
const model = path.resolve(process.cwd(), "generator/models/airoboros-13b-gpt4.ggmlv3.q4_0.bin");

export async function run() {
    //Setup llama
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

    //Prepare article prompt
    const randomTopicObject = lib.getRandomItemFromFile("generator/topics.json");

    //Generate article
    var generatedArticle = await generateWithLLM(`
    Generate me a totally random fake news parody article that sounds really concerning and would make people wanna click. 
    Do not include fake news in the title.
    Make the title the first line of text and put the article after that.
    Make it about this topic:
    ${randomTopicObject.topic}

    Modern Context in case its helpful for the topic:
    The year is currently 2023.
    The current president is Mr. Joe Biden and the vice president is Ms. Kamala Harris.
    Use realistic fake names.
    Use a variety of sources not just ones from New York and California.

    Title:`);

    //Get the title of the article
    const articleSplit = generatedArticle.split("\n\n"); //Split by 2 newlines
    let articleTitle = articleSplit[0].replaceAll("\n", "").replaceAll('"', "").replaceAll('\\"', "").trim(); //Filter out the title

    //Prepare and store article content
    const johnSub = lib.getRandomItemFromFile("generator/firstNames.json");
    const janeSub = lib.getRandomItemFromFile("generator/firstNames.json");
    const smithSub = lib.getRandomItemFromFile("generator/lastNames.json");
    const doeSub = lib.getRandomItemFromFile("generator/lastNames.json");

    const articleContent = generatedArticle
        .replaceAll("<end>", "")
        .replaceAll("Article:\n", "")
        .replaceAll(articleSplit[0], "")
        .replaceAll("John", johnSub)
        .replaceAll("Jane", janeSub)
        .replaceAll("Smith", smithSub)
        .replaceAll("Doe", doeSub)
        .replaceAll("[News Outlet]", "Dolos Daily News")
        .trim();

    articleTitle = articleTitle.replaceAll("John", johnSub).replaceAll("Jane", janeSub).replaceAll("Smith", smithSub).replaceAll("Doe", doeSub);

    const dirSafeTitle = lib.makeDirectorySafeString(articleTitle); //Generate a directory safe title for the article

    lib.storeVariableInSubdirectory(articleContent, dirSafeTitle, "article.md");

    //Prepare and store additional article information
    const datajson = {
        title: articleTitle,
        date: new Date(),
        topics: randomTopicObject.keyword,
        image: (await lib.getStockImage(randomTopicObject.keyword)) || ""
    };
    lib.storeVariableInSubdirectory(JSON.stringify(datajson), dirSafeTitle, "articledata.json");
}

async function generateWithLLM(prompt, penalty) {
    penalty = penalty || 1;
    var currentOutput = "";
    await llama.createCompletion(
        {
            nThreads: 4,
            nTokPredict: 2048,
            topK: 40,
            topP: 0.1,
            temp: 0.7,
            repeatPenalty: penalty,
            prompt
        },
        (response) => {
            currentOutput += response.token;
            process.stdout.write(response.token);
        }
    );
    return currentOutput;
}
