<script>
    export let title = "article title";
    export let timestamp = new Date();
    export let image = "./placeholder.jpg";
    if(!image) image = "./placeholder.jpg";
</script>

<div class="w-auto md:w-60 h-64 float-right mb-4 mt-1">
    <div class="block">
        <img src="{image}" class="h-40 w-full rounded-sm object-cover" alt="Placeholder">
    </div>
    <div class="block">
        <h1 class="text-lg leading-6 line-clamp-4 text-ellipsis">{title}</h1>
        <p class="text-gray-700">{new Date(timestamp).toLocaleDateString()}</p>
    </div>
</div>