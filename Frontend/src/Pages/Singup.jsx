import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import { adminLogin } from '../Redux/CreateSlice/AdminSlice';

export default function Signup() {
  const [role, setRole] = useState('patient'); // Default role is patient
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: ''
  });

  const dispatch = useDispatch();  
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post (
        `http://localhost:8080/api/v1/appointment/${role}/signup`, 
        formdata
      );
      console.log('Signup Success:', response.data);

      // Check if role is admin to dispatch adminLogin
      if (role === 'admin') {
        dispatch(adminLogin(response.data)); // Dispatch admin login if the role is admin
      }

      // After successful signup, navigate to the login page
      navigate('/login');  
    } catch (error) {
      console.error('Signup Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">{role === 'patient' ? 'Patient Signup' : role === 'doctor' ? 'Doctor Signup' : 'Admin Signup'}</h2>

        <div className="flex justify-center space-x-4 mb-6">
          <button 
            className={`p-3 rounded-lg ${role === 'patient' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} 
            onClick={() => setRole('patient')}
          >
            Patient
          </button>
          <button 
            className={`p-3 rounded-lg ${role === 'doctor' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} 
            onClick={() => setRole('doctor')}
          >
            Doctor
          </button>
          <button 
            className={`p-3 rounded-lg ${role === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`} 
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formdata.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formdata.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={formdata.password}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            className="w-full p-3 text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
          >
            Signup as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-blue-500">Already have an account? Login</Link>
        </div>
      </div>
    </div>
  );
}
