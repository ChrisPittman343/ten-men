<script lang="ts">
  import { link, navigate } from "svelte-routing";

  export let player: OverviewPlayer;
</script>

<tr
  on:click={() => navigate(`/players/${player.playerName}`)}
  class="w-full text-left hover:bg-tertiary-dark text-secondary/60 hover:text-secondary transition-colors cursor-pointer group"
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
    @apply text-sm py-1.5;
  }

  @media screen(xl) {
    td {
      @apply py-1.5 text-sm;
    }
  }
</style>
