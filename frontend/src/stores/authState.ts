import { writable } from "svelte/store";
import axios from "axios";

export const authState = writable<AuthState>({
  isAdmin: false,
  isLoading: true,
});

export const updateAuthState = async () => {
  return axios
    .get("/api/isAdmin")
    .then(() => {
      authState.set({ isAdmin: true, isLoading: false });
      return true;
    })
    .catch(() => {
      authState.set({ isAdmin: false, isLoading: false });
      return false;
    });
};
