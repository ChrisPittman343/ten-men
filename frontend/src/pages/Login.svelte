<script lang="ts">
  import axios from "axios";
  import { navigate } from "svelte-routing";
  import PrimaryButton from "../components/buttons/PrimaryButton.svelte";
  import TertiaryButton from "../components/buttons/TertiaryButton.svelte";
  import { updateAuthState } from "../stores/authState";
  import { addNotification } from "../util/addNotification";

  let password: string;
  let error = "";

  const onSubmit = async () => {
    await axios
      .post("/api/login", { password })
      .catch((err) => {
        // Teapot (418) = success
        if (err.response && err.response.status === 418) {
          addNotification({ type: "success", message: "Logged in!" });
        } else error = "Incorrect password.";
      })
      .then(updateAuthState)
      .then((wasSuccessfulLogin) => {
        // Wait 1 second before navigating, the browser doesn't like moving
        // too fast, so multiple toasts pop up (1 green 1 red)
        if (wasSuccessfulLogin)
          setTimeout(() => navigate("/admin/tools"), 1000);
      })
      .finally(() => {
        password = "";
      });
  };
</script>

<svelte:head>
  <title>Admin Login | 10M</title>
</svelte:head>

<div class="grid place-content-center min-h-[70vh]">
  <form on:submit|preventDefault={onSubmit} class="max-w-lg">
    <header>
      <h1 class="text-5xl font-medium pb-2">Admin Login</h1>
      <p class="text-lg text-secondary/50">
        Only admins are allowed to perform actions such as adding or removing
        games, and adding profile pictures to users.
      </p>
    </header>

    <label for="password" class="block py-4 my-8 text-lg">
      Password <br />
      <input
        type="password"
        name="password"
        id="password"
        bind:value={password}
        class=" tracking-widest"
        class:error
      />
      <span class="text-xs text-red">{error}</span>
    </label>
    <div class="flex justify-end gap-x-8">
      <TertiaryButton on:click={() => navigate("/")}>Back</TertiaryButton>
      <PrimaryButton type="submit">Submit</PrimaryButton>
    </div>
  </form>
</div>
