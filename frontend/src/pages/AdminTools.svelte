<script lang="ts">
  import { Icon } from "svelte-awesome";
  import game from "svelte-awesome/icons/gamepad";
  import trash from "svelte-awesome/icons/trash";
  import pfp from "svelte-awesome/icons/userCircle";
  import { link } from "svelte-routing";
</script>

<svelte:head>
  <title>Admin Tools | 10M</title>
</svelte:head>

<div class="flex min-h-[80vh] flex-col items-center justify-center gap-y-16">
  <header class="text-center">
    <h1 class="pb-2 text-7xl font-bold">Admin Tools</h1>
    <p class="text-secondary/50 backdrop-blur-md">
      Please be an upstanding lad and use your power for good.
      <br />
      Unless it's to mess with Noah, that's cool too.
    </p>
  </header>
  <div class="flex max-w-4xl flex-wrap justify-center gap-8">
    <a href="/admin/tools/log" use:link class="card bg-primary text-tertiary">
      <header>
        <h2>Log Match</h2>
        <Icon data={game} scale={2} />
      </header>
      <p>Add a match to the database</p>
    </a>

    <a href="/admin/tools/pfps" use:link class="card border-primary border-2">
      <header>
        <h2>Add PFPs</h2>
        <Icon data={pfp} scale={2} />
      </header>
      <p>Attach profile pictures to players</p>
    </a>

    <a href="/admin/tools/delete" use:link class="card border-red border-2">
      <header>
        <h2>Delete Match</h2>
        <Icon data={trash} scale={2} />
      </header>
      <p>Remove a match you went 4/20 in</p>
    </a>
  </div>
</div>

<style lang="postcss">
  .card {
    @apply w-[325px] rounded-md px-6 py-4 backdrop-blur-md transition-all;
  }

  .card:hover {
    @apply -translate-y-1 shadow-lg;
  }

  .card header {
    @apply flex items-center justify-between gap-4 pb-4;
  }

  .card h2 {
    @apply text-2xl font-medium;
  }

  .card p {
  }
</style>
