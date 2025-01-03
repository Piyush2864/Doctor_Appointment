import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import { adminLogin } from '../Redux/CreateSlice/AdminSlice';


export default function Signup() {
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
      const response = await axios.post(
        'http://localhost:8080/api/v1/appointment/admin/signup',
        formdata
      );
      console.log('Signup Success:', response.data);
      dispatch(adminLogin(response.data));
      navigate('/');  
    } catch (error) {
      console.error('Signup Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          className="border-2 border-gray-200 p-2 m-2 rounded-md"
          value={formdata.name}
          onChange={handleChange}
        />
        <input 
          type="text" 
          name="email" 
          placeholder="Email" 
          className="border-2 border-gray-200 p-2 m-2 rounded-md"
          value={formdata.email}
          onChange={handleChange}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="border-2 border-gray-200 p-2 m-2 rounded-md"
          value={formdata.password}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 m-2 rounded-md">
          Signup
        </button>
        <Link to="/login" className="text-blue-500 p-2 m-2">Login</Link>
      </form>
    </div>
  );
}
