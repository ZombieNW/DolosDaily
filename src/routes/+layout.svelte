<script>
    import {onMount} from 'svelte';
    import "../app.css";

    let today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayOfWeek = days[today.getDay()];
    const dayOfMonth = today.getDate();
    const month = months[today.getMonth()];
    const year = today.getFullYear();

    let adUrl1 = `/ads/${Math.floor(Math.random() * (6 - 1) + 1)}.png`;
    let adUrl2 = `/ads/${Math.floor(Math.random() * (6 - 1) + 1)}.png`;

    const generateUniqueAd = () => {
        const randomIndex = Math.floor(Math.random() * (6 - 1) + 1);
        return `/ads/${randomIndex}.png`;
    };

    const resetAds = () => {
        adUrl2 = generateUniqueAd();    
        do {
            adUrl1 = generateUniqueAd();
        } while (adUrl1 === adUrl2);
            
    };

    onMount(async () => {
        const timeInterval = setInterval(() => {
            today = new Date();
        }, 1000);

        const adInterval = setInterval(resetAds, 15000);
        resetAds();

        // Clean up the interval when the component is destroyed
        return () => clearInterval(timeInterval);
        return () => clearInterval(adInterval);
    });
</script>

<div class="fixed w-full h-screen -z-10 hidden md:block">
    <img src="{adUrl1}" alt="Advertisement" class="pt-64 px-6 top-0 left-0 float-left">
    <img src="{adUrl2}" alt="Advertisement" class="pt-64 px-6 top-0 right-0 float-right">
</div>

<div class="h-12 flex w-full items-center px-4">
    <p class="font-bold text-md md:text-3xl md:pt-16">{dayOfWeek + ', ' + dayOfMonth + ' ' + month + ' ' + year}</p>
    <div class="flex-1">
        <p class="font-bold float-right md:text-3xl md:pt-16">{today.toLocaleTimeString()}</p>
    </div>
</div>
<div class="flex w-full justify-center">
    <a href="./">
        <img src="./logo.png" class="md:h-24 md:-mt-8" alt="Logo">
    </a>
</div>
<hr class="mx-60 my-4 border-gray-400">

<slot />

<div class="text-center w-full">
    <a class="hover:bg-gray-900 hover:text-white mx-auto p-3 my-3 w-96 text-sm block border rounded-lg border-gray-500 bg-gray-50" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Subscribe to Dolos Daily</a>
</div>
<footer class="bg-gray-900 w-full -z-50">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 -z-50">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
              <a href="/" class="flex items-center">
                  <img src="./logoWhite.png" class="h-8 me-3" alt="Dolos Daily" />
              </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 class="mb-6 text-sm font-semibolduppercase text-white">Links</h2>
                  <ul class="text-gray-400 font-medium">
                      <li class="mb-4">
                          <a href="https://example.com/" class="hover:underline">Video Explanation</a>
                      </li>
                      <li>
                          <a href="https://example.com/" class="hover:underline">Source Code</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr class="my-6 sm:mx-auto border-gray-400 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm sm:text-center text-gray-400">© 2023 <a href="https://zombienw.com/" class="hover:underline">ZombieNW</a>.
          </span>
          <div class="flex mt-4 sm:justify-center sm:mt-0">
              <a href="https://discord.gg/tKFMy85" class="text-gray-500 hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
                        <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z"/>
                    </svg>
                  <span class="sr-only">Discord</span>
              </a>
              <a href="https://twitter.com/zombie_nw" class="text-gray-500 hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                    <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd"/>
                </svg>
                  <span class="sr-only">Twitter</span>
              </a>
              <a href="https://github.com/ZombieNW" class="text-gray-500 hover:text-white ms-5">
                  <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clip-rule="evenodd"/>
                  </svg>
                  <span class="sr-only">Source Code</span>
              </a>
              <a href="https://www.youtube.com/channel/UCUcsNSlibCUVYKtCa6uHFMg" class="text-gray-500 hover:text-white ms-5">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512" fill="currentColor"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>
                  <span class="sr-only">YouTube</span>
              </a>
          </div>
      </div>
    </div>
</footer>