import { create } from 'zustand'
import { nanoid } from 'nanoid'

const SNAP = 8
const snap = v => Math.round(v / SNAP) * SNAP

const initial = {
  elements: {},
  rootOrder: [],
  selectedId: null,
  device: 'desktop',
  history: { past: [], future: [] },
}

const persistKey = 'wbuilder:v1'

const pushHistory = (state) => {
  const snapshot = JSON.stringify({
    elements: state.elements,
    rootOrder: state.rootOrder,
    selectedId: state.selectedId,
  })
  return {
    history: { past: [...state.history.past, snapshot], future: [] }
  }
}

import { elementRegistry } from '../elements/elementRegistry.js'

const useBuilderStore = create((set, get) => ({
  ...initial,

  addElement: (type, at) => set(state => {
    const id = nanoid()
    const base = elementRegistry[type].defaultProps

    let finalAt = at;
    if (!finalAt) {
      const canvasFrame = document.getElementById('canvas-frame');
      if (canvasFrame) {
        const canvasRect = canvasFrame.getBoundingClientRect();
        const elementWidth = elementRegistry[type].defaultFrame.w || 0;
        const elementHeight = elementRegistry[type].defaultFrame.h || 0;
        finalAt = {
          x: (canvasRect.width / 2) - (elementWidth / 2),
          y: (canvasRect.height / 2) - (elementHeight / 2),
        };
      }
    }

    const node = {
      id,
      type,
      frame: { x: snap(finalAt?.x ?? 40), y: snap(finalAt?.y ?? 40), ...elementRegistry[type].defaultFrame },
      props: base,
      children: [],
    }

    console.log('Adding element:', node); // Added console.log for debugging

    return {
      ...pushHistory(state),
      elements: { ...state.elements, [id]: node },
      rootOrder: [...state.rootOrder, id],
      selectedId: id,
    }
  }),

  updateElement: (id, patch) => set(state => ({
    ...pushHistory(state),
    elements: { ...state.elements, [id]: { ...state.elements[id], ...patch } },
  })),

  updateProps: (id, propsPatch) => set(state => ({
    ...pushHistory(state),
    elements: { ...state.elements, [id]: { ...state.elements[id], props: { ...state.elements[id].props, ...propsPatch } } },
  })),

  moveElement: (id, framePatch) => set(state => {
    const el = state.elements[id]
    const next = {
      ...el.frame,
      ...framePatch,
    }
    next.x = snap(next.x); next.y = snap(next.y); next.w = snap(Math.max(40, next.w)); next.h = snap(Math.max(40, next.h))
    return {
      elements: { ...state.elements, [id]: { ...el, frame: next } },
    }
  }),

  select: (id) => set({ selectedId: id }),
  deselect: () => set({ selectedId: null }),

  remove: (id) => set(state => {
    const { [id]: _, ...rest } = state.elements
    return {
      ...pushHistory(state),
      elements: rest,
      rootOrder: state.rootOrder.filter(x => x !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }
  }),

  duplicate: (id) => set(state => {
    const el = state.elements[id]
    const nid = nanoid()
    return {
      ...pushHistory(state),
      elements: { ...state.elements, [nid]: { ...el, id: nid, frame: { ...el.frame, x: el.frame.x + 16, y: el.frame.y + 16 } } },
      rootOrder: [...state.rootOrder, nid],
      selectedId: nid,
    }
  }),

  bringForward: (id) => set(state => ({
    ...pushHistory(state),
    rootOrder: (() => {
      const idx = state.rootOrder.indexOf(id)
      if (idx < 0 || idx === state.rootOrder.length - 1) return state.rootOrder
      const next = [...state.rootOrder]
      ;[next[idx], next[idx+1]] = [next[idx+1], next[idx]]
      return next
    })(),
  })),

  sendBackward: (id) => set(state => ({
    ...pushHistory(state),
    rootOrder: (() => {
      const idx = state.rootOrder.indexOf(id)
      if (idx <= 0) return state.rootOrder
      const next = [...state.rootOrder]
      ;[next[idx], next[idx-1]] = [next[idx-1], next[idx]]
      return next
    })(),
  })),

  undo: () => set(state => {
    const past = [...state.history.past]
    if (!past.length) return {}
    const snapshot = past.pop()
    const prev = JSON.parse(snapshot)
    return { ...prev, history: { past, future: [JSON.stringify({ elements: state.elements, rootOrder: state.rootOrder, selectedId: state.selectedId }), ...state.history.future ] } }
  }),

  redo: () => set(state => {
    const [next, ...rest] = state.history.future
    if (!next) return {}
    const val = JSON.parse(next)
    return { ...val, history: { past: [...state.history.past, JSON.stringify({ elements: state.elements, rootOrder: state.rootOrder, selectedId: state.selectedId })], future: rest } }
  }),

  setDevice: (device) => set({ device }),

  saveToStorage: () => {
    const s = get()
    const payload = JSON.stringify({ elements: s.elements, rootOrder: s.rootOrder })
    localStorage.setItem(persistKey, payload)
  },
  loadFromStorage: () => set(state => {
    const raw = localStorage.getItem(persistKey)
    if (!raw) return {}
    try {
      const parsed = JSON.parse(raw)
      return { ...state, ...parsed }
    } catch { /* ignore parsing errors */ }
    return {}
  }),
  clearAll: () => set({ ...initial }),
}))

export default useBuilderStore
