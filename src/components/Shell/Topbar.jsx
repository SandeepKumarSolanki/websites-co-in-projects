import React from 'react'
import useBuilderStore from '../../store/useBuilderStore'
import { exportHtml } from '../../utils/exportHtml'

export default function Topbar(){
  const { undo, redo, device, setDevice, elements, rootOrder, saveToStorage, clearAll } = useBuilderStore(s=>({ undo: s.undo, redo: s.redo, device: s.device, setDevice: s.setDevice, elements: s.elements, rootOrder: s.rootOrder, saveToStorage: s.saveToStorage, clearAll: s.clearAll }))

  const onExport = () => {
    const { html, css } = exportHtml(elements, rootOrder)
    const blob = new Blob([`<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'>
<style>${css}</style></head><body>${html}</body></html>`], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'site.html'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div className="h-14 px-4 border-b border-subtle flex items-center gap-3 bg-white shadow-soft">
      <span className="font-semibold">Website Builder</span>
      <div className="ml-auto flex items-center gap-2">
        <button onClick={undo} className="px-3 py-1.5 rounded-lg border hover:bg-subtle">Undo</button>
        <button onClick={redo} className="px-3 py-1.5 rounded-lg border hover:bg-subtle">Redo</button>
        <div className="mx-2"/>
        {['desktop','tablet','mobile'].map(d=> (
          <button key={d} onClick={()=>setDevice(d)} className={`px-3 py-1.5 rounded-lg border ${device===d?'bg-brand text-white':'hover:bg-subtle'}`}>{d}</button>
        ))}
        <div className="mx-2"/>
        <button onClick={saveToStorage} className="px-3 py-1.5 rounded-lg border hover:bg-subtle">Save</button>
        <button onClick={onExport} className="px-3 py-1.5 rounded-lg border hover:bg-subtle">Export HTML</button>
        <button onClick={clearAll} className="px-3 py-1.5 rounded-lg border hover:bg-red-50 text-red-600">Clear</button>
      </div>
    </div>
  )
}