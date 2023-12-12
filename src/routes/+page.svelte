<script>
    import {onMount} from 'svelte';
    import Article from '../components/Article.svelte';

    let today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = days[today.getDay()];
    const dayOfMonth = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    onMount(() => {
        const interval = setInterval(() => {
            today = new Date();
        }, 1000);

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
        <div class="h-64 w-full flex">
            <div class="flex-1">
                <p class="leading-none">BREAKING:</p>
                <h1 class="text-6xl">Article title</h1>
                <p class="text-gray-700">Time Ago</p>
            </div>
            <div class="flex-1">
                <img src="./placeholder.jpg" class="h-full float-right w-[32rem] rounded-sm object-cover" alt="Placeholder">
            </div>
        </div>
        <hr class="w-full my-4">
        <div class="grid grid-cols-3 justify-evenly justify-items-center">
            <Article/>
            <Article/>
            <Article/>
            <Article/>
            <Article/>
            <Article/>
        </div>
    </div>
</div>