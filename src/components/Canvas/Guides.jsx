import React from 'react'
import useBuilderStore from '../../store/useBuilderStore'

const THRESH = 6

export default function Guides(){
  const { elements, rootOrder, selectedId } = useBuilderStore(s=>({ elements: s.elements, rootOrder: s.rootOrder, selectedId: s.selectedId }))
  const sel = selectedId ? elements[selectedId] : null
  if(!sel) return null

  const se = edges(sel)
  const lines = []

  rootOrder.forEach(id => {
    if(id === selectedId) return
    const e = edges(elements[id])
    ;[e.l, e.cx, e.r].forEach(x => {
      if(isNear(se.l, x)) lines.push({ type:'v', x })
      if(isNear(se.cx, x)) lines.push({ type:'v', x })
      if(isNear(se.r, x)) lines.push({ type:'v', x })
    })
    ;[e.t, e.cy, e.b].forEach(y => {
      if(isNear(se.t, y)) lines.push({ type:'h', y })
      if(isNear(se.cy, y)) lines.push({ type:'h', y })
      if(isNear(se.b, y)) lines.push({ type:'h', y })
    })
  })

  const uniq = []
  lines.forEach(l => {
    if(!uniq.some(u => u.type===l.type && Math.abs((u.x??u.y) - (l.x??l.y)) < 1)) uniq.push(l)
  })

  return (
    <div className="pointer-events-none absolute inset-0">
      {uniq.map((l,i) => l.type==='v'
        ? <div key={i} className="absolute w-px h-full bg-brand/60" style={{ left: l.x }} />
        : <div key={i} className="absolute h-px w-full bg-brand/60" style={{ top: l.y }} />
      )}
    </div>
  )
}

function edges(el){
  const { x,y,w,h } = el.frame
  return { l:x, r:x+w, t:y, b:y+h, cx:x+w/2, cy:y+h/2 }
}
function isNear(a,b){ return Math.abs(a-b) <= THRESH }