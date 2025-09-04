import React from 'react'

export default function SectionEl({ props, style }){
  const { bg, padding, layout, gap } = props
  return (
    <div style={{ ...style, background: bg, width: '100%', height: '100%', padding, display: layout==='row' ? 'flex' : 'block', gap }}>
    </div>
  )
}