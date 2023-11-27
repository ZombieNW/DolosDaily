import fs from "fs";
import path from "path";
import compromise from 'compromise';
import imgl from "@sl-code-lords/image-library";
const {unsplash, pixabay} = imgl;

// Get json array from file and return a random item
export function getRandomItemFromFile(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    const jsonData = JSON.parse(data);
    const randomItem = jsonData[Math.floor(Math.random() * jsonData.length)];
    return randomItem;
}

//Parse a string into a safer string
export function makeDirectorySafeString(input) {
    return input.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
}

// Store a variable in the subdirectory
export function storeVariableInSubdirectory(variable, subdirectory, filename) {
    const directoryPath = path.join(process.cwd(), 'articles', subdirectory);
    const filePath = path.join(directoryPath, filename);

    // Create the subdirectory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, {
            recursive: true
        });
    }

    // Write the variable to the file
    console.log(variable)
    fs.writeFile(filePath, variable, (err) => {
        if (err) {
            console.error('Error writing to the file:', err);
        } else {
            console.log(`Data has been stored in the file: ${filePath}`);
        }
    });
}

//Use natural language to extract topic words from a sentence
export function extractTopicWords(sentence, numberOfWords) {
    return compromise(sentence).nouns().out('array').join('');
}

//Get a random image from unsplash or pixabay
export async function getStockImage(query){
    const result = await unsplash.search({"query": query, page: 1});
    return result.result[0];
}