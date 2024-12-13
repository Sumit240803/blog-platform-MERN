"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import getToken from '../utils/getToken';
import checkToken from '../utils/checkToken';
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginForm from './LoginForm';

const PublicNav = () => {
  const [categories, setCategories] = useState([]);
  const token = getToken();
  const [isLogged , setIsLogged] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const pageSize = 5; // Set the page size
  const [ show , setShow] = useState(false);
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
        console.log(data.totalPages)
        setBlogs(data.blogs);
        console.log(data);
        setTotalPages(data.totalPages); // Assuming the API returns totalPages
      }
    } catch (error) {
      console.error(error);
    }
  };

  const trimContent = (content, maxLength) => {
    const strippedContent = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    return strippedContent.length > maxLength
      ? strippedContent.substring(0, maxLength) + '...'
      : strippedContent;
  };

  useEffect(() => {
    if(checkToken(token)){
      setIsLogged(true);
    }
    getCategories();
    allBlogs(); // Initially fetch the first page of blogs
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      allBlogs(currentPage + 1); // Fetch the next page
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      allBlogs(currentPage - 1); // Fetch the previous page
    }
  };
  const likePen = ()=>{
    if(!isLogged){
      setShow(true);
    }
    console.log("Can Like")
  }

  return (
    <div className="flex bg-blue-50 min-h-screen">
      {/* Side Navigation */}
      <div className="w-60 h-screen bg-gray-900 text-white shadow-md fixed">
        <div className="text-2xl font-bold p-4 border-b border-gray-300">
        {isLogged ? <Link href={"/pages/home"}>My Account</Link> : <Link href={"/"} >
          Pen Stitched
        </Link>}
        
        </div>
        <h2 className="text-xl font-semibold p-4 border-b border-gray-300">
          Categories
        </h2>
        <ul className="flex flex-col p-2 text-white">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id} className=" text-white px-4 py-2 hover:bg-gray-800">
                <Link
                  href={`/pages/public/category/${category.category}`}
                  className="block text-white"
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

      {/* Main Content */}
      <div className="ml-60 p-4 flex-1">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">All Latest Pens</h1>
      

        <div className="space-y-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="border border-gray-300 hover:shadow-sm hover:shadow-orange-200 p-4 rounded-lg bg-white shadow-sm"
              >
                <h2 className="text-xl font-semibold text-gray-900">{blog.title}<FontAwesomeIcon className='px-3 cursor-pointer' onClick={likePen} icon={faThumbsUp} /></h2>
                {show && <LoginForm/>}
                <p className="text-sm text-gray-500 mb-2">By {blog.authorName} | {new Date(blog.createdAt).toLocaleDateString()}</p>

                {/* Show trimmed content if it's long */}
                <div
                  className="blog-content text-gray-700 bg-gray-200 p-3 rounded-lg"
                  dangerouslySetInnerHTML={{ __html: trimContent(blog.content, 200) }} // Adjust length here
                />

                {/* Show "Read More" only if content was trimmed */}
                {blog.content.replace(/<[^>]*>/g, '').length > 200 && (
                  <div className="mt-4">
                    <Link href={`/pages/public/id/${blog._id}`} className="text-blue-600 hover:underline">
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
