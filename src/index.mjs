//Libs
import express from 'express';
import markdownIt from 'markdown-it';
import path from 'path';
import fs from 'fs';
import livereload from 'livereload';
import connectLiveReload from 'connect-livereload';
import cors from 'cors';
import { promises as fsPromises } from 'fs';
import ejs from 'ejs';
import * as generator from '../generator/index.mjs';

//Important constants
const app = express();
const port = 3000;
const articlesFolder = path.join(new URL('.', import.meta.url).pathname.slice(1), '../articles');
const md = new markdownIt();

//Express middleware and settings
app.set('view engine', 'ejs');
app.use(cors());
app.use(connectLiveReload());
app.use(express.static('public'));
app.set('views', path.join(new URL('.', import.meta.url).pathname.slice(1), '../views'));

//Livereload
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//Routes
app.get('/', async (req, res) => {
    try {
        const articles = [];
        const articlesDir = path.join(new URL('.', import.meta.url).pathname.slice(1), '../articles');
        const files = await fsPromises.readdir(articlesDir);

        for (const file of files) {
            const dirPath = path.join(articlesDir, file);
            const stat = await fsPromises.stat(dirPath);

            if (stat.isDirectory()) {
                const jsonPath = path.join(dirPath, 'articledata.json');

                try {
                const articleContent = await fsPromises.readFile(jsonPath, { encoding: 'utf-8' });
                const articleObject = JSON.parse(articleContent);
                articles.push({ directory: file, data: articleObject });
                } catch (readFileError) {
                // Handle error reading file (e.g., JSON parsing error)
                console.error(`Error reading JSON file in ${dirPath}: ${readFileError.message}`);
                }
            }
        }

        res.render('home', { articles });
    }
    catch (error) {
        // Handle other errors (e.g., readdir error)
        console.error(`Error reading articles directory: ${error.message}`);
        res.status(500).send('Internal Server Error');
    }
});

//Article page from id
app.get('/articles/:id', async (req, res) => {
    const id = req.params.id;
    const filePath = path.join(articlesFolder, `${id}/article.md`);//Get file path of the article from id

    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        const htmlContent = md.render(data);//Convert MD to html

        //Render the 'article' template and pass the HTML content as a variable
        res.render('article', { content: htmlContent });
    } catch (err) {
        console.error(err);

        //Erorr handling
        if (err.code === 'ENOENT') {
            res.render('404', { url: req.url });//Send them to 404 page
        }
        else {
            res.status(500).send('Internal Server Error');
        }
    }
});

//Other 404 Handler
app.use(function(req, res, next) {
    res.status(404);

    //HTML Response
    if (req.accepts('html')) {
        res.render('404', { url: req.url });
        return;
    }

    //JSON Response
    if (req.accepts('json')) {
        res.json({ error: '404: Not found' });
        return;
    }
  
    //Plain Text Response
    res.type('txt').send('404: Not found');
});

//Start the server
app.listen(port, () => {
    console.log(`Markdown server is running at http://localhost:${port}`);
});

//Enable Generator
//setInterval(generator.run, 5 * 60 * 1000);