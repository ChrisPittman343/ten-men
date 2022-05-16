<script lang="ts">
  export let shown: boolean;
  export let down: boolean;
</script>

<!-- Opacity 0 removes the contents from the span, but that causes a slight layout shift -->
<span class={shown ? "" : "opacity-[0.0001] pointer-events-none"}>
  {down ? "⬇" : "⬆"}
</span>
