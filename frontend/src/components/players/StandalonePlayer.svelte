<script lang="ts">
  import { navigate } from "svelte-routing";
  import { getWinrate } from "../../util/getWinrate";

  export let player: Player;
  let wr = getWinrate(player.wins, player.gamesPlayed);
</script>

<tr
  on:click={() => navigate(`/players/${player.playerName}`)}
  class="hover:bg-secondary/5 group cursor-pointer items-center text-sm transition-colors"
>
  <td class="font-medium group-hover:underline">{player.playerName}</td>
  <td class="tiny">{wr * 100}%</td>

  <!-- Bar container needs extra y-padding so it can be centered with text -->
  <td
    class="tiny mr-2 flex h-full w-32 items-center justify-center py-4 xl:w-40 xl:py-5"
  >
    <div class="bg-green bar" style={`width: ${wr * 100}%;`} />
    <div class="bg-secondary bar" />
    <div class="bg-red bar" style={`width: ${(1 - wr) * 100}%;`} />
  </td>
  <td>{player.wins}/{player.gamesPlayed - player.wins}</td>
  <td class="tiny">{player.avgKills} </td>
  <td class="tiny">{player.avgAssists}</td>
  <td class="tiny">{player.avgDeaths}</td>
  <td>{player.avgHs}%</td>
  <td>{player.avgMvp}</td>
  <td>{player.avgScore}</td>
</tr>

<style lang="postcss">
  td {
    @apply text-secondary/60 group-hover:text-secondary pr-6 transition-colors xl:pr-12;
  }

  .tiny {
    @apply px-0;
  }

  .bar {
    @apply h-1;
  }
</style>
