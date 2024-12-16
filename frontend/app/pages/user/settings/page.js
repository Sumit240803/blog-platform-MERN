"use client"
import React, { useState } from 'react';
import Toast from '@/app/components/Toast';
import UserNav from '@/app/components/UserNav';
import getToken from '@/app/utils/getToken';

const Settings = () => {
  const [bio, setBio] = useState('');
  const [updated, setUpdated] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const token = getToken();

  const handleBioChange = (e) => {
    setBio(e.target.value); // Update the bio state as user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Make API call to save the bio
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/addBio`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ bio }), // Send the bio to the backend
      });

      if (response.ok) {
        setUpdated(true);
        setToastVisible(true);
        const data = await response.json();
        console.log('Bio updated successfully:', data);
      } else {
        const data = await response.json();
        console.error('Error:', data.message);
        alert('Failed to update bio.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the bio.');
    }
  };

  // Function to close the toast after a few seconds
  const closeToast = () => {
    setToastVisible(false);
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-900 text-white min-h-screen">
      <div className="w-full md:w-1/4">
        <UserNav />
      </div>
      <div className="w-full md:w-3/4 p-4 md:p-8">
        <div className='flex flex-col space-y-4'>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <label className='border border-gray-100 p-2 rounded-xl border-opacity-30' htmlFor="bio">Add Your Bio:</label>
            <textarea
              id="bio"
              value={bio} // Bind the value to the bio state
              onChange={handleBioChange} // Update the bio state as user types
              placeholder="Write something about yourself..."
              rows="4"
              className='text-black border border-gray-400 rounded-xl p-2 outline-none w-full md:w-2/3'
            />
          </div>
          <button
            className='mx-auto md:mx-0 border-gray-400 border-2 bg-gray-800 text-white rounded-xl p-2'
            onClick={handleSubmit}
          >
            Save Bio
          </button>
        </div>
      </div>
      {/* Conditionally render the toast message */}
      {toastVisible && <Toast message="Bio Updated" onClose={closeToast} />}
    </div>
  );
};

export default Settings;
