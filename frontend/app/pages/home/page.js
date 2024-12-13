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

  const fetchUserInfo = async () => {
    try {
      if (token) {
        //https://blog-platform-mern.onrender.com
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/userInfo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          /*localStorage.setItem("username", data.username);
          localStorage.setItem("email", data.email);*/
          
        } else {
          router.replace("/");
        }
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
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
        <UserNav/>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center  ">
          <Image
            src="/profile.png"
            width={128}
            height={128}
            alt="Profile"
            className="object-cover rounded-full  shadow-blue-900 shadow-md "
            layout="intrinsic"
          />
          <div className="mt-4 text-xl font-semibold bg-gray-900 p-3 rounded-lg  shadow-blue-900 shadow">{user.username}</div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center mt-8 space-x-8 bg-gray-900 p-6 rounded-lg w-fit mx-auto shadow-blue-900 shadow">
          <div className="text-center">
            <div className="text-lg font-medium">Followers</div>
            <div className="text-2xl font-bold">{user.followers}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium">Following</div>
            <div className="text-2xl font-bold">{user.following}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium">Blogs Published</div>
            <div className="text-2xl font-bold">{user.blogsPublished}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium">Revenue</div>
            <div className="text-2xl font-bold">${user.revenue ? user.revenue : "0"}</div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-gray-950 mt-12 text-center  w-3/4 m-auto px-7 py-4 rounded-lg  shadow-blue-900 shadow">
          <h2 className="text-white text-center text-2xl font-bold">Bio</h2>
          <p className="py-4 rounded-lg bg-gray-900 mt-2 text-gray-400">
            {user.bio ? user.bio : "No Bio right now. Edit Your Bio in Settings"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
