import React from 'react'

export default function ImageEl({ props, style }){
  const { src, alt, radius, fit } = props
  return (
    <img src={src} alt={alt} style={{ ...style, width:'100%', height:'100%', objectFit: fit, borderRadius: radius }} />
  )
}