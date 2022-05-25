<script lang="ts">
  import { link, navigate } from "svelte-routing";

  export let player: OverviewPlayer;
</script>

<tr
  on:click={() => navigate(`/players/${player.playerName}`)}
  class="hover:bg-secondary/5 text-secondary/70 hover:text-secondary group w-full cursor-pointer text-left transition-colors"
>
  <td>
    <a
      class="group-hover:underline"
      href={`/players/${player.playerName}`}
      use:link
    >
      {player.playerName}
    </a>
  </td>
  <td>{player.kills}</td>
  <td>{player.assists}</td>
  <td>{player.deaths}</td>
  <td>{player.hs}%</td>
  <td>{player.mvp}</td>
  <td>{player.score}</td>
</tr>

<style lang="postcss">
  td {
    @apply py-1.5 text-sm;
  }

  @media screen(xl) {
    td {
      @apply py-1.5 text-sm;
    }
  }
</style>
