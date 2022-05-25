<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import Construction from "../components/Construction.svelte";
  import { addServerErrorNotification } from "../util/addNotification";

  export let datePlayed: number;
  let match;

  onMount(() => {
    axios
      .get(`/api/match/${datePlayed}`)
      .then((res) => {
        console.log(res.data);
        match = res.data;
      })
      .catch((err) => {
        addServerErrorNotification();
        navigate("/error");
      });
  });
</script>

<svelte:head>
  {#if match}
    <title>{match.map}, {new Date(match.datePlayed).toDateString()} | 10M</title
    >
  {:else}
    <title>Match | 10M</title>
  {/if}
</svelte:head>

<Construction />

<style lang="postcss">
</style>
