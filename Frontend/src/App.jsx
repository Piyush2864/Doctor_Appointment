import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Navbar from './Componets/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from "./Pages/Contact" 
import Doctors from "./Pages/Doctors"
import MyProfile from "./Pages/MyProfile"
import MyAppointments from './Pages/MyAppointments'
import Login from "./Pages/Login";
import Appointment from './Pages/Appointment';
import Footer from './Componets/Footer';
import Signup from './Pages/singup'


export default function App() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
          <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/singup' element={<Signup/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
        <Route  path='/appointment/:docid' element={<Appointment/>}/>
        

      </Routes>

      <Footer/>

    </div>
  )
}
