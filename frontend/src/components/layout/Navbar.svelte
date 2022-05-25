<script lang="ts">
  import Footer from "./Footer.svelte";
  import { Icon } from "svelte-awesome";
  import game from "svelte-awesome/icons/gamepad";
  import players from "svelte-awesome/icons/group";
  import hammer from "svelte-awesome/icons/gavel";
  import Logo from "./Logo.svelte";
  import NavLink from "./NavLink.svelte";
</script>

<div class="min-w-[208px]" />
<nav class="fixed top-0 left-0 h-full bg-secondary text-tertiary py-4 w-52">
  <div class="flex flex-col m-auto  text-left max-w-6xl h-full gap-4">
    <Logo />
    <hr class="w-2/3 mx-auto opacity-25" />
    <NavLink href="/matches">
      <Icon data={game} scale={1.25} class="mb-1" />
      Matches
    </NavLink>
    <NavLink href="/players">
      <Icon data={players} scale={1.25} class="mb-1" />
      Players</NavLink
    >
    <NavLink href="/admin">
      <Icon data={hammer} scale={1.25} class="mb-1" />
      Admin</NavLink
    >
  </div>

  <Footer />
</nav>
