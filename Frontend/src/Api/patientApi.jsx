import axios from "axios";
import jwtDecode from 'jwt-decode'


export const PatientSignup = async (formData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/appointment/patient/signup",
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      }
    );
    console.log("Patient Signup Response:", response.data);
    return response.data; 
  } catch (error) {
    console.error(
      "Error in Patient Signup API:",
      error.response ? error.response.data : error.message
    );
    throw error; 
  }
};

<<<<<<< HEAD
export const PatientLogin = async (email, password) => {
=======

export const PatientLogin = async () => {
>>>>>>> 45a87fcdd1a27df39e1efcbda1b8ad31f0a53c52
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/appointment/patient/login",
      { email, password } 
    );

    console.log("Patient Login Response:", response.data);

    const { token } = response.data;

    
    localStorage.setItem("token", token);

    
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);

    const role = decodedToken.role; 
    console.log("User Role:", role);

    return { ...response.data, role }; 
  } catch (error) {
    console.error(
      "Error in Patient Login API:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Login failed." };
  }
};

const getPatientIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id; // Assuming patient ID is stored as `id` in the token
  }
  return null; // In case no token is found
};


export const GetPatient = async (patientId) => {
  try {
    // const patientId = getPatientIdFromToken();
    const token = localStorage.getItem("token"); 

    // if (!patientId) {
    //   console.error("Patient not logged in or token missing.");
    //   return;
    // }

    if (!token) {
      throw new Error("Unauthorized: Token not found.");
    }

    const decodedToken = jwtDecode(token);
    const role = decodedToken.role; 
    console.log("User Role for GetPatient API:", role);

    
    if (role !== "Patient") {
      throw new Error("Unauthorized: Role not permitted.");
    }

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


export const UpdatePatient = async (patientId, updatedData) => {
  try {
    const token = localStorage.getItem("token"); 

    if (!token) {
      throw new Error("Unauthorized: Token not found.");
    }

    const decodedToken = jwtDecode(token);
    const role = decodedToken.role; 
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
    console.error(
      "Error in Patient History API:",
      error.response ? error.response.data : error.message
    );
    return error.response?.data || { success: false, message: "Failed to fetch patient history." };
  }
};
