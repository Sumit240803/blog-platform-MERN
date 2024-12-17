"use client";

import React, { useState } from "react";

const Register = () => {
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState("");  // State for handling errors

  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Reader",  // Default role is 'Reader'
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,  // This ensures role gets updated correctly
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add logic to send formData to your backend API here
    console.log("Form Submitted", formData);  // For debugging

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // Send the entire formData including the role
      });

      if (response.ok) {
        setRegistered(true);
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "Reader",  // Reset to default role after successful registration
        });
        setError("");  // Reset any previous error
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <div className="p-6 w-full max-w-lg mx-auto">
        <h2 className="font-bold text-lg mb-2">Register yourself</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 px-6 border border-gray-300 rounded text-black"
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 px-6 border border-gray-300 rounded text-black"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label htmlFor="role" className="block text-sm font-semibold">Select Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}  // Ensures role is controlled
              onChange={handleChange}  // Updates formData when role is selected
              required
              className="w-full p-2 px-6 border border-gray-300 rounded text-black"
            >
              <option value="Reader">I want to read blogs only</option>
              <option value="Blogger">I want to read and write blogs</option>
            </select>
          </div>

          <div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border px-6 border-gray-300 rounded text-black outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-black rounded text-white font-semibold hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>

      {registered && (
        <div className="text-green-500 text-center mt-4">
          Registration successful! Please login to access your profile.
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center mt-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default Register;
