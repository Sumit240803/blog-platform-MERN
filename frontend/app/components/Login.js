"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const router = useRouter();
    const [logged , setLogged] = useState(false);
    const [sent , setSent] = useState(false);
    const[error , setError] = useState(false);
  // State to toggle between login methods
  const [isOtpLogin, setIsOtpLogin] = useState(false);

  // State to manage form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const getOtp = async()=>{
    setSent(true);
    setTimeout(()=>{
        setSent(false)
    },2000);
    if(formData.email!==''){
        setError(false);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/sendOtp`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({email : formData.email})
        });
        if(response.ok){
            console.log("otp sent");
        }
    }else{
        setError(true);
    }
  }

  // Handle form submission
  const handleSubmit = async(e) => {


    //OTP verification



    e.preventDefault();
    if (isOtpLogin) {
      console.log("OTP Login Data", { email: formData.email, otp: formData.otp });
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/verify`,{
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({email : formData.email , otp : formData.otp})
      });
      if(response.ok){
        const token = await response.json();
        if(token){
            localStorage.setItem("token" , token.token);
        };
        setLogged(true);
        setFormData({email : '' , password : '' , otp : ''});
        router.replace("/pages/home")
      }
      

      //Password Authentication




    } else {
      console.log("Password Login Data", {
        email: formData.email,
        password: formData.password,
      });
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
        setLogged(true);
        setTimeout(()=>{
            setLogged(false)
        },2000);
        setFormData({email : '' , password : '' , otp : ''});
        router.replace("/pages/home")
      }
    }
  };



  return (
    <div className="p-6 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-semibold mb-4">
        {isOtpLogin ? "Login with OTP" : "Login with Email & Password"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common Email Input */}
        <div>
          
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full p-2 border border-gray-300 rounded outline-none text-black"
          />
        </div>

        {/* Conditional Input for Password or OTP */}
        {!isOtpLogin ? (
          <div>
            
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none text-black"
            />
          </div>
        ) : (
          <div>
            
            <input
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter your otp"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none text-black"
            />
            <button onClick={getOtp}>Send Otp</button>
            <div>
                {sent? "Otp sent to your email" : ''}
                </div>
            <div>
                {error? "Enter your email first" : ''}
                </div>

          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit" className="w-full p-2 bg-black border border-white rounded text-white font-semibold hover:bg-blue-600"
          
        >
          {isOtpLogin ? "Login with otp" : "Login"}
        </button>
      </form>

      {/* Toggle Login Method */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => setIsOtpLogin(!isOtpLogin)}
          className="text-blue-600 font-semibold"
        >
          {isOtpLogin
            ? "Switch to Email & Password Login"
            : "Login with OTP (No password required)"}
        </button>
      </div>
      {logged ? "Login Successful" : ''}
    </div>
  );
};

export default Login;
