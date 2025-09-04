import React from 'react'

export default function FieldGroup({ label, children }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-slate-500 font-medium">{label}</div>
      <div>{children}</div>
    </div>
  )
}