import React from 'react'

export default function FooterEl({ props, style }){
  const { bg, color = '#f9fafb', padding, text = '© Your Business' } = props
  return (
    <div style={{ ...style, background: bg, color, width: '100%', height: '100%', padding }} className="flex items-center justify-center text-sm">
      {text}
    </div>
  )
}