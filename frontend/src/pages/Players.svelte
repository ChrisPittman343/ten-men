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
  let sortKey = "playerName";
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

<div class="max-w-5xl m-auto">
  <header class="flex justify-between py-8 pb-12">
    <h1 class="font-bold text-5xl">Players</h1>
    <input
      type="search"
      name=""
      id=""
      bind:value={searchBar}
      placeholder="🔎 Search by name"
      class="text-xl max-w-md accent-primary"
    />
  </header>
  <table class="backdrop-blur-md w-full">
    <tr>
      <SortHead bind:sortKey bind:dir key="playerName">Name</SortHead>
      <SortHead bind:sortKey bind:dir key="winrate">Winrate</SortHead>
      <th />
      <SortHead bind:sortKey bind:dir key="gamesPlayed">W/L</SortHead>
      <SortHead bind:sortKey bind:dir key="avgKills">K</SortHead>
      <SortHead bind:sortKey bind:dir key="avgAssists">A</SortHead>
      <SortHead bind:sortKey bind:dir key="avgDeaths">D</SortHead>
      <SortHead bind:sortKey bind:dir key="avgHs">Headshots</SortHead>
      <SortHead bind:sortKey bind:dir key="avgScore">Score</SortHead>
      <SortHead bind:sortKey bind:dir key="avgMvp">MVP</SortHead>
    </tr>

    <!-- Need the key for playerName when sorting, otherwise winrate won't update the list  -->
    {#each computedPlayers as player, i (player.playerName)}
      <StandalonePlayer {player} />
      {#if i !== computedPlayers.length - 1}
        <tr class="border px-8 border-secondary/5" />
      {/if}
    {:else}
      <h2>No players found.</h2>
    {/each}
  </table>
</div>

<BackToTop />
