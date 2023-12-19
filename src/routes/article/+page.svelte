<script>
    import {onMount} from 'svelte';

    let articleData = {
        "title": "Loading...",
        "contents": "Loading...",
        "date": new Date(),
        "image": ""
    }

    onMount(() => {
        function getUrlParam(paramName) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(paramName);
        }

        const data = {
            id: getUrlParam('a')
        };

        fetch(`/articledata/${data.id}/articledata.json`)
            .then(response => response.json())
            .then(jsonData => {
                articleData.title = jsonData.title;
                articleData.date = new Date(jsonData.date).toLocaleDateString();
                articleData.image = jsonData.image;
                fetch(`/articledata/${data.id}/article.md`)
                    .then(response => response.text())
                    .then(markdownData => {
                        articleData.contents = markdownData;
                    })
                    .catch(error => {
                        console.error(error);
                    });
            })
            .catch(error => {
                console.error(error);
            });
    });
</script>

<div class="flex justify-center">
    <div class="w-3/4">
        <div class="w-full inline-block">
            <h1 class="text-6xl">{articleData.title || "Unknown Title"}</h1>
            <p class="text-gray-700">{articleData.date}</p>
            <p class="text-gray-700">By Dolos Daily</p>
            <img src="{articleData.image || "./placeholder.jpg"}" class="h-[32rem] float-left w-full rounded-sm object-cover" alt="{articleData.title || "Unknown Title"}">
            <hr class="w-full my-4">
        </div>
        
        <div class="block whitespace-pre-wrap text-lg pb-32">
            {articleData.contents || "Article Not Found"}
        </div>
    </div>
</div>