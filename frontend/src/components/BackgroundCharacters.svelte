<script lang="ts">
  import { onMount } from "svelte";

  let leftImg: HTMLImageElement;
  let rightImg: HTMLImageElement;

  // onMount(() => {
  //   document.addEventListener("mousemove", lookAround);

  //   return () => {
  //     document.removeEventListener("mousemove", lookAround);
  //   };
  // });

  // const lookAround = (e: MouseEvent) => {
  //   const yTurnRate = 80;
  //   const xTurnRate = 650;

  //   leftImg.style.transform = `rotateY(${-e.screenX / yTurnRate}deg) `;
  //   rightImg.style.transform = `rotateY(${e.screenX / yTurnRate}deg) `;

  //   rightImg.style.transform += `rotateZ(${
  //     (-e.screenY + 100) / xTurnRate
  //   }deg) `;
  // };
</script>

<img
  bind:this={leftImg}
  class="absolute -bottom-1 -left-6 -z-20 hidden xl:block h-[80vh]"
  src="/images/csgo_logo.png"
  alt=""
/>

<img
  bind:this={rightImg}
  class="absolute -bottom-14 right-0 -z-20 h-[90vh]"
  src="/images/ct_aiming.png"
  alt=""
/>
