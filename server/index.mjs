import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs/promises';
import * as generator from '../generator/index.mjs';

//Consts
const app = express();
const __dirname = new URL('.', import.meta.url).pathname.slice(1);

//Middleware & Static server
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.set('json spaces', 2);

//return directories in "/public/articledata"
app.get('/articlelist', async (req, res) => {
  try {
    const articlesPath = path.join(__dirname, '../public', 'articledata');
    const dirsList = await fs.readdir(articlesPath);
    const dirsData = {};

    for await (const dir of dirsList) {
      const filePath = path.join(__dirname, '../public/articledata', dir, 'articledata.json');
      const fileData = await fs.readFile(filePath, 'utf8');
      dirsData[dir] = JSON.parse(fileData);
    }

    res.status(200).json(dirsData);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

if(process.argv[2] != "--nogen"){
  setInterval(generator.run, 5 * 60 * 1000);
  generator.run();
}