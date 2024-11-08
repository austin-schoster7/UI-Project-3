import { writable } from 'svelte/store';

export const profiles = writable([]);
export const selectedProfileIndex = writable(null);
export const selectedProfile = writable(null);
