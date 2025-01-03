import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import {adminLogin} from '../Redux/CreateSlice/AdminSlice';

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch(); 
  const navigate = useNavigate();  

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/appointment/admin/login',
        data
      );
      console.log('Login Success:', response.data);
    
      dispatch(adminLogin(response.data));
    
      navigate('/');  
    } catch (error) {
      console.error('Login Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="email" 
          placeholder="Email" 
          className="border-2 border-gray-200 p-2 m-2 rounded-md"
          value={data.email}
          onChange={handleChange}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="border-2 border-gray-200 p-2 m-2 rounded-md"
          value={data.password}
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 m-2 rounded-md">
          Login   
        </button>
        <Link to="/signup" className="text-blue-500 p-2 m-2">Signup</Link>
      </form>
    </div>
  );
}
