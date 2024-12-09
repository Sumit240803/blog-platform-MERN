"use client"
import Footer from '@/app/components/Footer';
import Navbar from '@/app/components/Navbar';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Id = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const getBlog = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/blogs/id?id=${id}`);
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
    <div>
<div>
  <Navbar/>
</div>
    
    <div className="max-w-5xl mx-auto p-6 border bg-gray-50 border-gray-900 border-opacity-50 shadow-lg rounded-lg mt-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
        <p className="text-gray-500 text-sm">
  <span className="group relative">
    <FontAwesomeIcon 
      className="cursor-pointer px-1" 
      icon={faUserPlus} 
    />
    <span className="absolute left-0 -top-6 text-sm bg-gray-700 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
      Follow
    </span>
  </span>
  By {blog.authorName} | {new Date(blog.createdAt).toLocaleDateString()}
</p>

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
        <a  className="text-blue-500">{blog.authorEmail}</a>
      </div>
    </div>
    <div className='mt-6'>
      <Footer/>
    </div>
    </div>
  );
}

export default Id;
