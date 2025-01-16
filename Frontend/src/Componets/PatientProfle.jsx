import React, { useEffect, useState } from 'react';
import { GetPatient, UpdatePatient } from '../Api/patientApi';
import { useNavigate } from 'react-router-dom';

export default function PatientDashboard() {
  const [patient, setPatient] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const data = await GetPatient();
      if (data.success) {
        setPatient(data.data);
        setUpdatedData(data.data);
      } else {
        setError(data.message || 'Failed to fetch profile');
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const navigate = useNavigate();



  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
      setUpdatedData((prevData) => ({
        ...prevData,
        profilePicture: file,
      }));
    }
  };



  const handleSave = async () => {
    try {
      const formData = new FormData();
      for (const key in updatedData) {
        formData.append(key, updatedData[key]);
      }
      const response = await UpdatePatient(formData);
      if (response.success) {
        setPatient(response.data);
        setMessage('Profile updated successfully!');
        setEditMode(false);  // Reset editMode to false after saving
      } else {
        setError(response.message || 'Update failed');
      }
    } catch (err) {
      setError(err.message || 'Update failed');
    }
  };

  
  
  const handleCancel = () => {
    setUpdatedData(patient);
    setProfilePicture(patient?.profilePicture || null);
    setEditMode(false);
    
  };

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!patient) return <p className="text-gray-600 text-center">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Patient Dashboard</h2>

        {message && <p className="text-green-500 text-center">{message}</p>}

        <div className="flex flex-col items-center">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md mt-2"
            />
          ) : (
            <div className="w-28 h-28 bg-gray-300 rounded-full flex items-center justify-center text-gray-700 mt-2">
              No Image
            </div>
          )}

          {editMode && (
            <div className="w-full mt-4">
              <label className="block text-gray-700">Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 rounded mt-1 w-full"
              />
            </div>
          )}

          <div className="w-full mt-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={updatedData.name || ''}
              onChange={handleChange}
              readOnly={!editMode}
              className={`border p-2 rounded mt-1 w-full ${editMode ? '' : 'bg-gray-100'}`}
            />
          </div>

          <div className="w-full mt-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={updatedData.email || ''}
              onChange={handleChange}
              readOnly={!editMode}
              className={`border p-2 rounded mt-1 w-full ${editMode ? '' : 'bg-gray-100'}`}
            />
          </div>

          <div className="w-full mt-4">
            <label className="block text-gray-700">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={updatedData.contactNumber || ''}
              onChange={handleChange}
              readOnly={!editMode}
              className={`border p-2 rounded mt-1 w-full ${editMode ? '' : 'bg-gray-100'}`}
            />
          </div>

          <div className="w-full mt-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={updatedData.age || ''}
              onChange={handleChange}
              readOnly={!editMode}
              className={`border p-2 rounded mt-1 w-full ${editMode ? '' : 'bg-gray-100'}`}
            />
          </div>

          <div className="w-full mt-4">
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={updatedData.gender || ''}
              onChange={handleChange}
              disabled={!editMode}
              className={`border p-2 rounded mt-1 w-full ${editMode ? '' : 'bg-gray-100'}`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="w-full mt-6 flex justify-center">
            {editMode ? (
              <>
                <button  
                  onClick={handleSave }
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
