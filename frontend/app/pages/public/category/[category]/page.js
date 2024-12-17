"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link"; // Import Link from next/link
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";

const Category = () => {
  const [blogs, setBlogs] = useState([]);
  const { category } = useParams();

  const getBlog = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/blogs/blogCat`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setBlogs(data); // Assuming the API returns an array of blogs
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBlog();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="p-6 bg-contact bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-200 mb-4">
        {category}
      </h1>

      <div className="space-y-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="border border-gray-300 hover:shadow-md p-4 rounded-lg bg-white shadow-sm"
            >
              <h2 className="text-3xl font-bold text-gray-900 selection:bg-purple-400">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                By {blog.authorName} |{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 rounded p-3 text-lg bg-gray-200 selection:bg-purple-400">
                {blog.content.length > 150
                  ? `${blog.content.substring(0, 150)}...`
                  : blog.content}
              </p>

              {/* Read More Link */}
              {blog.content.length > 150 && (
                <div className="mt-4">
                  <Link
                    href={`/pages/public/id/${blog._id}`}
                    className="text-blue-600 hover:underline"
                    >
                    Read More
                  </Link>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                {blog.tags.map((tag, index) => (
                  <span
                  key={index}
                  className="bg-gray-800 text-gray-200 text-sm px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No blogs found under this category.</p>
        )}
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default Category;
