export const elementRegistry = {
  text: {
    name: 'Text',
    defaultProps: { content: 'Text element', fontSize: 16, color: '#000', weight: 400, align: 'left' },
    defaultFrame: { w: 150, h: 40 }
  },
  image: {
    name: 'Image',
    defaultProps: { src: 'https://via.placeholder.com/150', alt: 'Placeholder', radius: 0, fit: 'cover' },
    defaultFrame: { w: 200, h: 150 }
  },
  button: {
    name: 'Button',
    defaultProps: { label: 'Click me', href: '#', radius: 4, variant: 'primary' },
    defaultFrame: { w: 120, h: 44 }
  },
  section: {
    name: 'Section',
    defaultProps: { bg: '#e5e7eb', padding: 20, layout: 'stack', gap: 16 },
    defaultFrame: { w: 400, h: 200 }
  },
  navbar: {
    name: 'Navbar',
    defaultProps: { bg: '#fff', padding: 20 },
    defaultFrame: { w: '100%', h: 60 }
  },
  footer: {
    name: 'Footer',
    defaultProps: { bg: '#111827', padding: 40 },
    defaultFrame: { w: '100%', h: 100 }
  }
}