import React, { useState } from "react";
import PatientProfile from "./PatientProfile";

const PatientDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#f8f9fa",
          padding: "20px",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3>Dashboard</h3>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <li
            onClick={() => setActiveSection("profile")}
            style={{
              padding: "10px 15px",
              cursor: "pointer",
              backgroundColor: activeSection === "profile" ? "#007bff" : "",
              color: activeSection === "profile" ? "white" : "",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            Profile
          </li>
          <li
            onClick={() => setActiveSection("appointments")}
            style={{
              padding: "10px 15px",
              cursor: "pointer",
              backgroundColor: activeSection === "appointments" ? "#007bff" : "",
              color: activeSection === "appointments" ? "white" : "",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            Appointments
          </li>
          <li
            onClick={() => setActiveSection("notifications")}
            style={{
              padding: "10px 15px",
              cursor: "pointer",
              backgroundColor: activeSection === "notifications" ? "#007bff" : "",
              color: activeSection === "notifications" ? "white" : "",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            Notifications
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px" }}>
        {activeSection === "profile" && (
          <div>
            <h2>Patient Profile</h2>
            <PatientProfile />
          </div>
        )}
        {activeSection === "appointments" && (
          <div>
            <h2>Appointments</h2>
            <p>Here will be the list of appointments.</p>
          </div>
        )}
        {activeSection === "notifications" && (
          <div>
            <h2>Notifications</h2>
            <p>Here will be the list of notifications.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientDashboard;