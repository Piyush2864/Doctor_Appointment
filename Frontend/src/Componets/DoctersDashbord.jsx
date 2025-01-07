import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDoctor } from '../Api/doctorApi'; 
import { GetAppointmentsByDoctor} from '../Api/appointmentApi'

export default function DoctorDashboard() {
  const { doctorId } = useParams(); // Get doctorId from the URL params
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch doctor's profile, appointments, and statistics
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch doctor profile
        const profileData = await getDoctor(doctorId);
        setProfile(profileData);

        // Fetch doctor's appointments using GetAppointmentsByDoctor API
        const appointmentsData = await GetAppointmentsByDoctor(doctorId); // Ensure correct function call with doctorId
        setAppointments(appointmentsData);

        // Here you would also need a similar API for statistics (if available)
        // Example: const statisticsData = await getStatistics(doctorId);
        // setStatistics(statisticsData);

        // Since we don't have statistics API in your example, let's assume static data for now.
        setStatistics({ totalAppointments: 100, todayAppointments: 5, totalIncome: 1500 });

      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId]); // Dependency on doctorId to refetch data if doctorId changes

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h2 className="text-2xl font-bold text-center">Doctor Dashboard</h2>

      {/* Profile Overview */}
      {profile && (
        <div className="profile-section">
          <h3 className="text-xl font-semibold">Profile Overview</h3>
          <div className="profile-info">
            <img
              src={profile?.profilePicture || '/default-avatar.png'}
              alt="Profile"
              className="profile-image"
            />
            <div>
              <h4>{profile?.name}</h4>
              <p>{profile?.specialization}</p>
              <p>{profile?.email}</p>
              <p>{profile?.contactNumber}</p>
            </div>
          </div>
          <Link to={`/doctor/edit-profile/${doctorId}`} className="edit-profile-link">
            Edit Profile
          </Link>
        </div>
      )}

      {/* Appointment Management */}
      <div className="appointments-section">
        <h3 className="text-xl font-semibold">Upcoming Appointments</h3>
        {appointments?.length === 0 ? (
          <p>No upcoming appointments</p>
        ) : (
          <ul>
            {appointments?.map((appointment) => (
              <li key={appointment?._id} className="appointment-item">
                <p>{appointment?.patientName}</p>
                <p>{appointment?.date}</p>
                <Link to={`/appointments/${appointment?._id}`} className="view-details">
                  View Details
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Statistics */}
      <div className="statistics-section">
        <h3 className="text-xl font-semibold">Statistics</h3>
        <div className="statistics-info">
          <p>Total Appointments: {statistics?.totalAppointments}</p>
          <p>Patients Seen Today: {statistics?.todayAppointments}</p>
          <p>Total Income: {statistics?.totalIncome} USD</p>
        </div>
      </div>

      {/* Links to other sections */}
      <div className="links">
        <Link to={`/doctor/patient-management/${doctorId}`} className="link">
          Patient Management
        </Link>
        <Link to={`/doctor/billing/${doctorId}`} className="link">
          Billing
        </Link>
        <Link to={`/doctor/settings/${doctorId}`} className="link">
          Settings
        </Link>
      </div>
    </div>
  );
}
