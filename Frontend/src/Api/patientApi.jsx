import axios from "axios";


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
    console.log(
      "Error in Patient Signup API:",
      error.response ? error.response.data : error.message
    );
    throw error; 
  }
};


export const PatientLogin = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/appointment/patient/login"
    );
    console.log("Patient Login Response:", response.data);
  } catch (error) {
    console.error(
      "Error in Patient Login API:",
      error.response ? error.response.data : error.message
    );
  }
};

export const GetPatient = async () => {
  const patientId = "your-patient-id"; // Replace with actual patient ID
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/appointment/patient/get-patient/${patientId}`
    );
    console.log("Get Patient Response:", response.data);
  } catch (error) {
    console.log(
      "Error in Get Patient API:",
      error.response ? error.response.data : error.message
    );
  }
};

export const UpdatePatient = async () => {
  const patientId = "your-patient-id"; // Replace with actual patient ID
  try {
    const response = await axios.put(
      `http://localhost:8080/api/v1/appointment/patient/update-patient/${patientId}`
    );
    console.log("Update Patient Response:", response.data);
  } catch (error) {
    console.log(
      "Error in Update Patient API:",
      error.response ? error.response.data : error.message
    );
  }
};

export const PatientHistory = async () => {
  const patientId = "your-patient-id"; // Replace with actual patient ID
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/appointment/patient/patient-history/${patientId}`
    );
    console.log("Patient History Response:", response.data);
  } catch (error) {
    console.log(
      "Error in Patient History API:",
      error.response ? error.response.data : error.message
    );
  }
};
