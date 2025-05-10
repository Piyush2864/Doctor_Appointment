import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';


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
        console?.erro("Error during Doctor Signup:", error.response?.data || error.message);
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
        const id = decodedToken.id
        console.log("hhkjhkj", id)
        
        // console.log("User Role:", role);
        
        return { ...response.data, role };
    } catch (error) {
        console.error("Error during Doctor Login:", error.response?.data || error.message);
    }
};







 
  // Function to fetch doctor details
  export const getDoctor = async (doctorId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("Token not found.");
      return null;
    }
  
    if (!doctorId) {
      console.error("Doctor ID is required.");
      return null;
    }
  
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/appointment/doctor/get-doctor/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Doctor Details:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching Doctor Details:", error.response?.data || error.message);
      return null;
    }
  };   



  
  // Function to get Doctor ID from Token

  export const getDoctorIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found.");
        return null;
      }
  
      const decodedToken = jwtDecode(token);
      if (!decodedToken || decodedToken.role !== "Doctor") {
        console.error("Unauthorized: Role not permitted.");
        return null;
      }
  
      return decodedToken.id?.toString() || null; // Ensure 'id' is a string
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };
  
  
  
  // Function to update doctor details
 
  
  // export const updateDoctor = async () => {
  //   const token = localStorage.getItem("token");

    
  //   if (!token) {
  //     console.error("❌ Token not found.");
  //     return null;
  //   }
    
  //   const doctorId = getDoctorIdFromToken(); // Get Doctor ID from token
  //   console.log("doctorId",doctorId)
  
  //   if (!doctorId) {
  //     console.error("❌ Doctor ID is missing.");
  //     return null;
  //   }
  //   // Validate that formData is an object
  
  //   if (!formData || typeof formData !== "object") {
  //     console.error("❌ Invalid formData. Expected an object but received:", formData);
  //     return null;
  //   }
  
  //   try {
  //     console.log("📤 Sending Update Request:", { doctorId, formData });
  
  //     const response = await axios.put(
  //       `http://localhost:8080/api/v1/appointment/doctor/update-doctor/${doctorId}`,
  //        // Axios automatically serializes objects
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  
  //     console.log("✅ Doctor Update Response:", response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("❌ Error updating Doctor Details:", error.response?.data || error.message);
  //     return null;
  //   }
  // };
  



  export const updateDoctor = async (doctorId) => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("❌ Token not found.");
      return null;
    }
  
    // const doctorId = getDoctorIdFromToken(); // Function to extract doctorId from token
  
    if (!doctorId) {
      console.error("❌ Doctor ID is missing.");
      return null;
    }
  
    if (!formData || typeof formData !== "object") {
      console.error("❌ Invalid formData. Expected an object but received:", formData);
      return null;
    }
  
    try {
      console.log("📤 Sending Update Request:", { doctorId, formData });
  
      const formData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "profilePicture" && value instanceof File) {
          formData.append("profilePicture", value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });
  
      const response = await axios.put(
        `http://localhost:8080/api/v1/appointment/doctor/update-doctor/${doctorId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      useEffect(()=>{
        console.log(response,"Doct Response"); 

      },[])
      
  
      console.log("✅ Doctor Update Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Error updating Doctor Details:", error.response?.data || error.message);
      return null;
    }
  };


  
  