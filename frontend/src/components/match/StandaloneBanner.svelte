<script lang="ts">
  import { link } from "svelte-routing";

  import { mapToBannerSrc } from "../../util/mapToBanner";
  export let match: StandaloneMatch;
  $: bannerURL = mapToBannerSrc(match.map);
</script>

<a
  href={`/matches/${match.datePlayed}`}
  class="w-full bg-cover bg-center bg-no-repeat group"
  style={`background-image: url('${bannerURL}');`}
  use:link
>
  <div
    class="min-w-[300px] w-full flex gap-4 items-end px-8 py-4 transition-all group-hover:backdrop-brightness-75
    from-tertiary-dark via-tertiary-dark/80 to-transparent bg-gradient-to-r"
  >
    <h2 class="text-3xl font-medium tracking-wide">
      {match.map} &nbsp; {match.score.join(":")}
    </h2>
    <p class="text-secondary/70">
      {new Date(match.datePlayed).toDateString()}
    </p>
  </div>
</a>
