import React from 'react'
import { Rnd } from 'react-rnd'
import useBuilderStore from '../../store/useBuilderStore'

export default function ElementWrapper({ id, children }){
  const { el, selectedId, select, moveElement } = useBuilderStore(s=>({ el: s.elements[id], selectedId: s.selectedId, select: s.select, moveElement: s.moveElement }))
  if(!el) return null
  const { x,y,w,h } = el.frame
  const selected = selectedId===id

  return (
    <Rnd size={{ width: w, height: h }} position={{ x, y }} bounds="parent"
      onDragStop={(e, d)=> moveElement(id, { x: d.x, y: d.y })}
      onResizeStop={(e, dir, ref, delta, pos)=> moveElement(id, { w: ref.offsetWidth, h: ref.offsetHeight, x: pos.x, y: pos.y })}
      onClick={(e)=>{ e.stopPropagation(); select(id) }}
      style={{ zIndex: 9999 }}
      className={`absolute ${selected?'ring-2 ring-brand':''}`}
      resizeHandleStyles={{ right: { cursor:'ew-resize' }, bottom: { cursor:'ns-resize' }, bottomRight: { cursor:'nwse-resize' } }}>
      {children}
    </Rnd>
  )
}