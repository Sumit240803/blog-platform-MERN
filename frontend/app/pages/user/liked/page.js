"use client";
import UserNav from '@/app/components/UserNav';
import getToken from '@/app/utils/getToken';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Liked = () => {
  const [likedItems, setLikedItems] = useState([]);
  const token = getToken();

  const likePen = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/likes`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setLikedItems(data.liked); // assuming 'liked' is the array in the response
    }
  };

  const unlikePen = async (id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/unlike`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "blogId": id }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setLikedItems(data.liked); // assuming 'liked' is the array in the response
    }
  };

  useEffect(() => {
    likePen();
  }, []);

  return (
    <div className="flex bg-contact min-h-screen">
      {/* Left Sidebar (User Navigation) */}
      <div className=" bg-white shadow-md ">
        <UserNav />
      </div>

      {/* Main Content Area */}
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-semibold text-gray-100 mb-6">Liked Pens</h1>
        
        {/* Liked Items List */}
        {likedItems && likedItems.length > 0 ? (
          <ul className="space-y-4">
            {likedItems.map(item => (
              <li key={item._id} className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-200">
                <h2 className="text-2xl font-semibold text-gray-800">{item.name}</h2>
                <div className="flex items-center justify-between mt-4">
                  <Link href={`/pages/public/id/${item.id}`}>
                    <a className="text-blue-600 hover:text-blue-800">Read More</a>
                  </Link>
                  <button
                    onClick={() => unlikePen(item.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    Remove From Like
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-100">No liked items found.</p>
        )}
      </div>
    </div>
  );
};

export default Liked;
