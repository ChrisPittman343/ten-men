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
  class="text-secondary/50 hover:text-secondary transition-colors p-2 decoration-primary"
  class:active
  use:link
>
  <slot />
</a>

<style lang="postcss">
  .active {
    @apply underline underline-offset-4 text-secondary;
  }
</style>
