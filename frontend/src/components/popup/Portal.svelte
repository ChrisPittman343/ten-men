<script lang="ts">
  import { onMount } from "svelte";

  let portalContent: Node;

  onMount(() => {
    let portalTarget: HTMLElement = document.getElementById("portal");

    if (!portalTarget) {
      portalTarget = document.createElement("div");
      portalTarget.id = "portal";
      portalContent.parentElement.removeChild(portalContent);
      portalTarget.appendChild(portalContent);
      document.body.appendChild(portalTarget);
    } else {
      portalTarget.appendChild(portalContent);
    }
  });
</script>

<div bind:this={portalContent}>
  <slot />
</div>
