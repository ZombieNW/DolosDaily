# The Dolos Daily

### _Fake News, Streamlined_

![Languages](https://badgen.net/badge/language/Node.JS/green) ![Platform](https://badgen.net/badge/language/Svelte/red) ![License](https://badgen.net/badge/language/MIT/red)

## What?

This website generates news articles using [LLama-Node](https://llama-node.vercel.app/) and presents them on a front-end. I'm making a video about it that will release some time in February.

## Building

Install [Node.JS](https://nodejs.org/en/). Download a LLama-Node compatible model (I used [airoboros-13b-gpt4.ggmlv3.q4_0.bin](https://huggingface.co/TheBloke/airoboros-13b-gpt4-GGML)) and place it in the /models directory (change /generator/index.mjs if using a different file). Then run the following commands.

```sh
npm install
npm run build
npm run start
```

## Inspiration

This project is vaguelly inspired by [this article](https://blog.devgenius.io/how-to-generate-html-content-with-ai-using-llama-node-and-express-e1b1e0e1a55b) by Julian Bilcke. The execution is wildly different from how it's done in the article but it would feel wrong not giving it credit for the idea.

## License

[MIT](https://choosealicense.com/licenses/mit/)
