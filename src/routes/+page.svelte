<script>
    import {onMount} from 'svelte';
    import Article from '../components/Article.svelte';

    const backendPort = 3000;//todo change this
    let articleList = {};

    onMount(async () => {
        fetch(window.location.protocol + "//" + window.location.hostname + ":" + backendPort + "/articlelist")
            .then(async data => {
                articleList = await data.json();
            })
    });
</script>

<div class="flex justify-center">
    <div class="w-3/4">
        {#if articleList[Object.keys(articleList)[0]]}
            <div class="h-64 w-full flex">
                <div class="flex-1">
                    <p class="leading-none">BREAKING:</p>
                    <a href="/article?a={Object.keys(articleList)[0]}">
                        <h1 class="text-6xl line-clamp-3 text-ellipsis">{articleList[Object.keys(articleList)[0]].title}</h1>
                    </a>
                    <p class="text-gray-700">{new Date(articleList[Object.keys(articleList)[0]].date).toLocaleDateString()}</p>
                </div>
                <div class="flex-1">
                    <img src="{articleList[Object.keys(articleList)[0]].image || "./placeholder.jpg"}" class="h-full float-right w-[32rem] rounded-sm object-cover" alt="Placeholder">
                </div>
            </div>
        {/if}
        <hr class="w-full my-4">
        <div class="grid grid-cols-3 justify-evenly justify-items-center">
            {#each Object.keys(articleList) as item}
                <a href="/article?a={item}">
                    <Article title={articleList[item].title} timestamp={articleList[item].date} image={articleList[item].image}/>
                </a>
            {/each}
        </div>
    </div>
</div>