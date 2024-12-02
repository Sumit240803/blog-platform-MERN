"use client";

import React, { useState } from "react";



const Register = () => {
  const [registered , setRegistered] = useState(false);
  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add logic to send formData to your backend API here
    console.log("Form Submitted", formData);
    try {
      const response = await fetch(`https://blog-platform-mern.onrender.com/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setRegistered(true);
        setFormData({
          username : '',
          email : '',
          password :''
        });
        // Show success toast below the form
        
      } else {
        
      }
    } catch (error) {
      console.log(error);
      
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
            className="w-full p-2 bg-black border border-white rounded text-white font-semibold hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
      {registered ? <span>Registration Success. Login to access your profile.</span> : ""}
      
    </div>
  );
};

export default Register;
