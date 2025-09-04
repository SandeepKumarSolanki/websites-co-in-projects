import React from 'react'

export default function TextEl({ props, style }){
  const { content, fontSize, color, weight, align } = props
  return (
    <div style={{ ...style, width: '100%', height: '100%', display:'flex', alignItems:'center', justifyContent: align==='left'?'flex-start':align==='center'?'center':'flex-end', padding: 8 }}>
      <div style={{ fontSize, color, fontWeight: weight }}>{content}</div>
    </div>
  )
}