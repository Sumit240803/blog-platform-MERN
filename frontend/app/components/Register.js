"use client"
import Navbar from '@/app/components/Navbar';
import React, { useState } from 'react';

const Register = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add logic to send formData to your backend API here
    console.log('Form Submitted', formData);
  };

  return (
    <div>
     
    <div className=" p-6 w-full max-w-sm mx-auto ">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
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
            </div>
  );
};

export default Register;
