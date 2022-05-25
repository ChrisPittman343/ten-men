<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import StandaloneBanner from "../components/match/StandaloneBanner.svelte";
  import {
    addNotification,
    addServerErrorNotification,
  } from "../util/addNotification";

  let matches: StandaloneMatch[] = [];

  onMount(() => {
    axios
      .get("/api/matches")
      .then((res) => {
        matches = res.data;
      })
      .catch((err) => {
        addServerErrorNotification();
        navigate("/error");
      });
  });

  const deleteMatch = (match: StandaloneMatch) => {
    axios
      .get(`/api/deleteGame/${match.datePlayed}`)
      .then((res) => {
        addNotification({ type: "success", message: "Match deleted!" });
        navigate("/matches");
      })
      .catch((err) => {
        addServerErrorNotification();
        navigate("/error");
      });
  };
</script>

<svelte:head>
  <title>Delete Match | 10M</title>
</svelte:head>

<section id="ordered-matches" class="flex w-fit flex-col gap-4">
  <header class="border-secondary flex items-center justify-between border-b-2">
    <h1 class="text-2xl font-bold">Matches</h1>
  </header>
  {#each matches as match}
    <StandaloneBanner {match} on:click={() => deleteMatch(match)} />
  {:else}
    <h2>No matches found.</h2>
  {/each}
</section>
