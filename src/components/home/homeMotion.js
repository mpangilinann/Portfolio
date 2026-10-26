import { revealPresets, revealTiming } from "../../utils/revealMotion";

// Compatibility exports preserve Home's exact presets and choreography.
export const homeTiming = revealTiming;
export const homePresets = { ...revealPresets, studio: revealPresets.wave };