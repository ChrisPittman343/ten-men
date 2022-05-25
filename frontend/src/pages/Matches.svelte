<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import BasicMatch from "../components/match/basic/BasicMatch.svelte";
  import StandaloneBanner from "../components/match/StandaloneBanner.svelte";
  import { loadedMatches, selectedMatch } from "../stores/matchesState";
  import { addServerErrorNotification } from "../util/addNotification";

  let matches: StandaloneMatch[] = [];

  onMount(() => {
    axios
      .get("/api/matches")
      .then((res) => {
        matches = res.data;
        selectedMatch.set(matches[0]?.datePlayed);
      })
      .catch((err) => {
        addServerErrorNotification();
        navigate("/error");
      });
  });
</script>

<svelte:head>
  <title>Matches | 10M</title>
</svelte:head>

<div class="flex gap-8">
  <section id="ordered-matches" class="flex w-fit flex-col gap-4">
    <header
      class="border-secondary flex items-center justify-between border-b-2"
    >
      <h1 class="text-2xl font-bold">Matches</h1>
    </header>
    {#each matches as match}
      <StandaloneBanner
        {match}
        on:click={() => selectedMatch.set(match.datePlayed)}
      />
    {:else}
      <h2>No matches found.</h2>
    {/each}
  </section>
  <section id="selected-match" class="w-full max-w-3xl">
    <header
      class="border-secondary mb-4 flex items-center justify-between border-b-2"
    >
      <h1 class="text-2xl font-bold">Selected Match</h1>
    </header>
    {#if $loadedMatches[$selectedMatch]}
      <BasicMatch match={$loadedMatches[$selectedMatch]} />
    {:else}
      <h2 class="text-secondary/25 py-8 text-4xl font-bold">
        Select a match to view its scoreboard.
      </h2>
    {/if}
  </section>
</div>
