<script lang="ts">
  import RoundsWon from "./RoundsWon.svelte";

  export let team;
  export let roundsWon: number;

  $: team.sort((a, b) => b.score - a.score);
</script>

<table class="relative block w-full pl-16 pb-8">
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
          class="text-secondary mr-4 max-w-[128px] px-1 py-0 text-base"
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
    @apply w-full py-1 pr-4 text-left text-sm;
  }

  th {
    @apply font-medium;
  }

  td {
    @apply text-secondary/60;
  }
</style>
