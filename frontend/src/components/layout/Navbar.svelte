<script lang="ts">
  import { navigate } from "svelte-routing";
  import SecondaryButton from "../buttons/SecondaryButton.svelte";
  import Logo from "./Logo.svelte";
  import NavLink from "./NavLink.svelte";
</script>

<nav>
  <div class="flex items-center m-auto justify-between py-2 px-8 max-w-6xl">
    <div class="flex items-center gap-x-4">
      <Logo />
      <div />
      <NavLink href="/about">About</NavLink>
      <NavLink href="/matches">Matches</NavLink>
      <NavLink href="/players">Players</NavLink>
    </div>
    <SecondaryButton
      on:click={() => {
        navigate("/admin/tools");
      }}>Admin Tools</SecondaryButton
    >
  </div>
</nav>

<style lang="postcss">
</style>
