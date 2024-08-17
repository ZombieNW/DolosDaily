import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
    kit: {
        adapter: adapter({
            // default options are shown. On some platforms
            // these options are set automatically — see below
            pages: "build",
            assets: "build",
            fallback: "404.html",
            precompress: false,
            strict: true
        }),
        paths: {
            base: process.argv.includes("dev") ? "" : process.env.BASE_PATH
        }
    },
    preprocess: vitePreprocess()
};
export default config;
