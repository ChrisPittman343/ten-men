<script lang="ts">
  import SortArrow from "./SortArrow.svelte";

  export let sortKey: string;
  export let key: string;
  export let dir: SortDirection;

  const sortByKey = () => {
    if (sortKey === key) {
      dir = dir === "DESC" ? "ASC" : "DESC";
    } else {
      sortKey = key;
      dir = "ASC";
    }
  };
</script>

<th
  on:click={sortByKey}
  class="cursor-pointer hover:underline text-left pr-6 pb-2 select-none"
>
  <slot />
  <SortArrow shown={sortKey === key} down={dir === "DESC"} />
</th>

<style lang="postcss">
</style>
