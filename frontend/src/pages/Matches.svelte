<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import StandaloneBanner from "../components/match/StandaloneBanner.svelte";
  import BackToTop from "../components/popup/BackToTop.svelte";

  let matches: StandaloneMatch[] = [];

  onMount(() => {
    axios
      .get("/api/matches")
      .then((res) => {
        matches = res.data;
      })
      .catch(console.log);
  });
</script>

<svelte:head>
  <title>Matches | 10M</title>
</svelte:head>

<div class="max-w-3xl flex flex-col m-auto gap-4">
  <header class="flex justify-between py-4 items-center">
    <h1 class="font-bold text-5xl">Matches</h1>
    <!-- <p>Present - May 9, 2022</p> -->
  </header>
  {#each matches as match}
    <StandaloneBanner {match} />
  {:else}
    <!-- <h2>No matches found in the selected time range.</h2> -->
  {/each}
</div>
<BackToTop />

<style lang="postcss">
</style>
