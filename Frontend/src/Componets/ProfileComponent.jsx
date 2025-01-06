import React, { useState, useEffect } from 'react';

const ProfileComponent = ({ doctorData, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: doctorData?.name || '',
    email: doctorData?.email || '',
    password: doctorData?.password || '',
    specialization: doctorData?.specialization || '',
    contactNumber: doctorData?.contactNumber || '',
    clinicAddress: doctorData?.clinicAddress || '',
    city: doctorData?.city || '',
    experience: doctorData?.experience || '',
    description: doctorData?.description || '',
    fees: doctorData?.fees || '',
    status: doctorData?.status || '',
    availability: doctorData?.availability || false,
    maxVideoConsultationsPerDay: doctorData?.maxVideoConsultationsPerDay || 0,
    shifts: doctorData?.shifts || [{ day: '', startTime: '', endTime: '' }],
    videoConsultationTimings: doctorData?.videoConsultationTimings || [{ day: '', startTime: '', endTime: '' }],
    reviews: doctorData?.reviews || [],
  });

  useEffect(() => {
    if (doctorData) {
      setFormData({
        name: doctorData?.name || '',
        email: doctorData?.email || '',
        password: doctorData?.password || '',
        specialization: doctorData?.specialization || '',
        contactNumber: doctorData?.contactNumber || '',
        clinicAddress: doctorData?.clinicAddress || '',
        city: doctorData?.city || '',
        experience: doctorData?.experience || '',
        description: doctorData?.description || '',
        fees: doctorData?.fees || '',
        status: doctorData?.status || '',
        availability: doctorData?.availability || false,
        maxVideoConsultationsPerDay: doctorData?.maxVideoConsultationsPerDay || 0,
        shifts: doctorData?.shifts || [{ day: '', startTime: '', endTime: '' }],
        videoConsultationTimings: doctorData?.videoConsultationTimings || [{ day: '', startTime: '', endTime: '' }],
        reviews: doctorData?.reviews || [],
      });
    }
  }, [doctorData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
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
      shifts: [...prevState.shifts, { day: '', startTime: '', endTime: '' }],
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
        { day: '', startTime: '', endTime: '' },
      ],
    }));
  };

  const handleRemoveVideoConsultationTiming = (index) => {
    const updatedTimings = formData.videoConsultationTimings.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      videoConsultationTimings: updatedTimings,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Doctor Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="flex justify-center items-center mb-6">
          {doctorData?.profilePicture ? (
            <img
              src={doctorData?.profilePicture}
              alt={`${doctorData?.name}'s profile`}
              className="w-32 h-32 rounded-full"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300"></div>
          )}
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
            <label className="block font-semibold mb-2">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Specialization:</label>
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
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded p-2 mb-4"
          />
        </div>
      <div className='flex gap-[30%]'>
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
                  onChange={(e) => handleShiftChange(index, 'day', e.target.value)}
                  className="w-40   border border-gray-300 rounded p-2 mr-2"
                />
                <input
                  type="time"
                  value={shift.startTime}
                  onChange={(e) => handleShiftChange(index, 'startTime', e.target.value)}
                  className="w-50 border border-gray-300 rounded p-2 mr-3"
                />
                <input
                  type="time"
                  value={shift.endTime}
                  onChange={(e) => handleShiftChange(index, 'endTime', e.target.value)}
                  className="w-50 border border-gray-300 rounded p-2 mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveShift(index)}
                  className="text-red-500 "
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddShift} className="btn btn-primary">
              Add Shift
            </button>
          </div>
        </div>

        {/* Video Consultation Timings Section */}
        <div className="flex justify-start mb-6">
          <div className="w-full max-w-xs">
            <h4 className="text-lg font-semibold mb-4">Video Consultation Timings</h4>
            {formData.videoConsultationTimings.map((timing, index) => (
              <div key={index} className="flex items-center mb-4">
                <input
                  type="text"
                  placeholder="Day"
                  value={timing.day}
                  onChange={(e) => handleVideoConsultationChange(index, 'day', e.target.value)}
                  className="w-40 border border-gray-300 rounded p-2 mr-2"
                />
                <input
                  type="time"
                  value={timing.startTime}
                  onChange={(e) => handleVideoConsultationChange(index, 'startTime', e.target.value)}
                  className="w-40 border border-gray-300 rounded p-2 mr-2"
                />
                <input
                  type="time"
                  value={timing.endTime}
                  onChange={(e) => handleVideoConsultationChange(index, 'endTime', e.target.value)}
                  className="w-40 border border-gray-300 rounded p-2 mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveVideoConsultationTiming(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
              
            ))}
            <button
              type="button"
              onClick={handleAddVideoConsultationTiming}
              className="btn btn-primary"
              >
              Add Timing
            </button>
              </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileComponent;
