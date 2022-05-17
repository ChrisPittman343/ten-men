<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import { authState } from "../../stores/authState";
  import { addNotification } from "../../util/addNotification";
  // When going to this route, first check if authed
  // Also, check whenever the auth state updates
  // If not authed, force a login
  onMount(() => {
    const authUnsub = authState.subscribe(checkAuth);

    return () => {
      authUnsub();
    };
  });

  const checkAuth = (authState: AuthState) => {
    if (!authState.isAdmin && !authState.isLoading) {
      addNotification({
        type: "failure",
        message: "Only admins are allowed here!",
      });
      navigate("/login");
    }
  };
</script>

<slot />
