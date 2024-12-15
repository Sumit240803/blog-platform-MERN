"use client";
import Navbar from "@/app/components/Navbar";
import UserNav from "@/app/components/UserNav";
import checkToken from "@/app/utils/checkToken";
import getToken from "@/app/utils/getToken";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Home = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const token = getToken();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // For toggling the popup visibility
  const [popupType, setPopupType] = useState(""); // "followers" or "following"

  const fetchUserInfo = async () => {
    try {
      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/userInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          router.replace("/");
        }
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const showFollowing = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/followings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFollowing(data.followings);
      setPopupType("following");
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching following:", error);
    }
  };

  const showFollowers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/followers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setFollowers(data.followers);
      setPopupType("followers");
      setShowPopup(true);
    } catch (error) {
      console.error("Error fetching followers:", error);
    }
  };
  const unfollow = async(email)=>{
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/unfollow`, {
        method : "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({"email" : email})
      });
      if(response.ok){
        user.following-=1;
        router.refresh();
      }
    } catch (error) {
      
    }
  }

  const closePopup = () => {
    setShowPopup(false);
    setFollowers([]);
    setFollowing([]);
  };

  useEffect(() => {
    if (!checkToken()) {
      router.replace("/");
    } else {
      fetchUserInfo();
    }
  }, []);

  if (!user) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Side Navigation */}
      <div className="flex-shrink-0">
        <UserNav />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          <Image
            src="/profile.png"
            width={128}
            height={128}
            alt="Profile"
            className="object-cover rounded-full hover:border hover:border-green-900 hover:shadow-sm hover:shadow-green-500   shadow-blue-900 shadow-md "
            layout="intrinsic"
          />
          <div className="mt-4 text-xl font-semibold bg-gray-900 p-3 rounded-lg hover:border hover:border-green-900 hover:shadow-sm hover:shadow-green-500 hover:rounded-xl cursor-pointer shadow-blue-900 shadow">
            {user.username}
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center mt-8 space-x-8 bg-gray-900 p-6 rounded-lg w-fit mx-auto shadow-blue-900 shadow">
          <div onClick={showFollowers} className="p-2 cursor-pointer hover:border hover:border-green-900 hover:shadow-sm hover:shadow-green-500 hover:rounded-xl text-center">
            <div className="text-lg font-medium">Followers</div>
            <div className="text-2xl font-bold">{user.followers}</div>
          </div>
          <div onClick={showFollowing} className="p-2 cursor-pointer hover:border hover:border-green-900 hover:shadow-sm hover:shadow-green-500 hover:rounded-xl text-center">
            <div className="text-lg font-medium">Following</div>
            <div className="text-2xl font-bold">{user.following}</div>
          </div>
          <div className="p-2 hover:border hover:border-green-900 hover:shadow-sm hover:shadow-green-500 hover:rounded-xl text-center">
            <div className="text-lg font-medium">Blogs Published</div>
            <div className="text-2xl font-bold">{user.blogsPublished}</div>
          </div>
          <div className="p-2 hover:border hover:border-green-900 hover:shadow-sm hover:shadow-green-500 hover:rounded-xl text-center">
            <div className="text-lg font-medium">Revenue</div>
            <div className="text-2xl font-bold">${user.revenue ? user.revenue : "0"}</div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-gray-950 hover:border hover:border-green-900 hover:shadow-sm hover:shadow-green-500 hover:rounded-xl mt-12 text-center w-3/4 m-auto px-7 py-4 rounded-lg shadow-blue-900 shadow">
          <h2 className="text-white text-center text-2xl font-bold">Bio</h2>
          <p className="py-4 rounded-lg bg-gray-900 mt-2 text-gray-400">
            {user.bio ? user.bio : "No Bio right now. Edit Your Bio in Settings"}
          </p>
        </div>

        {/* Popup for Followers or Following */}
        {showPopup && (
          <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-900 border-2 border-green-900  shadow-sm shadow-blue-500 p-6 rounded-lg w-1/2">
              <h2 className="text-xl font-bold text-center mb-4">{popupType === "followers" ? "Followers" : "Following"}</h2>
              <ul>
                {(popupType === "followers" ? followers : following).map((user, index) => (
                  <li key={index} className="mb-2 border border-green-900 shadow-sm shadow-green-500 rounded-xl p-2 text-white flex justify-between items-center">
                    <span>{user.username} ({user.email})</span>
                    {popupType === "following" && (
                      <button
                        onClick={() => unfollow(user.email)}
                        className="items-center ml-4 p-2 bg-red-500 rounded-lg text-white"
                      >
                        Unfollow
                      </button>
                    )}
                  </li>
                ))}

              </ul>
              <button onClick={closePopup} className="mt-4 p-2 bg-red-500 rounded-lg text-white">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
