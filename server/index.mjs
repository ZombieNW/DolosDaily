import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import * as generator from "../generator/index.mjs";

//Consts
const app = express();
const __dirname = new URL(".", import.meta.url).pathname.slice(1);

//Middleware & Static server
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.set("json spaces", 2);

//return directories in "/public/articledata"
app.get("/articlelist", async (req, res) => {
    const articleList = async () => {
        //Get dirs & sort by date
        const articlesPath = path.join(__dirname, "../public", "articledata");
        var dirsList = await fs.readdir(articlesPath);

        var dirsData = {};

        for await (const dir of dirsList) {
            const filePath = path.join(__dirname, "../public/articledata", dir, "articledata.json");
            const fileData = await fs.readFile(filePath, "utf8");
            dirsData[dir] = JSON.parse(fileData);
        }

        for (const key in dirsData) {
            dirsData[key].date = new Date(dirsData[key].date);
        }
        const entries = Object.entries(dirsData);
        entries.sort((a, b) => b[1].date - a[1].date);
        return Object.fromEntries(entries);
    };

    articleList()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(500).send({ error: err.message }));
});

// Start the server
app.listen(3000, () => {
    console.log("Server started on port 3000");
});

if (process.argv[2] != "--nogen") {
    setInterval(generator.run, 5 * 60 * 1000);
    generator.run();
}
