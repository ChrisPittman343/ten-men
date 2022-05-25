<script lang="ts">
  import { onMount } from "svelte";
  import { link } from "svelte-routing";
  import { getContext } from "svelte";
  import { ROUTER } from "svelte-routing/src/contexts";

  export let href: string;
  const { activeRoute } = getContext(ROUTER);
  let active: boolean;

  onMount(() => {
    activeRoute.subscribe((val) => {
      if (val) active = val.uri === href;
    });
  });
</script>

<a
  {href}
  class="transition-colors px-6 py-2 border-l-[6px] text-lg border-transparent 
        flex items-center gap-3 text-tertiary/50 fill-tertiary/50"
  class:active
  use:link
>
  <slot />
</a>

<style lang="postcss">
  .active {
    @apply font-medium border-primary;
  }

  .active,
  a:hover {
    @apply text-tertiary fill-tertiary;
  }
</style>
