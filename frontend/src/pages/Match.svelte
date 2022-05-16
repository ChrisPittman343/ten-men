<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import Construction from "../components/Construction.svelte";

  export let datePlayed: number;
  let match;

  onMount(() => {
    axios
      .get(`/api/match/${datePlayed}`)
      .then((res) => {
        match = res.data;
        console.log(res.data);
      })
      .catch(console.log);
  });
</script>

<svelte:head>
  <!-- todo: fix this, just a placeholder -->
  <title>Match | 10M</title>
</svelte:head>

<Construction />

<style lang="postcss">
</style>
