import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDoctor } from "../Api/doctorApi";
import { GetAppointmentsByDoctor } from "../Api/appointmentApi";

export default function DoctorDashboard() {
  const { doctorId } = useParams(); // Get doctorId from URL params
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview"); // Manage active section

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching Doctor Data for ID:", doctorId);

        const profileData = await getDoctor(doctorId);
        setProfile(profileData);

        const appointmentsData = await GetAppointmentsByDoctor(doctorId);
        setAppointments(appointmentsData);

        setStatistics({
          totalAppointments: 100,
          todayAppointments: 5,
          totalIncome: 1500,
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId]);

  if (loading) return <div className="text-center text-lg font-semibold mt-10">Loading...</div>;

  // Define tab components
  const Overview = () => (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Profile Overview</h3>
      {profile && (
        <div className="flex items-center gap-4">
          <img
            src={profile?.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border border-gray-300"
          />
          <div>
            <h4 className="text-lg font-bold">{profile?.name}</h4>
            <p className="text-gray-600">{profile?.specialization?.join(", ")}</p>
            <p className="text-gray-600">{profile?.email}</p>
            <p className="text-gray-600">{profile?.contactNumber}</p>
          </div>
        </div>
      )}
      <Link to={`/doctor/edit-profile/${doctorId}`} className="mt-3 inline-block text-blue-500 hover:underline">
        Edit Profile
      </Link>
    </div>
  );

  const Appointments = () => (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Upcoming Appointments</h3>
      {appointments?.length === 0 ? (
        <p className="text-gray-500">No upcoming appointments</p>
      ) : (
        <ul className="space-y-3">
          {appointments?.map((appointment) => (
            <li key={appointment?._id} className="p-3 bg-white shadow rounded-lg">
              <p className="text-lg font-semibold text-gray-800">{appointment?.patientName}</p>
              <p className="text-gray-600">{appointment?.date}</p>
              <Link to={`/appointments/${appointment?._id}`} className="text-blue-500 hover:underline">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const Statistics = () => (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-xl font-semibold text-gray-700 mb-3">Statistics</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white p-3 rounded-lg shadow">
          <p className="text-lg font-bold text-gray-700">{statistics?.totalAppointments}</p>
          <p className="text-gray-500">Total Appointments</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow">
          <p className="text-lg font-bold text-gray-700">{statistics?.todayAppointments}</p>
          <p className="text-gray-500">Patients Seen Today</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow">
          <p className="text-lg font-bold text-gray-700">${statistics?.totalIncome}</p>
          <p className="text-gray-500">Total Income</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Menu</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => setActiveTab("overview")}
              className={`block w-full text-left p-2 rounded-lg ${
                activeTab === "overview" ? "bg-blue-500 text-white" : "hover:bg-blue-100 text-gray-700"
              }`}
            >
              Profile Overview
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("appointments")}
              className={`block w-full text-left p-2 rounded-lg ${
                activeTab === "appointments" ? "bg-blue-500 text-white" : "hover:bg-blue-100 text-gray-700"
              }`}
            >
              Appointments
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("statistics")}
              className={`block w-full text-left p-2 rounded-lg ${
                activeTab === "statistics" ? "bg-blue-500 text-white" : "hover:bg-blue-100 text-gray-700"
              }`}
            >
              Statistics
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 ml-4">
        {activeTab === "overview" && <Overview />}
        {activeTab === "appointments" && <Appointments />}
        {activeTab === "statistics" && <Statistics />}
      </div>
    </div>
  );
}
