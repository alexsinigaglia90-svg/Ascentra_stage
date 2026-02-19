import { Creation } from "./types";

const KEY = "mrhutch_creations_v1";

export function saveCreation(creation: Creation) {
  if (typeof window === "undefined") return;
  const current = getCreations();
  localStorage.setItem(KEY, JSON.stringify([creation, ...current]));
}

export function getCreations(): Creation[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Creation[]) : [];
}
