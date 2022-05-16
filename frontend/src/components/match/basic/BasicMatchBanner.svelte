<script lang="ts">
  import { link } from "svelte-routing";
  import { mapToBannerSrc } from "../../../util/mapToBanner";

  export let match: OverviewMatch;
  export let logged = true;
  $: bannerURL = mapToBannerSrc(match.map);
</script>

<div
  class="w-full bg-cover bg-center bg-no-repeat"
  style={`background-image: url('${bannerURL}');`}
>
  <div
    class="min-w-[300px] w-full px-6 py-2 from-tertiary-dark via-tertiary-dark/80 to-transparent bg-gradient-to-r"
  >
    <h1 class="text-3xl font-medium pb-1">
      {match.map}
    </h1>
    <h2 class="text-secondary/60 text-sm">
      {new Date(match.datePlayed).toDateString() +
        ", " +
        new Date(match.datePlayed).toLocaleTimeString()}
    </h2>
    {#if logged}
      <a
        href={`/matches/${match.datePlayed}`}
        class="text-secondary/60 underline text-sm"
        use:link>Advanced details</a
      >
    {/if}
  </div>
</div>
