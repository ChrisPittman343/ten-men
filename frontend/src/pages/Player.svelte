<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import Construction from "../components/Construction.svelte";

  export let playerName: string;
  let player;

  onMount(() => {
    axios
      .get(`/api/player/${playerName}`)
      .then((res) => {
        player = res.data;
        console.log(res.data);
      })
      .catch(console.log);
  });
</script>

<svelte:head>
  <title>{playerName} | 10M</title>
</svelte:head>
<Construction />

<style lang="postcss">
</style>
