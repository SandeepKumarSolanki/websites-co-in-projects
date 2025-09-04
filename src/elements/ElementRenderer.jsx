import React from 'react'
import TextEl from './TextE1'
import ImageEl from './ImageE1'
import ButtonEl from './ButtonE1'
import SectionEl from './SectionE1'
import NavbarEl from './NavbarE1'
import FooterEl from './FooterE1'

export function ElementRenderer({ el }){
  const commonStyle = { border: '1px solid red' }; // Temporary style for debugging

  switch(el.type){
    case 'text': return <TextEl props={el.props} style={commonStyle} />
    case 'image': return <ImageEl props={el.props} style={commonStyle} />
    case 'button': return <ButtonEl props={el.props} style={commonStyle} />
    case 'section': return <SectionEl props={el.props} style={commonStyle} />
    case 'navbar': return <NavbarEl props={el.props} style={commonStyle} />
    case 'footer': return <FooterEl props={el.props} style={commonStyle} />
    default: return null
  }
}
