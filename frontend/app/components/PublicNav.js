"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import getToken from "../utils/getToken";
import checkToken from "../utils/checkToken";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";

const PublicNav = () => {
  const [categories, setCategories] = useState([]);
  const token = getToken();
  const [isLogged, setIsLogged] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to toggle sidebar
  const pageSize = 5;

  const getCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/blogs/categories`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setCategories(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const allBlogs = async (page = currentPage) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/blogs/all?page=${page}&size=${pageSize}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        setBlogs(data.blogs);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const trimContent = (content, maxLength) => {
    const strippedContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    return strippedContent.length > maxLength
      ? strippedContent.substring(0, maxLength) + "..."
      : strippedContent;
  };

  useEffect(() => {
    if (checkToken(token)) {
      setIsLogged(true);
    }
    getCategories();
    allBlogs();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      allBlogs(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      allBlogs(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col bg-contact md:flex-row bg-green-50 min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed z-30 inset-y-0 left-0 transform bg-gray-900 text-white shadow-md transition-transform md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="xl:text-2xl md:text-base md:pt-10 xl:pt-2 font-bold p-4 border-b border-gray-300 flex justify-between items-center">
          {isLogged ? (
            <Link href={"/pages/home"}>My Account</Link>
          ) : (
            <Link href={"/"}>Pen Stitched</Link>
          )}
          <button
            className="md:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-xl font-semibold p-4 border-b border-gray-300">
          Categories
        </h2>
        <ul className="flex flex-col p-2 text-white">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li
                key={category._id}
                className="px-4 py-2 hover:bg-gray-800"
              >
                <Link
                  href={`/pages/public/category/${category.category}`}
                  className="block"
                >
                  {category.category}
                </Link>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">Loading...</li>
          )}
        </ul>
      </div>

      {/* Hamburger Menu */}
      <button
        className="md:hidden fixed top-4 left-4 z-10 bg-gray-900 text-white p-2 rounded"
        onClick={() => setSidebarOpen(true)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Main Content */}
      <div className="md:ml-60 xl:ml-10 p-4 flex-1">
        <h1 className="text-3xl text-center font-bold mb-4 text-gray-200">
          All Latest Pens
        </h1>
        <div className="space-y-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="border border-gray-300 hover:shadow-sm hover:shadow-orange-200 p-4 rounded-lg bg-white shadow-sm"
              >
                <h2 className="text-3xl font-bold text-gray-900">
                  {blog.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  By {blog.authorName} |{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div
                  className="blog-content text-gray-700 bg-gray-200 p-3 text-lg rounded-lg"
                  dangerouslySetInnerHTML={{
                    __html: trimContent(blog.content, 200),
                  }}
                />
                {blog.content.replace(/<[^>]*>/g, "").length > 200 && (
                  <div className="mt-4">
                    <Link
                      href={`/pages/public/id/${blog._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Loading blogs...</p>
          )}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default PublicNav;
