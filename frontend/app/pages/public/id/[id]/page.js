"use client";
import Footer from "@/app/components/Footer";
import LoginForm from "@/app/components/LoginForm";
import Navbar from "@/app/components/Navbar";
import checkToken from "@/app/utils/checkToken";
import getToken from "@/app/utils/getToken";
import { faBookmark, faStar, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Id = () => {
  const [isLogged, setIsLogged] = useState(false);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [liked , setLiked] = useState(false);
  const token = getToken();
 

  // Fetch blog details
  const getBlog = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/blogs/id?id=${id}`);
      if (response.ok) {
        const data = await response.json();
        setBlog(data.blog);
      } else {
        console.error("Failed to fetch blog");
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  // Handle like button
  const likePen = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/like`,{
      method : "POST",
      headers : {
        "Authorization" : `Bearer ${token}`,
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({"blogId" : id})
    });
    if(response.ok){
      alert("Blog Liked")
      console.log("Liked");
    }
  };
  const follow = async()=>{
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/user/follow`, {
        method : "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({"email" : blog.authorEmail})
      });
      if(response.ok){
        alert("FOllowd")
        router.refresh();
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (checkToken(token)) {
      setIsLogged(true);
    }
    getBlog();
  }, []);

  if (!blog) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto p-6 border bg-gray-50 border-gray-900 border-opacity-50 shadow-lg rounded-lg mt-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{blog.title}</h1>
          <p className="text-gray-500 text-sm">
            {isLogged ?
            <span>
              <FontAwesomeIcon
                className="cursor-pointer px-1"
                icon={faStar}
                onClick={likePen}
                />
                
              <FontAwesomeIcon onClick={follow} className="cursor-pointer px-1" icon={faUserPlus} />
            </span>
              : <span>
              <FontAwesomeIcon
                className="cursor-not-allowed px-1"
                icon={faStar}
                
                />
              <FontAwesomeIcon className="cursor-not-allowed px-1" icon={faUserPlus} />
            </span>}
            By {blog.authorName} | {new Date(blog.createdAt).toLocaleDateString()}
          </p>
        </div>

       

        <div className="content" dangerouslySetInnerHTML={{ __html: blog.content }} />

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Tags:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {blog.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700">Categories:</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {blog.category.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-gray-600">Views: {blog.views}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-700">Author Contact:</h3>
          <a href={`mailto:${blog.authorEmail}`} className="text-blue-500">
            {blog.authorEmail}
          </a>
        </div>
      </div>

      <Footer className="mt-6" />
    </div>
  );
};

export default Id;
