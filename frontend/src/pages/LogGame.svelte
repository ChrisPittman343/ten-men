<script lang="ts">
  import axios from "axios";
  import PrimaryButton from "../components/buttons/PrimaryButton.svelte";
  import LoggingStep from "../components/match/log/LoggingStep.svelte";
  import NewTeam from "../components/match/NewTeam.svelte";
  import { Icon } from "svelte-awesome";
  import ext from "svelte-awesome/icons/externalLink";
  import infoCircle from "svelte-awesome/icons/infoCircle";
  import TertiaryButton from "../components/buttons/TertiaryButton.svelte";
  import SelectionTooltip from "../components/match/log/SelectionTooltip.svelte";
  import BasicMatchBanner from "../components/match/basic/BasicMatchBanner.svelte";
  import { addNotification } from "../util/addNotification";
  import { navigate } from "svelte-routing";

  let rawData: string;
  let parsedData;
  let showInfo = false;
  let step1Error = "";
  let step2Error = "";

  const verifyData = async () => {
    rawData = await navigator.clipboard.readText();
    axios
      .post("/api/verifyData", { gameData: rawData })
      .then((res) => (parsedData = res.data))
      .then(() => (step1Error = ""))
      .catch((err) => {
        step1Error = err.response.data.message;
      });
  };

  const logGame = async () => {
    axios
      .post("/api/logGame", { gameData: parsedData })
      .then(() => {
        step2Error = "";
        addNotification({ type: "success", message: "Match logged!" });
        navigate("/matches/" + parsedData.datePlayed);
      })
      .catch((err) => {
        step2Error = err.response.data.message;
      });
  };

  /**
   * Returns to step 1, clearing all game data and errors in the process
   */
  const back = () => {
    rawData = null;
    parsedData = null;
    step1Error = "";
    step2Error = "";
  };
</script>

<svelte:head>
  <title>Log Match | 10M</title>
</svelte:head>

<div class="flex max-w-7xl items-center min-h-[80vh] pt-12 m-auto gap-8">
  <div id="instructions" class="max-w-lg w-full">
    <header class="pb-8">
      <h1 class="text-5xl font-bold pb-2">Log Match</h1>
      <p class="text-xl">Add a game to the database</p>
    </header>
    {#if !parsedData}
      <LoggingStep>
        <span slot="number">1</span>
        <span slot="title">Copy & Paste Game Data</span>
        <span slot="body">
          Head over to your
          <a
            href="https://steamcommunity.com/my/gcpd/730/?tab=matchhistoryscrimmage"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            scrimmage history <Icon data={ext} />
          </a>
          and copy the game's data by selecting from the map's image to the bottom
          rightmost score.
          <span
            on:mouseenter={() => (showInfo = true)}
            on:mouseleave={() => (showInfo = false)}
          >
            <Icon data={infoCircle} />
          </span>

          <br /><br />
          Then, use your clipboard's data to proceed to the next step.
        </span>
        <span slot="actions">
          <PrimaryButton on:click={verifyData}>Use Clipboard</PrimaryButton>
        </span>
        <span slot="error">
          {step1Error}
        </span>
      </LoggingStep>
    {:else}
      <LoggingStep>
        <span slot="number">2</span>
        <span slot="title">Assign Players To IGNs</span>
        <span slot="body">
          Write the real name of each player next to their IGN. <br />
          This is necessary to record stats, as usernames change often.
          <br /><br />
          NOTE: The naming convention is: FirstName LastInitial (ex. Brooks B)
        </span>
        <span slot="actions">
          <TertiaryButton on:click={back}>Back</TertiaryButton>
          <span class="mx-6" />
          <PrimaryButton on:click={logGame}>Log Match</PrimaryButton>
        </span>
        <span slot="error">
          {step2Error}
        </span>
      </LoggingStep>
    {/if}
  </div>

  <div id="visuals" class="w-full">
    {#if showInfo}
      <SelectionTooltip />
    {/if}
    {#if parsedData}
      <header class="py-4">
        <h2 class="inline-block text-2xl font-bold pr-8">New Match</h2>
        <span class="text-secondary/50"
          >If the stats don't look right, try redoing step 1
        </span>
      </header>
      <div id="parsed-container" class="backdrop-blur-md">
        <BasicMatchBanner match={parsedData} logged={false} />
        <div class="h-4" />
        {#each parsedData.teams as team, teamIx}
          <NewTeam bind:team roundsWon={parsedData.score[teamIx]} />
        {/each}
      </div>
    {/if}
  </div>
</div>
