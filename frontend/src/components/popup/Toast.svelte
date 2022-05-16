<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

  export let notification: ToastNotification;
  let toast: HTMLElement;

  onMount(() => {
    const timeout = setTimeout(() => {
      toast.remove();
    }, 2500);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  });
</script>

<div
  in:fly={{ y: 200 }}
  aria-live="polite"
  bind:this={toast}
  class={"p-3 text-lg w-fit rounded font-medium " + notification.type}
>
  {notification.message}
</div>

<style lang="postcss">
  .success {
    @apply bg-green;
  }
  .warning {
    @apply bg-yellow;
  }
  .failure {
    @apply bg-red;
  }
</style>
