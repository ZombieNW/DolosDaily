const fs = require("fs");
const path = require("path");

// Get json array from file and return a random item
function getRandomItemFromFile(filename) {
    const data = fs.readFileSync(filename, 'utf8');
    const jsonData = JSON.parse(data);
    const randomItem = jsonData[Math.floor(Math.random() * jsonData.length)];
    return randomItem;
}

//Parse a string into a safer string
function makeDirectorySafeString(input) {
    return input.replace(/ /g, '_').replace(/[^a-zA-Z0-9_]/g, '').toLowerCase();
}

// Store a variable in the subdirectory
function storeVariableInSubdirectory(variable, subdirectory, filename) {
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

// Export the functions
module.exports = { getRandomItemFromFile, makeDirectorySafeString, storeVariableInSubdirectory };