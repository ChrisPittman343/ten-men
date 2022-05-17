<script lang="ts">
  import { fade } from "svelte/transition";
</script>

<div transition:fade={{ duration: 150 }} class="bg-tertiary-dark p-8">
  <h3 class="font-bold">
    Select from the map image to the bottom rightmost score, like so:
  </h3>
  <br />
  <img src="/images/sample_selected.png" alt="" loading="lazy" />
</div>
