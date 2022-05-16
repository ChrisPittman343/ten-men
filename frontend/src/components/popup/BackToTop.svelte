<script lang="ts">
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Portal from "./Portal.svelte";

  onMount(() => {
    document.addEventListener("scroll", shouldShowButton);

    return () => {
      document.removeEventListener("scroll", shouldShowButton);
    };
  });

  const shouldShowButton = () => {
    showing = window.scrollY > 150;
  };

  let showing = false;
</script>

<Portal>
  {#if showing}
    <button
      transition:fade={{ duration: 150 }}
      on:click={() => {
        window.scroll({ top: 0, behavior: "smooth" });
      }}
      aria-live="polite"
      class="pointer-events-auto px-5 py-2 font-medium bg-primary rounded absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      Back to Top
    </button>
  {/if}
</Portal>
