<script lang="ts">
  import axios from "axios";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import Construction from "../components/Construction.svelte";
  import { addServerErrorNotification } from "../util/addNotification";

  export let playerName: string;
  let player;

  onMount(() => {
    axios
      .get(`/api/player/${playerName}`)
      .then((res) => {
        player = res.data;
      })
      .catch((err) => {
        addServerErrorNotification();
        navigate("/error");
      });
  });
</script>

<svelte:head>
  <title>{playerName} | 10M</title>
</svelte:head>
<Construction />

<style lang="postcss">
</style>
