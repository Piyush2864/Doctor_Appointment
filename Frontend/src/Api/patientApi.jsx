import axios from "axios";
import {jwtDecode} from 'jwt-decode'



export const PatientSignup = async (formData) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/appointment/patient/signup',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('Patient Signup Response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Handle specific error message
      if (error.response.data.message === 'Patient already exists!') {
        console.error('Signup Error: Patient already exists.');
        // Inform the user and provide options to log in
      } else {
        console.error('Signup Error:', error.response.data.message);
      }
    } else {
      console.error('Signup Error:', error.message);
    }
    throw error;
  }
};



export const PatientLogin = async (email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/appointment/patient/login',
      { email, password }
    );

    console.log('Patient Login Response:', response.data);

    const { token } = response.data;

    // Store the token securely
    localStorage.setItem('token', token);

    // Decode the token to extract user information
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);

    const role = decodedToken.role;
    console.log('User Role:', role);

    return { ...response.data, role };
  } catch (error) {
    // Improved error handling
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Error in Patient Login API:', error.response.data);
      return error.response.data;
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
      return { success: false, message: 'No response from server.' };
    } else {
      // Something else caused the error
      console.error('Error:', error.message);
      return { success: false, message: error.message };
    }
  }
};



const getPatientIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.role !== "Patient") {
        console.error("Unauthorized: Role not permitted.");
        return null;
      }
      return decodedToken.id; // Ensure 'id' exists in the token payload
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  console.error("Token not found.");
  return null;
};


export const GetPatient = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Unauthorized: Token not found.");
    return { success: false, message: "Unauthorized: Token not found." };
  }

  const patientId = getPatientIdFromToken();
  if (!patientId) {
    return { success: false, message: "Invalid or unauthorized token." };
  }

  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/appointment/patient/get-patient/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Get Patient Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in Get Patient API:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Failed to fetch patient data." };
  }
};



export const UpdatePatient = async (updatedData) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Unauthorized: Token not found.");
    }

    const decodedToken = jwtDecode(token);
    const role = decodedToken.role;
    const patientId = decodedToken.id;

    console.log("User Role for UpdatePatient API:", role);

    if (role !== "Patient") {
      throw new Error("Unauthorized: Role not permitted.");
    }

    const response = await axios.put(
      `http://localhost:8080/api/v1/appointment/patient/update-patient/${patientId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Update Patient Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error in Update Patient API:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Failed to update patient data." };
  }
};



export const PatientHistory = async (patientId) => {
  try {
    const token = localStorage.getItem("token"); 
    if (!token) {
      throw new Error("Unauthorized: Token not found.");
    }

    const decodedToken = jwtDecode(token);
    const role = decodedToken.role; 
    console.log("User Role for PatientHistory API:", role);

    
    if (role !== "Patient") {
      throw new Error("Unauthorized: Role not permitted.");
    }

    const response = await axios.get(
      `http://localhost:8080/api/v1/appointment/patient/patient-history/${patientId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    console.log("Patient History Response:", response.data);
    return response.data;
  } catch (error) {
    console.log(
      "Error in Patient History API:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Failed to fetch patient history." };
  }
};
