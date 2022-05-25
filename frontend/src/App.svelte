<script lang="ts">
  import { onMount } from "svelte";
  import { Router, Route } from "svelte-routing";
  import AuthRoute from "./components/routes/AuthRoute.svelte";
  import Navbar from "./components/layout/Navbar.svelte";
  import Notifications from "./components/popup/Notifications.svelte";
  import AdminTools from "./pages/AdminTools.svelte";
  import DeleteMatch from "./pages/DeleteMatch.svelte";
  import Error from "./pages/Error.svelte";
  import Home from "./pages/Home.svelte";
  import LogGame from "./pages/LogGame.svelte";
  import Login from "./pages/Login.svelte";
  import Match from "./pages/Match.svelte";
  import Matches from "./pages/Matches.svelte";
  import Pfp from "./pages/PFP.svelte";
  import Player from "./pages/Player.svelte";
  import Players from "./pages/Players.svelte";
  import { updateAuthState } from "./stores/authState";
  import FadeRoute from "./components/routes/FadeRoute.svelte";

  // Repeatedly check auth to tell admins from normies
  onMount(async () => {
    await updateAuthState();
    const interval = setInterval(updateAuthState, 5 * 60 * 1000);

    return () => clearInterval(interval);
  });
</script>

<Router>
  <div class="relative min-h-screen xl:overflow-hidden flex">
    <Navbar />

    <main class="p-8 w-full">
      <Route path="/">
        <FadeRoute><Home /></FadeRoute>
      </Route>
      <Route path="/login">
        <FadeRoute><Login /></FadeRoute>
      </Route>
      <Route path="/matches">
        <FadeRoute><Matches /></FadeRoute>
      </Route>
      <Route path="/players">
        <FadeRoute><Players /></FadeRoute>
      </Route>

      <Route path="/players/:playerName" let:params>
        <FadeRoute><Player playerName={params.playerName} /></FadeRoute>
      </Route>
      <Route path="/matches/:datePlayed" let:params>
        <FadeRoute><Match datePlayed={parseInt(params.datePlayed)} /></FadeRoute
        >
      </Route>

      <!-- AuthRoute must be inside the Route so it can check auth only when the user is
      on an auth page. Otherwise, the component is mounted at the start of the app and
      will check it regardless of where the user is.  -->
      <Route path="/admin">
        <AuthRoute>
          <FadeRoute><AdminTools /></FadeRoute>
        </AuthRoute>
      </Route>
      <Route path="/admin/tools/log">
        <AuthRoute>
          <FadeRoute><LogGame /></FadeRoute>
        </AuthRoute>
      </Route>
      <Route path="/admin/tools/pfps">
        <AuthRoute>
          <FadeRoute><Pfp /></FadeRoute>
        </AuthRoute>
      </Route>
      <Route path="/admin/tools/delete">
        <AuthRoute>
          <FadeRoute><DeleteMatch /></FadeRoute>
        </AuthRoute>
      </Route>

      <Route path="*"><Error /></Route>
    </main>

    <Notifications />
  </div>
</Router>

<style lang="postcss" global>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  body {
    @apply font-red-hat-display bg-tertiary text-secondary relative;
  }

  input {
    @apply outline-none bg-transparent p-2 w-full border-b border-primary mt-1 shadow-primary backdrop-blur-md
            transition-all;
  }

  input:focus {
    @apply shadow-input bg-secondary/5;
  }

  input.error {
    @apply border-red shadow-red;
  }

  #portal {
    @apply pointer-events-none fixed top-0 left-0 z-30 min-h-screen min-w-full;
  }
</style>
