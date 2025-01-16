import React from 'react'
import Header from '../Components/Header'
import SpecialityMenu from '../Components/SpecialityMenu'
import TopDocters from '../Components/TopDocters'
import DoctorDashboard from '../Components/DoctersDashbord'
import Banar from '../Components/Banar'

export default function Home() {
  return (
    <div>
      <Header/>
      <SpecialityMenu/>
      <TopDocters/>
      <Banar/>
      <DoctorDashboard/>
      
    </div>
  )
}