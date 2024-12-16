"use client"
import React, { useEffect, useState } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Automatically close the toast after 3 seconds
    }, 3000); // Toast disappears after 3 seconds

    return () => clearTimeout(timer); // Clean up timer on component unmount
  }, [message, onClose]);

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 p-4 bg-gray-800 text-white rounded-lg shadow-lg max-w-xs w-full">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
