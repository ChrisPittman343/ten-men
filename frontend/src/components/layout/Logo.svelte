<script lang="ts">
  import { Link } from "svelte-routing";
</script>

<Link to="/" class="relative text-2xl font-bold tracking-[0.3em] group">
  <span class="drop-shadow-tight "> 10M </span>
  <div
    class="w-16 h-2 -rotate-2 absolute bottom-1 right-0.5 -z-10 bg-primary "
  />
</Link>
