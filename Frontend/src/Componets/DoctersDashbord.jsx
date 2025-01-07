import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileComponent from './ProfileComponent';

const DoctorDashboard = () => {
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/appointment/doctor/get-doctor/:id');
        setDoctorData(response.data);
      } catch (err) {
        setError('Error fetching doctor data');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {doctorData ? (
        <ProfileComponent doctorData={doctorData} />
      ) : (
        <div>No doctor data available</div>
      )}
    </div>
  );
};

export default DoctorDashboard;
