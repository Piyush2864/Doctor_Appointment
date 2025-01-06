import React, { useState, useEffect } from "react";
import useParams from 'react-router'

const PatientProfile = () => {
  const {patientId} = useParams() ; // Replace with dynamic patient ID
  const [patientData, setPatientData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Fetch Patient Data
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/appointment/patient/get-patient/${patientId}`);
        const data = await response.json();
        if (data.success) {
          setPatientData(data.data);
          setFormData(data.data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();
  }, [patientId]);

  // Handle Input Change
  const handleInputChange = (e, parentKey, index, nestedKey) => {
    if (parentKey) {
      const updatedArray = [...formData[parentKey]];
      if (nestedKey) {
        updatedArray[index][nestedKey] = e.target.value;
      } else {
        updatedArray[index] = e.target.value;
      }
      setFormData({ ...formData, [parentKey]: updatedArray });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Update Patient Data
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/appointment/patient/update-patient/${patientId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully!");
        setPatientData(data.data);
        setIsEditing(false);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error updating patient data:", error);
    }
  };

  if (!patientData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Patient Profile</h2>
      {isEditing ? (
        <form>
          {/* Basic Information */}
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData?.name || ""}
              onChange={handleInputChange}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData?.email || ""}
              onChange={handleInputChange}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </div>
          <div>
            <label>Age:</label>
            <input
              type="text"
              name="age"
              value={formData?.age || ""}
              onChange={handleInputChange}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </div>
          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={formData?.gender || ""}
              onChange={handleInputChange}
              style={{ marginLeft: "10px", padding: "5px" }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label>Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber || ""}
              onChange={handleInputChange}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label>Profile Picture URL:</label>
            <input
              type="text"
              name="profilePicture"
              value={formData?.profilePicture || ""}
              onChange={handleInputChange}
              style={{ marginLeft: "10px", padding: "5px" }}
            />
          </div>

          {/* Medical History */}
          <h3>Medical History</h3>
          {formData?.medicalHistory?.map((entry, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <label>Condition:</label>
              <input
                type="text"
                value={entry?.condition || ""}
                onChange={(e) => handleInputChange(e, "medicalHistory", index, "condition")}
                style={{ marginLeft: "10px", padding: "5px" }}
              />
              <label>Treatment:</label>
              <input
                type="text"
                value={entry?.treatment || ""}
                onChange={(e) => handleInputChange(e, "medicalHistory", index, "treatment")}
                style={{ marginLeft: "10px", padding: "5px" }}
              />
              <label>Visit Date:</label>
              <input
                type="date"
                value={entry?.visitDate || ""}
                onChange={(e) => handleInputChange(e, "medicalHistory", index, "visitDate")}
                style={{ marginLeft: "10px", padding: "5px" }}
              />
              <label>Reason:</label>
              <input
                type="text"
                value={entry?.reasonForVisit || ""}
                onChange={(e) => handleInputChange(e, "medicalHistory", index, "reasonForVisit")}
                style={{ marginLeft: "10px", padding: "5px" }}
              />
            </div>
          ))}

          {/* Video Call Notifications */}
          <div>
            <label>Video Call Notifications:</label>
            <input
              type="checkbox"
              name="videoCallNotifications"
              checked={formData?.videoCallNotifications}
              onChange={(e) =>
                setFormData({ ...formData, videoCallNotifications: e.target.checked })
              }
            />
          </div>

          {/* Buttons */}
          <button type="button" onClick={handleUpdate} style={{ marginRight: "10px" }}>
            Save
          </button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>
            <strong>Name:</strong> {patientData.name}
          </p>
          <p>
            <strong>Email:</strong> {patientData.email}
          </p>
          <p>
            <strong>Age:</strong> {patientData.age}
          </p>
          <p>
            <strong>Gender:</strong> {patientData.gender}
          </p>
          <p>
            <strong>Contact Number:</strong> {patientData.contactNumber}
          </p>
          <p>
            <strong>Profile Picture:</strong> {patientData.profilePicture}
          </p>
          <h3>Medical History</h3>
          {patientData?.medicalHistory?.map((entry, index) => (
            <div key={index}>
              <p>Condition: {entry?.condition}</p>
              <p>Treatment: {entry?.treatment}</p>
              <p>Visit Date: {new Date(entry?.visitDate).toLocaleDateString()}</p>
              <p>Reason: {entry?.reasonForVisit}</p>
            </div>
          ))}
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default PatientProfile;
