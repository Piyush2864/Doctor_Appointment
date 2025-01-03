import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Doctors() {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  
  // Get doctors data from Redux
  const doctors = useSelector((state) => state.doctors.doctors);  

  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors]);

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Browse Through the Doctors' Specialties
      </h2>

      {/* Specialties List */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["General Physician", "Gynecologist", "Dermatologist", "Pediatrician", "Neurologist", "Gastroenterologist"].map((spec, index) => (
          <p key={index} className="cursor-pointer px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            {spec}
          </p>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterDoc?.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg hover:-translate-y-2 transition-all duration-300 bg-white"
          >
            <img className="w-full h-60 object-cover bg-blue-50" src={item.image} alt={item.name} />
            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-green-600 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <p>Available</p>
              </div>
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
