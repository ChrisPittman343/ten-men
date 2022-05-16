<script lang="ts">
  export let count: number;
</script>

<div
  class={`absolute left-0 border-l-[6px] pl-2 text-3xl font-bold ${
    count === 16 ? "border-green" : "border-red"
  }`}
>
  {count}
</div>

<style lang="postcss">
</style>
