import React from 'react'
import { useDraggable } from '@dnd-kit/core'

const items = [
  { type: 'text', label: 'Text' },
  { type: 'image', label: 'Image' },
  { type: 'button', label: 'Button' },
  { type: 'section', label: 'Section' },
  { type: 'navbar', label: 'Navbar' },
  { type: 'footer', label: 'Footer' },
]

function DraggableItem({ type, label, add, setDraggingType }){
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: `palette-${type}`, data: { type } })
  return (
    <div ref={setNodeRef} {...listeners} {...attributes}
      className={`m-2 px-3 py-2 border rounded-lg text-sm cursor-grab active:cursor-grabbing ${isDragging?'bg-blue-50':''}`}>{label}</div>
  )
}

export default function Palette({ add, setDraggingType }){
  return (
    <div className="p-2 grid grid-cols-2 gap-2">
      {items.map(i => <DraggableItem key={i.type} type={i.type} label={i.label} add={add} setDraggingType={setDraggingType} />)}
    </div>
  )
}