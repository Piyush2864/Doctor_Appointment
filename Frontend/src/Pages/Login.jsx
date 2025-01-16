import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminLogin } from '../Redux/CreateSlice/AdminSlice';
import { PatientLogin } from '../Api/patientApi'; // ✅ Import API function
import axios from 'axios';

export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
    role: 'admin',  // ✅ Default role is admin
  });

  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let response;

      if (data.role === 'admin') {
        // ✅ Admin Login API Call
        response = await axios.post('http://localhost:8080/api/v1/appointment/admin/login', {
          email: data.email,
          password: data.password,
        });

        dispatch(adminLogin(response.data));
        navigate('/'); // ✅ Redirect to admin dashboard
      } else {
        // ✅ Patient Login API Call
        response = await PatientLogin(data.email, data.password);

        if (response.success) {
          navigate('/'); // ✅ Redirect to patient dashboard
        } else {
          setError(response.message || 'Login failed!');
        }
      }
    } catch (error) {
      setError('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <select
              name="role"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
              value={data.role}
              onChange={handleChange}
            >
              <option value="admin">Admin</option>
              <option value="patient">Patient</option>
            </select>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
              value={data.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md"
              value={data.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 font-semibold">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
