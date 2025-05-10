import React, { useState } from "react";
import PatientProfile from "./PatientProfle";
import SaidBar from "./SaidBar"

export default function PatientDashboard() {

  return (

    <>
    <div className="flex   ">
      <SaidBar/>
      <div className="w-full">

    <PatientProfile />
      </div>
    </div>
    </>
    // <div className="text-center p-6">
    //   {/* Button to Show/Hide Patient Profile */}
      
    //   <button
    //     onClick={() => setShowProfile(!showProfile)}
    //     className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
    //   >
    //     {showProfile ? "Hide Patient Details" : "Show Patient Details"}
    //   </button>

    //   {/* Patient Profile (Only visible when showProfile is true) */}
    //   {showProfile && (
    //     <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-lg">
    //       <PatientProfile />
    //     </div>
    //   )}
    // </div>
  );
}
