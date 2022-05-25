<script lang="ts">
  import RoundsWon from "../RoundsWon.svelte";
  import BasicMatchBanner from "./BasicMatchBanner.svelte";
  import BasicRow from "./BasicRow.svelte";

  export let match: any;

  $: teams = [match.players.slice(0, 5), match.players.slice(5)];
</script>

<div class="backdrop-blur-md">
  <BasicMatchBanner {match} />
  <div class="h-4" />
  <div class="relative">
    {#each teams as team, teamIx}
      <RoundsWon count={team[0].roundsWon} />
      <table class="relative block w-full pl-16">
        <tr>
          <th>Name</th>
          <th>K</th>
          <th>A</th>
          <th>D</th>
          <th>HS</th>
          <th>MVP</th>
          <th>Score</th>
        </tr>
        {#each team as player, ix}
          <BasicRow {player} />
          {#if ix != 4}
            <tr class="border-secondary/5 border px-8" />
          {/if}
        {/each}
        <div class="h-4" />
      </table>
    {/each}
  </div>
</div>

<style lang="postcss">
  th {
    @apply w-full py-1 pr-7 text-left font-medium;
  }

  @media screen(xl) {
    th {
      @apply pr-12;
    }
  }
</style>
