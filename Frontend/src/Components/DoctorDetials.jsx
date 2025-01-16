import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoctor } from "../Api/doctorApi";
import { GetAllDoctors } from "../Api/adminAPI";
import { useNavigate } from "react-router-dom";

export default function DoctorDetails() {
  const { doctorId } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorId) {
      console.error("Doctor ID is missing from URL.");
      setError("Doctor ID is missing.");
      return;
    }

    const fetchDoctorDetails = async () => {
      setLoading(true);
      const data = await getDoctor(doctorId);
      if (data) {
        setDoctor(data);
      } else {
        setError("Failed to fetch doctor details.");
      }
      setLoading(false);
    };

    fetchDoctorDetails();
  }, [doctorId]);
  console.log(doctorId);

  // Fetch all doctors list
  useEffect(() => {
    const fetchAllDoctors = async () => {
      const response = await GetAllDoctors();
      if (response.success) {
        setAllDoctors(response.data);
      }
    };

    fetchAllDoctors();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading Doctor Details...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  // Filter doctors based on a criterion, e.g., specialization
  const filteredDoctors = allDoctors.filter((doc) => doc.specialization.includes("Cardiology"));

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg mt-10">
      {/* Doctor Details */}
      <div className="flex items-center space-x-6">
        <img
          src={doctor?.profilePicture}
          alt={doctor?.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h2 className="text-2xl font-bold">{doctor?.name}</h2>
          <p className="text-gray-600">{doctor?.specialization}</p>
          <p className="text-gray-500 text-sm">{doctor?.experience } years experience</p>
          
        </div>
      </div>

      {/* Filtered doctor list */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">🏥 Cardiologists</h3>
        {filteredDoctors.length > 0 ? (
          <ul className="list-disc ml-6">
            {filteredDoctors.map((doc) => (
              <div key={doc.id} className="mt-2">
                {doc.name} - {doc.specialization?.join(", ") || "Specialization not available"}
                <h1>{doctor.discription}</h1>

              </div>
          
            ))}
          </ul>
        ) : (
          <p>No cardiologists available.</p>
        )}
      </div>

      {/* Book Appointment Button */}
      <button  onClick={()=>navigate("/appointment/:docId")}
       className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
        Book Appointment
      </button>
    </div>
  );
}
