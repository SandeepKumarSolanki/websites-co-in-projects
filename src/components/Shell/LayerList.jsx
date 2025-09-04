import React from 'react'
import useBuilderStore from '../../store/useBuilderStore'

export default function LayerList(){
  const { rootOrder, elements, selectedId, select, remove, bringForward, sendBackward } = useBuilderStore(s=>({ rootOrder: s.rootOrder, elements: s.elements, selectedId: s.selectedId, select: s.select, remove: s.remove, bringForward: s.bringForward, sendBackward: s.sendBackward }))

  return (
    <div className="flex-1 overflow-auto">
      {rootOrder.map(id=>{
        const el = elements[id]
        return (
          <div key={id} onClick={()=>select(id)} className={`px-3 py-2 cursor-pointer flex items-center justify-between ${selectedId===id?'bg-blue-50':'hover:bg-slate-50'}`}>
            <span className="text-sm">{el.type} — {id.slice(0,6)}</span>
            <div className="flex gap-1">
              <button onClick={(e)=>{e.stopPropagation(); sendBackward(id)}} className="text-xs px-2 py-1 border rounded">↓</button>
              <button onClick={(e)=>{e.stopPropagation(); bringForward(id)}} className="text-xs px-2 py-1 border rounded">↑</button>
              <button onClick={(e)=>{e.stopPropagation(); remove(id)}} className="text-xs px-2 py-1 border rounded text-red-600">✕</button>
            </div>
          </div>
        )
      })}
    </div>
  )
}