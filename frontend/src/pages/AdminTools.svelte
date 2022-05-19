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

<div class="flex flex-col justify-center items-center gap-y-16 min-h-[80vh]">
  <header class="text-center">
    <h1 class="text-7xl font-bold pb-2">Admin Tools</h1>
    <p class="text-secondary/50 backdrop-blur-md">
      Please be an upstanding lad and use your power for good.
      <br />
      Unless it's to mess with Noah, that's cool too.
    </p>
  </header>
  <div class="max-w-4xl flex flex-wrap gap-8 justify-center">
    <a href="/admin/tools/log" use:link class="card bg-primary">
      <header>
        <h2>Log Match</h2>
        <Icon data={game} scale={2} />
      </header>
      <p>Add a match to the database</p>
    </a>

    <a href="/admin/tools/pfps" use:link class="card border-2 border-primary">
      <header>
        <h2>Add PFPs</h2>
        <Icon data={pfp} scale={2} />
      </header>
      <p>Attach profile pictures to players</p>
    </a>

    <a href="/admin/tools/delete" use:link class="card border-2 border-red">
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
    @apply px-6 py-4 w-[325px] transition-all rounded-md backdrop-blur-md;
  }

  .card:hover {
    @apply -translate-y-1 shadow-xl shadow-tertiary-dark;
  }

  .card header {
    @apply flex justify-between gap-4 items-center pb-4;
  }

  .card h2 {
    @apply text-2xl font-medium;
  }

  .card p {
  }
</style>
