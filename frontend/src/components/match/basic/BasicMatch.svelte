<script lang="ts">
  import RoundsWon from "../RoundsWon.svelte";
  import BasicMatchBanner from "./BasicMatchBanner.svelte";
  import BasicRow from "./BasicRow.svelte";

  export let match: OverviewMatch;

  $: teams = [match.players.slice(0, 5), match.players.slice(5)];
</script>

<div class="min-w-[200px] xl:min-w-[700px] backdrop-blur-md">
  <BasicMatchBanner {match} />
  <div class="h-4" />
  <div class="relative">
    {#each teams as team, teamIx}
      <RoundsWon count={team[0].roundsWon} />
      <table class="relative block pl-16 w-full">
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
            <tr class="border px-8 border-secondary/5" />
          {/if}
        {/each}
        <div class="h-4" />
      </table>
    {/each}
  </div>
</div>

<style lang="postcss">
  th {
    @apply font-medium text-left pr-9 py-1 w-full;
  }

  @media screen(xl) {
    th {
      @apply pr-12;
    }
  }
</style>
