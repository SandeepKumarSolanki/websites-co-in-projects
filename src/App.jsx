import React from 'react'
import { useEffect, useState } from 'react'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import Topbar from './components/Shell/Topbar'
import Sidebar from './components/Shell/Sidebar'
import Inspector from './components/Shell/Inspector'
import Canvas from './components/Canvas/Canvas'
import useBuilderStore from './store/useBuilderStore'

export default function App() {
  const load = useBuilderStore(s => s.loadFromStorage)
  const add = useBuilderStore(s=>s.addElement)
  const [draggingType, setDraggingType] = useState(null)

  useEffect(() => { load() }, [load])

  // Global keyboard shortcuts and utilities
  useEffect(() => {
    const onKey = (e) => {
      const s = useBuilderStore.getState()
      const id = s.selectedId

      // Undo / Redo
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault()
        return e.shiftKey ? s.redo() : s.undo()
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault(); return s.redo()
      }

      // Duplicate
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'd') {
        if (id) { e.preventDefault(); s.duplicate(id) }
        return
      }

      // Delete selected
      if ((e.key === 'Delete' || e.key === 'Backspace') && id) {
        e.preventDefault(); s.remove(id); return
      }

      // Arrow nudge (Shift for 8px)
      if (id && ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
        const n = e.shiftKey ? 8 : 1
        const el = s.elements[id]
        const dx = e.key==='ArrowLeft' ? -n : e.key==='ArrowRight' ? n : 0
        const dy = e.key==='ArrowUp' ? -n : e.key==='ArrowDown' ? n : 0
        s.moveElement(id, { x: el.frame.x + dx, y: el.frame.y + dy, w: el.frame.w, h: el.frame.h })
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <DndContext
      onDragStart={(e) => setDraggingType(e.active.data.current?.type)}
      onDragEnd={(e)=>{
        console.log('onDragEnd - e.delta:', e.delta, 'e.over?.id:', e.over?.id, 'draggingType:', draggingType);
        if(e.delta.x === 0 && e.delta.y === 0) { // It's a click
          add(e.active.data.current?.type, null);
        } else if(e.over?.id === 'canvas-dropzone' && draggingType){
          const r = document.getElementById('canvas-frame')?.getBoundingClientRect()
          const at = { x: (e.activatorEvent?.clientX ?? 0) - (r?.left ?? 0), y: (e.activatorEvent?.clientY ?? 0) - (r?.top ?? 0) }
          add(draggingType, at)
        }
        setDraggingType(null)
      }}>
      <div className="h-full flex bg-canvas text-ink min-h-screen">
        <Sidebar add={add} setDraggingType={setDraggingType} />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <Canvas />
        </div>
        <Inspector />
      </div>
      <DragOverlay>{draggingType && <div className="px-3 py-2 border rounded bg-white shadow-soft">{draggingType}</div>}</DragOverlay>
    </DndContext>
  )
}