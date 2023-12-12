<script>
    export let title = "article title";
    export let timestamp = new Date();
    export let image = "./placeholder.jpg";
</script>

<div class="w-80 h-64 float-left">
    <img src="{image}" class="h-40 float-right w-full rounded-sm object-cover" alt="Placeholder">
    <h1 class="text-2xl">{title}</h1>
    <p class="text-gray-700">{timestamp.getDay()}</p>
</div>