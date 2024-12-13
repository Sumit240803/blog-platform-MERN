"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      otp: "",
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  const [showForm, setShowForm] = useState(true);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/login`,{
      method : "POST",
      headers : {
          "Content-Type" : "application/json"
      },
      body : JSON.stringify({email : formData.email , password : formData.password})
    });
    if(response.ok){
      const token = await response.json();
      if(token){
          localStorage.setItem("token" , token.token);
      };
     // setLogged(true);
     /* setTimeout(()=>{
          setLogged(false)
      },2000);*/
      setFormData({email : '' , password : '' , otp : ''});
      setShowForm(false);
      
    }
   // router.refresh();
  // setShowForm(false);
  }


  return (
    <div>
      {/* Button to toggle the login form */}
    

      {/* Login Form */}
      {showForm && (
        <div className=" fixed inset-0  flex justify-center items-center z-50">
          <div className="shadow-xl border-2 border-gray-200 shadow-gray-200 bg-black w-96 p-6 rounded-lg  relative">
            <button
              onClick={toggleForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl text-white font-bold text-center mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-md font-medium text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-md font-medium text-white">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="text-black p-2 w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
