<script>
    import {onMount} from 'svelte';
    import Article from '../components/Article.svelte';
    import SmallArticle from '../components/SmallArticle.svelte';

    const backendPort = 3000;//todo change this
    let articleList = {};
    let sideBarArticles = {};
    let gridArticles = {};

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

                console.log(sideBarArticles);
                console.log(gridArticles);
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