import axios from "axios";

export const callBookAppointmentAPI = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/appointment/appointment/book"
    );
    console.log("Book Appointment Response:", response.data);
  } catch (error) {
    console.error(
      "Error in Book Appointment API:",
      error.response ? error.response.data : error.message
    );
  }
};

export const callGetAppointmentsByDoctorAPI = async () => {
  const doctorId = "your-doctor-id"; // Replace with actual doctor ID
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/appointment/appointment/doctor/${doctorId}`
    );
    console.log("Get Appointments by Doctor Response:", response.data);
  } catch (error) {
    console.error(
      "Error in Get Appointments by Doctor API:",
      error.response ? error.response.data : error.message
    );
  }
};

export const callGetAppointmentsByPatientAPI = async () => {
  const patientId = "your-patient-id"; // Replace with actual patient ID
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/appointment/appointment/patient/${patientId}`
    );
    console.log("Get Appointments by Patient Response:", response.data);
  } catch (error) {
    console.error(
      "Error in Get Appointments by Patient API:",
      error.response ? error.response.data : error.message
    );
  }
};

export const callUpdateAppointmentStatusAPI = async () => {
  const appointmentId = "your-appointment-id"; // Replace with actual appointment ID
  try {
    const response = await axios.patch(
      `http://localhost:8080/api/v1/appointment/appointment/status/${appointmentId}`
    );
    console.log("Update Appointment Status Response:", response.data);
  } catch (error) {
    console.error(
      "Error in Update Appointment Status API:",
      error.response ? error.response.data : error.message
    );
  }
};

export const callCancelAppointmentAPI = async () => {
  const appointmentId = "your-appointment-id"; // Replace with actual appointment ID
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/v1/appointment/appointment/cancel/${appointmentId}`
    );
    console.log("Cancel Appointment Response:", response.data);
  } catch (error) {
    console.error(
      "Error in Cancel Appointment API:",
      error.response ? error.response.data : error.message
    );
  }
};

export const callGetAppointmentDetailsAPI = async () => {
  const appointmentId = "your-appointment-id"; // Replace with actual appointment ID
  try {
    const response = await axios.get(
      `http://localhost:8080/api/v1/appointment/appointment/get-appointment/${appointmentId}`
    );
    console.log("Get Appointment Details Response:", response.data);
  } catch (error) {
    console.error(
      "Error in Get Appointment Details API:",
      error.response ? error.response.data : error.message
    );
  }
};

export const callGetAvailableSlotsAPI = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/v1/appointment/appointment/available-slots"
    );
    console.log("Get Available Slots Response:", response.data);
  } catch (error) {
    console.error(
      "Error in Get Available Slots API:",
      error.response ? error.response.data : error.message
    );
  }
};
