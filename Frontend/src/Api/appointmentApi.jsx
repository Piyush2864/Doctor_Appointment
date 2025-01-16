import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Ensure you have this installed

const BASE_URL = "http://localhost:8080/api/v1/appointment";

// Utility function to get the stored doctor token
const getAuthToken = () => {
  return localStorage.getItem("token") || null;
};

// Decode the doctor ID from the token
export const getDoctorIdFromToken = () => {
  try {
    const token = getAuthToken();
    console.log("object", token)
    if (!token) {
      console.error("Token not found. Please log in.");
      return null;
    }

    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== "Doctor") {
      console.error("Unauthorized: Role not permitted.");
      return null;
    }

    return decodedToken.id || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

// Book an Appointment
export const BookAppointment = async (appointmentData) => {
  try {
    const token = getAuthToken();
    if (!token) {
      console.error("Unauthorized: No token provided.");
      return null;
    }

    const response = await axios.post(`${BASE_URL}/book`, appointmentData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in Book Appointment API:", error.response?.data || error.message);
  }
};

// Get Appointments by Doctor
export const GetAppointmentsByDoctor = async () => {
  const doctorId = getDoctorIdFromToken();
  if (!doctorId) {
    console.error("Doctor ID is required.");
    return [];
  }

  try {
    const token = getAuthToken();66
    if (!token) {
      console.error("Unauthorized: No token provided.");
      return [];
    }

    const response = await axios.get(`http://localhost:8080/api/v1/appointment/appointment/doctor/${doctorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error.response?.data?.message || error.message);
    return [];
  }
};

// Get Appointments by Patient
export const GetAppointmentsByPatient = async (patientId) => {
  if (!patientId) {
    console.error("Patient ID is required.");
    return [];
  }

  try {
    const token = getAuthToken();
    if (!token) {
      console.error("Unauthorized: No token provided.");
      return [];
    }

    const response = await axios.get(`${BASE_URL}/patient/${patientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error in Get Appointments by Patient API:", error.response?.data || error.message);
    return [];
  }
};

// Update Appointment Status
export const UpdateAppointmentStatus = async (appointmentId, status) => {
  if (!appointmentId || !status) {
    console.error("Appointment ID and Status are required.");
    return null;
  }

  try {
    const token = getAuthToken();
    if (!token) {
      console.error("Unauthorized: No token provided.");
      return null;
    }

    const response = await axios.patch(
      `${BASE_URL}/status/${appointmentId}`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error("Error in Update Appointment Status API:", error.response?.data || error.message);
  }
};

// Cancel Appointment
export const CancelAppointment = async (appointmentId) => {
  if (!appointmentId) {
    console.error("Appointment ID is required.");
    return null;
  }

  try {
    const token = getAuthToken();
    if (!token) {
      console.error("Unauthorized: No token provided.");
      return null;
    }

    const response = await axios.delete(`${BASE_URL}/cancel/${appointmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error in Cancel Appointment API:", error.response?.data || error.message);
  }
};

// Get Appointment Details
export const GetAppointmentDetails = async (appointmentId) => {
  if (!appointmentId) {
    console.error("Appointment ID is required.");
    return null;
  }

  try {
    const token = getAuthToken();
    if (!token) {
      console.error("Unauthorized: No token provided.");
      return null;
    }

    const response = await axios.get(`${BASE_URL}/get-appointment/${appointmentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error in Get Appointment Details API:", error.response?.data || error.message);
  }
};

// Get Available Slots
export const GetAvailableSlots = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/available-slots`);
    return response.data;
  } catch (error) {
    console.error("Error in Get Available Slots API:", error.response?.data || error.message);
  }
};