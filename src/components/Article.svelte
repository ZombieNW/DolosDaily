<script>
    export let title = "article title";
    export let timestamp = new Date();
    export let image = "./placeholder.jpg";
    if(!image) image = "./placeholder.jpg";
</script>

<div class="w-80 h-72 float-left my-2">
    <div class="block">
        <img src="{image}" class="h-40 w-full rounded-sm object-cover" alt="Placeholder">
    </div>
    <div class="block">
        <h1 class="text-2xl leading-7 line-clamp-3 text-ellipsis">{title}</h1>
        <p class="text-gray-700">{new Date(timestamp).toLocaleDateString()}</p>
    </div>
</div>