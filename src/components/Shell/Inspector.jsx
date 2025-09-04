import React from 'react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useBuilderStore from '../../store/useBuilderStore'

export default function Inspector(){
  const { selectedId, elements, updateProps, remove, duplicate } = useBuilderStore(s=>({ selectedId: s.selectedId, elements: s.elements, updateProps: s.updateProps, remove: s.remove, duplicate: s.duplicate }))
  const el = selectedId? elements[selectedId] : null
  const { register, reset, handleSubmit } = useForm({ values: el?.props })

  const onSubmit = (vals) => { if(el) updateProps(el.id, vals) }

  useEffect(() => {
  if (el) { reset(el.props) }
}, [el, reset])

  return (
    <aside className="w-80 h-full border-l border-subtle bg-white flex flex-col">
      <div className="p-3 border-b flex items-center justify-between">
        <h2 className="font-semibold">Inspector</h2>
        {el && (
          <div className="flex gap-2">
            <button onClick={()=>duplicate(el.id)} className="text-xs px-2 py-1 border rounded">Duplicate</button>
            <button onClick={()=>remove(el.id)} className="text-xs px-2 py-1 border rounded text-red-600">Delete</button>
          </div>
        )}
      </div>

      {!el && <div className="p-4 text-sm text-slate-500">Select an element to edit its properties.</div>}

      {el && (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-3 overflow-auto">
          <div className="text-xs uppercase tracking-wide text-slate-500">Type: {el.type}</div>

          {el.type === 'text' && (
            <>
              <label className="block text-sm">Content<input className="mt-1 w-full border rounded p-2" {...register('content')} /></label>
              <label className="block text-sm">Font size<input type="number" className="mt-1 w-full border rounded p-2" {...register('fontSize', { valueAsNumber: true })} /></label>
              <label className="block text-sm">Color<input type="color" className="mt-1 w-full border rounded p-2 h-10" {...register('color')} /></label>
              <label className="block text-sm">Weight<select className="mt-1 w-full border rounded p-2" {...register('weight')}><option value={400}>Regular</option><option value={500}>Medium</option><option value={700}>Bold</option></select></label>
              <label className="block text-sm">Align<select className="mt-1 w-full border rounded p-2" {...register('align')}><option>left</option><option>center</option><option>right</option></select></label>
            </>
          )}

          {el.type === 'image' && (
            <>
              <label className="block text-sm">Image URL<input className="mt-1 w-full border rounded p-2" {...register('src')} /></label>
              <label className="block text-sm">Alt text<input className="mt-1 w-full border rounded p-2" {...register('alt')} /></label>
              <label className="block text-sm">Radius<input type="number" className="mt-1 w-full border rounded p-2" {...register('radius', { valueAsNumber: true })} /></label>
              <label className="block text-sm">Object fit<select className="mt-1 w-full border rounded p-2" {...register('fit')}><option>cover</option><option>contain</option></select></label>
            </>
          )}

          {el.type === 'button' && (
            <>
              <label className="block text-sm">Label<input className="mt-1 w-full border rounded p-2" {...register('label')} /></label>
              <label className="block text-sm">Link (href)<input className="mt-1 w-full border rounded p-2" {...register('href')} /></label>
              <label className="block text-sm">Radius<input type="number" className="mt-1 w-full border rounded p-2" {...register('radius', { valueAsNumber: true })} /></label>
              <label className="block text-sm">Variant<select className="mt-1 w-full border rounded p-2" {...register('variant')}><option>primary</option><option>secondary</option></select></label>
            </>
          )}

          {el.type === 'section' && (
            <>
              <label className="block text-sm">Background<input type="color" className="mt-1 w-full border rounded p-2 h-10" {...register('bg')} /></label>
              <label className="block text-sm">Padding<input type="number" className="mt-1 w-full border rounded p-2" {...register('padding', { valueAsNumber: true })} /></label>
              <label className="block text-sm">Layout<select className="mt-1 w-full border rounded p-2" {...register('layout')}><option>stack</option><option>row</option></select></label>
              <label className="block text-sm">Gap<input type="number" className="mt-1 w-full border rounded p-2" {...register('gap', { valueAsNumber: true })} /></label>
            </>
          )}

          {['navbar','footer'].includes(el.type) && (
            <>
              <label className="block text-sm">Background<input type="color" className="mt-1 w-full border rounded p-2 h-10" {...register('bg')} /></label>
              <label className="block text-sm">Padding<input type="number" className="mt-1 w-full border rounded p-2" {...register('padding', { valueAsNumber: true })} /></label>
            </>
          )}

          <button className="mt-2 px-3 py-2 border rounded bg-brand text-white">Apply</button>
        </form>
      )}
    </aside>
  )
}