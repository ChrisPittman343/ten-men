<script lang="ts">
  import Spinner from "../Spinner.svelte";

  export let type = "button";
  export let disabled = false;
  export let loading = false;
</script>

<button
  class="underline decoration-primary decoration-2 underline-offset-2"
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
</style>
