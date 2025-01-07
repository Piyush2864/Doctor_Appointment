
import React, { useState, useEffect } from "react";
import { BookAppointment } from "../Api/appointmentApi"; 

const BookAppointmentComponent = () => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        doctorId: "",
        patientId: "",  
        date: "",
        timeSlot: "",
        reasonForVisit: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
          
            await BookAppointment(formData);  
            alert("Appointment booked successfully!");
        } catch (err) {
            setError("Failed to book appointment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Book an Appointment</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <div className="space-y-4">
                  
                    <input
                        type="text"
                        name="patientId"
                        placeholder="Patient ID"
                        value={formData.patientId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        required
                    />

                    <select 
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        required
                    >
                        <option value="">Select Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.name} - {doctor.specialization}
                            </option>
                        ))}
                    </select>

                    <input 
                        type="date" 
                        name="date" 
                        value={formData.date} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        required
                    />

                    <input 
                        type="text" 
                        name="timeSlot" 
                        placeholder="Time Slot (e.g. 10:00 AM - 11:00 AM)"
                        value={formData.timeSlot} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        required
                    />

                    <textarea 
                        name="reasonForVisit" 
                        placeholder="Reason for visit"
                        value={formData.reasonForVisit} 
                        onChange={handleChange} 
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />

                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
                    >
                        {loading ? "Booking..." : "Book Appointment"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookAppointmentComponent;
