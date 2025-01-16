import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDoctor, getDoctorIdFromToken } from "../Api/doctorApi"; // Ensure correct import

export default function DoctorDashboard() {
  const { doctorId: paramDoctorId } = useParams(); // Get doctorId from the URL params
  const [doctorId, setDoctorId] = useState(null); // Initialize the state for doctorId
  const [profile, setProfile] = useState(null); // Doctor profile state
  const [statistics, setStatistics] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    totalIncome: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Use effect to set doctorId based on URL param or token
  useEffect(() => {
    if (paramDoctorId) {
      setDoctorId(paramDoctorId); // If doctorId is in URL params, set it
    } else {
      const tokenDoctorId = getDoctorIdFromToken(); // Otherwise, get it from the token
      if (tokenDoctorId) {
        setDoctorId(tokenDoctorId);
      } else {
        console.error("Doctor ID is missing.");
        setLoading(false);
      }
    }
  }, [paramDoctorId]);

  // Fetch doctor profile and statistics data once doctorId is set
  useEffect(() => {
    if (!doctorId) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch doctor profile data
        const profileData = await getDoctor(doctorId);
        setProfile(profileData);

        // Optionally, fetch appointments data and statistics here
        // You can use this to calculate totalAppointments, todayAppointments, and totalIncome

        // Mock data for statistics for now
        setStatistics({
          totalAppointments: 100,
          todayAppointments: 5,
          totalIncome: 1500,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [doctorId]);

  if (loading)
    return <div className="text-center text-lg font-semibold mt-10">Loading...</div>;

  return (
    <div className="flex max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-4">Menu</h3>
        <ul className="space-y-2">
          {["overview", "appointments", "statistics"].map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`block w-full text-left p-2 rounded-lg ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100 text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 ml-4">
        {activeTab === "overview" && profile && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Profile Overview</h3>
            <div className="flex items-center gap-4">
              {/* Add conditional rendering to prevent errors if profile properties are undefined */}
              <img
                key={profile?.profilePicture}
                src={profile?.profilePicture || "/default-avatar.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full border border-gray-300"
              />
              <div>
                <h4 className="text-lg font-bold">{profile?.name || "Name not available"}</h4>
                <p className="text-gray-600">
                  {profile?.specialization?.length ? profile?.specialization.join(", ") : "Specialization not available"}
                </p>
                <p className="text-gray-600">{profile?.email || "Email not available"}</p>
                <p className="text-gray-600">{profile?.contactNumber || "Contact number not available"}</p>
              </div>
            </div>
            <Link
              to={`/doctor-profile/${doctorId}`}
              className="mt-3 inline-block text-blue-500 hover:underline"
            >
              Edit Profile
            </Link>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Upcoming Appointments</h3>
            {/* Assuming you will fetch and display appointments here */}
            <p>No upcoming appointments</p>
          </div>
        )}

        {activeTab === "statistics" && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Statistics</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="text-lg font-bold text-gray-700">{statistics.totalAppointments}</p>
                <p className="text-gray-500">Total Appointments</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="text-lg font-bold text-gray-700">{statistics.todayAppointments}</p>
                <p className="text-gray-500">Patients Seen Today</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow">
                <p className="text-lg font-bold text-gray-700">${statistics.totalIncome.toFixed(2)}</p>
                <p className="text-gray-500">Total Income</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
