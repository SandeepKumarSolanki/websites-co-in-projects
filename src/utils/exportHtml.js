export function exportHtml(elements, order) {
  const css = `*{box-sizing:border-box} body{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;margin:0;}`;
  
  const html = order.map(id => {
    const el = elements[id];
    if (!el) return '';
    const style = `position:absolute;left:${el.frame.x}px;top:${el.frame.y}px;width:${el.frame.w}px;height:${el.frame.h}px;`;

    switch (el.type) {
      case 'text':
        return `<div style="${style}"><div style="font-size:${el.props.fontSize}px;color:${el.props.color};font-weight:${el.props.weight};text-align:${el.props.align};width:100%;height:100%;display:flex;align-items:center;justify-content:${el.props.align}">${el.props.content}</div></div>`;
      case 'image':
        return `<img src="${el.props.src}" alt="${el.props.alt}" style="${style}border-radius:${el.props.radius}px;object-fit:${el.props.fit}" />`;
      case 'button':
        const btnColor = el.props.variant === 'primary'
          ? 'background:#2563eb;color:#fff;'
          : 'background:#e5e7eb;color:#0f172a;';
        return `<a href="${el.props.href}" style="${style}display:flex;align-items:center;justify-content:center;border-radius:${el.props.radius}px;${btnColor}">${el.props.label}</a>`;
      case 'section':
        return `<div style="${style}background:${el.props.bg};padding:${el.props.padding}px;display:${el.props.layout === 'row' ? 'flex' : 'block'};gap:${el.props.gap}px"></div>`;
      case 'navbar':
        return `<div style="${style}background:${el.props.bg};padding:${el.props.padding}px;display:flex;gap:16px"><a href="#">Home</a><a href="#">About</a><a href="#">Contact</a></div>`;
      case 'footer':
        return `<div style="${style}background:${el.props.bg};padding:${el.props.padding}px;color:#fff;display:flex;align-items:center;justify-content:center">© Your Business</div>`;
      default:
        return '';
    }
  }).join('');

  return { html, css };
}
