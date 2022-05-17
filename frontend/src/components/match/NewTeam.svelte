<script lang="ts">
  import RoundsWon from "./RoundsWon.svelte";

  export let team;
  export let roundsWon: number;

  $: team.sort((a, b) => b.score - a.score);
</script>

<table class="relative block pl-16 w-full pb-8">
  <RoundsWon count={roundsWon} />
  <tr>
    <th>Name</th>
    <th>K</th>
    <th>A</th>
    <th>D</th>
    <th>HS</th>
    <th>MVP</th>
    <th>Score</th>
  </tr>
  {#each team as member, memberIx}
    <tr>
      <td class="focus-within:text-secondary transition-colors">
        <!-- Ridiculous 2-way binding, I love this framework -->
        <input
          type="text"
          aria-label={"Real name for " + team[memberIx].username}
          bind:value={team[memberIx].playerName}
          class="text-base px-1 py-0.5 max-w-[128px] mr-4 text-secondary"
        />
        {member.username}
      </td>
      <td>{member.kills} </td>
      <td>{member.assists} </td>
      <td>{member.deaths} </td>
      <td>{member.mvp} </td>
      <td>{member.hs} </td>
      <td>{member.score} </td>
    </tr>
  {/each}
</table>

<style lang="postcss">
  td,
  th {
    @apply text-left pr-4 py-1 w-full text-sm;
  }

  th {
    @apply font-medium;
  }

  td {
    @apply text-secondary/60;
  }
</style>
