"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Id = () => {
  const { view } = useParams();
  const [blog, setBlog] = useState(null);

  const getBlog = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/blogs/id?id=${view}`);
    if (response.ok) {
      const data = await response.json();
      setBlog(data.blog);
    }
  }

  useEffect(() => {
    getBlog();
  }, []);

  if (!blog) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
        <p className="text-gray-500 text-sm">By {blog.authorName} | {new Date(blog.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="content" dangerouslySetInnerHTML={{ __html: blog.content }} />

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Tags:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {blog.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">{tag}</span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Categories:</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {blog.category.map((category, index) => (
            <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">{category}</span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-gray-600">Views: {blog.views}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-700">Author Contact:</h3>
        <p className="text-blue-500">{blog.authorEmail}</p>
      </div>
    </div>
  );
}

export default Id;
