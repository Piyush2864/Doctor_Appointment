import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doctorSignup } from "../Api/doctorApi";

export default function DoctorSignup() {
  const [doctorData, setDoctorData] = useState({
    name: "",  // ✅ Changed `fullName` to `name`
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!doctorData.name) newErrors.name = "Full name is required";  // ✅ Changed validation
    if (!doctorData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(doctorData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!doctorData.password) {
      newErrors.password = "Password is required";
    } else if (doctorData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!doctorData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (doctorData.password !== doctorData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!doctorData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^\d{10}$/.test(doctorData.contactNumber)) {
      newErrors.contactNumber = "Enter a valid 10-digit phone number";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setLoading(true);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      await doctorSignup(doctorData);
      setSuccessMessage("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/doctors/doctorslogin"), 2000); // ✅ Redirect to login page
    } catch (errorMessage) {
      setErrors({ apiError: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Doctor Signup</h2>

        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        {errors.apiError && <p className="text-red-500 text-center mb-4">{errors.apiError}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={doctorData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={doctorData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={doctorData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={doctorData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={doctorData.contactNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.contactNumber && <p className="text-red-500 text-sm">{errors.contactNumber}</p>}
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition duration-200"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/doctors/doctorslogin" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}
