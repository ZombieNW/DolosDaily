import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const config = {
    kit: {
        adapter: adapter({
            // default options are shown. On some platforms
            // these options are set automatically — see below
            pages: "build",
            assets: "build",
            fallback: undefined,
            precompress: false,
            strict: true
        })
    },
    preprocess: vitePreprocess()
};
export default config;
