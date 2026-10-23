import { useSyncExternalStore } from "react";

const query = "(hover: hover) and (pointer: fine)";
const subscribe = callback => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
export default function useFinePointer() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
