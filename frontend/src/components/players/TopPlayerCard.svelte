<script lang="ts">
  import { link } from "svelte-routing";
  import { getWinrate } from "../../util/getWinrate";

  export let index: number;
  export let player: Player;
  let wr = getWinrate(player.wins, player.gamesPlayed);
</script>

<a
  href={`/players/${player.playerName}`}
  use:link
  class="border-2 border-primary px-4 py-1.5 transition-colors hover:bg-primary rounded-md backdrop-blur-sm text-xs"
>
  <div class="flex justify-between items-center gap-2 pb-2">
    <span class="font-medium text-sm xl:text-base whitespace-nowrap">
      {index + 1}. <span class=""> {player.playerName}</span>
    </span>

    <div class="flex items-center w-32 xl:w-40 h-1">
      <span class="pr-2 text-secondary/50">
        {wr * 100}%&nbsp;WR
      </span>
      <div class="bg-green h-full" style={`width: ${wr * 100}%;`} />
      <div class="bg-secondary h-full" />
      <div class="bg-red h-full" style={`width: ${(1 - wr) * 100}%;`} />
    </div>
  </div>
  <table>
    <tr>
      <th>Score</th>
      <th>W/L</th>
      <th class="bigger">K/A/D</th>
      <th>HS</th>
      <th>MVP</th>
    </tr>
    <tr>
      <td>{player.avgScore}</td>
      <td>{player.wins}/{player.gamesPlayed - player.wins}</td>
      <td class="bigger">
        {player.avgKills}/{player.avgAssists}/{player.avgDeaths}
      </td>
      <td>{player.avgHs}%</td>
      <td>{player.avgMvp}</td>
    </tr>
  </table>
</a>

<style lang="postcss">
  th,
  td {
    min-width: 44px;
    font-size: 10px;
    @apply text-left p-0;
  }

  .bigger {
    min-width: 62px;
  }

  th {
    @apply font-normal pb-1;
  }

  td {
    @apply text-secondary/50;
  }

  @media screen(xl) {
    th,
    td {
      min-width: 54px;
      @apply text-xs;
    }

    .bigger {
      min-width: 72px;
    }
  }
</style>
