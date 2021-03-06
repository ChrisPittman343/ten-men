<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import StandalonePlayer from "../components/players/StandalonePlayer.svelte";
  import BackToTop from "../components/popup/BackToTop.svelte";
  import SortHead from "../components/sort/SortHead.svelte";
  import { addServerErrorNotification } from "../util/addNotification";
  import { getWinrate } from "../util/getWinrate";

  let players: Player[] = [];
  let computedPlayers: Player[] = [];
  let searchBar = "";
  let sortKey = "winrate";
  let dir: SortDirection = "ASC";
  $: directionMultiplier = dir === "ASC" ? 1 : -1;

  onMount(() => {
    axios
      .get("/api/players")
      .then((res) => {
        players = res.data;
      })
      .catch((err) => {
        addServerErrorNotification();
        navigate("/error");
      });
  });

  $: {
    // Search for players
    computedPlayers = players.filter((p) =>
      p.playerName.toLowerCase().includes(searchBar.toLocaleLowerCase())
    );

    // Sort ones that match
    if (sortKey === "playerName")
      computedPlayers.sort(
        (a, b) => a.playerName.localeCompare(b.playerName) * directionMultiplier
      );
    else if (sortKey === "winrate") {
      computedPlayers.sort(
        (a, b) =>
          (getWinrate(b.wins, b.gamesPlayed) -
            getWinrate(a.wins, a.gamesPlayed)) *
          directionMultiplier
      );
    } else
      computedPlayers.sort(
        (a, b) => (b[sortKey] - a[sortKey]) * directionMultiplier
      );
  }
</script>

<svelte:head>
  <title>Players | 10M</title>
</svelte:head>

<div class="max-w-4xl">
  <header
    class="border-secondary mb-8 flex items-center justify-between border-b-2"
  >
    <h1 class="text-2xl font-bold">Players</h1>
    <input
      type="search"
      name=""
      id=""
      bind:value={searchBar}
      placeholder="🔎 Search by name"
      class="bg-secondary/5 m-1 max-w-md border-none py-1 text-lg !shadow-none"
    />
  </header>
  <table class="w-full backdrop-blur-md">
    <tr>
      <SortHead bind:sortKey bind:dir key="playerName">Name</SortHead>
      <SortHead bind:sortKey bind:dir key="winrate">WR</SortHead>
      <th />
      <SortHead bind:sortKey bind:dir key="gamesPlayed">W/L</SortHead>
      <SortHead bind:sortKey bind:dir key="avgKills">K</SortHead>
      <SortHead bind:sortKey bind:dir key="avgAssists">A</SortHead>
      <SortHead bind:sortKey bind:dir key="avgDeaths">D</SortHead>
      <SortHead bind:sortKey bind:dir key="avgHs">HS</SortHead>
      <SortHead bind:sortKey bind:dir key="avgMvp">MVP</SortHead>
      <SortHead bind:sortKey bind:dir key="avgScore">Score</SortHead>
    </tr>

    <!-- Need the key for playerName when sorting, otherwise winrate won't update the list  -->
    {#each computedPlayers as player, i (player.playerName)}
      <StandalonePlayer {player} />
      {#if i !== computedPlayers.length - 1}
        <tr class="border-secondary/5 border px-8" />
      {/if}
    {:else}
      <h2>No players found.</h2>
    {/each}
  </table>
</div>

<BackToTop />
