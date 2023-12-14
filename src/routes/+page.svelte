<script>
    import {onMount} from 'svelte';
    import Article from '../components/Article.svelte';

    const backendPort = 3000;//todo change this
    let articleList = {};

    let today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = days[today.getDay()];
    const dayOfMonth = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    onMount(async () => {
        const interval = setInterval(() => {
            today = new Date();
        }, 1000);

        fetch(window.location.protocol + "//" + window.location.hostname + ":" + backendPort + "/articlelist")
            .then(async data => {
                articleList = await data.json();
            })

        // Clean up the interval when the component is destroyed
        return () => clearInterval(interval);
    });
</script>

<div class="h-12 flex w-full items-center px-4">
    <h1 class="font-bold">{dayOfWeek + ', ' + dayOfMonth + ' ' + month + ' ' + year}</h1>
    <div class="flex-1">
        <h1 class="font-bold float-right">{today.toLocaleTimeString()}</h1>
    </div>
</div>
<div class="flex w-full justify-center">
    <img src="./logo.png" class="h-24 -mt-8" alt="Logo">
</div>
<hr class="mx-48 my-4">
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