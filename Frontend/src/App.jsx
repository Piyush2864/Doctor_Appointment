import React from 'react'
import { Routes , Route, BrowserRouter } from 'react-router-dom'
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
import Signup from "./Pages/Singup"
import DoctorSingup from './Pages/DoctorSingup'
import DoctorLogin from './Pages/DoctorLogin'
import ProfileComponent from './Componets/ProfileComponent'
// import PatientProfile from './Componets/PatientComponent'
import DoctorDashboard from './Componets/DoctersDashbord'
import PatientsSingup from './Pages/PatientsSingup'
import PatientProfile from './Componets/PatientProfle'
import PatientDashbord from './Componets/PatientDashbord'
import DoctorDetials from "./Componets/DoctorDetials"



export default function App() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <BrowserRouter>
    
          <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path ='/login' element={<Login/>} />
        <Route path='/singup' element={<Signup/>} />
        <Route path='/doctors/doctorsingup' element={<DoctorSingup/>} />
        <Route path='/doctors/doctorslogin' element={<DoctorLogin/>} />
        <Route path='/doctor-profile/:doctorId' element={<ProfileComponent/>} />
        <Route path='/doctor-details/:doctorId' element={<DoctorDetials/>} />
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
        <Route  path='/appointment/:docId' element={<Appointment/>}/>
        <Route path='/patients/singup' element={<PatientsSingup/>} />
        <Route path ="/patients-profile" element={<PatientProfile/>}  />
        <Route path ="/patient-dashboard" element={<PatientDashbord/>} />

      </Routes>

      <Footer/>
      </BrowserRouter>
    </div>
  )
}
