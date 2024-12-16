import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex flex-col xl:text-3xl md:flex-row items-center bg-black text-white py-4 px-6 md:justify-between">
      {/* Brand Logo */}
      <div className="font-bold xl:text-3xl ">
        <Link
          className="relative inline-block  after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:opacity-0 after:transition-all after:duration-300 hover:after:w-[80%] hover:after:opacity-100"
          href="/"
        >
          Pen Stitched
        </Link>
      </div>
      {/* Links */}
      <div className="flex flex-wrap  justify-center mt-4 md:mt-0 md:space-x-6">
        <Link
          className="relative inline-block px-2 md:px-4 xl:text-3xl md:text-base after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:opacity-0 after:transition-all after:duration-300 hover:after:w-[80%] hover:after:opacity-100"
          href="/pages/home"
        >
          Home
        </Link>
        <Link
          className="relative inline-block px-2 md:px-4 xl:text-3xl md:text-base after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:opacity-0 after:transition-all after:duration-300 hover:after:w-[80%] hover:after:opacity-100"
          href="/pages/public/home"
        >
          Latest Pens
        </Link>
        <Link
          className="relative inline-block px-2 md:px-4 xl:text-3xl md:text-base after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:opacity-0 after:transition-all after:duration-300 hover:after:w-[80%] hover:after:opacity-100"
          href="/pages/contact"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
