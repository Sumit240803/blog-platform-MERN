"use client";
import Navbar from "@/app/components/Navbar";
import UserNav from "@/app/components/UserNav";
import checkToken from "@/app/utils/checkToken";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (!checkToken()) {
      router.replace("/");
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Side Navigation */}
      <div className=" flex-shrink-0">
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
            className="object-cover rounded-full"
            layout="intrinsic"
          />
          <div className="mt-4 text-xl font-semibold">User Name</div>
        </div>

        {/* Stats Section */}
        <div className="flex justify-center mt-8 space-x-8">
          <div className="text-center">
            <div className="text-lg font-medium">Followers</div>
            <div className="text-2xl font-bold">32</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium">Following</div>
            <div className="text-2xl font-bold">3</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium">Total Blog</div>
            <div className="text-2xl font-bold">35</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium">Views</div>
            <div className="text-2xl font-bold">33</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-medium">Revenue</div>
            <div className="text-2xl font-bold">$457K</div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-12 text-center bg-gray-900 w-fit m-auto p-4 rounded-lg">
          <h2 className="text-lg font-medium">Bio</h2>
          <p className="mt-2 text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula lectus nec mi tincidunt feugiat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
