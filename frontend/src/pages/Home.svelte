<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import BasicMatch from "../components/match/basic/BasicMatch.svelte";
  import TopPlayerCard from "../components/players/TopPlayerCard.svelte";

  let overviewData: OverviewData;

  onMount(() => {
    axios
      .get("/api/recent")
      .then((res) => {
        overviewData = res.data;
      })
      .catch((err) => {
        navigate("/error");
      });
  });
</script>

<svelte:head>
  <title>Home | 10M</title>
</svelte:head>

{#if overviewData}
  <div class="flex justify-center max-w-7xl m-auto py-12">
    <div id="top-players" class="flex flex-col justify-between gap-y-8 h-min">
      <header>
        <h1 class="text-3xl font-bold">Top Overall Players</h1>
      </header>
      {#each overviewData.topPlayers as player, index}
        <TopPlayerCard {player} {index} />
      {/each}
    </div>
    <div class="w-0.5 m-12" />
    <div id="recent-match" class="">
      <header class="pb-8">
        <h1 class="text-3xl font-bold">Most Recent Match</h1>
      </header>
      <BasicMatch match={overviewData.recentMatch} />
    </div>
  </div>
{/if}
