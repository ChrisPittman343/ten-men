<script lang="ts">
  import Spinner from "../Spinner.svelte";

  export let type = "button";
  export let disabled = false;
  export let loading = false;
</script>

<button
  class="px-6 py-0.5 font-medium border border-primary hover:bg-primary transition-colors relative rounded"
  {type}
  on:click
  class:disabled
  class:loading
>
  {#if loading}
    <Spinner>
      <slot />
    </Spinner>
  {:else}
    <slot />
  {/if}
</button>

<style lang="postcss">
  .disabled {
    @apply cursor-not-allowed opacity-50;
  }

  .loading {
    @apply cursor-not-allowed;
  }

  .loading:hover,
  .disabled:hover {
    @apply bg-transparent;
  }
</style>
