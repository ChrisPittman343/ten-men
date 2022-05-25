<script lang="ts">
  import { mapToBannerSrc } from "../../../util/mapToBanner";

  export let match: OverviewMatch;
  $: bannerURL = mapToBannerSrc(match.map);
</script>

<div
  class="text-tertiary w-full bg-cover bg-center bg-no-repeat"
  style={`background-image: url('${bannerURL}');`}
>
  <div
    class="from-secondary via-secondary/80 w-full min-w-[300px] bg-gradient-to-r to-transparent px-6 py-2 text-xs xl:text-sm"
  >
    <h1 class="pb-1 text-xl font-medium xl:text-2xl">
      {match.map}
    </h1>
    <h2 class="text-tertiary/50 ">
      {new Date(match.datePlayed).toDateString() +
        ", " +
        new Date(match.datePlayed).toLocaleTimeString()}
    </h2>
  </div>
</div>
