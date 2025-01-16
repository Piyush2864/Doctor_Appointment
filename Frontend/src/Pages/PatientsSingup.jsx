import React, { useState } from 'react';
import { PatientSignup } from '../Api/patientApi';
import { useNavigate } from 'react-router-dom';

export default function PatientsSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    contactNumber: '',
    profilePicture: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      const response = await PatientSignup(formDataToSend);
      setSuccess(response.message);
      
      // After successful signup, navigate to login page
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Patient Signup</h2>
        
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" name="name" placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.name} onChange={handleChange} required 
          />

          <input 
            type="email" name="email" placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.email} onChange={handleChange} required 
          />

          <input 
            type="password" name="password" placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.password} onChange={handleChange} required 
          />

          <input 
            type="number" name="age" placeholder="Age"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.age} onChange={handleChange} required 
          />

          <select 
            name="gender" value={formData.gender} onChange={handleChange} required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other" >Other</option>
          </select>

          <input 
            type="text" name="contactNumber" placeholder="Contact Number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={formData.contactNumber} onChange={handleChange} required 
          />

          <input 
            type="file" name="profilePicture" onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <button 
            type="submit" disabled={loading}
            className={`w-full p-3 text-white font-semibold rounded-lg ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? 'Signing Up...' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
}
