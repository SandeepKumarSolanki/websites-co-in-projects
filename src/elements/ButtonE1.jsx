import React from 'react'

export default function ButtonEl({ props, style }){
  const { label, href, radius, variant } = props
  const base = { display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%', textDecoration:'none' }
  const styles = variant==='primary'
    ? { background:'#2563eb', color:'#fff' }
    : { background:'#e5e7eb', color:'#0f172a' }
  return (
    <a href={href} style={{ ...base, ...styles, borderRadius: radius, ...style }}>{label}</a>
  )
}