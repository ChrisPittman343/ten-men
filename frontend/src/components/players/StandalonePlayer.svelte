<script lang="ts">
  import { navigate } from "svelte-routing";
  import { getWinrate } from "../../util/getWinrate";

  export let player: Player;
  let wr = getWinrate(player.wins, player.gamesPlayed);
</script>

<tr
  on:click={() => navigate(`/players/${player.playerName}`)}
  class="items-center cursor-pointer group hover:bg-tertiary-dark transition-colors"
>
  <td class="group-hover:underline font-medium">{player.playerName}</td>
  <td class="tiny">{wr * 100}%</td>

  <!-- Bar container needs extra y-padding so it can be centered with text -->
  <td class="flex justify-center items-center w-40 h-full py-6 tiny">
    <div class="bg-green bar" style={`width: ${wr * 100}%;`} />
    <div class="bg-secondary bar" />
    <div class="bg-red bar" style={`width: ${(1 - wr) * 100}%;`} />
  </td>
  <td>{player.wins}/{player.gamesPlayed - player.wins}</td>
  <td class="tiny">{player.avgKills} </td>
  <td class="tiny">{player.avgAssists}</td>
  <td class="tiny">{player.avgDeaths}</td>
  <td>{player.avgHs}%</td>
  <td>{player.avgScore}</td>
  <td>{player.avgMvp}</td>
</tr>

<style lang="postcss">
  td {
    @apply pr-12 text-secondary/70 transition-colors group-hover:text-secondary;
  }

  .tiny {
    @apply px-0;
  }

  .bar {
    @apply h-1;
  }
</style>
