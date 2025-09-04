import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import useBuilderStore from '../../store/useBuilderStore'
import CanvasFrame from './CanvasFrame'
import ElementWrapper from './ElementWrapper'
import { ElementRenderer } from '../../elements/ElementRenderer.jsx'
import Guides from './Guides'

export default function Canvas(){
  const { elements, rootOrder, deselect } = useBuilderStore(s=>({ elements: s.elements, rootOrder: s.rootOrder, deselect: s.deselect }))
  const { setNodeRef } = useDroppable({ id: 'canvas-dropzone' })

  return (
    <CanvasFrame>
      <div ref={setNodeRef} id="canvas-dropzone" className="absolute inset-0" onClick={deselect} />
      {rootOrder.map(id => (
        <ElementWrapper key={id} id={id}>
          <ElementRenderer id={id} el={elements[id]} />
        </ElementWrapper>
      ))}
      <Guides />
    </CanvasFrame>
  )
}