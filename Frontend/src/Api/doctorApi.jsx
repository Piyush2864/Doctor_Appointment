import axios from "axios"


export const doctorSignup = async () => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/v1/appointment/doctor/signup"
        );
        console.log("Doctor Signup Response:", response.data);
    } catch (error) {
        console.error("Error during Doctor Signup:", error.response?.data || error.message);
    }
};


export const doctorLogin = async () => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/v1/appointment/doctor/login"
        );
        console.log("Doctor Login Response:", response.data);
    } catch (error) {
        console.error("Error during Doctor Login:", error.response?.data || error.message);
    }
};


export const getDoctor = async () => {
    try {
        const response = await axios.get(
            "http://localhost:8080/api/v1/appointment/doctor/get-doctor/:id"
        );
        console.log("Doctor Details:", response.data);
    } catch (error) {
        console.error("Error fetching Doctor Details:", error.response?.data || error.message);
    }
};


export const updateDoctor = async () => {
    try {
        const response = await axios.put(
            "http://localhost:8080/api/v1/appointment/doctor/update-doctor/:id"
        );
        console.log("Doctor Update Response:", response.data);
    } catch (error) {
        console.error("Error updating Doctor Details:", error.response?.data || error.message);
    }
};