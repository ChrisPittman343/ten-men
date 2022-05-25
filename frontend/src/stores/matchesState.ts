import axios from "axios";
import { get, writable } from "svelte/store";
import { addServerErrorNotification } from "../util/addNotification";
import { navigate } from "svelte-routing";

export const selectedMatch = writable<number>();
export const loadedMatches = writable<Record<number, StandaloneMatch>>({});

/**
 * Fetch the selected match whenever the user chooses a new match.
 * Only fetches if not previously fetched.
 */
selectedMatch.subscribe(async (id) => {
  const matches = get(loadedMatches);
  if (!id || matches[id]) return;

  axios
    .get(`/api/match/${id}`)
    .then((res) => {
      loadedMatches.update((val) => {
        val[id] = res.data;
        return val;
      });
    })
    .catch((err) => {
      addServerErrorNotification();
      navigate("/error");
    });
});
