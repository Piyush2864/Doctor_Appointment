import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TopDoctors() {
  const navigate = useNavigate();
  
  const doctors = useSelector((state) => state.doctors.doctors);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full flex flex-wrap gap-10 px-3 sm:px-0 justify-center">
        {doctors.map((item, index) => (
          <div
            onClick={() => navigate(`/appointment/${item._id}`)}
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 bg-white shadow-md hover:shadow-lg"
          >
            <img className="bg-blue-50 w-60 h-60 object-cover" src={item.image} alt={item.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500">
                <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                <p>Available</p>
              </div>
              <p className="font-medium text-lg text-gray-900">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-500 text-white px-12 py-3 rounded-full mt-5 hover:bg-blue-600 transition"
      >
        More
      </button>
    </div>
  );
}
