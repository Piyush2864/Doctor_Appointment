<<<<<<< HEAD
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
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
>>>>>>> 470953685ca541b2bc11bb467c1dd969edd69726

function App() {
  const [count, setCount] = useState(0)

  return (
<<<<<<< HEAD
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
=======
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
>>>>>>> 470953685ca541b2bc11bb467c1dd969edd69726
  )
}

export default App
