"use client";
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const SwitchButton = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="flex flex-col shadow-md shadow-black items-center border rounded-xl border-black bg-opacity-60  bg-green-950">
      {/* Label */}
      <div className="mb-2 py-1 text-lg font-semibold text-blue-200">
        {isOn ? "Login" : "Register"}
      </div>

      {/* Switch Button */}
      <div
        className={`w-16 h-6 flex items-center rounded-full p-1 cursor-pointer ${
          isOn ? "bg-black" : "bg-gray-300"
        }`}
        onClick={toggleSwitch}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
            isOn ? "translate-x-9" : ""
          }`}
        ></div>
      </div>

      {/* Render Components Conditionally */}
      <div className="mt-4">
        {isOn ? <Login /> : <Register />}
      </div>
    </div>
  );
};

export default SwitchButton;
