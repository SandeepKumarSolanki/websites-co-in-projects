import React from 'react'
import Palette from '../Palette/Palette'
import LayerList from './LayerList'

export default function Sidebar({ add, setDraggingType }){
  return (
    <aside className="w-64 h-full border-r border-subtle bg-white flex flex-col">
      <div className="p-3 border-b"><h2 className="font-semibold">Palette</h2></div>
      <Palette add={add} setDraggingType={setDraggingType} />
      <div className="p-3 border-t"><h2 className="font-semibold">Layers</h2></div>
      <LayerList />
    </aside>
  )
}