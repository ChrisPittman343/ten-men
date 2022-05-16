<script lang="ts">
  import { notifications } from "../../stores/notificationState";
  import Portal from "./Portal.svelte";
  import Toast from "./Toast.svelte";
</script>

<Portal>
  <div
    class="absolute bottom-4 right-1/2 z-40 flex items-center lg:items-end translate-x-1/2 flex-col gap-2 lg:right-4 lg:translate-x-0"
  >
    {#each $notifications as notification (notification)}
      <Toast {notification} />
    {/each}
  </div>
</Portal>
