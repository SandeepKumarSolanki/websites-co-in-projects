export const SNAP = 8
export const snap = (v) => Math.round(v / SNAP) * SNAP
export const clamp = (v, min, max) => Math.max(min, Math.min(max, v))
