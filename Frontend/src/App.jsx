
import React from 'react'
import { Routes , Route, BrowserRouter } from 'react-router-dom'
// import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from "./Pages/Contact" 
import Doctors from "./Pages/Doctors"
import MyProfile from "./Pages/MyProfile"
import MyAppointments from './Pages/MyAppointments'
import Login from "./Pages/Login";
import Appointment from './Pages/Appointment';
import Footer from './Components/Footer';
import Signup from "./Pages/Singup"
import Patients from './Pages/Patients'
import DoctorSingup from './Pages/DoctorSingup'
import DoctorLogin from './Pages/DoctorLogin'
import ProfileComponent from './Components/ProfileComponent'
// import PatientProfile from './Componets/PatientComponent'
import PatientComponent from './Components/PatientComponent'
import DoctorDashboard from './Components/DoctersDashbord'
import Navbar from './Components/Navbar'



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
        <Route path='/docter-dashbord' element={<DoctorDashboard/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/my-appointments' element={<MyAppointments/>} />
        <Route  path='/appointment/:docid' element={<Appointment/>}/>
        <Route path='/patients/singup' element={<Patients/>} />
        <Route path='/doctor-profile' element={<ProfileComponent/>} />
        <Route path="/patient-profile" element={<PatientComponent/>}/>

      </Routes>

      <Footer/>
      </BrowserRouter>
    </div>
  )
}
