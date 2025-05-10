import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllDoctors } from "../Api/adminAPI"; // ✅ Import API function

export default function TopDoctors() {
  const navigate = useNavigate();
  
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        setError("Unauthorized: Token not found.");
        setLoading(false);
        return;
      }
  
      try {
        const response = await GetAllDoctors();
  
        if (!response || response.success === false) {
          throw new Error(response?.message || "Failed to fetch doctors.");
        }
  
        setDoctors(response.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchDoctors();
  }, []);
  
  

  if (loading) return <p className="text-center mt-10">Loading Top Doctors...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col doctors-center gap-4 my-16 text-gray-900 md:mx-10 justify-center items-center">
      <h1 className="text-3xl    font-medium">Top Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctors List */}
      <div className="w-full flex flex-wrap gap-10 px-3 sm:px-0 justify-center">
        {doctors.length > 0 ? (
          doctors.map((doctor, index) => (
            <div
              onClick={() => navigate(`/doctor-details/${doctor._id}`)}
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 bg-white shadow-md hover:shadow-lg"
            >
              <img
                className="bg-blue-50 w-60 h-60 object-cover"
                src={doctor?.profilePicture }
                alt={doctor?.name}
              />
              <div className="p-4">
                <div className="flex doctors-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>{doctor.availability ? "Available" : "Not Available"}</p>
                </div>
                <p className="font-medium text-lg text-gray-900">{doctor.name}</p>
                <p className="text-gray-600 text-sm">
                  {doctor.specialization?.length > 0
                    ? doctor.specialization.join(", ")
                    : "Not Available"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No doctors found.</p>
        )}
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="bg-blue-500 text-white w-20  justify-center py-2 px-5 rounded-full mt-5 hover:bg-blue-600 transition"
      >
        More
      </button>
    </div>
  );
}