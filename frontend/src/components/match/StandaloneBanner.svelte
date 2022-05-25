<script lang="ts">
  import { selectedMatch } from "../../stores/matchesState";
  import { mapToIconSrc } from "../../util/mapToBanner";

  export let match: StandaloneMatch;

  $: iconSrc = mapToIconSrc(match.map);
</script>

<button
  aria-label="Show scoreboard for match"
  class="hover:bg-secondary/10 w-50  flex flex-col gap-1 border-2 border-transparent
  px-2 py-1 text-left transition-colors"
  class:active={match.datePlayed === $selectedMatch}
  on:click
>
  <div class="flex h-full items-center gap-4">
    <img src={iconSrc} alt="" class="aspect-square w-12" />
    <div class="text-4xl font-medium">
      {match.score.join(" : ")}
    </div>
  </div>
  <div class="flex h-full gap-3 pl-2 text-xs opacity-60">
    <span>{match.map}</span>
    <span> • </span>
    <span>
      {new Date(match.datePlayed).toDateString()}
    </span>
  </div>
</button>

<style lang="postcss">
  .active {
    @apply bg-primary text-tertiary;
  }
</style>
