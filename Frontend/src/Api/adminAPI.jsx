import axios from "axios";
import { jwtDecode } from "jwt-decode";

const BASE_URL = "http://localhost:8080/api/v1/appointment/admin";

// Function to retrieve and decode token
export const getAdminIdFromToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("❌ Unauthorized: Token not found.");
    return null;
  }

  try {
    const decodedToken = jwtDecode(token);

    // ✅ Check if the user is an Admin
    if (decodedToken.role !== "Admin") {
      console.error("❌ Unauthorized: Role not permitted.");
      return null;
    }

    return decodedToken.id;
  } catch (error) {
    console.error("❌ Invalid token:", error.message);
    return null;
  }
};




// **Admin Signup**
export const AdminSignup = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, formData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Admin Signup Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Signup Error:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// **Admin Login**
export const AdminLogin = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });

    console.log("Admin Login Response:", response.data);

    const { token } = response.data;
    localStorage.setItem("token", token);

    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);

    return { ...response.data, role: decodedToken.role };
  } catch (error) {
    console.error(
      "Login Error:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Login failed." };
  }
};

// **Get All Admins**
export const GetAllAdmins = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Unauthorized: Token not found.");
    return { success: false, message: "Unauthorized: Token not found." };
  }

  try {
    const response = await axios.get(`${BASE_URL}/get-all-admin`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Get All Admins Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in Get All Admins API:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Failed to fetch admins." };
}
};

// **Update Admin**
export const UpdateAdmin = async (adminId, updateData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Unauthorized: Token not found.");
    return { success: false, message: "Unauthorized: Token not found." };
  }

  try {
    const response = await axios.put(`${BASE_URL}/update-admin/${adminId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Update Admin Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in Update Admin API:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Failed to update admin." };
  }
};

// **Delete Admin**
export const DeleteAdmin = async (adminId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Unauthorized: Token not found.");
    return { success: false, message: "Unauthorized: Token not found." };
  }

  try {
    const response = await axios.delete(`${BASE_URL}/delete-admin/${adminId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Delete Admin Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in Delete Admin API:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Failed to delete admin." };
  }
};





// **Get All Doctors**
export const GetAllDoctors = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("❌ Unauthorized: Token not found.");
    return { success: false, message: "Unauthorized: Token not found." };
  }

  try {
    const decodedToken = jwtDecode(token);

    // ✅ Check if the user role is allowed (Admin, Doctor, or Patient)
    if (!["Admin", "Doctor", "Patient"].includes(decodedToken.role)) {
      console.error("❌ Access Denied: User does not have permission.");
      return { success: false, message: "Access Denied! You do not have the required permissions." };
    }

    const response = await axios.get(`${BASE_URL}/get-all-doctor`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("✅ Get All Doctors Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error in Get All Doctors API:", error.response?.data || error.message);
    return error.response?.data || { success: false, message: "Failed to fetch doctors." };
  }
};
  

// **Delete Doctor**
export const DeleteDoctor = async (doctorId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Unauthorized: Token not found.");
    return { success: false, message: "Unauthorized: Token not found." };
  }

  try {
    const response = await axios.delete(`${BASE_URL}/delete-doctor/${doctorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Delete Doctor Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in Delete Doctor API:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Failed to delete doctor." };
  }
};

// **Get All Patients**
export const GetAllPatients = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Unauthorized: Token not found.");
    return { success: false, message: "Unauthorized: Token not found." };
  }

  try {
    const response = await axios.get(`${BASE_URL}/get-all-patient`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Get All Patients Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in Get All Patients API:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Failed to fetch patients." };
  }
};

// **Delete Patient**
export const DeletePatient = async (patientId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Unauthorized: Token not found.");
    return { success: false, message: "Unauthorized: Token not found." };
  }

  try {
    const response = await axios.delete(`${BASE_URL}/delete-patient/${patientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Delete Patient Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in Delete Patient API:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Failed to delete patient." };
  }
};
