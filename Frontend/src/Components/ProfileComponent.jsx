import React, { useState, useEffect } from "react";
import { updateDoctor, getDoctor } from "../Api/doctorApi";
import { useParams } from 'react-router-dom'


const ProfileComponent = () => {
  const { doctorId } = useParams();
  console.log("object", doctorId)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    profilePicture: "Image not uploaded",
    profileFile: null,
    name: "",
    email: "",
    password: "",
    specialization: "",
    contactNumber: "",
    clinicAddress: "",
    city: "",
    experience: "",
    description: "",
    fees: "",
    status: "",
    availability: false,
    maxVideoConsultationsPerDay: 0,
    shifts: [{ day: "", startTime: "", endTime: "" }],
    videoConsultationTimings: [{ day: "", startTime: "", endTime: "" }],
    reviews: [],
  });
  console.log("formdata", formData)

  useEffect(() => {
    if (!doctorId) {
      setError("Doctor ID is missing.");
      setLoading(false);
      return;
    }

    const fetchDoctorData = async () => {
      try {
        const doctorData = await getDoctor(doctorId);
        if (doctorData?.success && doctorData.data) {
          setFormData((prevState) => ({
            ...prevState,
            ...doctorData.data,
          }));
        } else {
          setError(doctorData.message || "Failed to fetch doctor details.");
        }
      } catch (err) {
        setError("An error occurred while fetching doctor details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorId]);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log("object", file)
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prevState) => ({
        ...prevState,
        profilePicture: imageUrl,
        profileFile: file,
      }));
    }
  };

 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleShiftChange = (index, field, value) => {
    const updatedShifts = [...formData.shifts];
    updatedShifts[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      shifts: updatedShifts,
    }));
  };

  const handleVideoConsultationChange = (index, field, value) => {
    const updatedTimings = [...formData.videoConsultationTimings];
    updatedTimings[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      videoConsultationTimings: updatedTimings,
    }));
  };

  const handleAddShift = () => {
    setFormData((prevState) => ({
      ...prevState,
      shifts: [...prevState.shifts, { day: "", startTime: "", endTime: "" }],
    }));
  };

  const handleRemoveShift = (index) => {
    const updatedShifts = formData.shifts.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      shifts: updatedShifts,
    }));
  };

  const handleAddVideoConsultationTiming = () => {
    setFormData((prevState) => ({
      ...prevState,
      videoConsultationTimings: [
        ...prevState.videoConsultationTimings,
        { day: "", startTime: "", endTime: "" },
      ],
    }));
  };

  const handleRemoveVideoConsultationTiming = (index) => {
    const updatedTimings = formData.videoConsultationTimings.filter(
      (_, i) => i !== index
    );
    setFormData((prevState) => ({
      ...prevState,
      videoConsultationTimings: updatedTimings,
    }));
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorId) {
      // console.log("object", doctorId)
      alert("Error: Doctor ID is missing.");
      return;
    }

    try {
      const response = await updateDoctor( doctorId ,formData);
      console.log("response" ,response);
      console.log(doctorId,"docgorid");
      
      if (response) {
        alert("Doctor profile updated successfully!");
      } else {
        alert("Failed to update doctor profile.");
      }
    } catch (error) {
      return error
      // alert("An error occurred while updating the profile.");
    }
  };



  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Doctor Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center">
          {formData.profilePicture ? (
            <img
              src={formData.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 mb-4"></div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2" 
          />
        </div>

        <div className="text-center">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-2xl font-semibold w-full text-center mb-4 border-b-2 border-gray-300"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 border-line-none">Specialization:</label>
            <input
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Contact Number:</label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Clinic Address:</label>
            <input
              type="text"
              name="clinicAddress"
              value={formData.clinicAddress}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
          </div>
        </div>

        {/* Professional Details Section */}
        <div>
          <label className="block font-semibold mb-2">Experience:</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Fees:</label>
          <input
            type="number"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2">Status:</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="Active"
                checked={formData.status === "Active"}
                onChange={handleChange}
                className="mr-2"
              />
              Active
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="Non Active"
                checked={formData.status === "Non Active"}
                onChange={handleChange}
                className="mr-2"
              />
              Non Active
            </label>
          </div>
        </div>

        <div className="flex gap-[30%]">
          {/* Shifts Section */}
          <div className="flex justify-end mb-6">
            <div className="w-full max-w-xs">
              <h4 className="text-lg font-semibold mb-4">Shifts</h4>
              {formData.shifts.map((shift, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Day"
                    value={shift.day}
                    onChange={(e) =>
                      handleShiftChange(index, "day", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded p-2 mr-4"
                  />
                  <input
                    type="time"
                    placeholder="Start Time"
                    value={shift.startTime}
                    onChange={(e) =>
                      handleShiftChange(index, "startTime", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded p-2 mr-4"
                  />
                  <input
                    type="time"
                    placeholder="End Time"
                    value={shift.endTime}
                    onChange={(e) =>
                      handleShiftChange(index, "endTime", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveShift(index)}
                    className="ml-2 bg-red-500 text-white rounded p-1"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddShift}
                className="bg-green-500 text-white rounded p-2"
              >
                Add Shift
              </button>
            </div>
          </div>

          {/* Video Consultations Section */}
          <div className="flex justify-end mb-6">
            <div className="w-full max-w-xs">
              <h4 className="text-lg font-semibold mb-4">Video Consultation Timings</h4>
              {formData.videoConsultationTimings.map((timing, index) => (
                <div key={index} className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="Day"
                    value={timing.day}
                    onChange={(e) =>
                      handleVideoConsultationChange(index, "day", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded p-2 mr-4"
                  />
                  <input
                    type="time"
                    placeholder="Start Time"
                    value={timing.startTime}
                    onChange={(e) =>
                      handleVideoConsultationChange(index, "startTime", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded p-2 mr-4"
                  />
                  <input
                    type="time"
                    placeholder="End Time"
                    value={timing.endTime}
                    onChange={(e) =>
                      handleVideoConsultationChange(index, "endTime", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveVideoConsultationTiming(index)}
                    className="ml-2 bg-red-500 text-white rounded p-1"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddVideoConsultationTiming}
                className="bg-green-500 text-white rounded p-2"
              >
                Add Video Timing
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-full">
            Update Data 
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileComponent;