import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const doctorSignup = async (doctorData) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/v1/appointment/doctor/signup",
            doctorData, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Doctor Signup Response:", response.data);
    } catch (error) {
        console.log("Error during Doctor Signup:", error.response?.data || error.message);
    }
};


export const doctorLogin = async (email, password) => {
    try {
        const response = await axios.post(
            "http://localhost:8080/api/v1/appointment/doctor/login",
            { email, password } 
        );

        // console.log("Doctor Login Response:", response.data);

        const { token } = response.data;

        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);
        const role = decodedToken.role;

        // console.log("User Role:", role);

        return { ...response.data, role };
    } catch (error) {
        console.error("Error during Doctor Login:", error.response?.data || error.message);
    }
};


export const getDoctor = async (doctorId) => {
    try {
        const token = localStorage.getItem("token");

        const decodedToken = jwtDecode(token);
        console.log("User Role from Token:", decodedToken.role);

        const response = await axios.get(
            `http://localhost:8080/api/v1/appointment/doctor/get-doctor/${doctorId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }
        );

        console.log("Doctor Details:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching Doctor Details:", error.response?.data || error.message);
    }
};


export const updateDoctor = async (doctorId, updatedData) => {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
            `http://localhost:8080/api/v1/appointment/doctor/update-doctor/${doctorId}`,
            updatedData, 
            {
                headers: {
                    Authorization: `Bearer ${token}`, 
                    "Content-Type": "application/json", 
                },
            }
        );

        console.log("Doctor Update Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error updating Doctor Details:", error.response?.data || error.message);
    }
};