import { writable } from "svelte/store";

export let notifications = writable<ToastNotification[]>([]);
