import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import * as generator from "../generator/index.mjs";

//Consts
const app = express();
const __dirname = new URL(".", import.meta.url).pathname.slice(1); //Module path

//Middleware & Static server
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.set("json spaces", 2);

//Return article list with data
app.get("/articlelist", async (req, res) => {
    const articleList = async () => {
        //Get dirs & sort by date
        const articlesPath = path.join(__dirname, "../public", "articledata");
        if (!fs.existsSync(articlesPath)) {
            return res.status(500).send({ error: "Articles directory not found" });
        }
        const dirsList = await fs.readdir(articlesPath);

        //Fill keys with article data
        let dirsData = {};
        for await (const dir of dirsList) {
            const filePath = path.join(__dirname, "../public/articledata", dir, "articledata.json");
            try {
                const fileData = await fs.readFile(filePath, "utf8");
                dirsData[dir] = JSON.parse(fileData);
            } catch (error) {
                console.log("Error reading file: " + filePath);
            }
        }
        try {
            dirsData = Object.fromEntries(Object.entries(dirsData).sort((a, b) => new Date(b[1].date) - new Date(a[1].date))); //Reconstruct; Sort by date
        } catch (error) {
            console.log("Error sorting dates, parsing error may exist: " + error);
        }
        return dirsData;
    };

    articleList()
        .then((data) => res.status(200).json(data))
        .catch((err) => {
            console.log(err);
            res.status(500).send({ error: err.message });
        });
});

// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});

//Disable generator
if (process.argv[2] != "--nogen") {
    setInterval(generator.run, 5 * 60 * 1000);
    generator.run();
}
