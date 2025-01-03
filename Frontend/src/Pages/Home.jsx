import React from 'react'
import Header from '../Componets/Header'
import SpecialityMenu from '../Componets/SpecialityMenu'
import TopDocters from '../Componets/TopDocters'
import Banar from '../Componets/Banar'

export default function Home() {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDocters/>
      <Banar/>
    </div>
  )
}
