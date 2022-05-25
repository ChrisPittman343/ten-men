<script lang="ts">
  import { onMount } from "svelte";
  import { link } from "svelte-routing";
  import { getContext } from "svelte";
  import { ROUTER } from "svelte-routing/src/contexts";

  const { activeRoute } = getContext(ROUTER);
  let active: boolean;

  onMount(() => {
    activeRoute.subscribe((val) => {
      if (val) active = val.uri === "/";
    });
  });
</script>

<a
  href="/"
  use:link
  class:active
  class="text-tertiary/50 group relative mx-auto p-1 text-3xl font-bold tracking-[0.3em] transition-colors"
>
  10M
</a>

<style lang="postcss">
  .active,
  a:hover {
    @apply text-tertiary;
  }
</style>
