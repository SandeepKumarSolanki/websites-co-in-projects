import React from 'react'

export default function NavbarEl({ props, style }){
  const { bg, padding, items = ['Home','About','Contact'] } = props
  return (
    <div style={{ ...style, background: bg, width: '100%', height: '100%', padding }} className="flex items-center gap-6">
      {items.map((it,i)=> <a key={i} href="#" className="text-sm hover:underline">{it}</a>)}
    </div>
  )
}