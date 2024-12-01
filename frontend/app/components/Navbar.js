import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex text-3xl bg-black text-white py-8 justify-between px-44">
      <div className="font-bold">
        <Link
          className="relative inline-block after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:opacity-0 after:transition-all after:duration-300 hover:after:w-[80%] hover:after:opacity-100"
          href="/"
        >
          Pen Stitched
        </Link>
      </div>
      <div>
        <Link
          className="relative inline-block px-4 after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:opacity-0 after:transition-all after:duration-300 hover:after:w-[80%] hover:after:opacity-100"
          href="/pages/home"
        >
          Home
        </Link>
        <Link
          className="relative inline-block px-4 after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:opacity-0 after:transition-all after:duration-300 hover:after:w-[80%] hover:after:opacity-100"
          href="/pages/blogs"
        >
          Latest Blogs
        </Link>
        <Link
          className="relative inline-block px-4 after:content-[''] after:absolute after:left-1/2 after:translate-x-[-50%] after:bottom-0 after:w-0 after:h-[2px] after:bg-blue-700 after:opacity-0 after:transition-all after:duration-300 hover:after:w-[80%] hover:after:opacity-100"
          href="/pages/contact"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
