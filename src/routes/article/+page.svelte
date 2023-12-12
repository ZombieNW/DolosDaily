<script>
    import {onMount} from 'svelte';

    let today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = days[today.getDay()];
    const dayOfMonth = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    let articleData = {
        "title": "Loading...",
        "contents": "Loading...",
        "date": "Loading...",
        "image": ""
    }

    onMount(() => {
        const interval = setInterval(() => {
            today = new Date();
        }, 1000);

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
                articleData.date = new Date(jsonData.date).toLocaleTimeString();
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

        return () => clearInterval(interval);
    });
</script>

<div class="h-12 flex w-full items-center px-4">
    <h1 class="font-bold">{dayOfWeek + ', ' + dayOfMonth + ' ' + month + ' ' + year}</h1>
    <div class="flex-1">
        <h1 class="font-bold float-right">{today.toLocaleTimeString()}</h1>
    </div>
</div>
<a href="../" class="flex w-full justify-center">
    <img src="../logo.png" class="h-24 -mt-8" alt="Logo">
</a>
<hr class="mx-48 my-4">
<div class="flex justify-center">
    <div class="w-3/4">
        <div class="w-full inline-block">
            <h1 class="text-6xl">{articleData.title || "Unknown Title"}</h1>
            <p class="text-gray-700">{articleData.date || "Unknown Date"}</p>
            <p class="text-gray-700">By Dolos Daily</p>
            <img src="{articleData.image || "https://placehold.co/1920x1080"}" class="h-[32rem] float-left w-full rounded-sm object-cover" alt="{articleData.title || "Unknown Title"}">
            <hr class="w-full my-4">
        </div>
        
        <div class="block whitespace-pre-wrap text-lg pb-32">
            {articleData.contents || "Article Not Found"}
        </div>
    </div>
</div>