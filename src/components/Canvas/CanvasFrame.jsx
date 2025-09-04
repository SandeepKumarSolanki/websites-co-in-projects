import React from 'react'
import useBuilderStore from '../../store/useBuilderStore'

export default function CanvasFrame({ children }){
  const device = useBuilderStore(s=>s.device)
  const width = device==='desktop'? 1100 : device==='tablet'? 800 : 380

  return (
    <div className="flex-1 overflow-auto bg-slate-100">
      <div className="py-6 flex justify-center">
        <div id="canvas-frame" className="relative bg-white border shadow-soft" style={{ width, minHeight: 900, backgroundSize: '8px 8px', backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)'}}>
          {children}
        </div>
      </div>
    </div>
  )
}