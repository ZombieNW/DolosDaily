<script>
    import {onMount} from 'svelte';
    import Article from '../components/Article.svelte';
    import Modal from '../components/Modal.svelte';
    import SmallArticle from '../components/SmallArticle.svelte';

    const backendPort = 3000;//todo change this
    let articleList = {};
    let sideBarArticles = {};
    let gridArticles = {};

    let showModal = false;

    onMount(async () => {
        fetch(window.location.protocol + "//" + window.location.hostname + ":" + backendPort + "/articlelist")
            .then(async data => {
                articleList = await data.json();
                
                //Divide the number of articles into side and grid
                let count = 0;
                for (const key of Object.keys(articleList)) {
                    count++;
                    if (count % 4 === 0) {
                        sideBarArticles[key] = articleList[key];
                        delete articleList[key];
                    } else {
                        gridArticles[key] = articleList[key];
                    }
                }

                setTimeout(function(){
                    showModal = true;
                }, Math.floor(Math.random() * (2000 - 500) + 500));
                
        })
    });
</script>

<title>Dolos Daily - Breaking News that Matters Most</title>

<div class="flex justify-center">
    <div class="w-3/4">
        {#if articleList[Object.keys(articleList)[0]]}
            <div class="h-64 w-full flex">
                <div class="flex-1">
                    <p class="leading-none">BREAKING:</p>
                    <a href="/article?a={Object.keys(articleList)[0]}">
                        <h1 class="text-5xl line-clamp-4 text-ellipsis">{articleList[Object.keys(articleList)[0]].title}</h1>
                    </a>
                    <p class="text-gray-700">{new Date(articleList[Object.keys(articleList)[0]].date).toLocaleDateString()}</p>
                </div>
                <div class="flex-1">
                    <img src="{articleList[Object.keys(articleList)[0]].image || "./placeholder.jpg"}" class="h-full float-right w-[32rem] rounded-sm object-cover" alt="Placeholder">
                </div>
            </div>
        {/if}
        <hr class="w-full my-4 border-gray-400">
        <div class="flex items-start">
            <div class="flex-1 hidden md:grid grid-cols-3 justify-evenly justify-items-center">
                {#each Object.keys(gridArticles) as item}
                    <a href="/article?a={item}">
                        <Article title={gridArticles[item].title} timestamp={gridArticles[item].date} image={gridArticles[item].image}/>
                    </a>
                {/each}
            </div>
            <div class="grid grid-cols-1 justify-evenly justify-items-center md:border-l-gray-400 border-[1px] md:pl-4 border-x-transparent border-y-transparent">
                {#each Object.keys(sideBarArticles) as item}
                    <a href="/article?a={item}">
                        <SmallArticle title={sideBarArticles[item].title} timestamp={sideBarArticles[item].date} image={sideBarArticles[item].image}/>
                    </a>
                {/each}
            </div>
        </div>
    </div>
</div>

<Modal bind:showModal>
    <div class="py-8 px-4">
        <div class="mx-auto text-center">
            <h1 class="text-3xl">Subscribe To Stay Up To Date</h1>
            <p class="text-xl">Stay up with the latest breaking news straight from whatever monkey on a typewritter is making all this crap.</p>
        </div>
        <div>
            <div class="relative w-full mt-8">
                <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                </div>
                <input class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-500" type="email" name="email" id="email" placeholder="Enter your email">
            </div>
            <a class="hover:bg-gray-900 hover:text-white  p-3 my-3 w-full text-sm block border rounded-lg border-gray-500 bg-gray-50" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Subscribe</a>
        </div>
        <div class="mx-auto text-center">
            <p class="text-md text-gray-700">We don't care about your data. <a class="text-black font-semibold" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Read our Privacy Policy.</a></p>
        </div>
    </div>
</Modal>
