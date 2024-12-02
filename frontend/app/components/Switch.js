"use client"
import { useState } from "react";
import Register from "./Register";
import Login from "./Login";

const SwitchButton = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Switch Button */}
      <div
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
          isOn ? "bg-gray-500" : "bg-gray-300"
        }`}
        onClick={toggleSwitch}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
            isOn ? "translate-x-6" : ""
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
